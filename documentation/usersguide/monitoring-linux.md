---
layout: doctoc
title: Monitoring Linux/Unix Machines
---

{% include review_required.md %}


<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="quickstart.html">Quickstart Installation Guide</a>, <a href="monitoring-networkservices.html">Monitoring Publicly Available Services</a>

### Introduction

This document describes how you can monitor "private" services and attributes of Linux/UNIX servers, such as:

<ul>
<li>CPU load</li>
<li>Memory usage</li>
<li>Disk usage</li>
<li>Logged in users</li>
<li>Running processes</li>
<li>etc.</li>
</ul>

Publicly available services that are provided by Linux servers (HTTP, FTP, SSH, SMTP, etc.) can be monitored easily by following the documentation on <a href="monitoring-networkservices.html">monitoring network services</a>.

{{ site.note }}These instructions assume that you've installed Naemon according to the <a href="quickstart.html">quickstart guide</a>.{{ site.end }}

The sample configuration entries below reference objects that are defined in the sample config files (<i>commands.cfg</i>, <i>templates.cfg</i>, etc.) that are installed if you follow the quickstart.

### Overview

{{ site.note }}This document has not been completed. I would recommend you read the documentation on the <a href="addons.html#nrpe">NRPE addon</a> for instructions on how to monitor a remote Linux/Unix server.{{ site.end }}

There are several different ways to monitor attributes or remote Linux/Unix servers.  One is by using shared SSH keys and the <i>check_by_ssh</i> plugin to execute plugins on remote servers.  This method will not be covered here, but can result in high load on your monitoring server if you are monitoring hundreds or thousands of services.  The overhead of setting up/destroying SSH connections is the cause of this.

<img src="images/nrpe.png" border="0" alt="NRPE" title="NRPE" style="float: right; clear: both;">

Another common method of monitoring remote Linux/Unix hosts is to use the <a href="addons.html#nrpe">NRPE addon</a>.  NRPE  allows you to execute plugins on remote Linux/Unix hosts.  This is useful if you need to monitor local resources/attributes like disk usage, CPU load, memory usage, etc. on a remote host.
