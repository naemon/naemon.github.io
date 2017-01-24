---
layout: doctoc
title: What's New
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="knownissues.html">Known Issues</a>

<a name="changelog"></a>

### Change Log

See upcoming changes from the next version on [github](https://github.com/naemon/naemon-core/blob/master/NEWS)

### Notable Changes and New Features

#### 1.0.6 - 23 Jan 2017
##### Bugfixes
  * Fix CVE-2016-9566 by removing drop_privileges. Note: naemon cannot be started as root anymore.
  * Fix shell command parsing for some special cases when defining environment variables in a command
  * Fix custom variables persistence accros restarts for single byte values
  * Fix writing to already rotated logfile
  * Fix memory leak in broker_notification_data
  * Fix notification commands beeing reaped to early (#137)

#### 1.0.5 - 21 Jun 2016
##### Bugfixes
  * Fix segfault when trying to log to null pointer (#140)
  * Fix naemon exiting on USR1 signal (#138, #139)

#### 1.0.4 - 03 Jun 2016
##### Features
  * Downtimes can now be scheduled to start before their time of their scheduling
  * Naemon can now start without any configured objects
  * Add new NEB callback API version with better support for communicating
    cancellation and override reasons
  * Naemon now consistently logs when a notification is suppressed, along with
    the reason why (very useful for troubleshooting notification issues!). This
    feature is enabled by default, and can be overridden by setting
    enable_notification_suppression_reason_logging=0 in naemon.cfg.
  * Scheduling logic completely overhauled to not depend on wallclock time,
    which makes it much more reliable (no more lost or orphaned events!)
  * It is now possible to disable status data updates completely
    (status_update_interval=0)
  * GLib messages are now logged to the regular outputs.

##### Bugfixes
  * Fix segfault which would happen when a plugin's output is one or more
    newlines only
  * Shadownaemon: fix segfault if plugin output contains csv separator
  * Fix an ancient bug where reconstructing a downtime from retention data
    would result in double downtime alerts being emitted
  * Fix another ancient race condition where a rapidly reload and starting
    naemon would leave you with two instances running
  * Stop logging if check_result_path (deprecated) is not available even
    if it's set
  * Strings in retention data are now properly escaped, fixing various bugs
  * Various init script fixes
  * Fix a race condition that would sometimes lead to complete deadlock
  * Fix a bug where Naemon would allow duplicate objects to be created
  * Replace in-tree (ha-ha) rbtree with GLib's GTree, to get rid of incorrect
    node removal behaviour in the former
  * Fix a race condition that would sometimes occur during a reload
  * Fix a bug in signal handling code which would sometimes cause the command
    file worker to become defunct
  * Fix a bug where the specified retry_interval of a service or host
    would not be properly respected, and the check_interval would be used instead
  * Fix a potential crash (segfault) when freeing parent/child references
  * Fix a bug where "stale" objects would only have one freshness check executed
  * Fix improper handling of CHECK_OPTION_FORCE_EXECUTION, which would lead to
    checks not being run, despite being forcibly scheduled
  * Fix a bug where Naemon wouldn't properly initialize its lock file, but
    start regardless

##### Other
  * Grafted Nagios git history onto Naemon's for easier code archeology
  * Lots of code cleanup, typo fixes, new test cases, new assertions &
    error handling, fixed memory leaks, logging and refactoring
  * Removed an undocumented, experimental, untested "load control" feature
  * Decoupled Thruk packages, we now use the official upstream Thruk packages

##### New contributors
  * Carl Helmertz (chelmertz@op5.com)
  * Emil Hessman (emil@hessman.se)
  * Robin Hagman (rhagman@op5.com)
  * Philip Eklöf (peklof@op5.com)
  * Simen Aasland (simen@opera.com)
  * Tobias Sjöndin (tsjondin@op5.com)



#### 1.0.3 - 29 Mar 2015
##### Bugfixes
 * shadownaemon: fix request counter

#### 1.0.2 - 28 Mar 2015
##### Bugfixes
 * shadownaemon: remove external commands from shadownaemon (#104)
 * shadownaemon: propagate last_hard_* values (Michael Kraus)

#### 1.0.0 - 13 Feb 2015
##### Bugfixes
 * Fix shadownaemon comment and downtime synchronization
 * Fix spelling errors

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
