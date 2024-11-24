---
layout: doctoc
title: Ubuntu Quickstart
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="quickstart.html">Quickstart Installation Guides</a>, <a href="security.html">Security Considerations</a>

### Introduction

This guide is intended to provide you with simple instructions on how to install Naemon from packages on Ubuntu and have it monitoring your local machine within 10 minutes. No advanced installation options are discussed here - just the basics that will work for 95% of users who want to get started.

These instructions were written for:

* Ubuntu Server 14.04 Trusty Tahr
* Ubuntu Server 13.10 Saucy Salamander
* Ubuntu Server 13.04 Raring Ringtail
* Ubuntu Server 12.10 Quantal Quetzal
* Ubuntu Server 12.04 Precise Pangolin
* Ubuntu Server 10.04 Lucid Lynx

### What You'll End Up With

If you follow these instructions, here's what you'll end up with:

<ul>
<li>Nagios plugins will be installed underneath /usr/lib/nagios/plugins/</li>
<li>Naemon will be configured to monitor a few aspects of your local system (CPU load, disk usage, etc.)</li>
<li>The Naemon web interface will be accessible at http://localhost/naemon/</li>
</ul>

### Install instruction 

{{ site.warn }}Don't forget to change your password from default, instruction are found below version specific installation instructions <a href="#change_default_password_for_thruk">here</a>{{ site.end }}

#### Ubuntu Server 14.04 Trusty Tahr
Since 0.8.0 is not available as stable for Ubuntu 14.04 you will have to install via Consol* Labs Repository

**Install dependencies**

```
sudo apt-get install bsd-mailx apache2 apache2-utils libapache2-mod-fcgid libfontconfig1 libjpeg62 libgd3 libxpm4 xvfb libmysqlclient18
```

**Configure Consol Labs repository**

```
gpg --keyserver keys.gnupg.net --recv-keys F8C1CA08A57B9ED7
gpg --armor --export F8C1CA08A57B9ED7 | apt-key add -
sudo su -
echo 'deb http://labs.consol.de/repo/testing/ubuntu trusty main' > /etc/apt/sources.list.d/consol.list
apt-get update
exit
```

**Install Naemon**

```
sudo apt-get install naemon
```

**Install Nagios plugins**

```
sudo apt-get install nagios-plugins
```

**Change path to Nagios plugins**

```
sudo vi /etc/naemon/resource.cfg
```
find *$USER1$=/usr/lib/naemon/plugins*

replace with *$USER1$=/usr/lib/nagios/plugins*

**Restart services**

```
sudo service naemon restart
sudo service apache2 restart
```


#### Ubuntu Server 13.10 Saucy Salamander

**Install dependencies**

```
sudo apt-get install bsd-mailx apache2 apache2-utils libapache2-mod-fcgid libfontconfig1 libjpeg62 libgd3 libxpm4 xvfb libmysqlclient18
```

**Download Naemon**

```
cd ~/
mkdir naemon
cd naemon/
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.10/amd64/naemon-core-dbg_{{ site.release_version }}_ubuntu13.10_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.10/amd64/naemon-core_{{ site.release_version }}_ubuntu13.10_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.10/amd64/naemon-dev_{{ site.release_version }}_ubuntu13.10_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.10/amd64/naemon-livestatus_{{ site.release_version }}_ubuntu13.10_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.10/amd64/naemon-thruk-libs_{{ site.release_version }}_ubuntu13.10_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.10/amd64/naemon-thruk-reporting_{{ site.release_version }}_ubuntu13.10_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.10/amd64/naemon-thruk_{{ site.release_version }}_ubuntu13.10_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.10/amd64/naemon_{{ site.release_version }}_ubuntu13.10_amd64.deb
```

**Install Naemon**

```
sudo dpkg -i naemon*.deb
```

**Install Nagios plugins**

```
sudo apt-get install nagios-plugins
```

**Change path to Nagios plugins**

```
sudo vi /etc/naemon/resource.cfg 
```
find *$USER1$=/usr/lib/naemon/plugins*

replace with *$USER1$=/usr/lib/nagios/plugins*

**Restart services**

```
sudo service naemon restart
sudo service apache2 restart
```

#### Ubuntu Server 13.04 Raring Ringtail

**Install dependencies**

```
sudo apt-get install bsd-mailx apache2 libapache2-mod-fcgid libfontconfig1 libgd2-xpm libjpeg62 libxpm4 xvfb
```

**Download Naemon**

```
cd ~/
mkdir naemon
cd naemon/
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.04/amd64/naemon-core-dbg_{{ site.release_version }}_ubuntu13.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.04/amd64/naemon-core_{{ site.release_version }}_ubuntu13.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.04/amd64/naemon-dev_{{ site.release_version }}_ubuntu13.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.04/amd64/naemon-livestatus_{{ site.release_version }}_ubuntu13.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.04/amd64/naemon-thruk-libs_{{ site.release_version }}_ubuntu13.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.04/amd64/naemon-thruk-reporting_{{ site.release_version }}_ubuntu13.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.04/amd64/naemon-thruk_{{ site.release_version }}_ubuntu13.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu13.04/amd64/naemon_{{ site.release_version }}_ubuntu13.04_amd64.deb
```

**Install Naemon**

```
sudo dpkg -i naemon*.deb
```

**Install Nagios plugins**

```
sudo apt-get install nagios-plugins
```

