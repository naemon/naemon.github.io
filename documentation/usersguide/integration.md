---
layout: doctoc
title: Integration Overview
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="extcommands.html">External Commands</a>, <a href="passivechecks.html">Passive Checks</a>, <a href="eventhandlers.html">Event Handlers</a>, <a href="plugins.html">Plugins</a>

### Introduction

One of the reasons that Naemon is such a popular monitoring application is the fact that it can be easily integrated in your existing infrastructure.  There are several methods of integrating Naemon with the management software you're already using and you can monitor almost any type of new or custom hardware, service, or application that you might have.

### Integration Points

<img src="images/integrationoverview.png" border="0" style="float: right;" alt="Integration Overview" title="Integration Overview">

To monitor new hardware, services, or applications, check out the docs on:

<ul>
<li><a href="plugins.html">Plugins</a></li>
<li><a href="pluginapi.html">Plugin API</a></li>
<li><a href="passivechecks.html">Passive Checks</a></li>
<li><a href="eventhandlers.html">Event Handlers</a></li>
</ul>

To get data into Naemon from external applications, check out the docs on:

<ul>
<li><a href="passivechecks.html">Passive Checks</a></li>
<li><a href="extcommands.html">External Commands</a></li>
</ul>

To send status, performance, or notification information from Naemon to external applications, check out the docs on:

<ul>
<li><a href="eventhandlers.html">Event Handlers</a></li>
<li><a href="configmain.html#ocsp_command">OCSP</a> and <a href="configmain.html#ochp_command">OCHP</a> Commands</li>
<li><a href="perfdata.html">Performance Data</a></li>
<li><a href="notifications.html">Notifications</a></li>
</ul>

### Integration Examples

I've documented some examples on how to integrate Naemon with external applications:

<ul>
<li><a href="int-tcpwrappers.html">TCP Wrappers</a> (security alerts)</li>
<li><a href="int-snmptrap.html">SNMP Traps</a> (Arcserve backup job status)</li>
</ul>
