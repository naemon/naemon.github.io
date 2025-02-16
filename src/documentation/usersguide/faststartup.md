# Fast Startup Options



## Background

Whenever Naemon starts/restarts it has to process your configuration files before it can get down to the business of monitoring.
This configuration startup process involves a number of steps:

 - Reading the config files
 - Resolving template definitions
 - "Recombobulating" your objects (my term for the various types of work that occurs)
 - Duplicating object definitions
 - Inheriting object properties
 - Sorting your object definitions
 - Verifying object relationship integrity
 - Checking for circular paths
 - and more...



## Pre-Caching Object Configuration

Naemon can spend quite a bit of time parsing your config files, especially if you
make use of the template features such as inheritance, etc.
In order to reduce the time it takes to parse your config, you can
have Naemon pre-process and pre-cache your config files for future use.



When you run naemon with the `-p` command line option, Naemon will read your
config files in, process them, and save them to a pre-cached object config
file (specified by the [precached_object_file](configmain#precached_object_file) directive).
This pre-cached config file will contain pre-processed configuration entries that are easier/faster for Naemon to process in the future.

You must use the `-p` command line option along with either the `-v` or `-s` command
line options, as shown below.
This ensures that your configuration is verified before the precached file is created.

```
/usr/bin/naemon -pv /etc/naemon/naemon.cfg
```

The size of your precached config file will most likely be significantly larger than the sum of the sizes of your object config files.
This is normal and by design.

![Pre-Caching Object Config Files](/images/usersguide/svg/fast-startup1.svg) {.img-bg}


Once the precached object configuration file have been created, you can start
Naemon and tell it to use the precached config file instead of your object config
file(s) by using the `-u` command line option.

```
/usr/bin/naemon -ud /etc/naemon.cfg
```

> [!WARNING]
> If you modify your configuration files, you will
> need to re-verify and re-cache your configuration files before restarting Naemon.
> If you don't re-generate the precached object file, Naemon will continue to use your old configuration
> because it is now reading from the precached file, rather than your source configuration files.

![Pre-Caching Object Config Files](/images/usersguide/svg/fast-startup2.svg) {.img-bg}

