## The Embedded Perl Interpreter

::: warning
Naemon does not include embedded Perl anymore, however, all ePN related information
still applies to the [Mod-Gearman Worker](./addons#mod-gearman).
:::

### Introduction

Mod-Gearman can be compiled with support for an embedded Perl interpreter. This
allows Mod-Gearman to execute Perl plugins much more efficiently that it otherwise
would, so it may be of interest to you if you rely heavily on plugins written in Perl.

Without the embedded Perl interpreter, Mod-Gearman executes Perl (and non-Perl)
plugins by forking and executing the plugins as an external command. When the
embedded Perl interpreter is used, Mod-Gearman can execute Perl plugins by simply
making a library call.

::: tip
The embedded Perl interpreter works with all Perl scripts that Mod-Gearman executes - not just plugins.
:::

This documentation discusses the embedded Perl interpreter in relation to
plugins used for host and service checks, but it applies just the same to other
types of Perl scripts you may be using for other types of commands (e.g. notification
scripts, event handler scripts, etc.).

Stephen Davies contributed the original embedded Perl interpreter code several years back.
Stanley Hopcroft has been the primary person helping to improve the embedded Perl interpreter code
quite a bit and has commented on the advantages/disadvantages of using it.  He has also given several
helpful hints on creating Perl plugins that work properly with the embedded interpreter.

It should be noted that "ePN", as used in this documentation, refers to embedded Perl Mod-Gearman,
or if you prefer, Mod-Gearman compiled with an embedded Perl interpreter.

![Embedded Perl Interpreter](/images/usersguide/svg/epn.svg) {.img-bg}

### Advantages

Some advantages of ePN (embedded Perl in Mod-Gearman) include:

* Mod-Gearman will spend much less time running your Perl plugins because it no longer forks to
  execute the plugin (each time loading the Perl interpreter). Instead, it executes your
  plugin by making a library call.
* It greatly reduces the system impact of Perl plugins and/or allows you to run more checks with
  Perl plugin than you otherwise would be able to.  In other words, you have less incentive to write
  plugins in other languages such as C/C++, or Expect/TCL, that are generally recognized to have
  development times at least an order of magnitude slower than Perl (although they do run about ten
  times faster also - TCL being an exception).
* If you are not a C programmer, then you can still get a huge amount of mileage out of Mod-Gearman
  by letting Perl do all the heavy lifting without having Mod-Gearman slow right down.
  Note however, that the ePN will not speed up your plugin (apart from eliminating the interpreter
  load time). If you want fast plugins then consider Perl XSUBs (XS), or C *after* you are sure that
  your Perl is tuned and that you have a suitable algorithm (Benchmark.pm is *invaluable* for
  comparing the performance of Perl language elements).
* Using the ePN is an excellent opportunity to learn more about Perl.

### Disadvantages

The disadvantages of ePN (embedded Perl in Mod-Gearman) are much the same as Apache mod_perl
(i.e. Apache with an embedded interpreter) compared to a plain Apache:

* A Perl program that works *fine* with plain Naemon may *not* work with the ePN.
  You may have to modify your plugins to get them to work.
* Perl plugins are harder to debug under an ePN than under a plain Naemon.
* Your ePN will have a larger SIZE (memory footprint) than a plain Naemon.
* Some Perl constructs cannot be used or may behave differently than what you would expect.
* You may have to be aware of 'more than one way to do it' and choose a way that seems less attractive or obvious.
* You will need greater Perl knowledge (but nothing very esoteric or stuff about Perl internals - unless your plugin uses XSUBS).

### Plugin-Specific Use of the Perl Interpreter

Beginning with Mod-Gearman, you can specify which Perl plugins or scripts should or should not
be run under the embedded Perl interpreter. This is particularly useful if you have troublesome Perl
scripts which do not work well with the Perl interpreter.

To *explicitly* tell Mod-Gearman whether or not to use the embedded Perl interpreter for a particular
perl script, add one of the following entries to your Perl script/plugin...

To tell Mod-Gearman to use the Perl interpreter for a particular script, add this line to the Perl script:

```perl
# naemon: +epn
```

To tell Mod-Gearman to NOT use the embedded Perl interpreter for a particular script, add this line to the Perl script:

```perl
# naemon: -epn
```

Either line must be located within the first 10 lines of a script for Mod-Gearman to detect it.

::: tip
If you do not *explicitly* use the method above to tell Mod-Gearman whether an individual plugin can be run under the Perl
interpreter, Mod-Gearman will make will a decision for you. This decision process is controlled by the `use_embedded_perl_implicitly` variable.
:::

If the value is set to 1, all Perl plugins/scripts (that do not explicitly enable/disable the ePN) will be
run under the Perl interpreter. If the value is 0, they will NOT be run under the Perl interpreter.

### Developing Plugins For Use With Embedded Perl

Information on developing plugins for use with the embedded Perl interpreter can be found [here](./epnplugins).
