---
layout: doctoc
title: Monitoring Windows Machines
---

{% include review_required.md %}


<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="quickstart.html">Quickstart Installation Guide</a>, <a href="monitoring-networkservices.html">Monitoring network services</a>

### Introduction

This document describes how you can monitor "private" services and attributes of Windows machines, such as:

<ul>
<li>Memory usage</li>
<li>CPU load</li>
<li>Disk usage</li>
<li>Service states</li>
<li>Running processes</li>
<li>etc.</li>
</ul>

Publicly available services that are provided by Windows machines (HTTP, FTP, POP3, etc.) can be monitored easily by following the documentation on <a href="monitoring-networkservices.html">monitoring network services</a>.

{{ site.note }}These instructions assume that you've installed Naemon according to the <a href="quickstart.html">quickstart guide</a>.   The sample configuration entries below reference objects that are defined in the sample config files (<i>commands.cfg</i>, <i>templates.cfg</i>, etc.) that are installed if you follow the quickstart.{{ site.end }}

### Overview

<img src="images/monitoring-windows.png" border="0" alt="Monitoring a Windows Machine" title="Monitoring a Windows Machine" style="float: right;">

Monitoring private services or attributes of a Windows machine requires that you install an agent on it.  This agent acts as a proxy between the Naemon plugin that does the monitoring and the actual service or attribute of the Windows machine.  Without installing an agent on the Windows box, Naemon would be unable to monitor local services or attributes of the Windows box.

For this example, we will be installing the <a href="http://www.nsclient.org/">NSClient++</a> addon on the Windows machine and using the <i>check_nrpe</i> plugin to communicate with the NSClient++ addon. The <i>check_nrpe</i> plugin should already be installed on the Naemon server if you followed the quickstart guide.

### Steps

There are several steps you'll need to follow in order to monitor a new Windows machine.  They are:

<ol>
<li>Install a monitoring agent on the Windows machine</li>
<li>Create new host and service definitions for monitoring the Windows machine</li>
<li>Restart the Naemon daemon</li>
</ol>

### Installing the Windows Agent

Before you can begin monitoring local services and attributes of Windows machines, you'll need to install an agent on those machines.  I recommend using the NSClient++ addon, which can be found at <a href="http://www.nsclient.org">http://www.nsclient.org</a>.  These instructions will take you through a basic installation of the NSClient++ addon, as well as the configuration of Naemon for monitoring the Windows machine.

1.  Download the latest stable version of the NSClient++ addon from <a href="http://www.nsclient.org">http://www.nsclient.org</a>
1.  Install NSClient++, use the "Complete" setup type to make sure you got all features. 
  * "Check "Enable common check plugins"
  * "Enable NRPE server (check_nrpe)"
  * "Enable WMI checks".  
  NSClient++ should be installed as a service and started automaticly.
1.  Edit the nsclient.ini file (located in the C:\Program Files\NSClient++ directory) and make the following changes:

<ul>
<li>Uncomment all the modules listed in the [modules] section, except for CheckWMI.dll and RemoteConfiguration.dll</li>
<li>Optionally require a password for clients by changing the 'password' option in the [Settings] section.</li>
<li>Uncomment the 'allowed_hosts' option in the [Settings] section.  Add the IP address of the Naemon server to this line, or leave it blank to allow all hosts to connect.</li>
<li>Make sure the 'port' option in the [NSClient] section is uncommented and set to '12489' (the default port).</li>
</ul>

8. Start the NSClient++ service with the following command:

<pre>
	nsclient++ /start
</pre>

9. If installed properly, a new icon should appear in your system tray.  It will be a yellow circle with a black 'M' inside.

10. Success! The Windows server can now be added to the Naemon monitoring configuration...

### Configuring Naemon

Now it's time to define some <a href="objectdefinitions.html">object definitions</a> in your Naemon configuration files in order to monitor the new Windows machine.

Open the <i>windows.cfg</i> file for editing.

<pre>
vi /usr/local/nagios/etc/objects/windows.cfg
</pre>

Add a new <a href="objectdefinitions.html#host">host</a> definition for the Windows machine that you're going to monitor.   If this is the *first* Windows machine you're monitoring, you can simply modify the sample host definition in <i>windows.cfg</i>. Change the <i>host_name</i>, <i>alias</i>, and <i>address</i> fields to appropriate values for the Windows box.

