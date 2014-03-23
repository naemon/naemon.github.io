---
layout: doctoc
title: Fedora Quickstart
---

{% include review_required.md %}

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="quickstart.html">Quickstart Installation Guides</a>, <a href="security.html">Security Considerations</a>

### Introduction

This guide is intended to provide you with simple instructions on how to install Naemon from source (code) on Fedora and have it monitoring your local machine inside of 20 minutes.  No advanced installation options are discussed here - just the basics that will work for 95% of users who want to get started.

These instructions were written based on a standard <b>Fedora Core 6</b> Linux distribution.

### What You'll End Up With

If you follow these instructions, here's what you'll end up with:

<ul>
<li>Naemon and the plugins will be installed underneath /usr/local/nagios</li>
<li>Naemon will be configured to monitor a few aspects of your local system (CPU load, disk usage, etc.)</li>
<li>The Naemon web interface will be accessible at http://localhost/nagios/</li>
</ul>

### Prerequisites

During portions of the installation you'll need to have <b>root</b> access to your machine.

Make sure you've installed the following packages on your Fedora installation before continuing.

<ul>
<li>Apache</li>
<li>PHP</li>
<li>GCC compiler</li>
<li><a href="http://www.boutell.com/gd/">GD</a> development libraries</li>
</ul>

You can use <i>yum</i> to install these packages by running the following commands (as root):

<pre>
yum install httpd php
yum install gcc glibc glibc-common
yum install gd gd-devel
</pre>

### 1) Create Account Information

Become the root user.

<pre>
su -l
</pre>

Create a new <i>nagios</i> user account and give it a password.

<pre>
/usr/sbin/useradd -m nagios
passwd nagios
</pre>

Create a new <i>nagcmd</i> group for allowing external commands to be submitted through the web interface. Add both the nagios user and the apache user to the group.

<pre>
/usr/sbin/groupadd nagcmd
/usr/sbin/usermod -a -G nagcmd nagios
/usr/sbin/usermod -a -G nagcmd apache
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
service httpd restart
</pre>

{{ site.note }}Consider implementing the ehanced CGI security measures described <a href="cgisecurity.html">here</a> to ensure that your web authentication credentials are not compromised.{{ site.end }}

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

Add Naemon to the list of system services and have it automatically start when the system boots.

<pre>
chkconfig --add nagios
chkconfig nagios on
</pre>

Verify the sample Naemon configuration files.

<pre>
/usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg
</pre>

If there are no errors, start Naemon.

<pre>
service nagios start
</pre>

### 8) Modify SELinux Settings

Fedora ships with SELinux (Security Enhanced Linux) installed and in Enforcing mode by default.  This can result in "Internal Server Error" messages when you attempt to access the Naemon CGIs.

See if SELinux is in Enforcing mode.

<pre>
getenforce
</pre>

Put SELinux into Permissive mode.

<pre>
setenforce 0
</pre>

To make this change permanent, you'll have to modify the settings in <i>/etc/selinux/config</i> and reboot.

Instead of disabling SELinux or setting it to permissive mode, you can use the following command to run the CGIs under SELinux enforcing/targeted mode:

<pre>
chcon -R -t httpd_sys_content_t /usr/local/nagios/sbin/
chcon -R -t httpd_sys_content_t /usr/local/nagios/share/
</pre>

For information on running the Naemon CGIs under Enforcing mode with a targeted policy, visit the <a href="http://support.nagios.com" target="_blank">Naemon Support Portal</a> or <a href="http://wiki.nagios.org" target="_blank">Naemon Community Wiki</a>.

<p>
### 9) Login to the Web Interface

You should now be able to access the Naemon web interface at the URL below.  You'll be prompted for the username (<i>nagiosadmin</i>) and password you specified earlier.

<pre>
http://localhost/nagios/
</pre>

Click on the "Service Detail" navbar link to see details of what's being monitored on your local machine.  It will take a few minutes for Naemon to check all the services associated with your machine, as the checks are spread out over time.

### 10) Other Modifications

Make sure your machine's firewall rules are configured to allow access to the web server if you want to access the Naemon interface remotely.

Configuring email notifications is out of the scope of this documentation.  While Naemon is currently configured to send you email notifications, your system may not yet have a mail program properly installed or configured.  Refer to your system documentation, search the web, or look to the <a href="http://support.nagios.com" target="_blank">Naemon Support Portal</a> or <a href="http://wiki.nagios.org" target="_blank">Naemon Community Wiki</a> for specific instructions on configuring your system to send email messages to external addresses.  More information on notifications can be found <a href="notifications.html">here</a>.

### 11) You're Done

Congratulations!  You sucessfully installed Naemon.  Your journey into monitoring is just beginning.  You'll no doubt want to monitor more than just your local machine, so check out the following docs...

<ul>
<li><a href="monitoring-windows.html">Monitoring Windows machines</a></li>
<li><a href="monitoring-linux.html">Monitoring Linux/Unix machines</a></li>
<li><a href="monitoring-netware.html">Monitoring Netware servers</a></li>
<li><a href="monitoring-routers.html">Monitoring routers/switches</a></li>
<li><a href="monitoring-publicservices.html">Monitoring publicly available services (HTTP, FTP, SSH, etc.)</a></li>
</ul>
