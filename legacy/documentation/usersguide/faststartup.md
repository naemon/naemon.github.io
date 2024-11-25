---
layout: doctoc
title: Fast Startup Options
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="tuning.html">Performance Tuning</a>, <a href="largeinstalltweaks.html">Large Installation Tweaks</a>



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
        <img src="images/svg/fast-startup1.svg" class="svg-image" alt="Pre-Caching Object Config Files" title="Pre-Caching Object Config Files" border="0">
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
        <img src="images/svg/fast-startup2.svg" class="svg-image" alt="Pre-Caching Object Config Files" title="Pre-Caching Object Config Files" border="0">
      </div>
    </td>
  </tr>
</table>
