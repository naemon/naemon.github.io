---
layout: doctoc
title: Addon PNP4Nagios Quickstart
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="addons.html">Addons</a>

## Introduction

<a href="images/pnp4nagios-example1.png"><img src="images/pnp4nagios-example1.png" border="0" hspace="10" width="40%" height="40%" alt="pnp4nagios example with Naemon" title="pnp4nagios example with Naemon" style="float: right;"></a>

This guide will help you install PNP4Nagios which gives you graphs for your performance data well integrated with Thruk. Since most package for PNP4Nagios requires Nagios we will have to build it from source. Please don't panic, this guide will help you step by step to add one of the most important addons to Naemon.

These instructions were written for:

* PNP4Nagios 0.6.24
* Ubuntu Server
* CentOS Server
* Redhat Server
* Debian Server
* SUSE Linux Enterprise Server

## Install instruction

### 1 - Install dependencies

#### Redhat / CentOS

```
yum install gcc-c++ rrdtool perl-Time-HiRes perl-rrdtool php-gd php php-cli wget

```

#### Debian / Ubuntu

```
apt-get install make rrdtool librrds-perl g++ php5-cli php5-gd libapache2-mod-php5
```

#### SLES

```
zypper install gcc-c++ rrdtool php53-gd php53 apache2-mod_php53 php53-zlib php53-sockets
```




### 2 - Download PNP4Nagios

```
cd ~/
mkdir src
cd src
wget http://downloads.sourceforge.net/project/pnp4nagios/PNP-0.6/pnp4nagios-0.6.24.tar.gz
```

### 3 - Extract PNP4Nagios source

```
tar -xzvf pnp4nagios-0.6.24.tar.gz -C /usr/local/src/
```


### 4 - Build and install PNP4Nagios

```
cd /usr/local/src/pnp4nagios-0.6.24/
./configure --with-nagios-user=naemon --with-nagios-group=naemon
make all
make install
make install-webconf
make install-config
make install-init
```

### 5 - Start npcd with OS (and right now)

#### Redhat / CentOS

```
chkconfig npcd on
service npcd start
```

#### Debian / Ubuntu

```
update-rc.d npcd defaults
service npcd start
```

#### SLES

```
chkconfig -a npcd
service npcd start
```

### 6 - Modify pnp4nagios.cfg for Naemon

#### Redhat / CentOS

```
vi /etc/httpd/conf.d/pnp4nagios.conf
```

#### Ubuntu 13.10

```
mv /etc/httpd/conf.d/pnp4nagios.conf /etc/apache2/conf-available
ln -sf /etc/apache2/conf-available/pnp4nagios.conf /etc/apache2/conf-enabled/pnp4nagios.conf
vi /etc/apache2/conf-available/pnp4nagios.conf
```

#### Debian / Ubuntu / SLES

```
vi /etc/apache2/conf.d/pnp4nagios.conf
```

edit row: *AuthName "Nagios Access"*

replace with: *AuthName "Naemon Access"*

edit row: *AuthUserFile /usr/local/nagios/etc/htpasswd.users*

replace with: *AuthUserFile /etc/naemon/htpasswd*

### 7 - Modify config_local.php for Naemon

```
vi /usr/local/pnp4nagios/etc/config_local.php
```

edit row: *$conf['nagios_base'] = "/nagios/cgi-bin";*

replace with: *$conf['nagios_base'] = "/naemon/cgi-bin";*

### 8 - Enable Naemon performance data

```
vi /etc/naemon/naemon.cfg
```

edit row: *process_performance_data=0"*

replace with: *process_performance_data=1"*

Add the following entries at the bottom of /etc/naemon/naemon.cfg to setup performance data settings

