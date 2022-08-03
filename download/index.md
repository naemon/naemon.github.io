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
        <a href="https://download.opensuse.org/repositories/home:/naemon/CentOS_8_Stream/">Redhat 8</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/CentOS_7/">Redhat 7</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/centos.png"></td>
   <td>CentOS</td>
   <td>
        <a href="https://download.opensuse.org/repositories/home:/naemon/CentOS_8_Stream/">CentOS 8</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/CentOS_7/">CentOS 7</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/sles.jpg"></td>
   <td>SLES</td>
   <td>
        <a href="https://download.opensuse.org/repositories/home:/naemon/SLE_15_SP2/">15 SP2</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/SLE_15_SP1/">15 SP1</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/SLE_15/">15</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/SLE_12_SP5/">12 SP5</a><br>
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
        <a href="https://build.opensuse.org/project/repository_state/home:naemon/Debian_Testing">Testing</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Debian_11/">11 Bullseye</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Debian_10/">10 Buster</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Debian_9.0/">9 Stretch</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Debian_8.0/">8 Jessie</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/ubuntu.png"></td>
   <td>Ubuntu</td>
   <td>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_21.10/">21.10 Impish Indri</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_21.04/">21.04 Hirsute Hippo</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_20.10/">20.10 Groovy Gorilla</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_20.04/">20.04 Focal Fossa</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_18.04/">18.04 Bionic</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_16.04/">16.04 Xenial</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/fedora.png" height="48" width="48"></td>
   <td>Fedora</td>
   <td>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Fedora_35/">fc35</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Fedora_34/">fc34</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Fedora_33/">fc33</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Fedora_32/">fc32</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Fedora_31/">fc31</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Fedora_30/">fc30</a><br>
   </td>
 </tr>
</table>

### Installing via repository<a name="repo_setup"></a>

Packages are available either using the openSUSE Build Service (below) or via the [Consol repository](http://labs.consol.de/repo/stable/).

This list is not synchronized with the build server, so there might be more repositories available at the
[openSUSE Build Service Repository Overview](https://build.opensuse.org/repositories/home:naemon).

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

##### Debian 11
```
echo "deb http://download.opensuse.org/repositories/home:/naemon/Debian_11/ ./" >> /etc/apt/sources.list.d/naemon-stable.list
apt-get update
```

#### Centos / Redhat
When using Centos or Redhat you may have to add the <a href="http://fedoraproject.org/wiki/EPEL/FAQ#Using_EPEL">EPEL</a> repository to resolve all dependencies.

##### 7
```
curl -s https://download.opensuse.org/repositories/home:/naemon/CentOS_7/home:naemon.repo >> /etc/yum.repos.d/naemon-stable.repo
```

##### 8
```
curl -s https://download.opensuse.org/repositories/home:/naemon/CentOS_8_Stream/home:naemon.repo >> /etc/yum.repos.d/naemon-stable.repo
```

#### Fedora
##### 30
```
curl -s https://download.opensuse.org/repositories/home:/naemon/Fedora_30/home:naemon.repo >> /etc/yum.repos.d/naemon-stable.repo
```
##### 31
```
curl -s https://download.opensuse.org/repositories/home:/naemon/Fedora_31/home:naemon.repo >> /etc/yum.repos.d/naemon-stable.repo
```
##### 32
```
curl -s https://download.opensuse.org/repositories/home:/naemon/Fedora_32/home:naemon.repo >> /etc/yum.repos.d/naemon-stable.repo
```
##### 33
```
curl -s https://download.opensuse.org/repositories/home:/naemon/Fedora_33/home:naemon.repo >> /etc/yum.repos.d/naemon-stable.repo
```

#### Suse Linux Enterprise

##### SLES 12 SP5
```
zypper addrepo -f https://download.opensuse.org/repositories/home:/naemon/SLE_12_SP5/home:naemon.repo
```

##### SLES 15 SP2
```
zypper addrepo -f https://download.opensuse.org/repositories/home:/naemon/SLE_15_SP2/home:naemon.repo
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
