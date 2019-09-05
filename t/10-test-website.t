#!/usr/bin/env perl

use strict;
use warnings;
use Getopt::Long;
use Test::More;
use Data::Dumper;
use Getopt::Long;
use Cwd;
use Time::HiRes qw(gettimeofday tv_interval);

#########################################################################
# parse and check cmd line arguments
my ($opt_v, $opt_h, $mainurl, $opt_expect) = (0, undef, $ENV{'TESTTARGET'}, $ENV{'TESTEXPECT'});
Getopt::Long::Configure('no_ignore_case');
Getopt::Long::Configure('bundling');
GetOptions (
   "h"    => \$opt_h,
   "v"    => sub { $opt_v++; },
   "e=s"  => \$opt_expect,
   "<>"   => sub { $mainurl = shift; },
);
if($opt_h or !$mainurl) {
    print "usage: $0 <url>\n";
    exit 3;
}
if($mainurl =~ m|^file://(.*)$|mx) {
    my $dir = $1;
    if(-d $dir) {
        $dir =~ s|/[^/]*$||gmx;
    }
    chdir($dir) || die("cannot change to $dir");
}
my $t = TestUtils->new();
my $test = {
        url                     => "".$mainurl,
        like                    => $opt_expect,
        recursive               => 1,
        follow                  => 1,
        check_anchors           => 1,
        check_external_links    => qr/\.(jpg|jpeg|png|gif|js|css|ico)$/i, # only check images and stylesheets, we do not want to increase our download statistics here
};
$t->test_page(%{$test});

my $num_to_check = 1;
while($num_to_check > 0) {
    for my $url (sort keys %{$TestUtils::pages_to_check}) {
        next if $TestUtils::pages_to_check->{$url} == 1;
        $test->{'url'} = $url;
        $t->test_page(%{$test});
    }
    $num_to_check = 0;
    for my $url (sort keys %{$TestUtils::pages_to_check}) {
        next if $TestUtils::pages_to_check->{$url} == 1;
        $num_to_check++;
    }
}

done_testing();
exit;

###############################################################################
package TestUtils;

use strict;
use Data::Dumper;
use Test::More;
use URI::Escape;
use Encode qw/decode_utf8/;
use lib 't/lib';
use HTML::Lint;
use LWP::UserAgent;

our $pages_to_check = {};
our $links_to_check = {};
our $link_referer   = {};
our $local_anchors_already_check = {};
our $lint_already_check          = {};

#########################
sub new {
    my($class) = @_;
    my $self = {};
    bless $self, $class;
    return $self;
}

