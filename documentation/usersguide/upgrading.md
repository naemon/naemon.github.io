---
layout: doctoc
title: Upgrading Naemon
---


<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="quickstart.html">Quickstart Installation Guide</a>

### Contents<br><br>

<a href="#nagios3x">Upgrading from previous Naemon 3.x releases</a><br>
<a href="#nagios2x">Upgrading from Naemon 2.x</a><br>
<a href="#rpm">Upgrading from an RPM installation</a><br>

<a name="nagios3x"></a>

### Upgrading From Previous Naemon 3.x Releases

As newer alpha, beta, and stable releases of Naemon 3.x are released, you should strongly consider upgrading as soon as possible.  Newer releases usually contain critical bug fixes, so its important to stay up to date.  Assuming you've already installed Naemon from source code as described in the <a href="quickstart.html">quickstart guide</a>, you can install newer versions of Naemon 3.x easily.  You don't even need root access to do it, as everything that needed to be done as root was done during the initial install.  Here's the upgrade process...

Make sure you have a good backup of your existing Naemon installation and configuration files.  If anything goes wrong or doesn't work, this will allow you to rollback to your old version.

Become the nagios user.  Debian/Ubuntu users should use <i>sudo -s nagios</i>.

<pre>
su -l nagios
</pre>

Removed the following old HTML files that were used by the web frontend.  They have been replaced by PHP equivalents.

<pre>
rm /usr/local/nagios/share/{main,side,index}.html
</pre>

Download the source code tarball of the latest version of Naemon (visit <a href="http://www.nagios.org/download/">http://www.nagios.org/download/</a> for the link to the latest version).

<pre>
wget http://osdn.dl.sourceforge.net/sourceforge/nagios/nagios-<i>3.x</i>.tar.gz
</pre>

Extract the Naemon source code tarball.

<pre>
tar xzf nagios-<i>3.x</i>.tar.gz
cd nagios-<i>3.x</i>
</pre>

Run the Naemon configure script, passing the name of the group used to control external command file permissions like so:

<pre>
./configure --with-command-group=nagcmd
</pre>

Compile the Naemon source code.

<pre>
make all
</pre>

Install updated binaries, documentation, and web web interface.  Your existing configuration files will not be overwritten by this step.

<pre>
make install
</pre>

Verify your configuration files.  Correct any errors shown here before proceeding with the next step.

<pre>
/usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg
</pre>

Restart Naemon.  Debian/Ubuntu users should use <i>/etc/init.d/nagios restart</i>.

<pre>
/sbin/service nagios restart
</pre>

That's it - you're done!

<a name="nagios2x"></a>

### Upgrading From Naemon 2.x

It shouldn't be too difficult to upgrade from Naemon 2.x to Naemon 3.  The upgrade is essentially the same as what is described above for upgrading to newer 3.x releases.  You will, however, have to change your configuration files a bit so they work with Naemon 3:

<ul>
<li>The old <i>service_reaper_frequency</i> variable in the main config file has been renamed to <a href="configmain.html#check_result_reaper_frequency">check_result_reaper_frequency</a>.</li>
<li>The old <i>$NOTIFICATIONNUMBER$</i> macro has been deprecated in favor of new <a href="macrolist.html#hostnotificationnumber">$HOSTNOTIFICATIONNUMBER$</a> and <a href="macrolist.html#servicenotificationnumber">$SERVICENOTIFICATIONNUMBER$</a> macros.</li>
<li>The old <i>parallelize</i> directive in service definitions is now deprecated and no longer used, as all service checks are run in parallel.</li>
<li>The old <i>aggregate_status_updates</i> option has been removed.  All status file updates are now aggregated at a minimum interval of 1 second.</li>
<li>Extended host and extended service definitions have been deprecated.  They are still read and processed by Naemon, but it is recommended that you move the directives found in these definitions to your host and service definitions, respectively.</li>
<li>The old <i>downtime_file</i> file variable in the main config file is no longer supported, as scheduled downtime entries are now saved in the <a href="configmain.html#state_retention_file">retention file</a>.  To preserve existing downtime entries, stop Naemon 2.x and append the contents of your old downtime file to the retention file.</li>
<li>The old <i>comment_file</i> file variable in the main config file is no longer supported, as comments are now saved in the <a href="configmain.html#state_retention_file">retention file</a>.  To preserve existing comments, stop Naemon 2.x and append the contents of your old comment file to the retention file.</li>
</ul>

Also make sure to read the "<a href="whatsnew.html">What's New</a>" section of the documentation.  It describes all the changes that were made to the Naemon 3 code since the latest stable release of Naemon 2.x.  Quite a bit has changed, so make sure you read it over.

<a name="rpm"></a>

### Upgrading From an RPM Installation

If you currently have an RPM- or Debian/Ubuntu APT package-based installation of Naemon and you would like to transition to installing Naemon from the official source code distribution, here's the basic process you should follow:

<ol>
<li>Stop Naemon</li>
<li>Backup your existing Naemon installation</li>
<ul>
<li>Configuration files</li>
<ul>
<li>Main config file (usually <i>nagios.cfg</i>)</li>
<li>Resource config file (usually <i>resource.cfg</i>)</li>
<li>CGI config file (usually <i>cgi.cfg</i>)</li>
<li>All your object definition files</li>
</ul>
<li>Retention file (usually <i>retention.dat</i>)</li>
<li>Current Naemon log file (usually <i>nagios.log</i>)</li>
<li>Archived Naemon log files</li>
</ul>
<li>Uninstall the original RPM or APT package</li>
<li>Install Naemon from source by following the <a href="quickstart.html">quickstart guide</a></li>
<li>Restore your original Naemon configuration files, retention file, and log files</li>
<li><a href="verifyconfig.html">Verify</a> your configuration and <a href="startstop.html">start</a> Naemon</li>
</ol>

Note that different RPMs or APT packages may install Naemon in different ways and in different locations.  Make sure you've backed up all your critical Naemon files before removing the original RPM or APT package, so you can revert back if you encounter problems.
