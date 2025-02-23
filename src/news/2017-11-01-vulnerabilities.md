---
title: "CVE-2016-9565 and CVE-2016-9566"
date:   2017-11-01
layout: news
prev:
    text: 'News'
    link: '/news/'
next: false
editLink: false
---

A few few weeks ago two CVEs have been announced for the Nagios core and Nagios webinterface. Since Naemon inherits some code
of Nagios, people might wonder if Naemon is also affected by those issues.

### CVE-2016-9565

This is an issue with the Nagios webinterface which never made it into the Naemon codebase since we use Thruk
as default web interface. So this issue simply doesn't exist in Naemon.

[Details about CVE-2016-9565](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-9565)

### CVE-2016-9566

This issue uses the fact that systemV init scripts start the Nagios process as root and then the process itself drops privileges and continues as normal user. Naemon inherited that issue so you might be affected.

However, you are not affected by this issue if you run Naemon either in [OMD-Labs](https://labs.consol.de/omd/) or on any Systemd based system like the OP5 Monitor.

We are working on a fix right now and there will be a new release soon.

[Details about CVE-2016-9566](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-9566)
