---
layout: doctoc
title: Addons
---

### Introduction

There are a lot of "addon" software packages that are available for Naemon. Addons can be used to extend Naemons functionality or integrate Naemon with other applications.

Addons are available for:

* Managing the config files through a web interface
* Monitoring remote hosts (*NIX, Windows, etc.)
* Submitting passive checks from remote hosts
* Simplifying/extending the notification logic
* ...and much more

You can find many addons for Naemon by visiting:

* <a href="http://www.monitoringexchange.org/">MonitoringExchange.org</a>
* <a href="http://www.nagiosexchange.org">NagiosExchange.org</a>

I'll give a brief introduction to a few of the addons for Naemon...


### Thruk
Thruk is the default GUI for Naemon and has <a href="http://thruk.org/documentation.html">its own documentation</a>.
It uses the Livestatus API to retrieve the content.


### Livestatus
Livestatus is one of the standard APIs in Naemon.
A <a href="livestatus.html">detailed description</a> is available on a dedicated page.


### NRPE

<img src="images/nrpe.png" border="0" alt="NRPE" title="NRPE" style="float: right; padding: 0 0 0 10px;">

NRPE is an addon that allows you to execute <a href="plugins.html">plugins</a> on remote Linux/Unix hosts.
This is useful if you need to monitor local resources/attributes like disk usage, CPU load, memory usage,
etc. on a remote host. Similar functionality can be accomplished by using the *check_by_ssh* plugin, although
it can impose a higher CPU load on the monitoring machine - especially if you are monitoring hundreds or thousands of hosts.

The NRPE addon and documentation can be found at <a href="http://www.nagios.org/">http://www.nagios.org/</a>.



### NSCA

<img src="images/nsca.png" border="0" alt="NSCA" title="NSCA" style="float: right; padding: 0 0 0 10px;">

NSCA is an addon that allows you to send <a href="passivechecks.html">passive check</a> results from remote Linux/Unix
hosts to the Naemon running on the monitoring server.

The NSCA addon can be found at <a href="http://www.nagios.org/">http://www.nagios.org/</a>.



### NDOUtils

{{ site.warn }}
NDOUtils are only compatible up to Naemon version 1.0.3. For a drop in replacement use <a href="#statusengine_2">Statusengine 2</a>.
{{ site.end }}

<img src="images/ndoutils.png" border="0" alt="NDOUtils" title="NDOUtils" style="float: right; padding: 0 0 0 10px;">

NDOUtils is an addon that allows you to store all status information from Naemon in a MySQL database.
Multiple instances of Naemon can all store their information in a central database for centralized reporting.

The NDOUtils addon and documentation can be found at <a href="http://www.nagios.org/">http://www.nagios.org/</a>.



### Statusengine 2
Statusengine 2 is a drop in replacemen for <a href="#ndoutils">NDOUtils</a>.

It is build on a worker concept to scale with a growing workload. Statusenigne will save all events to a MySQL database, can export performance data
to RRDtool (compatible to <a href="#pnp">PNP</a>) and Graphite and also comes with a responsive web frontend.

Details can be found on <a href="https://statusengine.org/oldstable/">https://statusengine.org/oldstable/</a>



### Statusengine 3
Statusengine 3 provide an easy way to scale Naemon monitoring across multiple nodes.

It is based on a worker concept and use a in memory queue to
prevent Naemon core to crash or slow down, even if the database backend is gone.

Statusengine 3 can save status records to MySQL, CrateDB or Redis.
Performance data can be exported to Graphite, Elasticsearch, MySQL or CrateDB.

Statusengine UI is an responsive web frontend build on top of a JSON API.

Details can be found on <a href="https://statusengine.org/">https://statusengine.org</a>

### PNP
<a href="images/pnp4nagios-example1.png"><img src="images/pnp4nagios-example1.png" border="0" hspace="10" width="30%" height="30%" alt="pnp4nagios example with Naemon" title="pnp4nagios example with Naemon" style="float: right;"></a>

PNP is a graphing addon. For installation step by step help see <a href="addon-pnp-quickstart.html">Addon PNP4Nagios Quickstart</a>

Author website can be found here: <a href="http://pnp4nagios.org">pnp4nagios.org</a>



### Merlin
Merlin is a addon for distributed monitoring. Details can be found in <a href="https://docs.itrsgroup.com/docs/op5-monitor/7.5.0/topics/admin-manual/scalable-monitoring/merlin.html">ITRS OP5 Monitor manual</a>.



### Mod-Gearman
Mod-Gearman is a addon for distributed monitoring. Details can be found on <a href="http://mod-gearman.org">mod-gearman.org</a>



### OMD
OMD (Open Monitoring Distribution) is not really an addon, but it comes bundled with
Naemon. OMD is a single linux package (rpm/deb) which installs Naemon with a couple of
common addons. Naemon is currently bundled in the OMD-NC version, which is available
via the <a href="https://labs.consol.de/repo/testing">Testing Consol* Labs Repository</a>.



### others
There are lots of addons for Nagios and Naemon. Most Nagios addons should be 1:1 compatible with Naemon.
You might have to adjust some paths and users, but as both share a lot of code, most addons and plugins
should just work.
