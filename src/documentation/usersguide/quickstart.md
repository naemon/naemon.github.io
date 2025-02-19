# Quickstart Installation Guides

## See Also
- [Upgrading Naemon](upgrading)
- [Configuration Overview](config)
- [Security Considerations](security)

## About Naemon

Visit the [Users Guide](/documentation/usersguide/toc) for more
information on Naemon - including features, capabilities, and technical specifications.

## Installation Introduction

These quickstart guides are intended to provide you with simple instructions on how to
install Naemon from packages and have it monitoring your local machine inside of 20 minutes.
No advanced installation options are discussed here - just the basics that will work for 95% of
users who want to get started.

## Installation Guides

Quickstart installation guides are currently available for the following Linux distributions:

 - [Ubuntu Quickstart](quickstart-ubuntu)
 - [Debian Quickstart](quickstart-debian)
 - [Red Hat Quickstart](quickstart-redhat)
 - [CentOS Quickstart](quickstart-centos)
 - [SUSE Linux Enterprise Server Quickstart](quickstart-sles)


Can't find a quickstart for your particular OS? Write one and help us extend our documentation, for more info
see [Help Extending The Documentation](/documentation/faq/#help-extending-the-documentation)

## Post-Installation Modifications

Once you get Naemon installed and running properly, you'll no doubt want to start monitoring more than just
your local machine. Check out the following docs for how to go about monitoring other things...

 - [Monitoring Windows machines](monitoring-windows)
 - [Monitoring Linux/Unix machines](monitoring-linux)
 - [Monitoring routers/switches](monitoring-routers)
 - [Monitoring network printers](monitoring-printers)
 - [Monitoring network services (HTTP, FTP, SSH, etc.)](monitoring-networkservices)

## Enhance Naemon With Community Addons

### Nagios Exchange
Since Naemon aims to be a drop replacement for Nagios all NRPE checks that are developed for Nagios works with Naemon as well.

Hundreds of community-developed addons provide additional GUIs and reporting, monitoring, and notification functionalities
for Naemon. Visit the Nagios Exchange website at [https://exchange.nagios.org](https://exchange.nagios.org/) to
see some really cool things you can use to trick out your Naemon installation.

### Thruk Community Addons

Since Thruk Monitoring webinterface are used in Naemon, Thruk addons works with Naemon as well. Please
see [Thruk Plugins](https://www.thruk.org/documentation/plugins.html) for more information.

### Monitoring plugins

The Monitoring Plugins Development Team maintains a bundle of more than fifty standard plugins for Naemon (Icinga, Shinken, Sensu and Nagios).

For more information visit: [monitoring-plugins.org](https://www.monitoring-plugins.org/)
