---
layout: doctoc
title: What's New
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="knownissues.html">Known Issues</a>

<a name="changelog"></a>

### Change Log

See upcoming changes from the next version on [github](https://github.com/naemon/naemon-core/blob/master/NEWS)

### Notable Changes and New Features

#### 0.9.1 - 8 Jan 2015
##### Code Contributors
 * Robin Sonefors
 * Sven Nierlein
 * Andreas Ericsson
 * Anton Lofgren
 * Max Sikström
 * Ricardo Maraschini
 * Andreas Boesl
 * Mathias Kettner
 * Sebastian Hahn
 * Daniel Wittenberg
 * Johan Ryberg
 * Franky Van Liedekerke
 * Julian Brost
 * Mikael Falkvidd
 * Sven Velt

##### Features
 * The config option include_dir allows you to specify a dropdir
   where main configuration files can be read from. This should
   help module authors quite a bit.
 * We now have pkgconfig support, making it easier to create
   build- and install systems for modules.

##### Bugfixes
 * Workers are now prevented from becoming zombies
 * Workers should be choked far less often
 * Check scheduling will now always be consistently done
 * Checks should clump up a lot less, keeping system load smoother
 * Several crash-on-close with corner-case configurations are fixed
 * Several small memory leaks are fixed
 * Check output should no longer be lost unless the kernel drops it
   due to out-of-memory errors
 * We will now always shut down fairly gracefully on OOM errors
 * Workers should no longer cause zombies to appear
 * Several fixes have been made to make building on OSX work
   better
 * Submitting passive check results for in-flight active checks
   will no longer cause crashes

#### 0.8 - 14 Feb 2014

 * Based on nagios 4.0.2
 * Rename a lot of things, replace build system, etc.
 * The CGIs are gone - use Thruk instead.
 * Remove the upstream version check - use your package manager instead.
 * New NEB callback, NEBATTR_CHECK_ALERT, when a check generates an alert.
 * Allow contactgroups without members but having contactgroup_members.
 * No longer spam Naemon log when checks time out.
 * All positive values for ACKNOWLEDGE_{HOST,CHECK} means TRUE.
 * Check output parsing rewritten.
   - Fixes crashes, bugs, and improves performance.
 * Log rotation is done by logrotate instead of in-core log rotation.
 * Fix misc crashes, speed up misc areas, and other bug fixes.
