# Upgrading Naemon

## See Also
- [Quickstart Installation Guide](quickstart)


### Upgrading Naemon From an DEB/RPM Installation

Upgrading an existing installation which is already installed from a package repository is
probably the easiest task. Since these repositories are designed for exactly this task, you
just have to use your favorite package tool and perform the update.

Debian / Ubuntu:

```bash
apt-get update
apt-get install naemon
```

Redhat / Centos / Fedora:

```bash
yum install naemon
```

SLES / OpenSuse:

```bash
zypper install naemon
```


### Upgrading From Nagios 3.x Releases

As newer and stable releases of Naemon are released, you should strongly consider upgrading as soon as possible.
Newer releases usually contain [critical bug fixes](whatsnew#known-issues), so its important to stay up to date.
Assuming you've already installed Nagios in `/etc/nagios`, you can install Naemon easily besides your currently installation.
Here's the upgrade process...

Make sure you have a good backup of your existing installation and configuration files.
A Naemon installation won't alter your Nagios installation, but just in case
anything goes wrong or doesn't work, this will allow you to rollback to your old version.

Migration from Nagios is usually very easy. After the installation of Naemon
you only need to copy the conf.d folder into `/etc/naemon/conf.d`. Also verify
that your `USER` macros in your `/etc/naemon/resource.cfg` point to the same locations
as before.

> [!WARNING]
> You may have to adjust the paths in the following commands to your needs.

Clean up sample config but make sure you don't need any of those files anymore.

```bash
rm -f /etc/naemon/conf.d/*
```

Copy existing configuration files:

```bash
cp -rp /etc/nagios/conf.d/      /etc/naemon/conf.d/
cp -rp /etc/nagios/resource.cfg /etc/naemon/
cp -rp /etc/nagios/cgi.cfg      /etc/naemon/
```

Your object configuration files may vary, just copy them into the new conf.d folder.

Copy existing logfiles and archive:

```bash
cp -rp /var/log/nagios/archive/*.log /var/log/naemon/archive
cp -rp /var/log/nagios/nagios.log /var/log/naemon/naemon.log
```

Copy existing status file:

```bash
cp -rp /var/lib/nagios/retention.dat  /var/lib/naemon/
```

> [!TIP]
> Naemon can coexist with your current installation, it uses different users and folders.

Edit the main configuration file and replace

 - `nagios_user` with `naemon_user`
 - `nagios_group` with `naemon_group`


Read the [configuration incompatibilities](/documentation/usersguide/config-incompat3to4) guide.

Start Naemon

```bash
/etc/init.d/naemon start
```

In case of configuration errors, see the [verify configuration](verifyconfig)
page and the [start/stop](startstop) page.

That's it - you're done!




### Upgrading From Nagios 2.x

It shouldn't be too difficult to upgrade from Nagios 2.x to Naemon.
The upgrade is essentially the same as what is described above for upgrading to newer Naemon releases.
You will, however, have to change your configuration files a bit so they work with Naemon:


 - The old `service_reaper_frequency` variable in the main config file has been renamed to
    [check_result_reaper_frequency](configmain#check_result_reaper_frequency).
 - The old `$NOTIFICATIONNUMBER$` macro has been deprecated in favor of new
    [$HOSTNOTIFICATIONNUMBER$](macrolist#hostnotificationnumber) and
    [$SERVICENOTIFICATIONNUMBER$](macrolist#servicenotificationnumber) macros.
 - The old `parallelize` directive in service definitions is now deprecated and no
    longer used, as all service checks are run in parallel.
 - The old `aggregate_status_updates` option has been removed. All status file updates are
    now aggregated at a minimum interval of 1 second.
 - Extended host and extended service definitions have been deprecated. They are still read and
    processed by Naemon, but it is recommended that you move the directives found in these definitions
    to your host and service definitions, respectively.
 - The old `downtime_file` file variable in the main config file is no longer supported, as
    scheduled downtime entries are now saved in the [retention file](configmain#state_retention_file).
    To preserve existing downtime entries, stop Naemon and append the contents of your old downtime
    file to the retention file.
 - The old `comment_file` file variable in the main config file is no longer supported, as
    comments are now saved in the [retention file](configmain#state_retention_file).
    To preserve existing comments, stop Naemon and append the contents of your old comment file to the retention file.


Also make sure to read the [What's New](whatsnew) section of the documentation.
It describes all the changes that were made to the Naemon code since the latest stable releases.
Quite a bit has changed, so make sure you read it over.
