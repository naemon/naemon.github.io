---
layout: default
title: Downloads
---

### Stable release

<div class="alert alert-success"><i class="glyphicon glyphicon-download-alt"></i> Latest stable release: <b>{{ site.release_version }}</b>, released {{ site.release_date }}</div>

We have build binary packages for several versions of RedHat/CentOS, Debian, SLES, and Ubuntu which are available
via the [openSUSE Build Service](https://build.opensuse.org/project/show/home:naemon). After the repository [has been setup](#repo_setup), you just
have to  install the `naemon` package with your package manager.

The binary packages can also be downloaded here:

<table>
 <tr>
   <td><img src="../images/redhat.png"></td>
   <td>Redhat</td>
   <td>
        <a href="https://download.opensuse.org/repositories/home:/naemon/CentOS_7/">Redhat 7</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/CentOS_6/">Redhat 6</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/centos.png"></td>
   <td>CentOS</td>
   <td>
        <a href="https://download.opensuse.org/repositories/home:/naemon/CentOS_7/">CentOS 7</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/CentOS_6/">CentOS 6</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/sles.jpg"></td>
   <td>SLES</td>
   <td>
        <a href="https://download.opensuse.org/repositories/home:/naemon/SLE_12_SP4/">12 SP4</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/SLE_12_SP3/">12 SP3</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/SLE_12_SP2/">12 SP2</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/SLE_12_SP1/">12 SP1</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/debian.png"></td>
   <td>Debian</td>
   <td>
        <a href="https://labs.consol.de/repo/stable/debian/dists/testing/main/binary-amd64/">10 Buster</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Debian_9.0/">9 Stretch</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Debian_8.0/">8 Jessie</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/ubuntu.png"></td>
   <td>Ubuntu</td>
   <td>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_18.10/">18.10 Cosmic</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_18.04/">18.04 Bionic</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_16.04/">16.04 Xenial</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_14.04/">14.04 Trusty</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/fedora.png" height="48" width="48"></td>
   <td>Fedora</td>
   <td>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Fedora_29/">fc29</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Fedora_28/">fc28</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Fedora_27/">fc27</a><br>
   </td>
 </tr>
</table>

### Installing via repository<a name="repo_setup"></a>

Packages are available either using the openSUSE Build Service (below) or via the [Consol repository](http://labs.consol.de/repo/stable/).

#### Debian / Ubuntu
##### Install GPG key
First you import the GPG key.
```
curl -s "https://build.opensuse.org/projects/home:naemon/public_key" | sudo apt-key add -

```

##### Ubuntu
```
echo "deb http://download.opensuse.org/repositories/home:/naemon/xUbuntu_$(lsb_release -rs)/ ./" >> /etc/apt/sources.list.d/naemon-stable.list
apt-get update
```

##### Debian 9
```
echo "deb http://download.opensuse.org/repositories/home:/naemon/Debian_9.0/ ./" >> /etc/apt/sources.list.d/naemon-stable.list
apt-get update
```
##### Debian 8
```
echo "deb http://download.opensuse.org/repositories/home:/naemon/Debian_9.0/ ./" >> /etc/apt/sources.list.d/naemon-stable.list
apt-get update
```

#### Centos / Redhat
When using Centos or Redhat you may have to add the <a href="http://fedoraproject.org/wiki/EPEL/FAQ#Using_EPEL">EPEL</a> repository to resolve all dependencies.

##### 6
```
curl -s https://download.opensuse.org/repositories/home:/naemon/CentOS_6/home:naemon.repo >> /etc/yum.repos.d/naemon-stable.repo
```
##### 7
```
curl -s https://download.opensuse.org/repositories/home:/naemon/CentOS_7/home:naemon.repo >> /etc/yum.repos.d/naemon-stable.repo
```

#### Fedora
##### 27
```
curl -s https://download.opensuse.org/repositories/home:/naemon/Fedora_27/home:naemon.repo >> /etc/yum.repos.d/naemon-stable.repo
```
##### 28
```
curl -s https://download.opensuse.org/repositories/home:/naemon/Fedora_28/home:naemon.repo >> /etc/yum.repos.d/naemon-stable.repo
```
##### 29
```
curl -s https://download.opensuse.org/repositories/home:/naemon/Fedora_29/home:naemon.repo >> /etc/yum.repos.d/naemon-stable.repo
```

#### Suse Linux Enterprise
##### SLES 12 SP1
```
zypper addrepo -f https://download.opensuse.org/repositories/home:/naemon/SLE_12_SP1/home:naemon.repo
```

##### SLES 12 SP2
```
zypper addrepo -f https://download.opensuse.org/repositories/home:/naemon/SLE_12_SP2/home:naemon.repo
```

##### SLES 12 SP3
```
zypper addrepo -f https://download.opensuse.org/repositories/home:/naemon/SLE_12_SP3/home:naemon.repo
```

##### SLES 12 SP4
```
zypper addrepo -f https://download.opensuse.org/repositories/home:/naemon/SLE_12_SP4/home:naemon.repo
```
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
