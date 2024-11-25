---
layout: doctoc
title: SUSE Enterprise Linux Server Quickstart
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="quickstart.html">Quickstart Installation Guides</a>, <a href="security.html">Security Considerations</a>

### Introduction

This guide is intended to provide you with simple instructions on how to install Naemon from packages on Ubuntu and have it monitoring your local machine within 10 minutes. No advanced installation options are discussed here - just the basics that will work for 95% of users who want to get started.

These instructions were written for:

* SUSE Enterprise Linux Server 11 SP3

### What You'll End Up With

If you follow these instructions, here's what you'll end up with:

<ul>
<li>Nagios plugins will be installed underneath /usr/lib/nagios/plugins/</li>
<li>Naemon will be configured to monitor a few aspects of your local system (CPU load, disk usage, etc.)</li>
<li>The Naemon web interface will be accessible at http://localhost/naemon/</li>
</ul>

### Install instruction 

{{ site.warn }}Don't forget to change your password from default, instruction are found below version specific installation instructions <a href="#change_default_password_for_thruk">here</a>{{ site.end }}

#### SUSE Enterprise Linux Server 11 SP3

**Download Naemon**

```
cd ~/
mkdir naemon
cd naemon/
wget -r -np -nH --cut-dirs=6 -R index.* robots.txt http://labs.consol.de/naemon/release/v0.8.0/sles11sp3/x86_64/
```

**Install Naemon**

```
zypper install naemon*
```

**Install Nagios plugins**

```
zypper install nagios-plugins nagios-plugins-extras
```

**Change path to Nagios plugins**

```
vi /etc/naemon/resource.cfg 
```

find *$USER1$=/usr/lib/naemon/plugins*

replace with *replace with: "$USER1$=/usr/lib/nagios/plugins"*

**Start services**

```
chkconfig -a apache2
chkconfig -a naemon
service apache2 restart
service naemon restart
```

### Change default password for Thruk

It's most important to change your password to protect your site for unauthorized access

```
htpasswd /etc/naemon/htpasswd admin
```

### Login to the Web Interface

You should now be able to access the Naemon web interface at the URL below.  You'll be prompted for the username admin and password you specified earlier or admin if you did not change your password.

```
http://localhost/naemon/
```
