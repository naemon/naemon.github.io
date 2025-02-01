## Developing Plugins For Use With Embedded Perl

::: warning
Naemon does not include embedded Perl anymore, however, all ePN related information
still applies to the [Mod-Gearman Worker](./addons#mod-gearman).
:::

### Introduction

Stanley Hopcroft has worked with the embedded Perl interpreter quite a bit and has commented on the advantages/disadvantages
of using it. He has also given several helpful hints on creating Perl plugins that work properly with the embedded
interpreter. The majority of this documentation comes from his comments.

It should be noted that "ePN", as used in this documentation, refers to embedded Perl in a Mod-Gearman worker,
or if you prefer, Mod-Gearman compiled with an embedded Perl interpreter.

### Target Audience

* Average Perl developers; those with an appreciation of the languages powerful features
  without knowledge of internals or an in depth knowledge of those features.
* Those with a utilitarian appreciation rather than a great depth of understanding.
* If you are happy with Perl objects, name management, data structures, and the debugger,
  that's probably sufficient.

### Things you should do when developing a Perl Plugin (ePN or not)

* Always always generate some output
* Use 'use utils' and import the stuff it exports ($TIMEOUT %ERRORS &print_revision &support)
* Have a look at how the standard Perl plugins do their stuff e.g.
* Always exit with $ERRORS{CRITICAL}, $ERRORS{OK}, etc.
* Use getopt to read command line arguments
* Manage timeouts
* Call print_usage (supplied by you) when there are no command line arguments
* Use standard switch names (eg H 'host', V 'version')

### Things you must do to develop a Perl plugin for ePN

`<DATA>` can not be used; use here documents instead e.g.

```perl
my $data = <<DATA;
portmapper 100000
portmap 100000
sunrpc 100000
rpcbind 100000
rstatd 100001
rstat 100001
rup 100001
..
DATA

%prognum = map { my($a, $b) = split; ($a, $b) } split(/\n/, $data) ;
```

* BEGIN blocks will not work as you expect. May be best to avoid.
* Ensure that it is squeaky clean at compile time i.e.
* use strict
* use perl -w (other switches [T notably] may not help)
* use perl -c
* Avoid lexical variables (my) with global scope as a means of passing __variable__ data into subroutines.
  In fact this is __fatal__ if the subroutine is called by the plugin more than once when the check is run.
  Such subroutines act as 'closures' that lock the global lexicals first value into subsequent calls
  of the subroutine. If however, your global is read-only (a complicated structure for example) this
  is not a problem. What Bekman perl apache guide [recommends you do instead](http://perl.apache.org/docs/1.0/guide/),
  is any of the following:

* make the subroutine anonymous and call it via a code ref e.g.

```perl
# turn this                   into
my $x = 1;                    my $x = 1;
sub a { .. Process $x ... }   $a_cr = sub { ... Process $x ... };
.                             .
.                             .
a;                            &amp;$a_cr;
$x =2                         $x = 2;
a;                            &amp;$a_cr;

# anon closures __always__ rebind the current lexical value
```

* put the global lexical and the subroutine using it in their own package (as an object or a module)
* pass info to subs as references or aliases (\$lex_var or $_[n])
* replace lexicals with package globals and exclude them from 'use strict' objections with 'use vars qw(global1 global2 ..)'
* Be aware of where you can get more information.

Useful information can be had from the usual suspects (the O'Reilly books, plus Damien Conways "Object Oriented Perl") but for the really useful stuff in the right context start at Stas Bekman's mod_perl guide at [perl.apache.org/guide/](http://perl.apache.org/guide/).

This wonderful book sized document has nothing whatsoever about Naemon,
but all about writing Perl programs for the embedded Perl interpreter in Apache (ie Doug MacEacherns mod_perl).

The perlembed manpage is essential for context and encouragement.

On the basis that Lincoln Stein and Doug MacEachern know a thing or two about Perl and embedding Perl, their book 'Writing Apache Modules with Perl and C' is almost certainly worth looking at.

* Be aware that your plugin may return strange values with an ePN and that this is likely to be caused by the problem in item #4 above
* Be prepared to debug via:

* having a test ePN and
* adding print statements to your plugin to display variable values to STDERR (can't use STDOUT)
* adding print statements to p1.pl to display what ePN thinks your plugin is before it tries to run it (vi)
* running the ePN in foreground mode (probably in conjunction with the former recommendations)
* use the 'Deparse' module on your plugin to see how the parser has optimised it and what the interpreter will actually get. (see 'Constants in Perl' by Sean M. Burke, The Perl Journal, Fall 2001)

```shell
perl -MO::Deparse &lt;your_program&gt;
```

* Be aware of what ePN is transforming your plugin too, and if all else fails try and debug the transformed version.

As you can see below p1.pl rewrites your plugin as a subroutine called 'hndlr' in the package named `Embed::<something_related_to_your_plugin_file_name>`.

Your plugin may be expecting command line arguments in @ARGV so pl.pl also assigns @_ to @ARGV.

This in turn gets 'eval' ed and if the eval raises an error (any parse error and run error), the plugin gets chucked out.

The following output shows how a test ePN transformed the *check_rpc* plugin before
attempting to execute it. Most of the code from the actual plugin is not shown,
as we are interested in only the transformations that the ePN has made to the plugin.

For clarity, transformations have been highlighted:

```perl:line-numbers{1-4,16}
package main;
use subs 'CORE::GLOBAL::exit';
sub CORE::GLOBAL::exit { die "ExitTrap: $_[0] (Embed::check_5frpc)"; }
package Embed::check_5frpc; sub hndlr { shift(@_); @ARGV=@_;
#! /usr/bin/perl
#
# check_rpc plugin for Naemon
#
# usage:
#    check_rpc host service
#
# Check if an rpc serice is registered and running
# using rpcinfo - $proto $host $prognum 2>&amp;1 |";
#
... rest of plugin code goes here (it was removed for brevity) ...
}
```

* Don't use 'use diagnostics' in a plugin run by your production ePN.
  It might cause __all__ the Perl plugins to return CRITICAL.
* Consider using a mini embedded Perl C program to check your plugin. This is not
  sufficient to guarantee your plugin will perform Ok with an ePN but if the plugin fails
  this test it will certainly fail with your ePN.
  ( A sample mini ePN is shipped with Mod-Gearman for use in testing Perl plugins. )
