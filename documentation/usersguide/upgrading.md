---
layout: doctoc
title: Upgrading Naemon
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="quickstart.html">Quickstart Installation Guide</a>


### Upgrading Naemon From an DEB/RPM Installation

Upgrading an existing installation which is already installed from a package repository is
probably the easiest task. Since these repositories are designed for exactly this task, you
just have to use your favorite package tool and perform the update.

Debian / Ubuntu:

```bash
  %> apt-get update
  %> apt-get install naemon
```

Redhat / Centos / Fedora:

```bash
  %> yum install naemon
```

SLES / OpenSuse:

```bash
  %> zypper install naemon
```


### Upgrading From Nagios 3.x Releases

As newer and stable releases of Naemon are released, you should strongly consider upgrading as soon as possible.
Newer releases usually contain <a href="/documentation/developer/bugs/">critical bug fixes</a>, so its important to stay up to date.
Assuming you've already installed Nagios in '/etc/nagios', you can install Naemon easily besides your currently installation.
Here's the upgrade process...

Make sure you have a good backup of your existing installation and configuration files.
A Naemon installation won't alter your Nagios installation, but just in case
anything goes wrong or doesn't work, this will allow you to rollback to your old version.

Migration from Nagios is usually very easy. After the installation of Naemon
you only need to copy the conf.d folder into /etc/naemon/conf.d. Also verify
that your USER macros in your /etc/naemon/resource.cfg point to the same locations
as before.

{{ site.warn }}
You may have to adjust the paths in the following commands to your needs.
{{ site.end }}

Clean up sample config but make sure you don't need any of those files anymore.

```bash
  %> rm -f /etc/naemon/conf.d/*
```

Copy existing configuration files:

```bash
  %> cp -rp /etc/nagios/conf.d/      /etc/naemon/conf.d/
  %> cp -rp /etc/nagios/resource.cfg /etc/naemon/
  %> cp -rp /etc/nagios/cgi.cfg      /etc/naemon/
```

Your object configuration files may vary, just copy them into the new conf.d folder.

Copy existing logfiles and archive:

```bash
  %> cp -rp /var/log/nagios/archive/*.log /var/log/naemon/archive
  %> cp -rp /var/log/nagios/nagios.log /var/log/naemon/naemon.log
```

Copy existing status file:

```bash
  %> cp -rp /var/lib/nagios/retention.dat  /var/lib/naemon/
```

{{ site.info }}Naemon can coexist with your current installation, it uses different users and folders.{{ site.end }}

Edit the main configuration file and replace

<ul>
<li><i>nagios_user</i> with <i>naemon_user</i></li>
<li><i>nagios_group</i> with <i>naemon_group</i></li>
</ul>

Read the <a href="config-incompat3to4.html">configuration incompatibilities</a> guide.

Start naemon

```bash
  %> /etc/init.d/naemon start
```

In case of configuration errors, see the <a href="verifyconfig.html">verify configuration</a>
page and the <a href="startstop.html">start/stop</a> page.

That's it - you're done!




### Upgrading From Nagios 2.x

It shouldn't be too difficult to upgrade from Nagios 2.x to Naemon.
The upgrade is essentially the same as what is described above for upgrading to newer Naemon releases.
You will, however, have to change your configuration files a bit so they work with Naemon:

<ul>
<li>The old <i>service_reaper_frequency</i> variable in the main config file has been renamed to
    <a href="configmain.html#check_result_reaper_frequency">check_result_reaper_frequency</a>.</li>
<li>The old <i>$NOTIFICATIONNUMBER$</i> macro has been deprecated in favor of new
    <a href="macrolist.html#hostnotificationnumber">$HOSTNOTIFICATIONNUMBER$</a> and
    <a href="macrolist.html#servicenotificationnumber">$SERVICENOTIFICATIONNUMBER$</a> macros.</li>
<li>The old <i>parallelize</i> directive in service definitions is now deprecated and no
    longer used, as all service checks are run in parallel.</li>
<li>The old <i>aggregate_status_updates</i> option has been removed. All status file updates are
    now aggregated at a minimum interval of 1 second.</li>
<li>Extended host and extended service definitions have been deprecated. They are still read and
    processed by Naemon, but it is recommended that you move the directives found in these definitions
    to your host and service definitions, respectively.</li>
<li>The old <i>downtime_file</i> file variable in the main config file is no longer supported, as
    scheduled downtime entries are now saved in the <a href="configmain.html#state_retention_file">retention file</a>.
    To preserve existing downtime entries, stop Naemon and append the contents of your old downtime
    file to the retention file.</li>
<li>The old <i>comment_file</i> file variable in the main config file is no longer supported, as
    comments are now saved in the <a href="configmain.html#state_retention_file">retention file</a>.
    To preserve existing comments, stop Naemon and append the contents of your old comment file to the retention file.</li>
</ul>

Also make sure to read the "<a href="whatsnew.html">What's New</a>" section of the documentation.
It describes all the changes that were made to the Naemon code since the latest stable releases.
Quite a bit has changed, so make sure you read it over.
