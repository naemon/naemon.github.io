---
layout: doctoc
title: Nagios Addons
---
### Introduction

There are a lot of "addon" software packages that are available for Nagios.  Addons can be used to extend Nagios' functionality or integrate Nagios with other applications.

Addons are available for:

* Managing the config files through a web interface
* Monitoring remote hosts (*NIX, Windows, etc.)
* Submitting passive checks from remote hosts
* Simplifying/extending the notification logic
* ...and much more

You can find many addons for Nagios by visiting:

* <a href="http://www.nagios.org/">Nagios.org</a>
* <a href="http://www.sourceforge.net">SourceForge.net</a>
* <a href="http://www.nagiosexchange.org">NagiosExchange.org</a>

I'll give a brief introduction to a few of the addons that I've developed for Nagios...

### NRPE

<img src="/images/nrpe.png" border="0" alt="NRPE" title="NRPE" style="float: right; padding: 0 0 0 10px;">

NRPE is an addon that allows you to execute <a href="plugins.html">plugins</a> on remote Linux/Unix hosts.  This is useful if you need to monitor local resources/attributes like disk usage, CPU load, memory usage, etc. on a remote host.  Similiar functionality can be accomplished by using the *check_by_ssh* plugin, although it can impose a higher CPU load on the monitoring machine - especially if you are monitoring hundreds or thousands of hosts.

The NRPE addon and documentation can be found at <a href="http://www.nagios.org/">http://www.nagios.org/</a>.

### NSCA

<img src="/images/nsca.png" border="0" alt="NSCA" title="NSCA" style="float: right; padding: 0 0 0 10px;">

NSCA is an addon that allows you to send <a href="passivechecks.html">passive check</a> results from remote Linux/Unix hosts to the Nagios daemon running on the monitoring server.  This is very useful in <a href="distributed.html">distributed</a> and <a href="redundancy.html">redundant/failover</a> monitoring setups.

The NSCA addon can be found at <a href="http://www.nagios.org/">http://www.nagios.org/</a>.

### NDOUtils

<img src="/images/ndoutils.png" border="0" alt="NDOUtils" title="NDOUtils" style="float: right; padding: 0 0 0 10px;">

NDOUtils is an addon that allows you to store all status information from Nagios in a MySQL database.  Multiple instances of Nagios can all store their information in a central database for centralized reporting.  This will likely serve as the basis for a new PHP-based web interface for Nagios in the future.

The NDOUtils addon and documentation can be found at <a href="http://www.nagios.org/">http://www.nagios.org/</a>.

### Nagios Exchange - Hundreds of Other Addons

<a href="http://exchange.nagios.org/" target="_blank"><img src="/images/nagiosexchange.png" border="0" alt="Nagios Exchange" title="Nagios Exchange" style="float: right; padding: 0 0 0 10px;"></a>

Hundreds of community-developed Nagios addons can be found on the Nagios Exchange website at <a href="http://exchange.nagios.org" target="_blank">exchange.nagios.org</a>.
