---
layout: doctoc
title: CentOS Quickstart
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="quickstart.html">Quickstart Installation Guides</a>, <a href="security.html">Security Considerations</a>

### Introduction

This guide is intended to provide you with simple instructions on how to install Naemon from packages on Ubuntu and have it monitoring your local machine within 10 minutes. No advanced installation options are discussed here - just the basics that will work for 95% of users who want to get started.

These instructions were written for:

* CentOS Server 6.7

### What You'll End Up With

If you follow these instructions, here's what you'll end up with:

<ul>
<li>Nagios plugins will be installed underneath /usr/lib64/nagios/plugins/</li>
<li>Naemon will be configured to monitor a few aspects of your local system (CPU load, disk usage, etc.)</li>
<li>The Naemon web interface will be accessible at http://localhost/naemon/</li>
</ul>

### Install instruction 

{{ site.warn }}Don't forget to change your password from default, instruction are found below version specific installation instructions <a href="#change_default_password_for_thruk">here</a>{{ site.end }}

#### CentOS Server 6.7

**Install the labs.consol.de repository**

```
yum install https://labs.consol.de/repo/stable/rhel6/i386/labs-consol-stable.rhel6.noarch.rpm
```

**Enable epel repository, required for both dependency (mod_fcgid), nrpe and nagios-plugins**

```
yum -y install epel-release
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
htpasswd /etc/thruk/htpasswd thrukadmin
```

### Login to the Web Interface

You should now be able to access the Naemon web interface at the URL below.  You'll be prompted for the username admin and password you specified earlier or admin if you did not change your password.

```
http://localhost/naemon/
```
