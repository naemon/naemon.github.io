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

<div class="alert alert-warning"><i class="glyphicon glyphicon-exclamation-sign"></i> As there are no release downloads yet, this howto points to the <b>testing</b> repository.</div>

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

Naemons philosophy is "from the community, for the community", so there are many
ways to get in touch with other users.

We have several of the usual means of contact:

 * Mailing lists: [users list](https://www.monitoring-lists.org/list/listinfo/naemon-users/) | [developers list](https://www.monitoring-lists.org/list/listinfo/naemon-dev/)
 * IRC channels: #naemon and #naemon-devel on freenode
 * Support Forum: [monitoring-portal.org](http://monitoring-portal.org/wbb/index.php?page=Board&boardID=111) (english/german)



### Getting Started




### Configuring Naemon

For now, we'll have to refer you to the [nagios documentation][nagios] for core documentation.
So [please help](/community) writing our own documentation as soon as possible.

### Running Naemon

Basically running Naemon is not a big deal.

Running a config check:

```
#>/etc/init.d/naemon checkconfig
...
Reading configuration data...
   Read main config file okay...
   Read object config files okay...

Running pre-flight check on configuration data...

Checking objects...
        Checked 21 services.
        Checked 4 hosts.
        Checked 4 host groups.
        Checked 1 service groups.
        Checked 1 contacts.
        Checked 1 contact groups.
        Checked 25 commands.
        Checked 6 time periods.
        Checked 0 host escalations.
        Checked 0 service escalations.
Checking for circular paths...
        Checked 4 hosts
        Checked 0 service dependencies
        Checked 0 host dependencies
        Checked 6 timeperiods
Checking global event handlers...
Checking obsessive compulsive processor commands...
Checking misc settings...

Total Warnings: 0
Total Errors:   0

Things look okay - No serious problems were detected during the pre-flight check
```

Error message are hopefully pretty self-explaining.


Starting Naemon:

```
#>/etc/init.d/naemon start
[ ok ] Starting naemon: :.
```

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

#### OMD



### Development

See the [development section](/documentation/developers) for API and developers instructions.



[nagios]: http://nagios.sourceforge.net/docs/nagioscore/4/en/
[mklivestatus]: http://mathias-kettner.de/checkmk_livestatus.html
[thruk]: http://thruk.org/documentation.html
[monplugins]: https://www.monitoring-plugins.org/
[monexchange]: https://www.monitoringexchange.org/