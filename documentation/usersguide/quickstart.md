---
layout: doctoc
title: Quickstart Installation Guides
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="upgrading.html">Upgrading Naemon</a>,
<a href="config.html">Configuration Overview</a>, <a href="security.html">Security Considerations</a>

### About Naemon

Visit <a href="http://naemon.org/documentation/usersguide/" target="_blank">naemon.org/documentation/usersguide/</a> for more
information on Naemon - including features, capabilities, and technical specifications.

### Installation Introduction

These quickstart guides are intended to provide you with simple instructions on how to
install Naemon from packages and have it monitoring your local machine inside of 20 minutes.
No advanced installation options are discussed here - just the basics that will work for 95% of
users who want to get started.

### Installation Guides

Quickstart installation guides are currently available for the following Linux distributions:

<ul>
<li><a href="quickstart-ubuntu.html">Ubuntu Quickstart</a></li>
<li><a href="quickstart-debian.html">Debian Quickstart</a></li>
<li><a href="quickstart-redhat.html">Redhat Quickstart</a></li>
<li><a href="quickstart-centos.html">CentOS Quickstart</a></li>
<li><a href="quickstart-sles.html">SUSE Linux Enterprise Server </a></li>
</ul>

Can't find a quickstart for your particular OS? Write one and help us extend our documentation, for more info
see [Help Extending The Documentation](http://naemon.org/documentation/faq/#help_extending_the_documentation)

### Post-Installation Modifications

Once you get Naemon installed and running properly, you'll no doubt want to start monitoring more than just
your local machine. Check out the following docs for how to go about monitoring other things...

<ul>
<li><a href="monitoring-windows.html">Monitoring Windows machines</a></li>
<li><a href="monitoring-linux.html">Monitoring Linux/Unix machines</a></li>
<li><a href="monitoring-routers.html">Monitoring routers/switches</a></li>
<li><a href="monitoring-printers.html">Monitoring network printers</a></li>
<li><a href="monitoring-networkservices.html">Monitoring network services (HTTP, FTP, SSH, etc.)</a></li>
</ul>

### Enhance Naemon With Community Addons

#### Nagios Exchange
Since Naemon aims to be a drop replacement for Nagios all NRPE checks that are developed for Nagios works with Naemon as well.

Hundreds of community-developed addons provide additional GUIs and reporting, monitoring, and notification functionalities
for Naemon. Visit the Nagios Exchange website at <a href="http://exchange.nagios.org" target="_blank">exchange.nagios.org</a> to
see some really cool things you can use to trick out your Naemon installation.

#### Thruk Community Addons

Since Thruk Monitoring webinterface are used in Naemon, Thruk addons works with Naemon as well. Please
see [Thruk Plugins](http://thruk.org/plugins.html) for more information.

#### Monitoring plugins

The Monitoring Plugins Development Team maintains a bundle of more than fifty standard plugins for Naemon (Icinga, Shinken, Sensu and Nagios).

For more information visit: [monitoring-plugins.org](https://www.monitoring-plugins.org/)
