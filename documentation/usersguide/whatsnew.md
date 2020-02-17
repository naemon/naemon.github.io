---
layout: doctoc
title: What's New
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="knownissues.html">Known Issues</a>

<a name="changelog"></a>

### Notable Changes and New Features

#### Upcoming next release
See upcoming changes from the next version on [github](https://github.com/naemon/naemon-core/blob/master/NEWS)

#### 1.2.0 - 17 Feb 2020
##### Features
  * Add new skip check options to set a particular state on skipped checks

##### Bugfixes
  * Retain flap detection option over restarts
  * Don't process perfdata file if perfdata is disabled

##### Livestatus
  * Add support for TCP sockets with the inet_addr option
  * Add support for the statehist table, to calulate and query availability data
  * Fix logging during argument parsing
  * Fix deadlock when querying comments/downtimes

#### 1.1.0 - 02 Sep 2019
##### Features
  * add internal last_update timestamp to track host/service changes
  * speed up configuration check when using lots of dependencies

##### Changed
  * increased CURRENT_NEB_API_VERSION, this means you have to recompile your NEB modules

##### Bugfixes
  * bail out config check if parent host cannot be resolved
  * bail out config check if group members cannot be resolved (#300)
  * fix calculating group on demand macros
  * fix last_hard_state when using neb modules (#287)
  * fix loading neb modules multiple times

##### Livestatus
  * add new columns last_update to host and services
  * send error when result set would be too large
  * fix issue when reloading while processing a long query
  * fix issue when parsing incomplete log entries
  * fix issue with accessing downtimes and comments


#### 1.0.10 - 19 Mar 2019
##### Bugfixes
  * fix newline handling in spoolfiles

##### Livestatus
  * add new columns: service.parents, service.depends_notify, service.depends_exec,
    host.depends_notify, host.depends_exec


#### 1.0.9 - 18 Dec 2018
##### Features
  * Add host_down_disable_service_checks config option
  * Add retained_scheduling_randomize_window setting

##### Changed
  * No on-demand host checks when service is in hard critical
  * Log successful save of retention data
  * Init: Increase time till SIGKILL is sent

##### Bugfixes
  * Make naemon-core depend on libnaemon
  * Add conflicts/replaces tags for naemon-tools
  * parse_check: Don't escape already escaped newlines
  * Reload: Fix defuct for debian/ubuntu packaging (#150)
  * Retain next_check schedule on restart (#156, 224)
  * el6: use correct logrotate script
  * fix pending dependencies
  * fix orphaned checks logic
  * reset is_executing flag when processing active host check result (#154)
  * set CHECK_OPTION_ORPHAN_CHECK flag if check is scheduled from the orphan event handler
  * fix memory leak when overriding checks
  * fix query handler not returning command response
  * Fix heap corruption when callback dereigsters itself

##### Livestatus

  * make listen() backlog adjustable with 'max_backlog' option
  * pass errors from the query handler back to the client
  * report command errors back via livestatus COMMAND requests


#### 1.0.8 - 16 Jul 2018
##### Features
  * source defaults file if exists (#241)

##### Changed
  * _nothing_

##### Bugfixes
  * Fix naemon-tools conflict (#242)
  * Fix reload command on el6 (#239)


#### 1.0.7 - 01 Jun 2018
##### Features
  * Allow circular dependencies in Naemons host graph (experimental)

##### Changed
  * Do not verify config when starting daemon
  * first_notification_delay starts on last hard change instead of last ok

##### Bugfixes
  * Fix various memory leaks (#200, #189)
  * Fix newline escaping for check results (#153)
  * Fix segfault when there is no eventbroker
  * Fix segfault on invalid host_notification_commands (#213)
  * Fix external command CHANGE_SVC_MODATTR (#174)
  * Fix compilation with GCC 7 & 8 (#184, #228, #229)
  * Fix notification is sent even if a service is in a schedule flexible downtime
  * Fix triggered scheduled downtime is removed
  * Fix downtime comment ids increment on reload
  * Output an error exit code if daemonization fails instead OK
  * Restart Naemon on SIGHUP instead of killing (#192)
  * Fix Naemon killing wrong processes if PID wrap-around is too short (#211)
  * Reload: fix defunct processes after reload (#150)
  * Fix quoting in systemd startpre command (#204)
  * Make systemd startup cleaner
  * Fix logrotate on EL7
  * Do not use errno set by function calls in a library
  * Documentation fix for Sticky Acknowledgments
  * Make nm_g_log_handler_id extern. Fixes issue when including logging.h in external modules

##### Removed
  * shadownaemon
  * distributed-monitoring from the contrib/eventhandlers folder

##### Other
  * Decouple core, livestatus and thruk
  * Add more timing points
  * Undeprecate check_result_path
  * Remove NICE from systemd
  * Format service timeout print to use the same format as host timeouts (#168)
  * Lower wproc log level to debug_info
  * Do not log timeouts 3 times for every timeout
  * Add log message that explains why a service changes directly hard down state when the host is down
  * make buildopts.h depend on Makefile
  * version: append date to daily git builds

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