#########################
sub test_page {
    my($self, %opts) = @_;
    my $return = {};

    my $opts = _set_test_page_defaults(\%opts);

    ok($opts->{'url'}, $opts->{'url'});

    $pages_to_check->{$opts->{'url'}} = 1;

    my $anchor;
    my $origurl = $opts->{'url'};
    if($opts->{'url'} =~ m/\#(.*)$/mx) {
        $anchor = $1;
        $opts->{'url'} =~ s/\#.*$//mx;
        $pages_to_check->{$opts->{'url'}} = 1;
    }

    my $request = _request($opts->{'url'});

    if(defined $opts->{'follow'}) {
        my $redirects = 0;
        while(my $location = $request->{'_headers'}->{'location'}) {
            $location = _relative_url($location, $request->base()->as_string());
            $request = _request($location);
            $redirects++;
            last if $redirects > 10;
        }
        ok( $redirects < 10, 'Redirect succeed after '.$redirects.' hops' ) or bail_out_req('too many redirects', $request);
    }

    if(!defined $opts->{'fail_message_ok'}) {
        if($request->content =~ m/<span\ class="fail_message">([^<]+)<\/span>/mx) {
            fail('Request '.$opts->{'url'}.' had error message: '.$1);
        }
    }

    $return->{'content'} = $request->content;
    if(defined $opts->{'fail'}) {
        ok( $request->is_error, 'Request '.$opts->{'url'}.' should fail' );
    }
    elsif(defined $opts->{'redirect'}) {
        ok( $request->is_redirect, 'Request '.$opts->{'url'}.' should redirect' ) or diag(Dumper($request));
        if(defined $opts->{'location'}) {
            if(defined $request->{'_headers'}->{'location'}) {
                like($request->{'_headers'}->{'location'}, qr/$opts->{'location'}/, "Content should redirect: ".$opts->{'location'});
            } else {
                fail('no redirect header found');
            }
        }
    } else {
        ok( $request->is_success, 'Request '.$opts->{'url'}.' should succeed' ) or do { $opt_v >= 2 && bail_out_req('request failed', $request) };
        unless($request->is_success) {
            diag(Dumper($request)) if $opt_v >= 2;
            diag('linked from: '.join("\n", sort keys %{$link_referer->{$origurl}})) if $link_referer->{$origurl};
            return $return
        }
    }

    # test the content type
    $return->{'content_type'} = $request->header('Content-Type');
    my $content_type = $request->header('Content-Type');
    if(defined $opts->{'content_type'}) {
        is($return->{'content_type'}, $opts->{'content_type'}, 'Content-Type should be: '.$opts->{'content_type'}) or diag($opts->{'url'});
    }

    # text that should appear
    if(defined $opts->{'like'}) {
        if(ref $opts->{'like'} eq '') {
            like($return->{'content'}, qr/$opts->{'like'}/, "Content should contain: ".$opts->{'like'}) or diag($opts->{'url'});
        } elsif(ref $opts->{'like'} eq 'ARRAY') {
            for my $like (@{$opts->{'like'}}) {
                like($return->{'content'}, qr/$like/, "Content should contain: ".$like) or diag($opts->{'url'});
            }
        }
    }

    # text that shouldn't appear
    if(defined $opts->{'unlike'}) {
        if(ref $opts->{'unlike'} eq '') {
            unlike($return->{'content'}, qr/$opts->{'unlike'}/, "Content should not contain: ".$opts->{'unlike'}) or diag($opts->{'url'});
        } elsif(ref $opts->{'unlike'} eq 'ARRAY') {
            for my $unlike (@{$opts->{'unlike'}}) {
                unlike($return->{'content'}, qr/$unlike/, "Content should not contain: ".$unlike) or diag($opts->{'url'});
            }
        }
    }

    # html valitidy
    if($content_type =~ 'text\/html' and !$request->is_redirect) {
        like($return->{'content'}, '/<html[^>]*>/i', 'html page has html section');
        like($return->{'content'}, '/<!doctype/i',   'html page has doctype');
    }

    SKIP: {
        if($content_type =~ 'text\/html' and (!defined $opts->{'skip_html_lint'} or $opts->{'skip_html_lint'} == 0) and !$lint_already_check->{$opts->{'url'}}) {
            $lint_already_check->{$opts->{'url'}} = 1;
            my $lint = HTML::Lint->new();
            # will result in "Parsing of undecoded UTF-8 will give garbage when decoding entities..." otherwise
            my $content = decode_utf8($return->{'content'});
            $lint->parse($content);
            $lint->eof();
            my @errors = $lint->errors;
            @errors = remove_some_exceptions_from_lint_errors($lint);
            is( scalar @errors, 0, "No HTML errors found on ".$opts->{'url'} );
            diag(join("\n", @errors)) if scalar @errors > 0;
            $lint->clear_errors();
        }
    }

    # check for missing images / css or js
    my $local_check_anchors = {};
    if($content_type =~ 'text\/html') {
        my $content = $return->{'content'};
        # remove script tags without a src
        $content =~ s/<script[^>]*src=('|")([^'"]*)('|")>\s*<\/script>/**SCRIPT:$2**/gsmxio;
        $content =~ s/<script[^>]*>.+?<\/script>//gsmxio;
        $content =~ s/\*\*SCRIPT:(.*?)\*\*/<script src="$1"><\/script>/gsmxio;
        my @matches1 = $content =~ m/<\w+[^>]*\s+(src|href)='(.+?)'/gi;
        my @matches2 = $content =~ m/<\w+[^>]*\s+(src|href)="(.+?)"/gi;
        my @matches3 = $content =~ m/<meta\s+http\-equiv=.*?refresh(.*)URL=([^'"]+)/gi;
        my $x=0;
        for my $match (@matches1, @matches2, @matches3) {
            $x++;
            next if $x%2==1;
            next if $match =~ m/^irc:/;
            next if $match =~ m/^ssh:/;
            next if $match =~ m/^mailto:/;
            next if $match =~ m/^javascript:/;
            next if $match =~ m/\/"\+/;
            next if $match =~ m/\#"\+/;
            if($match =~ m/^\#(.*)$/mx) {
                $local_check_anchors->{$1} = 1;
            } else {
                if($match =~ m#^//(home|var|opt|usr)/#mx) {
                    fail("wrong link: ".$match." on page: ".$opts->{'url'});
                    next;
                }
                $match = _relative_url($match, $request->base()->as_string());
                if(($match =~ m/^https?:/ || $match =~ m|^//|mx) && $match !~ m/^\Q$mainurl\E/) {
                    next unless $match =~ $opts->{'check_external_links'};
                    $links_to_check->{$match} = 0 unless defined $links_to_check->{$match};
                }
                elsif($match =~ m/^\Q$mainurl\E/mx and $match !~ m/\.(css|js|gif|jpg|png|ico)$/mxi) {
                    $pages_to_check->{$match} = 0 unless defined $pages_to_check->{$match};
                    $link_referer->{$match}->{$opts->{'url'}} = 1;
                } else {
                    $links_to_check->{$match} = 0 unless defined $links_to_check->{$match};
                }
            }
        }
        my $errors = 0;
        for my $test_url (sort keys %{$links_to_check}) {
            next unless $links_to_check->{$test_url} == 0;
            my $request = _request($test_url, "HEAD");

            if($request->is_redirect) {
                my $redirects = 0;
                while(my $location = $request->{'_headers'}->{'location'}) {
                    $location = _relative_url($location, $request->base()->as_string());
                    $request = _request($location, "HEAD");
                    $redirects++;
                    last if $redirects > 10;
                }
            }
            unless($request->is_success) {
                $errors++;
                diag("'$test_url' is missing, status: ".$request->code);
                # mark as already known bad
                $links_to_check->{$test_url} = -1;
            } else {
                # mark as already known good
                $links_to_check->{$test_url} =  1;
            }
        }
        is( $errors, 0, 'All stylesheets, images and javascript exist' );
    }

    # check anchor
    if($content_type =~ 'text\/html' and $opts->{'check_anchors'}) {
        _check_anchor($anchor, $opts->{'url'}, $return->{'content'}, 0) if $anchor;
        if(!$local_anchors_already_check->{$opts->{'url'}}) {
            $local_anchors_already_check->{$opts->{'url'}} = 1;
            for my $a (sort keys %{$local_check_anchors}) {
                _check_anchor($a, $opts->{'url'}, $return->{'content'}, 1);
            }
        }
    }

    return $return;
}

#########################
sub remove_some_exceptions_from_lint_errors {
    my $lint = shift;
    my @return;
    for my $error ( $lint->errors ) {
        my $err_str = $error->as_string;
        next if $err_str =~ m/\QUnknown attribute "role" for tag\E/imx;
        next if $err_str =~ m/\QUnknown element <footer>\E/imx;
        next if $err_str =~ m/\QUnknown element <header>\E/imx;
        next if $err_str =~ m/\QUnknown element <nav>\E/imx;
        next if $err_str =~ m/\Qshould be written as\E/imx;
        next if $err_str =~ m/\QUnknown attribute "data-\E/imx;
        next if $err_str =~ m/\QUnknown attribute "charset" for tag <meta>\E/imx;
        next if $err_str =~ m/\QUnknown attribute "aria-hidden" for tag\E/imx;
        next if $err_str =~ m/\QUnknown attribute "aria-label" for tag\E/imx;
        next if $err_str =~ m/\QUnknown attribute "name" for tag <div>\E/imx;
        next if $err_str =~ m/\QUnknown attribute "name" for tag <hr>\E/imx;
        next if $err_str =~ m/<img[^>]+?\Q> tag has no HEIGHT and WIDTH attributes\E/imx;
        next if $err_str =~ m/<img[^>]+?\Q> does not have ALT text defined\E/imx;
        push @return, $error->as_string;
    }
    return @return;
}

#########################
sub _relative_url {
    my($location, $url) = @_;
    # new url
    if($location =~ m/^https?:\/\//gmx) {
        return $location;
    }

    # url without protocol
    if($location =~ m/^\/\//mx) {
        if($url =~ m/^(https?)/mx) {
            return($1.':'.$location);
        }
        return('https:'.$location);
    }

    my $newloc = $url;
    # absolute url
    if($location =~ m/^\//mx) {
        if($url =~ m/^file:/) {
            $newloc = "file://".Cwd::getcwd().$location;
            return $newloc;
        } else {
            $newloc = $url;
            $newloc =~ s|^(.*?)://(.*?)/.*$|$1://$2|gmx;
            $newloc .= $location;
            return $newloc;
        }
    }
    # relative url
    $newloc    =~ s/[^\/]+$//gmx;
    $newloc    .= $location;
    while($newloc =~ s|/[^\/]+/\.\./|/|gmx) {}
    $newloc =~ s|/\./|/|gmx;
    return $newloc;
}

#########################
sub _request {
    my($url, $method) = @_;
    if($url =~ m|^file://(.*)$|mx) {
        # fake index file instead of using directory index all the time
        my $file = $1;
        $file =~ s|/$||gmx;
        if(-d $file) {
            if(-e $file.'/index.html') {
                $file = $file.'/index.html';
            } else {
                my @files = glob($file.'/index.*');
                $file = $files[0];
            }
            $url = 'file://'.$file;
        }
    }
    $method = "GET" unless defined $method;
    my $ua = LWP::UserAgent->new;
    my $request;
    if(!defined $method or uc($method) eq 'GET') {
        $request = $ua->get($url);
    }
    elsif(uc($method) eq 'HEAD') {
        $request = $ua->head($url);
    } else {
        fail("unknown http method: ".$method);
    }
    return $request;
}

#########################
sub _set_test_page_defaults {
    my($opts) = @_;
    if(!exists $opts->{'unlike'}) {
        #$opts->{'unlike'} = [ 'internal server error', 'HASH', 'ARRAY' ];
    }
    return $opts;
}

#########################
sub bail_out_req {
    my($msg, $req) = @_;
    my $page    = $req->content;
    my $error   = "";
    if($page =~ m/<!--error:(.*?):error-->/smx) {
        $error = $1;
        diag(Dumper($msg));
        diag(Dumper($error));
        BAIL_OUT($msg);
    }
    diag(Dumper($msg));
    diag(Dumper($req));
    #BAIL_OUT($msg);
    return;
}

#########################
sub _check_anchor {
    my($anchor, $url, $content, $samepage) = @_;
    return if(!defined $anchor);
    return if(defined $anchor and $anchor eq '');
    my $anchors  = {};
    my @matches1 = $content =~ m/(<.*?(name|id)=['"]{1}(\Q$anchor\E)['"]{1}.*?>)/;
    $anchors->{$anchor} = 1 if scalar @matches1 > 0;
    if($content =~ m/\Qcreate side bar navigation automatically\E/mx) {
        my @matches2 = $content =~ m/(<(h3|h4)\ id="([^<]+)")>/gmi;
        my $x = 0;
        for my $m (@matches2) {
            $x++;
            next unless $x%3==0;
            $m =~ s/[^a-zA-Z0-9\ \-]*//gmx;
            $m =~ s/\-/_/gmx;
            $m =~ s/\ +/_/gmx;
            $anchors->{lc $m} = 1;
        }
    }
    if(!defined $anchors->{$anchor}) {
        my $origurl = $url.'#'.$anchor;
        fail("anchor $anchor not found");
        diag("anchor $anchor not found on ".$origurl);
        if($samepage) {
            diag('linked from within the same page ('.$url.').'."\n \n")
        } else {
            diag('linked from: '.join("\n", sort keys %{$link_referer->{$origurl}})."\n \n")
        }
    } else {
        ok(1, "anchor $anchor does exist on ".$url);
    }
}

#########################

1;

__END__
