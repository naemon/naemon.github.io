# SUSE Enterprise Linux Server Quickstart

## See Also
- [Quickstart Installation Guides](quickstart)
- [Security Considerations](security)


## Introduction

This guide is intended to provide you with simple instructions on how to install Naemon from packages on Ubuntu and have it monitoring your local machine within 10 minutes. No advanced installation options are discussed here - just the basics that will work for 95% of users who want to get started.

These instructions were written for:

* SUSE Enterprise Linux Server 11 SP3

## What You'll End Up With

If you follow these instructions, here's what you'll end up with:


Monitoring plugins will be installed underneath `/usr/lib/nagios/plugins/`
Naemon will be configured to monitor a few aspects of your local system (CPU load, disk usage, etc.)
The Naemon web interface will be accessible at `http://localhost/naemon/`


## Install instruction 

> [!WARNING]
> Don't forget to change your password from default, instruction are found below version specific installation instructions [here](#change-default-password-for-thruk)

### SUSE Enterprise Linux Server 11 SP3

**Download Naemon**

```bash
cd ~/
mkdir naemon
cd naemon/
wget -r -np -nH --cut-dirs=6 -R index.* robots.txt http://labs.consol.de/naemon/release/v0.8.0/sles11sp3/x86_64/
```

**Install Naemon**

```bash
zypper install naemon*
```

**Install Nagios plugins**

```bash
zypper install nagios-plugins nagios-plugins-extras
```

**Change path to Nagios plugins**

```bash
vi /etc/naemon/resource.cfg 
```

find `$USER1$=/usr/lib/naemon/plugins`

replace with: `$USER1$=/usr/lib/nagios/plugins`

**Start services**

```bash
chkconfig -a apache2
chkconfig -a naemon
service apache2 restart
service naemon restart
```

## Change default password for Thruk

It's most important to change your password to protect your site for unauthorized access

```
htpasswd /etc/naemon/htpasswd admin
```

## Login to the Web Interface

You should now be able to access the Naemon web interface at the URL below.  You'll be prompted for the username admin and password you specified earlier or admin if you did not change your password.

```
http://localhost/naemon/
```
