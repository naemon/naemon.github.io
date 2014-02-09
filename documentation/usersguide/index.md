---
layout: affix
title: Users Guide
---

### About

Naemon is the new monitoring suite that aims to be faster and more stable, while giving
you a clearer view of the state of your network. Started as a fork of Nagios 4, Naemon
continues development by replacing the old Web UI and further performance and usability
improvements.

Naemon uses standard monitoring plugins to perform host and service checks.

#### Components

##### Naemon core
The naemon core is the process that does the actual monitoring of your system.

For now, we'll have to refer you to the [nagios documentation][nagios] for core documentation.

##### Livestatus
Livestatus is an interface that your tools can use to query the Naemon core like a database.

For now, we'll have to refer you to the [mklivestatus documentation][mklivestatus] for livestatus documentation.

##### Thruk
Thruk is the UI shipped with the Naemon Suite.

The Thruk documentation is at [its own page][thruk].

##### Plugins
The monitoring application itself is quite useless without plugins to actually checks things for you. Check out [monitoring plugins][monplugins] for a large, well maintained collection of core plugins.

The more esoteric your needs are, the higher the probability that your needs wont be covered by the monitoring plugins package. You can find a large body of plugins - maintained by their individual authors - at [monitoring exchange][monexchange]. You can also easily write your own - see the [monitoring plugins][monplugins] project.





### Installation

#### Binary Packages

For the moment we offer binary packages for Debian, Ubuntu, CentOS/RedHat and SLES.
See the [download section](/download) for details.

For example lets install Naemon on Debian 7:

First we need to install the gpg key. This step has to be done only once:

```bash
%> sudo gpg --keyserver keys.gnupg.net --recv-keys F8C1CA08A57B9ED7
%> sudo gpg --armor --export F8C1CA08A57B9ED7 | apt-key add -
```

<div class="alert alert-warning"><i class="glyphicon glyphicon-exclamation-sign"></i> As there are now release downloads yes, this howto points to the <b>testing</b> repository.</div>

Enable the Consol* Labs Repository. This has to be done only once too.

```bash
%> sudo echo 'deb http://labs.consol.de/repo/testing/debian wheezy main' >> /etc/apt/sources.list
%> sudo apt-get update
```

last step, install Naemon.

```bash
%> sudo apt-get install naemon
```

#### Source Installation

The source installation is not recommended for normal operations. Thats why this
topic is covered in the [Developers Guide](/documentation/developer/#buildnaemonfromscratch)





### Support

### Getting Started

### Configuring Naemon

For now, we'll have to refer you to the [nagios documentation][nagios] for core documentation.
So [please help](/community); writing our own documentations as soon as possible.

### Running Nagios

### The Basics

### Advanced Topics

#### External commands

#### Query Handler


### Security and Performance Tuning

#### Security considerations

#### Tuning Nagios for maximum performance

#### Using the naemonstats utility



### Naemon Addons

#### Thruk

#### Livestatus



### Integration With Other Software

#### PNP

#### Merlin

#### Mod-Gearman

#### NDO



### Development

See the [development section](/documentation/developers) for API and developers instructions.



[nagios]: http://nagios.sourceforge.net/docs/nagioscore/4/en/
[mklivestatus]: http://mathias-kettner.de/checkmk_livestatus.html
[thruk]: http://thruk.org/documentation.html
[monplugins]: https://www.monitoring-plugins.org/
[monexchange]: https://www.monitoringexchange.org/