**Change path to Nagios plugins**

```
sudo vi /etc/naemon/resource.cfg 
```

find *$USER1$=/usr/lib/naemon/plugins*

replace with *$USER1$=/usr/lib/nagios/plugins*

**Restart services**

```
sudo service naemon restart
sudo service apache2 restart
```


#### Ubuntu Server 12.10 Quantal Quetzal

**Install dependencies**

```
sudo apt-get install bsd-mailx apache2 libmysqlclient18 libapache2-mod-fcgid libfontconfig1 libgd2-xpm libjpeg62 libxpm4 xvfb
```

**Download Naemon**

```
cd ~/
mkdir naemon
cd naemon/
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.10/amd64/naemon-core-dbg_{{ site.release_version }}_ubuntu12.10_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.10/amd64/naemon-core_{{ site.release_version }}_ubuntu12.10_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.10/amd64/naemon-dev_{{ site.release_version }}_ubuntu12.10_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.10/amd64/naemon-livestatus_{{ site.release_version }}_ubuntu12.10_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.10/amd64/naemon-thruk-libs_{{ site.release_version }}_ubuntu12.10_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.10/amd64/naemon-thruk-reporting_{{ site.release_version }}_ubuntu12.10_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.10/amd64/naemon-thruk_{{ site.release_version }}_ubuntu12.10_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.10/amd64/naemon_{{ site.release_version }}_ubuntu12.10_amd64.deb
```

**Install Naemon**

```
sudo dpkg -i naemon*.deb
```

**Install Nagios plugins**

```
sudo apt-get install nagios-plugins
```

**Change path to Nagios plugins**

```
sudo vi /etc/naemon/resource.cfg 
```

find *$USER1$=/usr/lib/naemon/plugins*

replace with *$USER1$=/usr/lib/nagios/plugins*

**Restart services**

```
sudo service naemon restart
sudo service apache2 restart
```

#### Ubuntu Server 12.04 Precise Pangolin

**Install dependencies**

```
sudo apt-get install bsd-mailx apache2 libapache2-mod-fcgid libfontconfig1 libgd2-xpm libjpeg62 libxpm4 xvfb libmysqlclient18
```

**Download Naemon**

```
cd ~/
mkdir naemon
cd naemon/
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.04/amd64/naemon-core-dbg_{{ site.release_version }}_ubuntu12.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.04/amd64/naemon-core_{{ site.release_version }}_ubuntu12.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.04/amd64/naemon-dev_{{ site.release_version }}_ubuntu12.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.04/amd64/naemon-livestatus_{{ site.release_version }}_ubuntu12.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.04/amd64/naemon-thruk-libs_{{ site.release_version }}_ubuntu12.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.04/amd64/naemon-thruk-reporting_{{ site.release_version }}_ubuntu12.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.04/amd64/naemon-thruk_{{ site.release_version }}_ubuntu12.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu12.04/amd64/naemon_{{ site.release_version }}_ubuntu12.04_amd64.deb
```

**Install Naemon**

```
sudo dpkg -i naemon*.deb
```

**Install Nagios plugins**

```
sudo apt-get install nagios-plugins
```

**Change path to Nagios plugins**

```
sudo vi /etc/naemon/resource.cfg 
```

find *$USER1$=/usr/lib/naemon/plugins*

replace with *$USER1$=/usr/lib/nagios/plugins*

**Restart services**

```
sudo service naemon restart
sudo service apache2 restart
```


#### Ubuntu Server 10.04 Lucid Lynx

**Install dependencies**

```
sudo apt-get install bsd-mailx apache2 libapache2-mod-fcgid libfontconfig1 libgd2-xpm libjpeg62 libmysqlclient16 libxpm4 xvfb
```

**Download Naemon**

```
cd ~/
mkdir naemon
cd naemon/
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu10.04/amd64/naemon-core-dbg_{{ site.release_version }}_ubuntu10.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu10.04/amd64/naemon-core_{{ site.release_version }}_ubuntu10.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu10.04/amd64/naemon-dev_{{ site.release_version }}_ubuntu10.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu10.04/amd64/naemon-livestatus_{{ site.release_version }}_ubuntu10.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu10.04/amd64/naemon-thruk-libs_{{ site.release_version }}_ubuntu10.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu10.04/amd64/naemon-thruk-reporting_{{ site.release_version }}_ubuntu10.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu10.04/amd64/naemon-thruk_{{ site.release_version }}_ubuntu10.04_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/ubuntu10.04/amd64/naemon_{{ site.release_version }}_ubuntu10.04_amd64.deb
```

**Install Naemon**

```
sudo dpkg -i naemon*.deb
```

**Install Nagios plugins**

```
sudo apt-get install nagios-plugins
```

**Change path to Nagios plugins**

```
sudo vi /etc/naemon/resource.cfg 
```

find *$USER1$=/usr/lib/naemon/plugins*

replace with *$USER1$=/usr/lib/nagios/plugins*

**Restart services**

```
sudo service naemon restart
sudo service apache2 restart
```

### Change default password for Thruk

It's most important to change your password to protect your site for unauthorized access

```
sudo htpasswd /etc/naemon/htpasswd admin
```

### Login to the Web Interface

You should now be able to access the Naemon web interface at the URL below.  You'll be prompted for the username admin and password you specified earlier or admin if you did not change your password.

```
http://localhost/naemon/
```
