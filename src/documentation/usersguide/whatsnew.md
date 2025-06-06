# What's New

## Known Issues

All known issues for Naemon are tracked on Github.

- Naemon Core: [https://github.com/naemon/naemon-core/issues](https://github.com/naemon/naemon-core/issues)
- Naemon Livestatus: [https://github.com/naemon/naemon-livestatus/issues](https://github.com/naemon/naemon-livestatus/issues)
- Naemon Website: [https://github.com/naemon/naemon.github.io/issues](https://github.com/naemon/naemon.github.io/issues)
- Naemon Packaging: [https://github.com/naemon/naemon/issues](https://github.com/naemon/naemon/issues)

## Upcoming next release

See upcoming changes from the next version on [Github](https://github.com/naemon/naemon-core/blob/master/NEWS)


## Changelog

### 1.4.4 - Jun 03 2025
#### Features
- trim spaces from list of templates
- add support for configurable relative configuration paths
- postpone check until check period starts

#### Changed
- make ascii control characters in object names illegal
- improve config parser performance
- launch command worker earlier
- remove backslashes before semicolons
- trim whitespace at end of plugin output

#### Bugfixes
- fix handling performance data

#### Livestatus
- add more columns to `downtimes_with_info` and `comments_with_info`
- add support for configurable relative paths
- improve generic error message
- fix 32bit response size limit
- improve shutdown during log queries
- fix unix timestamps beyond 2038
- fix error message on unknown filter

---

### 1.4.3 - Nov 19 2024
#### Features
 - add global notifications handler
 - add external command to add log entries
 - add hint of previous object when duplicate detection fails
 - add options to keep services running as long as they are up
 - add problem timestamps and duration

#### Changed
- clean up output of `naemon -V`
- change problem_id and notification_id to uuids
- change service parents suppressing only normal notifcations

#### Bugfixes
- fix leaking object.cache file references
- fix host not being in hard state with max_check_attempts=1
- throw config errors if boolean values cannot be parsed
- fix retrieving comments after deleting first
- fix rpm installation race condition
- fix resetting modified_attributes

#### Livestatus
- add support for new log types HOST/SERVICE NOTE
- improve performance on logs table
- fix crash on core reload
- fix crash when requesting invalid table names
- fix crash if stats queries errors halfway
- fix crash on stats queries on the logs table

---

### 1.4.2 - 04 Jan 2024
#### Features
- remove size limit on external command argument length
- performance improvements when having lots of comments
- respawn dead core worker

#### Changed
- write objects.precache into a tmp file first
- increased CURRENT_NEB_API_VERSION to 6 (neb modules need to be rebuild)

#### Bugfixes
- fix build error on fedora
- fix latency calculation having negative value sometimes

#### Livestatus
- contacts: add host/service_notification_commands column
- contacts: add groups column
- do not print error message if client dissconects
- avoid Cannot delete non-existing downtime/comment error during startup
- fix too low thread stacksize
- reopen logfile if cores last_log_rotation changed

---

### 1.4.1 - 01 Feb 2023
#### Features
- None

#### Changed
- Use /run/naemon instead of /var/run/naemon

#### Bugfixes
- Fix bashisms in scripts
- Fix fg: no job control output
- Fix memory leak in cmd parser
- Fix closing worker filehandles

#### Livestatus
- Fix service parents to be always a list of host,service tupels
- Fix g_tree_foreach: assertion `tree != NULL' in logs table

---

### 1.4.0 - 11 Nov 2022
#### Breaking Changes:
- Due to object structure changes, it is recommended to recompile any
    NEB mobules when upgrading to 1.4.0

#### Features
- Support for expiring acknowledgments

#### Changed
- Improvements to Debian packaging, including multiarch installs

#### Bugfixes
- Fix a crash for external command: CHANGE_CONTACT_HOST_NOTIFICATION_TIMEPERIOD
- Fix a crash for external command: CHANGE_HOST_CHECK_TIMEPERIOD

#### Livestatus
- Allow multiline output when submitting passive checks by allowing escaped newlines

---

### 1.3.1 - 22 Apr 2022
#### Changed
- change homepage url to https://www.naemon.io

#### Bugfixes
- fix running commands containing tilde sign
- improve updating last_update attribute

#### Livestatus
- make Python API compatible with Python 2 & 3

---


### 1.3.0 - 03 Nov 2021
#### Features
- add vault macro neb broker API
- set environment variables in a more secure way

#### Livestatus
- fix reload issue when using tcp listener
- fix contacts listed multiple times

---


### 1.2.4 - 03 Mar 2021
#### Changes
- improve config check when having lots of servicegroups
- change header file location in deb/rpm packages

#### Bugfixes
- Fix check_command in svc neb broker call

#### Livestatus
- improve contacts column performance

---


### 1.2.3 - 07 Dec 2020
#### Bugfixes
- fix package update on debian / ubuntu

---

### 1.2.2 - 13 Nov 2020
#### Changes
- improved sample configuration
- improved external command help
- debian package source format changed
- debian packages changed to systemd

#### Bugfixes
- fix scheduling flexible service downtime
- fix setting last_update whenever next_check changes
- fix worker crashing

#### Livestatus
- improved table descriptions
- debian packages switched to systemd invoke
- debian packages source format changed

---

### 1.2.1 - 13 Jul 2020
#### Bugfixes
- fix executing commands with pipes
- fix external command to remove downtimes by filter

#### Livestatus
- Increase max_response_size default to 500 MiB

---

### 1.2.0 - 17 Feb 2020
#### Features
- Add new skip check options to set a particular state on skipped checks
- CentOS 8 support

#### Bugfixes
- Retain flap detection option over restarts
- Don't process perfdata file if perfdata is disabled

#### Livestatus
- Add support for TCP sockets with the inet_addr option
- Add support for the statehist table, to calulate and query availability data
- Fix logging during argument parsing
- Fix deadlock when querying comments/downtimes

---


### 1.1.0 - 02 Sep 2019
#### Features
- add internal last_update timestamp to track host/service changes
- speed up configuration check when using lots of dependencies

#### Changed
- increased CURRENT_NEB_API_VERSION, this means you have to recompile your NEB modules

#### Bugfixes
- bail out config check if parent host cannot be resolved
- bail out config check if group members cannot be resolved (#300)
- fix calculating group on demand macros
- fix last_hard_state when using neb modules (#287)
- fix loading neb modules multiple times

#### Livestatus
- add new columns last_update to host and services
- send error when result set would be too large
- fix issue when reloading while processing a long query
- fix issue when parsing incomplete log entries
- fix issue with accessing downtimes and comments

---

### 1.0.10 - 19 Mar 2019
#### Bugfixes
- fix newline handling in spoolfiles

#### Livestatus
- add new columns: service.parents, service.depends_notify, service.depends_exec,
    host.depends_notify, host.depends_exec

---

### 1.0.9 - 18 Dec 2018
#### Features
- Add host_down_disable_service_checks config option
- Add retained_scheduling_randomize_window setting

#### Changed
- No on-demand host checks when service is in hard critical
- Log successful save of retention data
- Init: Increase time till SIGKILL is sent

#### Bugfixes
- Make naemon-core depend on libnaemon
- Add conflicts/replaces tags for naemon-tools
- parse_check: Don't escape already escaped newlines
- Reload: Fix defuct for debian/ubuntu packaging (#150)
- Retain next_check schedule on restart (#156, 224)
- el6: use correct logrotate script
- fix pending dependencies
- fix orphaned checks logic
- reset is_executing flag when processing active host check result (#154)
- set CHECK_OPTION_ORPHAN_CHECK flag if check is scheduled from the orphan event handler
- fix memory leak when overriding checks
- fix query handler not returning command response
- Fix heap corruption when callback dereigsters itself

#### Livestatus

- make listen() backlog adjustable with 'max_backlog' option
- pass errors from the query handler back to the client
- report command errors back via livestatus COMMAND requests

---

### 1.0.8 - 16 Jul 2018
#### Features
- source defaults file if exists (#241)

#### Changed
- _nothing_

#### Bugfixes
- Fix naemon-tools conflict (#242)
- Fix reload command on el6 (#239)

---


### 1.0.7 - 01 Jun 2018
#### Features
- Allow circular dependencies in Naemons host graph (experimental)

#### Changed
- Do not verify config when starting daemon
- first_notification_delay starts on last hard change instead of last ok

#### Bugfixes
- Fix various memory leaks (#200, #189)
- Fix newline escaping for check results (#153)
- Fix segfault when there is no eventbroker
- Fix segfault on invalid host_notification_commands (#213)
- Fix external command CHANGE_SVC_MODATTR (#174)
- Fix compilation with GCC 7 & 8 (#184, #228, #229)
- Fix notification is sent even if a service is in a schedule flexible downtime
- Fix triggered scheduled downtime is removed
- Fix downtime comment ids increment on reload
- Output an error exit code if daemonization fails instead OK
- Restart Naemon on SIGHUP instead of killing (#192)
- Fix Naemon killing wrong processes if PID wrap-around is too short (#211)
- Reload: fix defunct processes after reload (#150)
- Fix quoting in systemd startpre command (#204)
- Make systemd startup cleaner
- Fix logrotate on EL7
- Do not use errno set by function calls in a library
- Documentation fix for Sticky Acknowledgments
- Make nm_g_log_handler_id extern. Fixes issue when including logging.h in external modules

#### Removed
- shadownaemon
- distributed-monitoring from the contrib/eventhandlers folder

#### Other
- Decouple core, livestatus and thruk
- Add more timing points
- Undeprecate check_result_path
- Remove NICE from systemd
- Format service timeout print to use the same format as host timeouts (#168)
- Lower wproc log level to debug_info
- Do not log timeouts 3 times for every timeout
- Add log message that explains why a service changes directly hard down state when the host is down
- make buildopts.h depend on Makefile
- version: append date to daily git builds

---

### 1.0.6 - 23 Jan 2017
#### Bugfixes
- Fix CVE-2016-9566 by removing drop_privileges. Note: naemon cannot be started as root anymore.
- Fix shell command parsing for some special cases when defining environment variables in a command
- Fix custom variables persistence accros restarts for single byte values
- Fix writing to already rotated logfile
- Fix memory leak in broker_notification_data
- Fix notification commands beeing reaped to early (#137)

---

### 1.0.5 - 21 Jun 2016
#### Bugfixes
- Fix segfault when trying to log to null pointer (#140)
- Fix naemon exiting on USR1 signal (#138, #139)

---

### 1.0.4 - 03 Jun 2016
#### Features
- Downtimes can now be scheduled to start before their time of their scheduling
- Naemon can now start without any configured objects
- Add new NEB callback API version with better support for communicating
    cancellation and override reasons
- Naemon now consistently logs when a notification is suppressed, along with
    the reason why (very useful for troubleshooting notification issues!). This
    feature is enabled by default, and can be overridden by setting
    enable_notification_suppression_reason_logging=0 in naemon.cfg.
- Scheduling logic completely overhauled to not depend on wallclock time,
    which makes it much more reliable (no more lost or orphaned events!)
- It is now possible to disable status data updates completely
    (status_update_interval=0)
- GLib messages are now logged to the regular outputs.

#### Bugfixes
- Fix segfault which would happen when a plugin's output is one or more
    newlines only
- Shadownaemon: fix segfault if plugin output contains csv separator
- Fix an ancient bug where reconstructing a downtime from retention data
    would result in double downtime alerts being emitted
- Fix another ancient race condition where a rapidly reload and starting
    naemon would leave you with two instances running
- Stop logging if check_result_path (deprecated) is not available even
    if it's set
- Strings in retention data are now properly escaped, fixing various bugs
- Various init script fixes
- Fix a race condition that would sometimes lead to complete deadlock
- Fix a bug where Naemon would allow duplicate objects to be created
- Replace in-tree (ha-ha) rbtree with GLib's GTree, to get rid of incorrect
    node removal behaviour in the former
- Fix a race condition that would sometimes occur during a reload
- Fix a bug in signal handling code which would sometimes cause the command
    file worker to become defunct
- Fix a bug where the specified retry_interval of a service or host
    would not be properly respected, and the check_interval would be used instead
- Fix a potential crash (segfault) when freeing parent/child references
- Fix a bug where "stale" objects would only have one freshness check executed
- Fix improper handling of CHECK_OPTION_FORCE_EXECUTION, which would lead to
    checks not being run, despite being forcibly scheduled
- Fix a bug where Naemon wouldn't properly initialize its lock file, but
    start regardless

#### Other
- Grafted Nagios git history onto Naemon's for easier code archeology
- Lots of code cleanup, typo fixes, new test cases, new assertions &
    error handling, fixed memory leaks, logging and refactoring
- Removed an undocumented, experimental, untested "load control" feature
- Decoupled Thruk packages, we now use the official upstream Thruk packages

#### New contributors
- Carl Helmertz (chelmertz@op5.com)
- Emil Hessman (emil@hessman.se)
- Robin Hagman (rhagman@op5.com)
- Philip Eklöf (peklof@op5.com)
- Simen Aasland (simen@opera.com)
- Tobias Sjöndin (tsjondin@op5.com)

---


### 1.0.3 - 29 Mar 2015
#### Bugfixes
- shadownaemon: fix request counter

---

### 1.0.2 - 28 Mar 2015
#### Bugfixes
- shadownaemon: remove external commands from shadownaemon (#104)
- shadownaemon: propagate last_hard_- values (Michael Kraus)

---

### 1.0.0 - 13 Feb 2015
#### Bugfixes
- Fix shadownaemon comment and downtime synchronization
- Fix spelling errors

---

### 0.9.1 - 8 Jan 2015
#### Code Contributors
- Robin Sonefors
- Sven Nierlein
- Andreas Ericsson
- Anton Lofgren
- Max Sikström
- Ricardo Maraschini
- Andreas Boesl
- Mathias Kettner
- Sebastian Hahn
- Daniel Wittenberg
- Johan Ryberg
- Franky Van Liedekerke
- Julian Brost
- Mikael Falkvidd
- Sven Velt

#### Features
- The config option include_dir allows you to specify a dropdir
   where main configuration files can be read from. This should
   help module authors quite a bit.
- We now have pkgconfig support, making it easier to create
   build- and install systems for modules.

#### Bugfixes
- Workers are now prevented from becoming zombies
- Workers should be choked far less often
- Check scheduling will now always be consistently done
- Checks should clump up a lot less, keeping system load smoother
- Several crash-on-close with corner-case configurations are fixed
- Several small memory leaks are fixed
- Check output should no longer be lost unless the kernel drops it
   due to out-of-memory errors
- We will now always shut down fairly gracefully on OOM errors
- Workers should no longer cause zombies to appear
- Several fixes have been made to make building on OSX work
   better
- Submitting passive check results for in-flight active checks
   will no longer cause crashes

---

### 0.8 - 14 Feb 2014

- Based on nagios 4.0.2
- Rename a lot of things, replace build system, etc.
- The CGIs are gone- use Thruk instead.
- Remove the upstream version check- use your package manager instead.
- New NEB callback, NEBATTR_CHECK_ALERT, when a check generates an alert.
- Allow contactgroups without members but having contactgroup_members.
- No longer spam Naemon log when checks time out.
- All positive values for ACKNOWLEDGE_{HOST,CHECK} means TRUE.
- Check output parsing rewritten.
  - Fixes crashes, bugs, and improves performance.
- Log rotation is done by logrotate instead of in-core log rotation.
- Fix misc crashes, speed up misc areas, and other bug fixes.
