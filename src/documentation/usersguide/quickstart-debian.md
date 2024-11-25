# Debian Quickstart

## Introduction

This guide is intended to provide you with simple instructions on how to install Naemon from packages on Ubuntu and have it monitoring your local machine within 10 minutes. No advanced installation options are discussed here - just the basics that will work for 95% of users who want to get started.

These instructions were written for:

* Debian 9 stretch
* Debian 8 jessie
* Debian 7 wheezy
* Debian 6 squeeze

## What You'll End Up With

If you follow these instructions, here's what you'll end up with:


 - Monitoring plugins will be installed underneath `/usr/lib/naemon/plugins/` (a symlink to `/usr/lib/nagios/plugins/`)
 - Naemon will be configured to monitor a few aspects of your local system (CPU load, disk usage, etc.)`
 - The Naemon web interface will be accessible at `http://localhost/naemon/`


## Install instruction 

> [!WARNING]
> Don't forget to change your password from default, instruction are found below version specific installation instructions [here](#change-default-password-for-thruk)


### Debian 9 stretch 

**Add Consol Labs Repository**  
Install dirmngr if you do not already have it:
```bash
apt-get install dirmngr
```

Install GPG Key
```bash
gpg --keyserver keys.gnupg.net --recv-keys F8C1CA08A57B9ED7
gpg --armor --export F8C1CA08A57B9ED7 | apt-key add -
```

Add the apt Repository
```bash
echo "deb http://labs.consol.de/repo/stable/debian $(lsb_release -cs) main" > /etc/apt/sources.list.d/labs-consol-stable.list
```
**Install Naemon**
```bash
apt-get update
apt-get install naemon
```


### Debian 8 jessie

**Install dependencies**

```bash
apt-get install apache2 apache2-utils libapache2-mod-fcgid libfontconfig1 libgd3 libjpeg8 libmysqlclient18 libpng12-0 libxpm4 xvfb 
```

**Download Naemon**

```bash-vue
cd ~/
mkdir naemon
cd naemon/
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian8/amd64/naemon-core-dbg_{{ $RELEASE_VERSION  }}_debian8_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian8/amd64/naemon-core_{{ $RELEASE_VERSION  }}_debian8_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian8/amd64/naemon-dev_{{ $RELEASE_VERSION  }}_debian8_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian8/amd64/naemon-livestatus_{{ $RELEASE_VERSION  }}_debian8_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian8/amd64/naemon-thruk-libs_{{ $RELEASE_VERSION  }}_debian8_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian8/amd64/naemon-thruk-reporting_{{ $RELEASE_VERSION  }}_debian8_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian8/amd64/naemon-thruk_{{ $RELEASE_VERSION  }}_debian8_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian8/amd64/naemon_{{ $RELEASE_VERSION  }}_debian8_amd64.deb
```

**Install Naemon**

```bash
dpkg -i naemon*.deb
```

**Install Nagios plugins**

```bash
apt-get install nagios-plugins
```

**Change path to Nagios plugins**

```bash
vi /etc/naemon/resource.cfg 
```
find `$USER1$=/usr/lib/naemon/plugins`

replace with `$USER1$=/usr/lib/nagios/plugins`

**Restart services**

```bash
service naemon restart
service apache2 restart
```

### Debian 7 wheezy 

**Install dependencies**

```bash
apt-get install apache2 libapache2-mod-fcgid libfontconfig1 libgd2-xpm libjpeg8 libmysqlclient18 libpng12-0 libxpm4 xvfb 
```

**Download Naemon**

```bash-vue
cd ~/
mkdir naemon
cd naemon/
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian7/amd64/naemon-core-dbg_{{ $RELEASE_VERSION  }}_debian7_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian7/amd64/naemon-core_{{ $RELEASE_VERSION  }}_debian7_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian7/amd64/naemon-dev_{{ $RELEASE_VERSION  }}_debian7_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian7/amd64/naemon-livestatus_{{ $RELEASE_VERSION  }}_debian7_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian7/amd64/naemon-thruk-libs_{{ $RELEASE_VERSION  }}_debian7_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian7/amd64/naemon-thruk-reporting_{{ $RELEASE_VERSION  }}_debian7_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian7/amd64/naemon-thruk_{{ $RELEASE_VERSION  }}_debian7_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian7/amd64/naemon_{{ $RELEASE_VERSION  }}_debian7_amd64.deb
```

**Install Naemon**

```bash
dpkg -i naemon*.deb
```

**Install Nagios plugins**

```bash
apt-get install nagios-plugins
```

**Change path to Nagios plugins**

```bash
vi /etc/naemon/resource.cfg 
```
find `$USER1$=/usr/lib/naemon/plugins`

replace with `$USER1$=/usr/lib/nagios/plugins`

**Restart services**

```bash
service naemon restart
service apache2 restart
```


### Debian 6 squeeze 

**Install dependencies**

```bash
apt-get install apache2 libapache2-mod-fcgid libfontconfig1 libgd2-xpm libjpeg8 libmysqlclient16 libpng12-0 libxpm4 xvfb 
```

**Download Naemon**

```bash-vue
cd ~/
mkdir naemon
cd naemon/
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian6/amd64/naemon-core-dbg_{{ $RELEASE_VERSION  }}_debian6_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian6/amd64/naemon-core_{{ $RELEASE_VERSION  }}_debian6_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian6/amd64/naemon-dev_{{ $RELEASE_VERSION  }}_debian6_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian6/amd64/naemon-livestatus_{{ $RELEASE_VERSION  }}_debian6_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian6/amd64/naemon-thruk-libs_{{ $RELEASE_VERSION  }}_debian6_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian6/amd64/naemon-thruk-reporting_{{ $RELEASE_VERSION  }}_debian6_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian6/amd64/naemon-thruk_{{ $RELEASE_VERSION  }}_debian6_amd64.deb
wget http://labs.consol.de/naemon/release/v{{ $RELEASE_VERSION  }}/debian6/amd64/naemon_{{ $RELEASE_VERSION  }}_debian6_amd64.deb
```

**Install Naemon**

```bash
dpkg -i naemon*.deb
```

**Install Nagios plugins**

```bash
apt-get install nagios-plugins
```

**Change path to Nagios plugins**

```bash
vi /etc/naemon/resource.cfg 
```
find `$USER1$=/usr/lib/naemon/plugins`

replace with `$USER1$=/usr/lib/nagios/plugins`

**Restart services**

```bash
service naemon restart
service apache2 restart
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
