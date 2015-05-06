---
layout: doctoc
title: TCP Wrapper Integration
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="integration.html">Integration Overview</a>, <a href="extcommands.html">External Commands</a>, <a href="passivechecks.html">Passive Checks</a>

### Introduction

<img src="images/tcpwrappers.png" border="0" style="float: right;" alt="TCP Wrappers" title="TCP Wrappers">

This document explains how to easily generate alerts in Naemon for connection attempts that are rejected by TCP wrappers.  For example, if an unauthorized host attempts to connect to your SSH server, you can receive an alert in Naemon that contains the name of the host that was rejected.  If you implement this on your Linux/Unix boxes, you'll be surprised how many port scans you can detect across your network.

These directions assume:

<ol>
<li>You are already familiar with <a href="passivechecks.html">passive checks</a> and how they work.</li>
<li>You are already familiar with <a href="volatileservices.html">volatile services</a> and how they work.</li>
<li>The host which you are generating alerts for (i.e. the host you are using TCP wrappers on) is a remote host (called <i>firestorm</i> in this example).  If you want to generate alerts on the same host that Naemon is running you will need to make a few modifications to the examples I provide.</li>
<li>You have installed the <a href="addons.html#nsca">NSCA daemon</a> on your monitoring server and the NSCA client (<i>send_nsca</i>) on the remote machine that you are generating TCP wrapper alerts from.</li>
</ol>

### Defining A Service

If you haven't done so already, create a <a href="objectdefinitions.html#">host definition</a> for the remote host (<i>firestorm</i>).

Next, define a service in one of your <a href="configobject.html">object configuration files</a> for the TCP wrapper alerts on host <i>firestorm</i>.  The service definition might look something like this:

<pre>
define service{
	host_name                       firestorm
	service_description             TCP Wrappers
	is_volatile                     1
	active_checks_enabled		0
	passive_checks_enabled		1
	max_check_attempts              1
	check_command                   check_none
	...
	}
</pre>

There are some important things to note about the above service definition:

<ol>
<li>The <i>volatile</i> option enabled.  We want this option enabled because we want a notification to be generated for every alert that comes in.</li>
<li>Active checks of the service as disabled, while passive checks are enabled.  This means that the service will never be actively checked by Naemon - all alert information will have to be received passively from an external source.</li>
<li>The <i>max_check_attempts</i> value is set to 1.  This guarantees you will get a notification when the first alert is generated.</li>
</ol>

### Configuring TCP Wrappers

Now you're going to have to modify the <i>/etc/hosts.deny</i> file on <i>firestorm</i>.  In order to have the TCP wrappers send an alert to the monitoring host whenever a connection attempt is denied, you'll have to add a line similar to the following:

<pre>
ALL: ALL: RFC931: twist (/usr/lib/naemon/plugins/eventhandlers/handle_tcp_wrapper %h %d) &amp;
</pre>

This line assumes that there is a script called <i>handle_tcp_wrapper</i> in the <i>/usr/lib/naemon/plugins/eventhandlers/</i> directory on <i>firestorm</i>.  We'll write that script next.

### Writing The Script

The last thing you need to do is write the <i>handle_tcp_wrapper</i> script on <i>firestorm</i> that will send the alert back to the Naemon server.  It might look something like this:

<pre>
#!/bin/sh

/usr/lib/naemon/plugins/eventhandlers/submit_check_result firestorm "TCP Wrappers" 2 "Denied $2-$1" > /dev/null 2> /dev/null
</pre>

Notice that the <i>handle_tcp_wrapper</i> script calls the <i>submit_check_result</i> script to actually send the alert back to the monitoring host.  Assuming your Naemon server is called <i>monitor</i>, the <i>submit check_result</i> script might look like this:

<pre>
#!/bin/sh
# Arguments
#	$1 = name of host in service definition
#	$2 = name/description of service in service definition
#	$3 = return code
#	$4 = output

/bin/echo -e "$1\t$2\t$3\t$4\n" | /usr/local/nagios/bin/send_nsca monitor -c /usr/local/nagios/etc/send_nsca.cfg
</pre>

### Finishing Up

You've now configured everything you need to, so all you have to do is restart the <i>inetd</i> process on <i>firestorm</i> and restart Naemon on your monitoring server.  That's it!  When the TCP wrappers on <i>firestorm</i> deny a connection attempt, you should be getting alerts in Naemon.  The plugin output for the alert will look something like the following:

<pre>
Denied sshd2-sdn-ar-002mnminnP321.dialsprint.net
</pre>
