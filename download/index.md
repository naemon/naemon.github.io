---
layout: default
title: Downloads
---

### Stable release

<div class="alert alert-success"><i class="glyphicon glyphicon-download-alt"></i> Latest stable release: <b>{{ site.release_version }}</b>, released {{ site.release_date }}</div>

We have build binary packages for several versions of RedHat/CentOS, Debian, SLES, and Ubuntu which are available
via the [Consol repository](http://labs.consol.de/repo/stable/). After the repository has been setup, you just
have to  install the `naemon` package with your package manager.

The binary packages can also be downloaded here:

<table>
 <tr>
   <td><img src="../images/redhat.png"></td>
   <td>Redhat</td>
   <td>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/rhel7/">Redhat 7</a><br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/rhel6/">Redhat 6</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/centos.png"></td>
   <td>CentOS</td>
   <td>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/rhel7/">CentOS 7</a><br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/rhel6/">CentOS 6</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/sles.jpg"></td>
   <td>SLES</td>
   <td>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/sles12sp1/">12 SP3</a><br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/sles12sp1/">12 SP2</a><br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/sles12sp1/">12 SP1</a><br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/sles11sp3/">11 SP3</a><br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/sles11sp4/">11 SP4</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/debian.png"></td>
   <td>Debian</td>
   <td>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian10/">10 Buster</a><br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian9/">9 Stretch</a><br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian8/">8 Jessie</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/ubuntu.png"></td>
   <td>Ubuntu</td>
   <td>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu18.04/">18.04 Bionic</a><br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu17.10/">17.10 Artful</a><br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu16.04/">16.04 Xenial</a><br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu14.04/">14.04 Trusty</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/fedora.png" height=48 width=48></td>
   <td>Fedora</td>
   <td>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/fc28/">fc28</a><br>
        <a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/fc27/">fc27</a><br>
   </td>
 </tr>
</table>

<a href="http://labs.consol.de/naemon/release/v{{ site.release_version }}/src/">Source tarball and source RPM packages can be downloads here.</a>

<a name="development_snapshot"></a>

### Development snapshot
For new user, we recommend you grab one of our nightly binary snapshots. You can also build yourself from source.

Travis-CI core build status: <a href="https://travis-ci.org/naemon/naemon-core"><img style="vertical-align:sub;" src="https://travis-ci.org/naemon/naemon-core.png?branch=master" alt="Build Status"></a><br />
Travis-CI suite build status: <a href="https://travis-ci.org/naemon/naemon"><img style="vertical-align:sub;" src="https://travis-ci.org/naemon/naemon.png?branch=master" alt="Build Status"></a>

#### openSuse Build Service
There are daily builds available for recent platforms at the [obs home:naemon:daily project](https://build.opensuse.org/project/show/home:naemon:daily)

#### Binary packages
We build nightly packages for several versions of CentOS/RedHat, Debian, SLES, and Ubuntu. First [install the Consol testing repository](http://labs.consol.de/repo/testing/), and then install the `naemon` package with your package manager.

#### Source
Download the latest development source code from [github](http://github.com/naemon/naemon).

### Getting started

See the [getting started](/documentation/usersguide/toc.html#getting_started) document in the users guide.
