---
layout: doctoc
title: Monitoring Windows Machines
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="quickstart.html">Quickstart Installation Guide</a>, <a href="monitoring-networkservices.html">Monitoring network services</a>

### Introduction

This document describes how you can monitor local services and attributes of Windows machines, such as:

<ul>
<li>Memory usage</li>
<li>CPU load</li>
<li>Disk usage</li>
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

<a href="images/nsclient-install1.png"><img src="images/nsclient-install1.png" border="0" hspace="10" width="40%" height="40%" alt="pnp4nagios example with Naemon" title="pnp4nagios example with Naemon" style="float: right;"></a>
  
1.  Download the latest stable version of the NSClient++ addon from <a href="http://www.nsclient.org">http://www.nsclient.org</a>
1.  Install NSClient++ and use the "Complete" setup type to make sure you got all features. On the next page use the default path for nsclient.ini and make sure "Install sample configuration" are checked
1.  Enter all hosts that are allowed to connect to NSClient++, separate multiple IP's with ",". Make sure to check the following:
  * "Check "Enable common check plugins"
  * "Enable NRPE server (check_nrpe)"
  * "Enable WMI checks".  
  NSClient++ should be installed as a service and start automatic.
1.  This should be enough to start with some basic Windows monitoring.

### Configuring Naemon

Now it's time to define some <a href="objectdefinitions.html">object definitions</a> in your Naemon configuration files in order to monitor the new Windows machine.

#### Hostgroup

We will start to create a basic hostgroup for some generic tests for all Microsoft Windows machines.

Open the /etc/naemon/conf.d/hostgroups.cfg file for editing.

Add the new <a href="objectdefinitions.html#hostgroup">hostsgroup</a> definition for the Windows hostgroup that you're going to monitor.

<pre>
vi /etc/naemon/conf.d/hostgroups.cfg
</pre>

Add the following
<pre>
define hostgroup {
  hostgroup_name                 microsoft-windows
  alias                          Microsoft Windows hosts
}
</pre>

#### Command

Make sure you have a check_nrpe command configured, if not. open /etc/naemon/conf.d/commands.cfg for editing

Add the new <a href="objectdefinitions.html#command">command</a> definition for the Windows hostgroup that you're going to monitor.

<pre>
vi /etc/naemon/conf.d/commands.cfg
</pre>

Add the following

<pre>
define command {
  command_name                   check_nrpe
  command_line                   $USER1$/check_nrpe -H $HOSTADDRESS$ -c $ARG1$
}
</pre>

#### Service

We will now add three basic services - Memory, CPU Load and Hard drives

Add the new <a href="objectdefinitions.html#service">service</a> definition for the Windows hostgroup that you're going to monitor.

Open /etc/naemon/conf.d/services.cfg for editing

<pre>
vi /etc/naemon/conf.d/services.cfg
</pre>

Add the following

<pre>
define service {
  service_description            Memory
  hostgroup_name                microsoft-windows
  use                            generic-service
  check_command                  check_nrpe!alias_mem
}

define service {
  service_description            Hard drives
  hostgroup_name                microsoft-windows
  use                            generic-service
  check_command                  check_nrpe!alias_disk
}

define service {
  service_description            CPU load
  hostgroup_name                microsoft-windows
  use                            generic-service
  check_command                  check_nrpe!alias_cpu
}

</pre>

#### Host

We have now defined a hostgroup, command and services. Let us complete this and add a Windows host to monitor

Add a new <a href="objectdefinitions.html#host">host</a> definition for the Windows machine that you're going to monitor. Change the <i>host_name</i>, <i>alias</i>, and <i>address</i> fields to appropriate values for the Windows machine.

Open /etc/naemon/conf.d/hosts.cfg for editing

<pre>
vi /etc/naemon/conf.d/hosts.cfg
</pre>

Add the following

<pre>
define host {
  host_name                      windowsserver
  alias                          My Windows server
  address                        192.168.10.200
  hostgroups                     microsoft-windows
  use                            windows-server ; Inherit default values from a Windows server template (make sure you keep this line!)
}
</pre>

#### Add more hosts and services

It's now very easy to extend your monitoring with more hosts or services. If you want to add a new Windows host, simply create a new host definition and define microsoft-windows as hostgroups.

If you want to add more services to microsft-windows hostgroup simple add new services and define microsoft-windows as hostgroups_name


### Reload Naemon

You're done with modifying the Naemon configuration, so you'll need to <a href="verifyconfig.html">verify your configuration files</a> and <a href="startstop.html">restart Naemon</a>.

If the verification process produces any errors messages, fix your configuration file before continuing.  Make sure that you don't (re)start Naemon until the verification process completes without any errors!

<pre>
naemon -v /etc/naemon/naemon.cfg
</pre>

Reload Naemon to activate new changes

<pre>
service naemon reload
</pre>
