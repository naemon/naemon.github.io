---
layout: affix
title: FAQ
---

Frequently asked questions... If you don't find the answer here, it's either in
the [Users Guide](/documentation/usersguide), the [Developers Guide](/documentation/developer)
or not yet written. For the latter, see [](#)

### General

#### Why A Fork?

Read [Why A Fork](/project.html) on the projects page.


#### How Can I Help?

Help is much appreciated and possible in many ways. Details can be found on
the [community page](/community) page.

#### What Are The Differences To Nagios

A lot of open Nagios 4 issues have been fixed in Naemon. See a complete list
in the [developers section](/documentation/developer/bugs/).

Also we removed the CGIs in favor of the Thruk gui.

### Suite

### Core

#### Run Naemon With GDB

For error tracing its often useful to have a backtrace. For example if naemon
crashes. You can start naemon with GDB like this.

{{ site.warn }}All commands should be run as the 'naemon' user.{{ site.end }}

Livestatus requires us to export or set LD_PRELOAD before running GDB, so we
first have to find that library:

```bash
  %> find /lib/ /usr/lib/ /lib64/ /usr/lib64/ -name libpthread.so.0
  /lib/i386-linux-gnu/libpthread.so.0
```

If available you should install the `naemon-core-dbg` package which
contains additional debugging symbols that makes troubleshooting a lot easier.

Then run Naemon with GDB, you will have to type `run` after the prompt:

```bash
 %>LD_PRELOAD=/lib/libpthread.so.0 gdb --args /usr/bin/naemon-dbg /etc/naemon/naemon.cfg
   GNU gdb (GDB) 7.0.1-debian
   Copyright (C) 2009 Free Software Foundation, Inc.
   License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
   This is free software: you are free to change and redistribute it.
   There is NO WARRANTY, to the extent permitted by law.  Type "show copying"
   and "show warranty" for details.
   This GDB was configured as "i486-linux-gnu".
   For bug reporting instructions, please see:
   <http://www.gnu.org/software/gdb/bugs/>...
   Reading symbols from /usr/bin/naemon-dbg...done.
   (gdb) run
```

After typing 'run' you need to wait till the program crashes or exists otherwise.
In our case we just used 'kill -11' to fake a segfault in the core:

```bash
Program received signal SIGSEGV, Segmentation fault.
0xb7fe2424 in __kernel_vsyscall ()
(gdb)
```

By typing `bt` you will get the desired backtrace:

```
(gdb) bt
#0  0xb7fe2424 in __kernel_vsyscall ()
#1  0xb7f1b6f6 in epoll_wait () from /lib/i686/cmov/libc.so.6
#2  0x080c3d07 in iobroker_poll (iobs=0x80ef0b0, timeout=1500) at iobroker.c:348
#3  0x08077b18 in event_execution_loop () at events.c:1060
#4  0x080821db in main (argc=2, argv=0xbffff644) at naemon.c:768
```

Now go to the [naemon issues](https://github.com/naemon/naemon/issues) page and file a
new bug after having a look if this hasn't been reported yet.


### Thruk

### Livestatus

### Addons

### Development

### Documentation

#### Help Extending The Documentation

Helping writing documentation is really easy and much appreciated. Most pages
are written in either Markdown ([Cheat Sheet][markdown]) or HTML. The website
itself uses [bootstrap][bootstrap] for a simple and nice layout.

See our [Bootstrap and Markdown guide](/documentation/faq/bootstrap-markdown-guide.html) for more info

Please see our [Usersguide guidelines](/documentation/faq/usersguide-guidelines.html) for some basic information how we write our documentation

##### Small Changes
Small changes like typos can be corrected and submitted directly on [github][githubdocs] via the edit button.
<p>![github edit button](images/githubedit.png "Github Edit Button")</p>
Just navigation to the page you want to change and send a pull request via the online editor of github.
Read more about the [online editor][githubedithelp]...


##### Larger Changes
Larger changes should be tested and reviewed locally before submitting them. Also
it's good practice to talk to a team member before spending large amounts of time
in things we eventually won't accept for whatever reasons.
The [developer guide](/documentation/developer/website.html) contains instructions on
how to run a local Jekyll server.
When done, just submit a normal pull request.


[markdown]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
[bootstrap]: http://getbootstrap.com/css/
[githubdocs]: https://github.com/naemon/naemon.github.io/tree/master/documentation
[githubedithelp]: https://github.com/blog/905-edit-like-an-ace
