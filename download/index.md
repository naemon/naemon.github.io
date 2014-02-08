---
layout: default
title: Downloads
---

### Stable release
There isn't a stable release yet. Sorry.

### Development snapshot
For new user, we recommend you grab one of our nightly binary snapshots. You can also build yourself from source.

Travis-CI core build status: <a href="https://travis-ci.org/naemon/naemon-core" alt="Build Status"><img style="vertical-align:sub;" src="https://travis-ci.org/naemon/naemon-core.png?branch=master"></a><br />
Travis-CI suite build status: <a href="https://travis-ci.org/naemon/naemon" alt="Build Status"><img style="vertical-align:sub;" src="https://travis-ci.org/naemon/naemon.png?branch=master"></a>

#### Binary packages
We build nightly packages for several versions of CentOS/RedHat, Debian, SLES, and Ubuntu. First [install the Consol testing repository](http://labs.consol.de/repo/testing/), and then install the `naemon` package with your package manager.

#### Source
Download the latest development source code from [github](http://github.com/naemon/naemon).

### Getting started
After installing there are a few simple things left to do.

Install any plugins you want (your distribution probably carries monitoring-plugins or nagios-plugins), and adjust the $USER1$ variable in /etc/naemon/resource.cfg to where they are.

Configure your firewall software to accept incomming port 80 requests.

Configure your selinux policy.

Start the naemon service, the thruk service, and your distribution's apache service.

Navigate to your server (<ip>/naemon) with a web browser, and log in using "admin"/"admin".

You should now be logged in to your new monitoring system.