<pre>
define host{
	use		windows-server	; Inherit default values from a Windows server template (make sure you keep this line!)
	host_name		winserver
	alias		My Windows Server
	address		192.168.1.2
	}
</pre>

Good. Now you can add some service definitions (to the same configuration file) in order to tell Naemon to monitor different aspects of the Windows machine.  If this is the *first* Windows machine you're monitoring, you can simply modify the sample service definitions in <i>windows.cfg</i>.

{{ site.note }}Replace "<i>winserver</i>" in the example definitions below with the name you specified in the <i>host_name</i> directive of the host definition you just added.{{ site.end }}

Add the following service definition to monitor the version of the NSClient++ addon that is running on the Windows server.  This is useful when it comes time to upgrade your Windows servers to a newer version of the addon, as you'll be able to tell which Windows machines still need to be upgraded to the latest version of NSClient++.

<pre>
define service{
	use			generic-service
	host_name			winserver
	service_description	NSClient++ Version
	check_command		check_nt!CLIENTVERSION
	}
</pre>

Add the following service definition to monitor the uptime of the Windows server.

<pre>
define service{
	use			generic-service
	host_name			winserver
	service_description	Uptime
	check_command		check_nt!UPTIME
	}
</pre>

Add the following service definition to monitor the CPU utilization on the Windows server and generate a CRITICAL alert if the 5-minute CPU load is 90% or more or a WARNING alert if the 5-minute load is 80% or greater.

<pre>
define service{
	use			generic-service
	host_name			winserver
	service_description	CPU Load
	check_command		check_nt!CPULOAD!-l 5,80,90
	}
</pre>

Add the following service definition to monitor memory usage on the Windows server and generate a CRITICAL alert if memory usage is 90% or more or a WARNING alert if memory usage is 80% or greater.

<pre>
define service{
	use			generic-service
	host_name			winserver
	service_description	Memory Usage
	check_command		check_nt!MEMUSE!-w 80 -c 90
	}
</pre>

Add the following service definition to monitor usage of the C:\ drive on the Windows server and generate a CRITICAL alert if disk usage is 90% or more or a WARNING alert if disk usage is 80% or greater.

<pre>
define service{
	use			generic-service
	host_name			winserver
	service_description	C:\ Drive Space
	check_command		check_nt!USEDDISKSPACE!-l c -w 80 -c 90
	}
</pre>

Add the following service definition to monitor the W3SVC service state on the Windows machine and generate a CRITICAL alert if the service is stopped.

<pre>
define service{
	use			generic-service
	host_name			winserver
	service_description	W3SVC
	check_command		check_nt!SERVICESTATE!-d SHOWALL -l W3SVC
	}
</pre>

Add the following service definition to monitor the Explorer.exe process on the Windows machine and generate a CRITICAL alert if the process is not running.

<pre>
define service{
	use			generic-service
	host_name			winserver
	service_description	Explorer
	check_command		check_nt!PROCSTATE!-d SHOWALL -l Explorer.exe
	}

</pre>

That's it for now.  You've added some basic services that should be monitored on the Windows box.  Save the configuration file.

### Password Protection

If you specified a password in the NSClient++ configuration file on the Windows machine, you'll need to modify the <i>check_nt</i> command definition to include the password.  Open the <i>commands.cfg</i> file for editing.

<pre>
vi /usr/local/nagios/etc/objects/commands.cfg
</pre>

Change the definition of the <i>check_nt</i> command to include the "-s &lt;PASSWORD&gt;" argument (where PASSWORD is the password you specified on the Windows machine) like this:

<pre>
define command{
	command_name	check_nt
	command_line	$USER1$/check_nt -H $HOSTADDRESS$ -p 12489 -s PASSWORD -v $ARG1$ $ARG2$
	}
</pre>

Save the file.

### Restarting Naemon

You're done with modifying the Naemon configuration, so you'll need to <a href="verifyconfig.html">verify your configuration files</a> and <a href="startstop.html">restart Naemon</a>.

If the verification process produces any errors messages, fix your configuration file before continuing.  Make sure that you don't (re)start Naemon until the verification process completes without any errors!
