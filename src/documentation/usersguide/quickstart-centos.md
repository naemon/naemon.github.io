# CentOS Quickstart

## See Also
- [Quickstart Installation Guides](quickstart)
- [Security Considerations](security)

## Introduction

This guide is intended to provide you with simple instructions on how to install Naemon from packages on Ubuntu and have it monitoring your local machine within 10 minutes. No advanced installation options are discussed here - just the basics that will work for 95% of users who want to get started.

These instructions were written for:

* CentOS Server 6.7

## What You'll End Up With

If you follow these instructions, here's what you'll end up with:


 - Monitoring plugins will be installed underneath `/usr/lib64/nagios/plugins/`
 - Naemon will be configured to monitor a few aspects of your local system (CPU load, disk usage, etc.)
 - The Naemon web interface will be accessible at `http://localhost/naemon/`


## Install instruction 

> [!WARNING]
> Don't forget to change your password from default, instruction are found below version specific installation instructions [here](#change-default-password-for-thruk)

### CentOS Server 6.7

**Install the labs.consol.de repository**

```bash
yum install https://labs.consol.de/repo/stable/rhel6/i386/labs-consol-stable.rhel6.noarch.rpm
```

**Enable epel repository, required for both dependency (mod_fcgid), nrpe and nagios-plugins**

```bash
yum -y install epel-release
```

**Install Naemon**

```bash
yum install naemon*
```

**Disable SELinux, not supported by Thruk**

```
setenforce 0
```

**Make it persistent**

```bash
vi /etc/selinux/config
```

edit row: `SELINUX=enforcing`

replace with: `SELINUX=disabled`

**Install Nagios plugins**

```bash
yum install nagios-plugins nagios-plugins-all nagios-plugins-nrpe nrpe
```

**Start services**

```
service iptables stop # This is just for testing and will restart the firewall after reboot, please adjust your IP-tables accordingly
chkconfig httpd on && service httpd start
chkconfig naemon on && service naemon start
chkconfig thruk on && service thruk start
```

## Change default password for Thruk

It's most important to change your password to protect your site for unauthorized access

```
htpasswd /etc/thruk/htpasswd thrukadmin
```

## Login to the Web Interface

You should now be able to access the Naemon web interface at the URL below.  You'll be prompted for the username admin and password you specified earlier or admin if you did not change your password.

```
http://localhost/naemon/
```
