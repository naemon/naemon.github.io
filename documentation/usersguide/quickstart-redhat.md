---
layout: doctoc
title: Redhat Quickstart
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="quickstart.html">Quickstart Installation Guides</a>, <a href="security.html">Security Considerations</a>

### Introduction

This guide is intended to provide you with simple instructions on how to install Naemon from packages on Ubuntu and have it monitoring your local machine within 10 minutes. No advanced installation options are discussed here - just the basics that will work for 95% of users who want to get started.

These instructions were written for:

* Redhat Enterprise Server 6.5

### What You'll End Up With

If you follow these instructions, here's what you'll end up with:

<ul>
<li>Nagios plugins will be installed underneath /usr/lib/nagios/plugins/</li>
<li>Naemon will be configured to monitor a few aspects of your local system (CPU load, disk usage, etc.)</li>
<li>The Naemon web interface will be accessible at http://localhost/naemon/</li>
</ul>

### Install instruction 

{{ site.warn }}Don't forget to change your password from default, instruction are found below version specific installation instructions <a href="#change_default_password_for_thruk">here</a>{{ site.end }}

#### Redhat Enterprise Server 6.5

**Install dependencies**

```
yum install wget gd libXpm httpd
```

**Enable RHEL Server Optional repository**

```
sudo yum-config-manager --enable rhel-6-[operating_system]-optional-rpms
```

*operating_system - type of operating system installed. Enter either workstation, client or server.*

```
yum install xorg-x11-server-Xvfb
```

**Enable epel repository, required for both dependency (mod_fcgid), nrpe and nagios-plugins**

```
rpm -Uvh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
```

**Install mod_fcgid**

```
yum install mod_fcgid
```

**Download Naemon**

```
cd ~/
mkdir naemon
cd naemon/
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/rhel6/x86_64/naemon-core-dbg-{{ site.release_version }}-1.rhel6.x86_64.rpm
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/rhel6/x86_64/naemon-core-{{ site.release_version }}-1.rhel6.x86_64.rpm
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/rhel6/x86_64/naemon-devel-{{ site.release_version }}-1.rhel6.x86_64.rpm
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/rhel6/x86_64/naemon-livestatus-{{ site.release_version }}-1.rhel6.x86_64.rpm
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/rhel6/x86_64/naemon-thruk-libs-{{ site.release_version }}-1.rhel6.x86_64.rpm
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/rhel6/x86_64/naemon-thruk-reporting-{{ site.release_version }}-1.rhel6.x86_64.rpm
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/rhel6/x86_64/naemon-thruk-{{ site.release_version }}-1.rhel6.x86_64.rpm
wget http://labs.consol.de/naemon/release/v{{ site.release_version }}/rhel6/x86_64/naemon-{{ site.release_version }}-1.rhel6.x86_64.rpm
```

**Install Naemon**

```
yum install naemon*
```

**Disable SELinux, not supported by Thruk**

```
setenforce 0
```

**Make it persistent**

```
vi /etc/selinux/config
```

edit row: *"SELINUX=enforcing"*

replace with: *"SELINUX=disabled"*

**Install Nagios plugins**

```
yum install nagios-plugins nagios-plugins-all nagios-plugins-nrpe nrpe
```

**Change path to Nagios plugins**

```
vi /etc/naemon/resource.cfg 
```

find *$USER1$=/usr/lib/naemon/plugins*

replace with *replace with: "$USER1$=/usr/lib64/nagios/plugins"*

**Start services**

```
service iptables stop # This is just for testing and will restart the firewall after reboot, please adjust your IP-tables accordingly
chkconfig httpd on && service httpd start
chkconfig naemon on && service naemon start
chkconfig thruk on && service thruk start
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