```
#
# service performance data
#
service_perfdata_file=/usr/local/pnp4nagios/var/service-perfdata
service_perfdata_file_template=DATATYPE::SERVICEPERFDATA\tTIMET::$TIMET$\tHOSTNAME::$HOSTNAME$\tSERVICEDESC::$SERVICEDESC$\tSERVICEPERFDATA::$SERVICEPERFDATA$\tSERVICECHECKCOMMAND::$SERVICECHECKCOMMAND$\tHOSTSTATE::$HOSTSTATE$\tHOSTSTATETYPE::$HOSTSTATETYPE$\tSERVICESTATE::$SERVICESTATE$\tSERVICESTATETYPE::$SERVICESTATETYPE$
service_perfdata_file_mode=a
service_perfdata_file_processing_interval=15
service_perfdata_file_processing_command=process-service-perfdata-file

#
#
#
host_perfdata_file=/usr/local/pnp4nagios/var/host-perfdata
host_perfdata_file_template=DATATYPE::HOSTPERFDATA\tTIMET::$TIMET$\tHOSTNAME::$HOSTNAME$\tHOSTPERFDATA::$HOSTPERFDATA$\tHOSTCHECKCOMMAND::$HOSTCHECKCOMMAND$\tHOSTSTATE::$HOSTSTATE$\tHOSTSTATETYPE::$HOSTSTATETYPE$
host_perfdata_file_mode=a
host_perfdata_file_processing_interval=15
host_perfdata_file_processing_command=process-host-perfdata-file
```

### 9 - Add process performance commands

```
vi /etc/naemon/conf.d/commands.cfg
```

Add the following entries at the bottom of /etc/naemon/conf.d/commands.cfg

```
define command{
       command_name    process-service-perfdata-file
       command_line    /bin/mv /usr/local/pnp4nagios/var/service-perfdata /usr/local/pnp4nagios/var/spool/service-perfdata.$TIMET$
}

define command{
       command_name    process-host-perfdata-file
       command_line    /bin/mv /usr/local/pnp4nagios/var/host-perfdata /usr/local/pnp4nagios/var/spool/host-perfdata.$TIMET$
}
```

### 10 - Add host performance template

```
vi /etc/naemon/conf.d/templates/hosts.cfg
```

Add the following entries at the bottom of /etc/naemon/conf.d/templates/hosts.cfg

```
define host {
   name host-pnp
   process_perf_data 1
   action_url /pnp4nagios/index.php/graph?host=$HOSTNAME$&srv=_HOST_' class='tips' rel='/pnp4nagios/index.php/popup?host=$HOSTNAME$&srv=_HOST_
   register 0
}

```

### 11 - Add service performance template

```
vi /etc/naemon/conf.d/templates/services.cfg
```

Add the following entries at the bottom of /etc/naemon/conf.d/templates/services.cfg

```
define service {
   name service-pnp
   process_perf_data 1
   action_url /pnp4nagios/index.php/graph?host=$HOSTNAME$&srv=$SERVICEDESC$' class='tips' rel='/pnp4nagios/index.php/popup?host=$HOSTNAME$&srv=$SERVICEDESC$
   register 0
}
```

### 12 - Restart services

#### Redhat / CentOS

```
service httpd restart
service naemon restart
```

#### Debian / Ubuntu / SLES

```
service apache2 restart
service naemon restart
```


### 13 - Verify installation of PNP4Nagios
Browse http://server/pnp4nagios and authenticate and verify that everything are OK, fix problems as they occur

### 14 - Remove PNP4Nagios installation file
```
rm /usr/local/pnp4nagios/share/install.php
```

### 15 - Add performance templates to your host and services
Simply add host-pnp to your host or service-pnp to your services to enable graphs. You can add several templates for each host and service definition.

Host example

```
define host {
  host_name                      localhost
  alias                          localhost
  address                        127.0.0.1
  use                            linux-server,host-pnp               ; Name of host template to use
}
```

Service example

```
define service {
  service_description            Current Load
  host_name                      localhost
  use                            local-service,service-pnp           ; Name of service template to use
  check_command                  check_local_load!5.0,4.0,3.0!10.0,6.0,4.0
}
```
