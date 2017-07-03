#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;

my $pattern = [
    '&lt;/', # indicates unclosed html tag
    '###',   # indicates unclosed html tags which leads to unparsed topic header
    '```',   # indicates broken code block
];

for my $p (@{$pattern}) {
    my $cmd = "grep -Irni '$p' _site";
    open(my $ph, '-|', $cmd.' 2>&1') or die('cmd '.$cmd.' failed: '.$!);
    ok($ph, 'cmd started');
    while(<$ph>) {
        my $line = $_;
        next unless $line =~ m/\.html:/mx;                      # only search for errors in html files
        next if $line =~ m/usersguide-guidelines.html:/mx;      # this page contains some examples which breaks this check
        next if $line =~ m/bootstrap-markdown-guide.html:/mx;   # this page contains some examples which breaks this check

        # this page contains some examples which breaks this check
        next if $line =~ m/cgiincludes.html:/mx && $line =~ m/\/BODY/mx;

        # this page contains some examples which breaks this check
        next if $line =~ m/cgisecurity.html:/mx && $line =~ m/\/Location/mx;

        chomp($line);
        fail($line);
    }
}

done_testing();
