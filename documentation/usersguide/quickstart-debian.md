---
layout: doctoc
title: Debian Quickstart
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="quickstart.html">Quickstart Installation Guides</a>, <a href="security.html">Security Considerations</a>

### Introduction

This guide is intended to provide you with simple instructions on how to install Naemon from packages on Ubuntu and have it monitoring your local machine within 10 minutes. No advanced installation options are discussed here - just the basics that will work for 95% of users who want to get started.

These instructions were written for:

* Debian 8 jessie
* Debian 7 wheezy
* Debian 6 squeeze

### What You'll End Up With

If you follow these instructions, here's what you'll end up with:

<ul>
<li>Nagios plugins will be installed underneath /usr/lib/nagios/plugins/</li>
<li>Naemon will be configured to monitor a few aspects of your local system (CPU load, disk usage, etc.)</li>
<li>The Naemon web interface will be accessible at http://localhost/naemon/</li>
</ul>

### Install instruction 

{{ site.warn }}Don't forget to change your password from default, instruction are found below version specific installation instructions <a href="#change_default_password_for_thruk">here</a>{{ site.end }}

#### Debian 8 jessie

**Install dependencies**

```
apt-get install apache2 apache2-utils libapache2-mod-fcgid libfontconfig1 libgd3 libjpeg8 libmysqlclient18 libpng12-0 libxpm4 xvfb 
```

**Download Naemon**

```
cd ~/
mkdir naemon
cd naemon/
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian8/amd64/naemon-core-dbg_{{ site.release_version }}_debian8_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian8/amd64/naemon-core_{{ site.release_version }}_debian8_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian8/amd64/naemon-dev_{{ site.release_version }}_debian8_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian8/amd64/naemon-livestatus_{{ site.release_version }}_debian8_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian8/amd64/naemon-thruk-libs_{{ site.release_version }}_debian8_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian8/amd64/naemon-thruk-reporting_{{ site.release_version }}_debian8_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian8/amd64/naemon-thruk_{{ site.release_version }}_debian8_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian8/amd64/naemon_{{ site.release_version }}_debian8_amd64.deb
```

**Install Naemon**

```
dpkg -i naemon*.deb
```

**Install Nagios plugins**

```
apt-get install nagios-plugins
```

**Change path to Nagios plugins**

```
vi /etc/naemon/resource.cfg 
```
find *$USER1$=/usr/lib/naemon/plugins*

replace with *$USER1$=/usr/lib/nagios/plugins*

**Restart services**

```
service naemon restart
service apache2 restart
```

#### Debian 7 wheezy 

**Install dependencies**

```
apt-get install apache2 libapache2-mod-fcgid libfontconfig1 libgd2-xpm libjpeg8 libmysqlclient18 libpng12-0 libxpm4 xvfb 
```

**Download Naemon**

```
cd ~/
mkdir naemon
cd naemon/
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian7/amd64/naemon-core-dbg_{{ site.release_version }}_debian7_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian7/amd64/naemon-core_{{ site.release_version }}_debian7_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian7/amd64/naemon-dev_{{ site.release_version }}_debian7_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian7/amd64/naemon-livestatus_{{ site.release_version }}_debian7_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian7/amd64/naemon-thruk-libs_{{ site.release_version }}_debian7_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian7/amd64/naemon-thruk-reporting_{{ site.release_version }}_debian7_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian7/amd64/naemon-thruk_{{ site.release_version }}_debian7_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian7/amd64/naemon_{{ site.release_version }}_debian7_amd64.deb
```

**Install Naemon**

```
dpkg -i naemon*.deb
```

**Install Nagios plugins**

```
apt-get install nagios-plugins
```

**Change path to Nagios plugins**

```
vi /etc/naemon/resource.cfg 
```
find *$USER1$=/usr/lib/naemon/plugins*

replace with *$USER1$=/usr/lib/nagios/plugins*

**Restart services**

```
service naemon restart
service apache2 restart
```


#### Debian 6 squeeze 

**Install dependencies**

```
apt-get install apache2 libapache2-mod-fcgid libfontconfig1 libgd2-xpm libjpeg8 libmysqlclient16 libpng12-0 libxpm4 xvfb 
```

**Download Naemon**

```
cd ~/
mkdir naemon
cd naemon/
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian6/amd64/naemon-core-dbg_{{ site.release_version }}_debian6_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian6/amd64/naemon-core_{{ site.release_version }}_debian6_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian6/amd64/naemon-dev_{{ site.release_version }}_debian6_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian6/amd64/naemon-livestatus_{{ site.release_version }}_debian6_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian6/amd64/naemon-thruk-libs_{{ site.release_version }}_debian6_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian6/amd64/naemon-thruk-reporting_{{ site.release_version }}_debian6_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian6/amd64/naemon-thruk_{{ site.release_version }}_debian6_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/debian6/amd64/naemon_{{ site.release_version }}_debian6_amd64.deb
```

**Install Naemon**

```
dpkg -i naemon*.deb
```

**Install Nagios plugins**

```
apt-get install nagios-plugins
```

**Change path to Nagios plugins**

```
vi /etc/naemon/resource.cfg 
```
find *$USER1$=/usr/lib/naemon/plugins*

replace with *$USER1$=/usr/lib/nagios/plugins*

**Restart services**

```
service naemon restart
service apache2 restart
```

### Change default password for Thruk

It's most important to change your password to protect your site for unauthorized access

```
htpasswd /etc/thruk/htpasswd thrukadmin
```

### Login to the Web Interface

You should now be able to access the Naemon web interface at the URL below.  You'll be prompted for the username admin and password you specified earlier or admin if you did not change your password.

```
http://localhost/naemon/
```
