---
layout: doctoc
title: What's New
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="knownissues.html">Known Issues</a>

<a name="changelog"></a>

### Change Log

See upcoming changes from the next version on [github](https://github.com/naemon/naemon-core/blob/master/NEWS)

### Changes and New Features

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
