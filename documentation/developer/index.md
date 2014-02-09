---
layout: affix
title: Developer Documentation
---

### Core

#### Build Naemon From Scratch

##### Build Git Development Version
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


### API



### Documentation

#### Run Naemon Website Locally

For example on Ubuntu 12.04. We don't have a recent bundler here, so just use
gem directly.

```bash
  %> sudo apt-get install ruby1.9.3 ruby1.9.1-dev   # yes, thats not a typo
  %> cd /tmp && git clone https://github.com/naemon/naemon.github.io.git
  %> cd /tmp/naemon.github.io
  %> GEM_HOME=.gem gem1.9.3 install github-pages
  %> GEM_HOME=.gem ./.gem/bin/jekyll serve --watch
```

After the initial install, only the last step is required to start the server.
