---
layout: doctoc
title: Monitoring Network Printers
---

{% include review_required.md %}


<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="monitoring-networkservices.html">Monitoring network services</a>

### Introduction

<img src="images/printer.png" border="0" style="float: right" alt="Printer">

This document describes how you can monitor the status of networked printers.  Specifically, HP printers that have internal/external JetDirect cards/devices, or other print servers (like the Troy PocketPro 100S or the Netgear PS101) that support the JetDirect protocol.

The <i>check_hpjd</i> plugin (which is part of the standard Naemon plugins distribution) allows you to monitor the status of JetDirect-capable printers which have SNMP enabled.  The plugin is capable of detecting the following printer states:

<ul>
<li>Paper Jam</li>
<li>Out of Paper</li>
<li>Printer Offline</li>
<li>Intervention Required</li>
<li>Toner Low</li>
<li>Insufficient Memory</li>
<li>Open Door</li>
<li>Output Tray is Full</li>
<li>and more...</li>
</ul>

{{ site.note }}These instructions assume that you've installed Naemon according to the <a href="quickstart.html">quickstart guide</a>.{{ site.end }}

The sample configuration entries below reference objects that are defined in the sample config files (<i>commands.cfg</i>, <i>templates.cfg</i>, etc.) that are installed if you follow the quickstart.

### Overview

<img src="images/monitoring-printers.png" border="0" alt="Monitoring a Network Printer" title="Monitoring a Network Printer" style="float: right;">

Monitoring the status of a networked printer is pretty simple.  JetDirect-enabled printers usually have SNMP enabled, which allows Naemon to monitor their status using the <i>check_hpjd</i> plugin.

The <i>check_hpjd</i> plugin will only get compiled and installed if you have the net-snmp and net-snmp-utils packages installed on your system.  Make sure the plugin exists in <i>/usr/local/nagios/libexec</i> before you continue.  If it doesn't, install net-snmp and net-snmp-utils and recompile/reinstall the Naemon plugins.

### Steps

There are several steps you'll need to follow in order to monitor a new network printer.  They are:

<ol>
<li>Perform first-time prerequisites</li>
<li>Create new host and service definitions for monitoring the printer</li>
<li>Restart the Naemon daemon</li>
</ol>

### What's Already Done For You

To make your life a bit easier, a few configuration tasks have already been done for you:

<ul>
<li>A <i>check_hpjd</i> command definition has been added to the <i>commands.cfg</i> file.  This allows you to use the <i>check_hpjd</i> plugin to monitor network printers.</li>
<li>A printer host template (called <i>generic-printer</i>) has already been created in the <i>templates.cfg</i> file.  This allows you to add new printer host definitions in a simple manner.</li>
</ul>

The above-mentioned config files can be found in the <i>/usr/local/nagios/etc/objects/</i> directory.  You can modify the definitions in these and other definitions to suit your needs better if you'd like.  However, I'd recommend waiting until you're more familiar with configuring Naemon before doing so.  For the time being, just follow the directions outlined below and you'll be monitoring your network printers in no time.

### Prerequisites

The first time you configure Naemon to monitor a network printer, you'll need to do a bit of extra work.  Remember, you only need to do this for the *first* printer you monitor.

Edit the main Naemon config file.

<pre>
vi /usr/local/nagios/etc/nagios.cfg
</pre>

Remove the leading pound (#) sign from the following line in the main configuration file:

<pre>
#cfg_file=/usr/local/nagios/etc/objects/printer.cfg
</pre>

Save the file and exit.

What did you just do?  You told Naemon to look to the <i>/usr/local/nagios/etc/objects/printer.cfg</i> to find additional object definitions.  That's where you'll be adding host and service definitions for the printer.  That configuration file already contains some sample host, hostgroup, and service definitions.  For the *first* printer you monitor, you can simply modify the sample host and service definitions in that file, rather than creating new ones.

### Configuring Naemon

You'll need to create some <a href="objectdefinitions.html">object definitions</a> in order to monitor a new printer.

Open the <i>printer.cfg</i> file for editing.

<pre>
vi /usr/local/nagios/etc/objects/printer.cfg
</pre>

Add a new <a href="objectdefinitions.html#host">host</a> definition for the networked printer that you're going to monitor.   If this is the *first* printer you're monitoring, you can simply modify the sample host definition in <i>printer.cfg</i>. Change the <i>host_name</i>, <i>alias</i>, and <i>address</i> fields to appropriate values for the printer.

<pre>
define host{
	use		generic-printer	; Inherit default values from a template
	host_name		hplj2605dn	; The name we're giving to this printer
	alias		HP LaserJet 2605dn	; A longer name associated with the printer
	address		192.168.1.30	; IP address of the printer
	hostgroups	allhosts		; Host groups this printer is associated with
	}
</pre>

Now you can add some service definitions (to the same configuration file) to monitor different aspects of the printer.  If this is the *first* printer you're monitoring, you can simply modify the sample service definition in <i>printer.cfg</i>.

{{ site.note }}Replace "<i>hplj2605dn</i>" in the example definitions below with the name you specified in the <i>host_name</i> directive of the host definition you just added.{{ site.end }}

Add the following service definition to check the status of the printer.  The service uses the <i>check_hpjd</i> plugin to check the status of the printer every 10 minutes by default.  The SNMP community string used to query the printer is "public" in this example.

<pre>
define service{
	use			generic-service		; Inherit values from a template
	host_name			hplj2605dn		; The name of the host the service is associated with
	service_description	Printer Status		; The service description
	check_command		check_hpjd!-C public	; The command used to monitor the service
	normal_check_interval	10	; Check the service every 10 minutes under normal conditions
	retry_check_interval	1	; Re-check the service every minute until its final/hard state is determined
	}
</pre>

Add the following service definition to ping the printer every 10 minutes by default.  This is useful for monitoring RTA, packet loss, and general network connectivity.

<pre>
define service{
        use                     generic-service
        host_name               hplj2605dn
        service_description     PING
        check_command           check_ping!3000.0,80%!5000.0,100%
        normal_check_interval   10
        retry_check_interval    1
        }
</pre>

Save the file.

### Restarting Naemon

Once you've added the new host and service definitions to the <i>printer.cfg</i> file, you're ready to start monitoring the printer.  To do this, you'll need to <a href="verifyconfig.html">verify your configuration</a> and <a href="startstop.html">restart Naemon</a>.

If the verification process produces any errors messages, fix your configuration file before continuing.  Make sure that you don't (re)start Naemon until the verification process completes without any errors!
