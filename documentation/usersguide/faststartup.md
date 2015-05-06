---
layout: doctoc
title: Fast Startup Options
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="tuning.html">Performance Tuning</a>, <a href="largeinstalltweaks.html">Large Installation Tweaks</a>


{{ site.warn }}
Faster Startup Options are usually <b>no longer required</b> since Naemon has been heavily optimized. Startup is now up to <b>1000x faster</b> than with Nagios 3.
{{ site.end }}


### Introduction

There were a few things which increased the amount of time it took Naemon to startup (or restart).
Luckily all of those issues have been addressed and fixed. So meanwhile slow startups are no
longer a problem.


### Background

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

All the time consuming steps have been optimized or rewritten from scratch. But read
on for details.



### Evaluating Startup Times

Before we get on to making things faster, we need to see what's possible and whether
or not we should even bother with the whole thing.
This is easy to do - simply start Naemon with the <b>-s</b> command line switch
to get timing and scheduling information.

A previous example used 10,000 services and took one minute to load and parse
with Nagios 3.
But fortunately Naemon loads that configuration in under one second!

An example of the output (abbreviated to only show relevant portions) is shown below.
For this example, I'm using a Naemon config that has 100,000 hosts defined and
just over 1,000,000 services.

Yes, we created <b>1 million services</b> in order to demonstrate the effect of
faster startup times.

```
%> /usr/bin/naemon -s /etc/naemon/naemon.cfg

Naemon Core 0.8.0
Copyright (c) 2013-present Naemon Core Development Team and Community Contributors
Copyright (c) 2009-2013 Nagios Core Development Team and Community Contributors
Copyright (c) 1999-2009 Ethan Galstad
Last Modified: 02-13-2014
License: GPL

Object Config Source: Config files (uncached)

OBJECT CONFIG PROCESSING TIMES      (* = Potential for precache savings with -u option)
----------------------------------
Read:                 6.740797 sec
Resolve:              0.366945 sec  *
Recomb Contactgroups: 0.055454 sec  *
Recomb Hostgroups:    0.091442 sec  *
Dup Services:         1.462903 sec  *
Recomb Servicegroups: 0.864578 sec  *
Duplicate:            0.000034 sec  *
Inherit:              0.348054 sec  *
Register:             7.422951 sec
Free:                 0.446037 sec
                      ============
TOTAL:                17.799233 sec  * = 0.797362 sec (4.48%) estimated savings

Timing information on configuration verification is listed below.

CONFIG VERIFICATION TIMES
----------------------------------
Object Relationships: 0.331025 sec
Circular Paths:       0.062353 sec
Misc:                 0.000152 sec
                      ============
TOTAL:                0.393530 sec
```

Okay, lets see what happened.
Looking at the totals, it took roughly <b>17.8</b> seconds to process the configuration files and
another <b>0.4</b> seconds to verify the config.
That means that every time I start or restart Naemon with this configuration, it will
take nearly <b>18 seconds</b> of startup work before it can monitor anything!

This is already quite impressive considering the fact, that Naemon loads
1 million services 3x faster than 10k services with its predecessor.


So do i need to do anything?

Short answer is no.

Since Naemon thinks it can save <b>0.8 seconds</b> from the total time, you
really shouldn't care about that unless you have millions of services.



### Pre-Caching Object Configuration

Naemon can spend quite a bit of time parsing your config files, especially if you
make use of the template features such as inheritance, etc.
In order to reduce the time it takes to parse your config, you can
have Naemon pre-process and pre-cache your config files for future use.

<table border="0">
  <tr>
    <td valign="top">
      <p>
        When you run naemon with the <b>-p</b> command line option, Naemon will read your
        config files in, process them, and save them to a pre-cached object config
        file (specified by the <a href="configmain.html#precached_object_file">precached_object_file</a> directive).
        This pre-cached config file will contain pre-processed configuration entries that are easier/faster for Naemon to process in the future.
      </p>
      <p>
        You must use the <b>-p</b> command line option along with either the <b>-v</b> or <b>-s</b> command
        line options, as shown below.
        This ensures that your configuration is verified before the precached file is created.
      </p>
      <pre style="padding: 0 0 0 50px;">/usr/bin/naemon -pv /etc/naemon/naemon.cfg</pre>
      <p>
        The size of your precached config file will most likely be significantly larger than the sum of the sizes of your object config files.
        This is normal and by design.
      </p>
    </td>
    <td valign="top">
      <div style="float: right; clear: right; padding: 0 0 25px 25px;">
        <img src="images/fast-startup1.png" alt="Pre-Caching Object Config Files" title="Pre-Caching Object Config Files" border="0">
      </div>
    </td>
  </tr>
  <tr>
    <td valign="top">
      <p>
        Once the precached object configuration file have been created, you can start
        Naemon and tell it to use the precached config file instead of your object config
        file(s) by using the <b>-u</b> command line option.
      </p>
      <pre style="padding: 0 0 0 50px;">/usr/bin/naemon -ud /etc/naemon.cfg</pre>
      <p>
        {{ site.warn }}
        If you modify your configuration files, you will
        need to re-verify and re-cache your configuration files before restarting Naemon.
        If you don't re-generate the precached object file, Naemon will continue to use your old configuration
        because it is now reading from the precached file, rather than your source configuration files.
        {{ site.end }}
      </p>
    </td>
    <td valign="top">
      <div style="float: right; padding: 0 0 0 25px;">
        <img src="images/fast-startup2.png" alt="Pre-Caching Object Config Files" title="Pre-Caching Object Config Files" border="0">
      </div>
    </td>
  </tr>
</table>



### Skipping Circular Path Tests

In the example above, it took nearly a seconds to perform this step of the configuration verification.

Thats why this option is deprecated and will be removed in future naemon releases.



### Conclusion

All this steps are no longer required. Naemon is optimized and starts way faster than its predecessor.
