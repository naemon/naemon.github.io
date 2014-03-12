---
layout: doctoc
title: Ubuntu Quickstart
---


<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="quickstart.html">Quickstart Installation Guides</a>, <a href="security.html">Security Considerations</a>

### Introduction

This guide is intended to provide you with simple instructions on how to install Naemon from source (code) on Ubuntu and have it monitoring your local machine inside of 20 minutes.  No advanced installation options are discussed here - just the basics that will work for 95% of users who want to get started.

These instructions were written based on an <b>Ubuntu 6.10</b> (desktop) installation.  They should work for an <b>Ubuntu 7.10</b> install as well.

### What You'll End Up With

If you follow these instructions, here's what you'll end up with:

<ul>
<li>Naemon and the plugins will be installed underneath /usr/local/nagios</li>
<li>Naemon will be configured to monitor a few aspects of your local system (CPU load, disk usage, etc.)</li>
<li>The Naemon web interface will be accessible at http://localhost/nagios/</li>
</ul>

### Required Packages

Make sure you've installed the following packages on your Ubuntu installation before continuing. 

<ul>
<li>Apache 2</li>
<li>PHP</li>
<li>GCC compiler and development libraries</li>
<li>GD development libraries</li>
</ul>

You can use <i>apt-get</i> to install these packages by running the following commands:

<pre>
sudo apt-get install apache2
sudo apt-get install libapache2-mod-php5
sudo apt-get install build-essential
</pre>

With Ubuntu 6.10, install the gd2 library with this command:

<pre>
sudo apt-get install libgd2-dev
</pre>

With Ubuntu 7.10, the gd2 library name has changed, so you'll need to use the following:

<pre>
sudo apt-get install libgd2-xpm-dev
</pre>

### 1) Create Account Information

Become the root user.

<pre>
sudo -s
</pre>

Create a new <i>nagios</i> user account and give it a password.

<pre>
/usr/sbin/useradd -m -s /bin/bash nagios
passwd nagios
</pre>

On older Ubuntu server editions (6.01 and earlier), you will need to also add a <i>nagios</i> group (it's not created by default).  You should be able to skip this step on desktop, or newer server editions of Ubuntu.

<pre>
/usr/sbin/groupadd nagios
/usr/sbin/usermod -G nagios nagios
</pre>

Create a new <i>nagcmd</i> group for allowing external commands to be submitted through the web interface. Add both the nagios user and the apache user to the group.

<pre>
/usr/sbin/groupadd nagcmd
/usr/sbin/usermod -a -G nagcmd nagios
/usr/sbin/usermod -a -G nagcmd www-data
</pre>

### 2) Download Naemon and the Plugins

Create a directory for storing the downloads.

<pre>
mkdir ~/downloads
cd ~/downloads
</pre>

Download the source code tarballs of both Naemon and the Naemon plugins (visit <a href="http://www.nagios.org/download/">http://www.nagios.org/download/</a> for links to the latest versions).  These directions were tested with Naemon 3.1.1 and Naemon Plugins 1.4.11.

<pre>
wget http://prdownloads.sourceforge.net/sourceforge/nagios/nagios-3.2.3.tar.gz
wget http://prdownloads.sourceforge.net/sourceforge/nagiosplug/nagios-plugins-1.4.11.tar.gz
</pre>

### 3) Compile and Install Naemon

Extract the Naemon source code tarball.

<pre>
cd ~/downloads
tar xzf nagios-3.2.3.tar.gz
cd nagios-3.2.3
</pre>

Run the Naemon configure script, passing the name of the group you created earlier like so:

<pre>
./configure --with-command-group=nagcmd
</pre>

Compile the Naemon source code.

<pre>
make all
</pre>

Install binaries, init script, sample config files and set permissions on the external command directory.

<pre>
make install
make install-init
make install-config
make install-commandmode
</pre>

Don't start Naemon yet - there's still more that needs to be done...

### 4) Customize Configuration

Sample <a href="config.html">configuration files</a> have now been installed in the <i>/usr/local/nagios/etc</i> directory.  These sample files should work fine for getting started with Naemon.  You'll need to make just one change before you proceed...

Edit the <i>/usr/local/nagios/etc/objects/contacts.cfg</i> config file with your favorite editor and change the email address associated with the <i>nagiosadmin</i> contact definition to the address you'd like to use for receiving alerts.

<pre>
vi /usr/local/nagios/etc/objects/contacts.cfg
</pre>

### 5) Configure the Web Interface

Install the Naemon web config file in the Apache conf.d directory.

<pre>
make install-webconf
</pre>

Create a <i>nagiosadmin</i> account for logging into the Naemon web interface.  Remember the password you assign to this account - you'll need it later.

<pre>
htpasswd -c /usr/local/nagios/etc/htpasswd.users nagiosadmin
</pre>

Restart Apache to make the new settings take effect.

<pre>
/etc/init.d/apache2 reload
</pre>

<span class="glyphicon glyphicon-pencil"></span> Note: Consider implementing the ehanced CGI security measures described <a href="cgisecurity.html">here</a> to ensure that your web authentication credentials are not compromised.

### 6) Compile and Install the Naemon Plugins

Extract the Naemon plugins source code tarball.

<pre>
cd ~/downloads
tar xzf nagios-plugins-1.4.11.tar.gz
cd nagios-plugins-1.4.11
</pre>

Compile and install the plugins.

<pre>
./configure --with-nagios-user=nagios --with-nagios-group=nagios
make
make install
</pre>

### 7) Start Naemon

Configure Naemon to automatically start when the system boots.

<pre>
ln -s /etc/init.d/nagios /etc/rcS.d/S99nagios
</pre>

Verify the sample Naemon configuration files.

<pre>
/usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg
</pre>

If there are no errors, start Naemon.

<pre>
/etc/init.d/nagios start
</pre>

### 8) Login to the Web Interface

You should now be able to access the Naemon web interface at the URL below.  You'll be prompted for the username (<i>nagiosadmin</i>) and password you specified earlier.

<pre>
http://localhost/nagios/
</pre>

Click on the "Service Detail" navbar link to see details of what's being monitored on your local machine.  It will take a few minutes for Naemon to check all the services associated with your machine, as the checks are spread out over time.

### 9) Other Modifications

If you want to receive email notifications for Naemon alerts, you need to install the mailx (Postfix) package.

<pre>
sudo apt-get install mailx
sudo apt-get install postfix
</pre>

You'll have to edit the Naemon email notification commands found in <i>/usr/local/nagios/etc/objects/commands.cfg</i> and change any '/bin/mail' references to '/usr/bin/mail'.  Once you do that you'll need to restart Naemon to make the configuration changes live.

<pre>
sudo /etc/init.d/nagios restart
</pre>

Configuring email notifications is outside the scope of this documentation.  Refer to your system documentation, search the web, or look to the <a href="http://support.nagios.com" target="_blank">Naemon Support Portal</a> or <a href="http://wiki.nagios.org" target="_blank">Naemon Community Wiki</a> for specific instructions on configuring your Ubuntu system to send email messages to external addresses.
