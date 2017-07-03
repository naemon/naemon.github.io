---
layout: doctoc
title: User Documentation
body_class: toc
---

## Table of Contents

### About

<a href="about.html#whatis">What is Naemon?</a>

<a href="about.html#components">Components</a>

<a href="about.html#system_requirements">System requirements</a>

<a href="about.html#licensing">Licensing</a>

<a href="about.html#downloading_the_latest_version">Downloading the latest version</a>



### Release Notes

<a href="whatsnew.html">What's new in this version</a>

<a href="knownissues.html">Known issues</a>

<a href="config-incompat3to4.html">Configuration Incompatibilities Nagios 3 -&gt; Naemon</a>



### Support

<a href="support.html">Support</a>

<a href="/community">Community</a>



### Getting Started

<a href="beginners.html">Advice for beginners</a>

<a href="quickstart.html">Quickstart installation guide</a>

<a href="upgrading.html">Upgrading from previous versions</a>

<a href="monitoring-windows.html">How to monitor a Windows machine</a>

<a href="monitoring-linux.html">How to monitor a Linux/Unix machine</a>

<a href="monitoring-printers.html">How to monitor a network printer</a>

<a href="monitoring-routers.html">How to monitor a router/switch</a>

<a href="monitoring-networkservices.html">How to monitor network services (HTTP, FTP, SSH, etc.)</a>

<a href="addon-pnp-quickstart.html">How to install PNP graphs</a>

### Configuring Naemon

<a href="config.html">Configuration overview</a>

<a href="configmain.html">Main configuration file options</a>

<a href="configobject.html">Object configuration overview</a>

<a href="objectdefinitions.html">Object definitions</a>

<a href="configcgi.html">CGI configuration file options</a>

<a href="cgiauth.html">Configuring authorization for the CGIs</a>



### Running Naemon

<a href="verifyconfig.html">Verifying your configuration</a>

<a href="startstop.html">Starting and stopping Naemon</a>




<a name="basics"></a>

### The Basics

<a href="plugins.html">Plugins</a>

<a href="macros.html">Macros and how they work</a>

<a href="macrolist.html">Standard macros available in Naemon</a>

<a href="hostchecks.html">Host checks</a>

<a href="servicechecks.html">Service checks</a>

<a href="activechecks.html">Active checks</a>

<a href="passivechecks.html">Passive checks</a>

<a href="statetypes.html">State types</a>

<a href="timeperiods.html">Time periods</a>

<a href="networkreachability.html">Determining status and reachability of network hosts</a>

<a href="notifications.html">Notifications</a>

<a href="cgis.html">Information on the CGIs</a>



### Advanced Topics

<a href="extcommands.html">External commands</a>

<a href="eventhandlers.html">Event handlers</a>

<a href="volatileservices.html">Volatile services</a>

<a href="freshness.html">Service and host result freshness checks</a>

<a href="distributed.html">Distributed monitoring</a>

<a href="redundancy.html">Redundant and failover monitoring</a>

<a href="flapping.html">Detection and handling of state flapping</a>

<a href="escalations.html">Notification escalations</a>

<a href="oncallrotation.html">On-call notification rotations</a>

<a href="clusters.html">Monitoring service and host clusters</a>

<a href="dependencies.html">Host and service dependencies</a>

<a href="stalking.html">State stalking</a>

<a href="perfdata.html">Performance data</a>

<a href="downtime.html">Scheduled host and service downtime</a>

<a href="embeddedperl.html">Using the embedded Perl interpreter</a>

<a href="adaptive.html">Adaptive monitoring</a>

<a href="dependencychecks.html">Predictive dependency checks</a>

<a href="cachedchecks.html">Cached checks</a>

<a href="passivestatetranslation.html">Passive host state translation</a>

<a href="checkscheduling.html">Check scheduling</a>

<a href="cgiincludes.html">Custom CGI headers and footers</a>

<a href="objectinheritance.html">Object inheritance</a>

<a href="objecttricks.html">Time-saving tips for object definitions</a>



### Security and Performance Tuning

<a href="security.html">Security considerations</a>

<a href="cgisecurity.html">Enhanced CGI security and authentication</a>

<a href="tuning.html">Tuning Naemon for maximum performance</a>

<a href="faststartup.html">Fast startup options</a>

<a href="largeinstalltweaks.html">Large installation tweaks</a>

<a href="naemonstats.html">Using the naemonstats utility</a>

### Naemon Addons

<a href="addons.html#thruk">Thruk</a>

<a href="livestatus.html">Livestatus</a>

<a href="addons.html#nrpe">NRPE</a>

<a href="addons.html#nsca">NSCA</a>

<a href="addons.html#ndoutils">NDOUtils</a>

<a href="addons.html#pnp">PNP</a>

<a href="mrtggraphs.html">Graphing Performance Info With MRTG</a>

<a href="addons.html#merlin">Merlin</a>

<a href="addons.html#mod-gearman">Mod-Gearman</a>

<a href="addons.html#omd">OMD</a>

<a href="addons.html#others">Other addons</a>

<a href="http://exchange.nagios.org/" target="_blank">Nagios Exchange</a>



### Integration With Other Software

<a href="integration.html">Integration Overview</a>

<a href="int-snmptrap.html">SNMP Traps</a>

<a href="int-tcpwrappers.html">TCP Wrappers</a>



### Development

<a href="pluginapi.html">Plugin API</a>

<a href="epnplugins.html">Developing Plugins For Use With Embedded Perl</a>

<a href="/documentation/developer/">Developer Documentation</a>



### Licensing

Copyright &copy; 2014-     Naemon Development Team and Community Contributors

Copyright &copy; 2009-2010 Nagios Core Development Team and Community Contributors

Copyright &copy; 1999-2009 Ethan Galstad

Portions copyright by Nagios Community members.  See the THANKS file for more information.

Nagios, Nagios Core, NRPE, NSCA, and the Nagios logo are trademarks, servicemarks, registered servicemarks or registered trademarks of Nagios Enterprises.  All other trademarks, servicemarks, registered trademarks, and registered servicemarks mentioned herein may be the property of their respective owner(s).  The information contained herein is provided AS IS with NO WARRANTY OF ANY KIND, INCLUDING THE WARRANTY OF DESIGN, MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE.
