# User Documentation


## About

[What is Naemon?](about#whatis) :white_check_mark:

[Components](about#components) :white_check_mark:

[System requirements](about#system-requirements) :white_check_mark:

[Licensing](about#licensing) :white_check_mark:

[Downloading the latest version](about#downloading-the-latest-version) :white_check_mark:



## Release Notes

[What's new in this version](whatsnew) :white_check_mark:

[Known issues](whatsnew#known-issues) :white_check_mark:

[Configuration Incompatibilities Nagios 3 -> Naemon](config-incompat3to4) :white_check_mark:



## Support

[Support](support) :white_check_mark:

[Community](/community) :white_check_mark:


## Getting Started

[Advice for beginners](beginners) :white_check_mark:

[Quickstart installation guide](quickstart) :white_check_mark:

[Upgrading from previous versions](upgrading)

[How to monitor a Windows machine](monitoring-windows)

[How to monitor a Linux/Unix machine](monitoring-linux)

[How to monitor a network printer](monitoring-printers)

[How to monitor a router/switch](monitoring-routers)

[How to monitor network services (HTTP, FTP, SSH, etc.)](monitoring-networkservices)

[How to install PNP graphs](addon-pnp-quickstart)

## Configuring Naemon

[Configuration overview](config)

[Main configuration file options](configmain)

[Object configuration overview](configobject)

[Object definitions](objectdefinitions)

[CGI configuration file options](configcgi)

[Configuring authorization for the CGIs](cgiauth)



## Running Naemon

[Verifying your configuration](verifyconfig)

[Starting and stopping Naemon](startstop)




## The Basics {#basics}

[Plugins](plugins)

[Macros and how they work](macros)

[Standard macros available in Naemon](macrolist)

[Host checks](hostchecks)

[Service checks](servicechecks)

[Active checks](activechecks)

[Passive checks](passivechecks)

[State types](statetypes)

[Time periods](timeperiods)

[Determining status and reachability of network hosts](networkreachability)

[Notifications](notifications)

[Information on the CGIs](cgis)



## Advanced Topics

[External commands](extcommands)

[Event handlers](eventhandlers)

[Volatile services](volatileservices)

[Service and host result freshness checks](freshness)

[Distributed monitoring](distributed)

[Redundant and failover monitoring](redundancy)

[Detection and handling of state flapping](flapping)

[Notification escalations](escalations)

[On-call notification rotations](oncallrotation)

[Monitoring service and host clusters](clusters)

[Host and service dependencies](dependencies)

[State stalking](stalking)

[Performance data](perfdata)

[Scheduled host and service downtime](downtime)

[Using the embedded Perl interpreter](embeddedperl)

[Adaptive monitoring](adaptive)

[Predictive dependency checks](dependencychecks)

[Cached checks](cachedchecks)

[Passive host state translation](passivestatetranslation)

[Custom CGI headers and footers](cgiincludes)

[Object inheritance](objectinheritance)

[Time-saving tips for object definitions](objecttricks)


## Security and Performance Tuning

[Security considerations](security)

[Enhanced CGI security and authentication](cgisecurity)

[Tuning Naemon for maximum performance](tuning)

[Fast startup options](faststartup)

[Large installation tweaks](largeinstalltweaks)

[Using the naemonstats utility](naemonstats)

## Naemon Addons

[Thruk](addons#thruk)

[Livestatus](livestatus)

[NRPE](addons#nrpe)

[NSCA](addons#nsca)

[NDOUtils](addons#ndoutils)

[Statusengine 2](addons#statusengine_2)

[Statusengine 3](addons#statusengine_3)

[PNP](addons#pnp)

[Graphing Performance Info With MRTG](mrtggraphs)

[Merlin](addons#merlin)

[Mod-Gearman](addons#mod-gearman)

[OMD](addons#omd)

[Other addons](addons#others)

[Nagios Exchange](http://exchange.nagios.org/)



## Integration With Other Software

[Integration Overview](integration)

[SNMP Traps](int-snmptrap)

[TCP Wrappers](int-tcpwrappers)



## Development

[Plugin API](pluginapi)

[Developing Plugins For Use With Embedded Perl](epnplugins)

[Developer Documentation](/documentation/developer/)

## Naemon Logo

[Naemon Logo](/logo) :white_check_mark:

## Licensing

Copyright &copy; 2014-     Naemon Development Team and Community Contributors

Copyright &copy; 2009-2010 Nagios Core Development Team and Community Contributors

Copyright &copy; 1999-2009 Ethan Galstad

Portions copyright by Nagios Community members.  See the [THANKS](https://github.com/naemon/naemon-core/blob/master/THANKS) file for more information.

Nagios, Nagios Core, NRPE, NSCA, and the Nagios logo are trademarks, servicemarks, registered servicemarks or registered trademarks of Nagios Enterprises.  All other trademarks, servicemarks, registered trademarks, and registered servicemarks mentioned herein may be the property of their respective owner(s).  The information contained herein is provided AS IS with NO WARRANTY OF ANY KIND, INCLUDING THE WARRANTY OF DESIGN, MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE.
