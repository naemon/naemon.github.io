---
layout: doctoc
title: About Naemon
---

{% include review_required.md %}

### Naemon Overview

More information about Naemon - including features and technical specifications can be found online at <a href="http://naemon.org" target="_blank"><b>naemon.org</b></a>.

### What Is Naemon?

Naemon is an Open Source system and network monitoring application.  It watches hosts and services that you specify, alerting you when things go bad and when they get better. Naemon is the general term of the entire "Naemon Suite" that consist of two different parts, Naemon Core and <a href="http://thruk.org" target="_blank">Thruk Monitoring Webinterface</a>

Naemon is based on Nagios 4.0.2 and aimes to be a drop replacement for Nagios

Some of the many features of Naemon include:

* Monitoring of network services (SMTP, POP3, HTTP, NNTP, PING, etc.)
* Monitoring of host resources (processor load, disk usage, etc.)
* Simple plugin design that allows users to easily develop their own service checks
* Parallelized service checks
* Thruk Monitoring Webinterface to edit settings and view current network status, problem history, log files, etc.
* Ability to define network host hierarchy using "parent" hosts, allowing detection of and distinction between hosts that are down and those that are unreachable
* Contact notifications when service or host problems occur and get resolved (via email, pager, or user-defined method)
* Ability to define event handlers to be run during service or host events for proactive problem resolution
* Automatic log file rotation
* Support for implementing redundant monitoring hosts

### System Requirements

The only requirement of running Naemon is a machine running Linux (or UNIX variant) that has network access and a C compiler installed (if installing from source code).

You are <i>not required</i> to use the CGIs included with Naemon.  However, if you do decide to use them, you will need to have the following software installed...

* A web server (preferrably <a href="http://www.apache.org" target="_top">Apache</a>)
* Thomas Boutell's <a href="http://www.boutell.com/gd">gd library</a> version 1.6.3 or higher (required by the <a href="cgis.html#statusmap_cgi">statusmap</a> and <a href="cgis.html#trends_cgi">trends</a> CGIs)

### Licensing

Naemon Core is licensed under the terms of the <a href="http://www.gnu.org/copyleft/gpl.html">GNU General Public License</a> Version 2 as published by the <a href="http://www.fsf.org">Free Software Foundation</a>.  This gives you legal permission to copy, distribute and/or modify Naemon under certain conditions.  Read the 'LICENSE' file in the Naemon distribution or read the <a href="http://www.gnu.org/copyleft/gpl.html">online version of the license</a> for more details.

Naemon Core is provided AS IS with NO WARRANTY OF ANY KIND, INCLUDING THE WARRANTY OF DESIGN, MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE.

### Acknowledgements

Several people have contributed to Naemon by either reporting bugs, suggesting improvements, writing plugins, etc.  A list of some of the many contributors to the development of Naemon Core can be found in the THANKS file in the root of the Naemon Core distribution.

## Downloading The Latest Version

You can check for new versions of Naemon at <a href="http://naemon.org/download" target="_top">http://naemon.org/download</a>.
