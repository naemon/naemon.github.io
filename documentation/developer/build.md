---
layout: doc
title: Core Development
---

#### Build Naemon From Scratch

##### Build Git Development Version
Developers, Testers and early adopters may want to build their own packages, so here is how:

We use CentOS 6 in our example. For Debian based system, replace 'make rpm' with 'make deb'
and install the dependencies according to your system.

First install some basic dependencies:

```bash
%> sudo yum install git perl perl-Module-Install automake gperf gcc-c++ \
     autoconf libtool gd-devel expat-devel mysql-devel rpm-build \
     wget httpd tar logrotate help2man libicu-devel
```

Then clone our repository in any folder you like:

```bash
%> git clone --recursive https://github.com/naemon/naemon.git
```

Update all git submodules:

```bash
%> cd naemon/
%> make update
```

Finally build your rpm package:

```bash
%> ./configure --without-compress
%> make rpm
```
