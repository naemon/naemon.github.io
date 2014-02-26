---
layout: default
title: Downloads
release_version: 0.8.0
release_date: 14. Feb 2014
---

### Stable release

<div class="alert alert-success"><i class="glyphicon glyphicon-download-alt"></i> Latest stable release: <b>{{ page.release_version }}</b>, released {{ page.release_date }}</div>

We have build binary packages for several versions of CentOS/RedHat, Debian, SLES, and Ubuntu which are available
via the [Consol repository](http://labs.consol.de/repo/stable/). After the repository has been setup, you just
have to  install the `naemon` package with your package manager.

The binary packages can also be downloaded here:

<table>
 <tr>
   <td><img src="../images/centos.png"></td>
   <td>CentOS</td>
   <td>
        <a href="http://labs.consol.de/naemon/release/v{{ page.release_version }}/rhel6/">CentOS 6</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ page.release_version }}/rhel5/">CentOS 5</a>
   </td>
 </tr>
 <tr>
   <td><img src="../images/sles.jpg"></td>
   <td>SLES</td>
   <td>
        <a href="http://labs.consol.de/naemon/release/v{{ page.release_version }}/sles11sp3/">11 SP3</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ page.release_version }}/sles11sp2/">11 SP2</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ page.release_version }}/sles11sp1/">11 SP1</a>
   </td>
 </tr>
 <tr>
   <td><img src="../images/debian.png"></td>
   <td>Debian</td>
   <td>
        <a href="http://labs.consol.de/naemon/release/v{{ page.release_version }}/debian8/">8 Jessie</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ page.release_version }}/debian7/">7 Wheezy</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ page.release_version }}/debian6/">6 Squeeze</a>
   </td>
 </tr>
 <tr>
   <td><img src="../images/ubuntu.png"></td>
   <td>Ubuntu</td>
   <td>
        <a href="http://labs.consol.de/naemon/release/v{{ page.release_version }}/ubuntu13.10/">13.10 Saucy</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ page.release_version }}/ubuntu13.04/">13.04 Raring</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ page.release_version }}/ubuntu12.10/">12.10 Quantal</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ page.release_version }}/ubuntu12.04/">12.04 Precise</a>,<br>
        <a href="http://labs.consol.de/naemon/release/v{{ page.release_version }}/ubuntu10.04/">10.04 Lucid</a>
   </td>
 </tr>
</table>

<a href="http://labs.consol.de/naemon/release/v{{ page.release_version }}/src/">Source tarball and source RPM packages can be downloads here.</a>

### Development snapshot
For new user, we recommend you grab one of our nightly binary snapshots. You can also build yourself from source.

Travis-CI core build status: <a href="https://travis-ci.org/naemon/naemon-core" alt="Build Status"><img style="vertical-align:sub;" src="https://travis-ci.org/naemon/naemon-core.png?branch=master"></a><br />
Travis-CI suite build status: <a href="https://travis-ci.org/naemon/naemon" alt="Build Status"><img style="vertical-align:sub;" src="https://travis-ci.org/naemon/naemon.png?branch=master"></a>

#### Binary packages
We build nightly packages for several versions of CentOS/RedHat, Debian, SLES, and Ubuntu. First [install the Consol testing repository](http://labs.consol.de/repo/testing/), and then install the `naemon` package with your package manager.

#### Source
Download the latest development source code from [github](http://github.com/naemon/naemon).

### Getting started

See the [getting started](/documentation/usersguide/#getting_started) document in the users guide.
