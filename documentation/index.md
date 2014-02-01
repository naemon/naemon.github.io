---
layout: default
title: Documentation
---
While we don't yet have a large body of documentation of our own, here are several resources that do carry applicable documentation.

### Naemon core
The naemon core is the process that does the actual monitoring of your system.

For now, we'll have to refer you to the [nagios documentation][nagios] for core documentation.

### Livestatus
Livestatus is an interface that your tools can use to query the Naemon core like a database.

For now, we'll have to refer you to the [mklivestatus documentation][mklivestatus] for livestatus documentation.

### Thruk
Thruk is the UI shipped with the Naemon Suite.

The Thruk documentation is at [its own page][thruk].

### Plugins
The monitoring application itself is quite useless without plugins to actually checks things for you. Check out [monitoring plugins][monplugins] for a large, well maintained collection of core plugins.

The more esoteric your needs are, the higher the probability that your needs wont be covered by the monitoring plugins package. You can find a large body of plugins - maintained by their individual authors - at [monitoring exchange][monexchange]. You can also easily write your own - see the [monitoring plugins][monplugins] project.

[nagios]: http://nagios.sourceforge.net/docs/nagioscore/4/en/
[mklivestatus]: http://mathias-kettner.de/checkmk_livestatus.html
[thruk]: http://thruk.org/documentation.html
[monplugins]: https://www.monitoring-plugins.org/
[monexchange]: https://www.monitoringexchange.org/
