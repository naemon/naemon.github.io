---
layout: affix
title: Documentation
---
While we don't yet have a large body of documentation of our own, here are several resources that do carry applicable documentation.

### What is Naemon?

Naemon is the new monitoring suite that aims to be faster and more stable, while giving
you a clearer view of the state of your network. Started as a fork of Nagios 4, Naemon
continues development by replacing the old Web UI and further performance and usability
improvements.

Naemon uses standard monitoring plugins to perform host and service checks.

### Components

#### Naemon core
The naemon core is the process that does the actual monitoring of your system.

For now, we'll have to refer you to the [nagios documentation][nagios] for core documentation.

#### Livestatus
Livestatus is an interface that your tools can use to query the Naemon core like a database.

For now, we'll have to refer you to the [mklivestatus documentation][mklivestatus] for livestatus documentation.

#### Thruk
Thruk is the UI shipped with the Naemon Suite.

The Thruk documentation is at [its own page][thruk].

#### Plugins
The monitoring application itself is quite useless without plugins to actually checks things for you. Check out [monitoring plugins][monplugins] for a large, well maintained collection of core plugins.

The more esoteric your needs are, the higher the probability that your needs wont be covered by the monitoring plugins package. You can find a large body of plugins - maintained by their individual authors - at [monitoring exchange][monexchange]. You can also easily write your own - see the [monitoring plugins][monplugins] project.


### Getting Started

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



#### Build Git Development Version
Developers, Testers and arly early adopters may want to build their own packages, so here is how:

We use Centos 6 in our example. For Debian based system, replace 'make rpm' with 'make deb'
and install the dependencies according to your system.

First install some basic dependencies:

```bash
%> sudo yum install git perl perl-Module-Install automake gperf gcc-c++ \
     autoconf libtool gd-devel expat-devel mysql-devel rpm-build \
     doxygen wget httpd
```

Then clone our repository in any folder you like:

```bash
%> git clone --recursive https://github.com/naemon/naemon.git
```

Finally build your rpm package:

```bash
%> cd naemon/
%> ./configure --without-compress
%> make rpm
```


### Configuration

For now, we'll have to refer you to the [nagios documentation][nagios] for core documentation.



[nagios]: http://nagios.sourceforge.net/docs/nagioscore/4/en/
[mklivestatus]: http://mathias-kettner.de/checkmk_livestatus.html
[thruk]: http://thruk.org/documentation.html
[monplugins]: https://www.monitoring-plugins.org/
[monexchange]: https://www.monitoringexchange.org/
