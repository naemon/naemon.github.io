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
   <td>Enterprise Linux (Red Hat, RockyLinux, AlmaLinux etc)</td>
   <td>
        <a href="https://download.opensuse.org/repositories/home:/naemon/AlmaLinux_9/">EL9</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/AlmaLinux_8/">EL8</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/CentOS_7/">EL7</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/sles.jpg"></td>
   <td>SLES</td>
   <td>
        <a href="https://download.opensuse.org/repositories/home:/naemon/15.6/">15 SP6</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/15.5/">15 SP5</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/15.4/">15 SP4</a><br>
  </td>
 </tr>
 <tr>
   <td><img src="../images/debian.png"></td>
   <td>Debian</td>
   <td>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Debian_Testing/">Testing</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Debian_12/">12 Bookworm</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Debian_11/">11 Bullseye</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Debian_10/">10 Buster</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Debian_9.0/">9 Stretch</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/ubuntu.png"></td>
   <td>Ubuntu</td>
   <td>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_24.04/">24.04 Noble Numbat</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_23.10/">23.10 Mantic Minotaur</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_23.04/">23.04 Lunar Lobster</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_22.10/">22.10 Kinetic Kudu</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_22.04/">22.04 Jammy Jellyfish</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_21.10/">21.10 Impish Indri</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_21.04/">21.04 Hirsute Hippo</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_20.10/">20.10 Groovy Gorilla</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_20.04/">20.04 Focal Fossa</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/xUbuntu_18.04/">18.04 Bionic</a><br>
   </td>
 </tr>
 <tr>
   <td><img src="../images/fedora.png" height="48" width="48"></td>
   <td>Fedora</td>
   <td>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Fedora_40/">fc40</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Fedora_39/">fc39</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Fedora_38/">fc38</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Fedora_37/">fc37</a><br>
        <a href="https://download.opensuse.org/repositories/home:/naemon/Fedora_36/">fc36</a><br>
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
curl -s -o /etc/apt/trusted.gpg.d/naemon.asc "https://build.opensuse.org/projects/home:naemon/signing_keys/download?kind=gpg"

```

##### Ubuntu
```
echo "deb [signed-by=/etc/apt/trusted.gpg.d/naemon.asc] http://download.opensuse.org/repositories/home:/naemon/xUbuntu_$(lsb_release -rs)/ ./" >> /etc/apt/sources.list.d/naemon-stable.list
apt-get update
```

##### Debian
```
echo "deb [signed-by=/etc/apt/trusted.gpg.d/naemon.asc] http://download.opensuse.org/repositories/home:/naemon/Debian_$(lsb_release -rs)/ ./" >> /etc/apt/sources.list.d/naemon-stable.list
apt-get update
```

#### Centos / Redhat / Rocky / Alma
When using Centos or Redhat you may have to add the <a href="http://fedoraproject.org/wiki/EPEL/FAQ#Using_EPEL">EPEL</a> repository to resolve all dependencies.

##### 7
```
curl -s https://download.opensuse.org/repositories/home:/naemon/CentOS_7/home:naemon.repo >> /etc/yum.repos.d/naemon-stable.repo
```

##### 8
```
curl -s https://download.opensuse.org/repositories/home:/naemon/AlmaLinux_8/home:naemon.repo >> /etc/yum.repos.d/naemon-stable.repo
```

##### 9
```
curl -s https://download.opensuse.org/repositories/home:/naemon/AlmaLinux_9/home:naemon.repo >> /etc/yum.repos.d/naemon-stable.repo
```

#### Fedora
```
curl -s https://download.opensuse.org/repositories/home:/naemon/Fedora_$(cut -f 3 -d " " /etc/redhat-release)/home:naemon.repo >> /etc/yum.repos.d/naemon-stable.repo
```

#### Suse Linux Enterprise

##### SLES 15 SP4
```
zypper addrepo -f https://download.opensuse.org/repositories/home:/naemon/15.4/home:naemon.repo
```

##### SLES 15 SP5
```
zypper addrepo -f https://download.opensuse.org/repositories/home:/naemon/15.5/home:naemon.repo
```

<a name="development_snapshot"></a>
### Development snapshot
For new user, we recommend you grab one of our nightly binary snapshots. You can also build yourself from source.

CI core build status: <a href="https://github.com/naemon/naemon-core/actions"><img style="vertical-align:sub;" src="https://img.shields.io/github/actions/workflow/status/naemon/naemon-core/citest.yml" alt="Build Status"></a><br />
CI suite build status: <a href="https://github.com/naemon/naemon/actions"><img style="vertical-align:sub;" src="https://img.shields.io/github/actions/workflow/status/naemon/naemon/citest.yml" alt="Build Status"></a>

#### openSuse Build Service
There are daily builds available for recent platforms at the [obs home:naemon:daily project](https://build.opensuse.org/project/show/home:naemon:daily)

#### Binary packages
We build nightly packages for several versions of CentOS/RedHat, Debian, SLES, and Ubuntu. First [install the Consol testing repository](http://labs.consol.de/repo/testing/), and then install the `naemon` package with your package manager.

#### Source
Download the latest development source code from [github](http://github.com/naemon/naemon).

### Getting started

See the [getting started](/documentation/usersguide/toc.html#getting_started) document in the users guide.
