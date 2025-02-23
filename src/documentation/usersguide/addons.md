# Addons

## Introduction

There are a lot of `addon` software packages that are available for Naemon.
Addons can be used to extend Naemons functionality or integrate Naemon with other applications.

Addons are available for:

* Managing the config files through a web interface
* Monitoring remote hosts (*NIX, Windows, etc.)
* Submitting passive checks from remote hosts
* Simplifying/extending the notification logic
* ...and much more

You can find many addons for Naemon by visiting:

* [exchange.icinga.com](https://exchange.icinga.com)
* [exchange.nagios.org](https://exchange.nagios.org)

I'll give a brief introduction to a few of the addons for Naemon...

## Thruk

Thruk is the default GUI for Naemon and has [its own documentation](https://thruk.org/).
It uses the Livestatus API to retrieve the content.

## Livestatus

Livestatus is one of the standard APIs in Naemon.
A [detailed description](livestatus) is available on a dedicated page.

## NRPE

![NRPE](/images/usersguide/svg/nrpe.svg) {.img-bg}

NRPE is an addon that allows you to execute [plugins](plugins) on remote Linux/Unix hosts.
This is useful if you need to monitor local resources/attributes like disk usage, CPU load, memory usage,
etc. on a remote host. Similar functionality can be accomplished by using the *check_by_ssh* plugin, although
it can impose a higher CPU load on the monitoring machine - especially if you are monitoring hundreds or thousands of hosts.

The NRPE addon and documentation can be found at [www.nagios.org](http://www.nagios.org/).

## NSCA

![NSCA](/images/usersguide/svg/nsca.svg) {.img-bg}

NSCA is an addon that allows you to send [passive check](passivechecks) results from remote Linux/Unix
hosts to the Naemon running on the monitoring server.

The NSCA addon can be found at [www.nagios.org](http://www.nagios.org/).

## NDOUtils

> [!WARNING] NDOUtils are only compatible up to Naemon version 1.0.3.
> For a drop in replacement use [Statusengine 2](#statusengine-2).

NDOUtils is an addon that allows you to store all status information from Naemon in a MySQL database.
Multiple instances of Naemon can all store their information in a central database for centralized reporting.

The NDOUtils addon and documentation can be found at [www.nagios.org](http://www.nagios.org/).

## Statusengine 2

Statusengine 2 is a drop in replacement for [NDOUtils](#ndoutils).

It is build on a worker concept to scale with a growing workload. Statusenigne will save all events to a MySQL database, can export performance data
to RRDtool (compatible to [PNP](#pnp)) and Graphite and also comes with a responsive web frontend.

Details can be found on [statusengine.org/oldstable/](https://statusengine.org/oldstable/)

## Statusengine 3

Statusengine 3 provide an easy way to scale Naemon monitoring across multiple nodes.

It is based on a worker concept and use a in memory queue to
prevent Naemon core to crash or slow down, even if the database backend is gone.

Statusengine 3 can save status records to MySQL, CrateDB or Redis.
Performance data can be exported to Graphite, Elasticsearch, MySQL or CrateDB.

Statusengine UI is an responsive web frontend build on top of a JSON API.

Details can be found on [statusengine.org](https://statusengine.org/)

## PNP

![pnp4nagios example with Naemon](/images/usersguide/pixel/pnp4nagios-example1.png) {.img-bg}

PNP is a graphing addon. For installation step by step help see [Addon PNP4Nagios Quickstart](addon-pnp-quickstart).

Author website can be found here: [pnp4nagios.org](http://pnp4nagios.org)

## Merlin

Merlin is a addon for distributed monitoring. Details can be found in [Merlin repository](https://github.com/ITRS-Group/monitor-merlin).

## Mod-Gearman

Mod-Gearman is a addon for distributed monitoring. Details can be found on [mod-gearman.org](http://mod-gearman.org).

## OMD

OMD (Open Monitoring Distribution) is not really an addon, but it comes bundled with
Naemon. OMD is a single linux package (rpm/deb) which installs Naemon with a couple of
common addons. Naemon is currently bundled in the OMD-Labs version, which is available
via the [Consol Labs Repository](https://labs.consol.de/repo/).

## others

There are lots of addons for Nagios and Naemon. Most Nagios addons should be 1:1 compatible with Naemon.
You might have to adjust some paths and users, but as both share a lot of code, most addons and plugins
should just work.
