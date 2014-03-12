---
layout: doctoc
title: Fast Startup Options
---



<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="tuning.html">Performance Tuning</a>, <a href="largeinstalltweaks.html">Large Installation Tweaks</a>

### Introduction

There are a few things you can do that can decrease the amount of time it take Naemon to startup (or restart).  These speedups involve easing some of the burden involved in processing your configuration files.

Using these techniques is particularly useful when you have one or more of the following:

<ul>
<li>Large configurations</li>
<li>Complex configurations (heavy use of template features)</li>
<li>Installations where frequest restarts are necessary</li>
</ul>

### Background

Whenever Naemon starts/restarts it has to process your configuration files before it can get down to the business of monitoring.  This configuration startup process involves a number of steps:

<ul>
<li>Reading the config files</li>
<li>Resolving template definitions</li>
<li>"Recombobulating" your objects (my term for the various types of work that occurs)</li>
<li>Duplicating object definitions</li>
<li>Inheriting object properties</li>
<li>Sorting your object definitions</li>
<li>Verifying object relationship integrity</li>
<li>Checking for circular paths</li>
<li>and more...</li>
</ul>

Some of these steps can be quite time-consuming when you have large or complex configurations.  Is there a way to speed any of these steps up?  Yes!

### Evaluating Startup Times

Before we get on to making things faster, we need to see what's possible and whether or not we should even bother with the whole thing.  This is easy to do - simply start nagios with the <b>-s</b> command line switch to get timing and scheduling information.

An example of the output (abbreviated to only show relevant portions) is shown below. For this example, I'm using a Naemon config that has 25 hosts defined and just over 10,000 services.

<pre style="padding: 0 0 0 50px;">
/usr/local/nagios/bin/nagios -s /usr/local/nagios/etc/nagios.cfg

Naemon 3.0-prealpha
Copyright (c) 1999-2007 Ethan Galstad (http://www.nagios.org)
Last Modified: 01-27-2007
License: GPL


Timing information on object configuration processing is listed
below.  You can use this information to see if precaching your
object configuration would be useful.

Object Config Source: Config files (uncached)

OBJECT CONFIG PROCESSING TIMES      (* = Potential for precache savings with -u option)
----------------------------------
Read:                 0.486780 sec
Resolve:              0.004106 sec  *
Recomb Contactgroups: 0.000077 sec  *
Recomb Hostgroups:    0.000172 sec  *
Dup Services:         0.028801 sec  *
Recomb Servicegroups: 0.010358 sec  *
Duplicate:            5.666932 sec  *
Inherit:              0.003770 sec  *
Recomb Contacts:      0.030085 sec  *
Sort:                 2.648863 sec  *
Register:             2.654628 sec
Free:                 0.021347 sec
                      ============
TOTAL:                11.555925 sec  * = 8.393170 sec (72.63%) estimated savings


Timing information on configuration verification is listed below.

CONFIG VERIFICATION TIMES          (* = Potential for speedup with -x option)
----------------------------------
Object Relationships: 1.400807 sec
Circular Paths:       54.676622 sec  *
Misc:                 0.006924 sec
                      ============
TOTAL:                56.084353 sec  * = 54.676622 sec (97.5%) estimated savings
</pre>

Okay, lets see what happened.  Looking at the totals, it took roughly <b>11.6</b> seconds to process the configuration files and another <b>56</b> seconds to verify the config.  That means that every time I start or restart Naemon with this configuration, it will take nearly <b>68 seconds</b> of startup work before it can monitor anything!  That's not acceptable if I have to restart Naemon on a semi-regular basis.

What can I do about this?  Take another look at the output and you'll see that Naemon estimates that I could save about <b>8.4</b> seconds off the configuration processing time and another <b>54.7</b> off the verification times.  In total, Naemon thinks I could save <b>63 seconds</b> of the normal startup time if some optimizations were taken.

Whoa!  From <b>68 seconds</b> to just <b>5 seconds</b>?  Yep, read on for how to do it.

### Pre-Caching Object Configuration

Naemon can spend quite a bit of time parsing your config files, especially if you make use of the template features such as inheritance, etc.  In order to reduce the time it takes to parse your config, you can have Naemon pre-process and pre-cache your config files for future use.  

<table border="0" class="Default">
<tr>
<td valign="top">
<p>
When you run nagios with the <b>-p</b> command line option, Naemon will read your config files in, process them, and save them to a pre-cached object config file (specified by the <a href="configmain.html#precached_object_file">precached_object_file</a> directive).  This pre-cached config file will contain pre-processed configuration entries that are easier/faster for Naemon to process in the future.
</p>
<p>
You must use the <b>-p</b> command line option along with either the <b>-v</b> or <b>-s</b> command line options, as shown below.  This ensures that your configuration is verified before the precached file is created.
</p>
<pre style="padding: 0 0 0 50px;">
/usr/local/nagios/bin/nagios -pv /usr/local/nagios/etc/nagios.cfg
</pre>
<p>
The size of your precached config file will most likely be significantly larger than the sum of the sizes of your object config files.  This is normal and by design.
</p>
</td>
<td valign="top">
<div style="float: right; clear: right; padding: 0 0 25px 25px;">
<img src="/images/fast-startup1.png" alt="Pre-Caching Object Config Files" title="Pre-Caching Object Config Files" border="0">
</div>
</td>
</tr>
<tr>
<td valign="top">
<p>
Once the precached object configuration file have been created, you can start Naemon and tell it to use the precached config file instead of your object config file(s) by using the <b>-u</b> command line option.
</p>
<pre style="padding: 0 0 0 50px;">
/usr/local/nagios/bin/nagios -ud /usr/local/nagios/etc/nagios.cfg
</pre>
<p><span class="glyphicon glyphicon-exclamation-sign"></span> If you modify your configuration files, you will need to re-verify and re-cache your configuration files before restarting Naemon.  If you don't re-generate the precached object file, Naemon will continue to use your old configuration because it is now reading from the precached file, rather than your source configuration files.
</p>
</td>
<td valign="top">
<div style="float: right; padding: 0 0 0 25px;">
<img src="/images/fast-startup2.png" alt="Pre-Caching Object Config Files" title="Pre-Caching Object Config Files" border="0">
</div>
</td>
</tr>
</table>

### Skipping Circular Path Tests

The second (and most time-intensive) portion of the configuration startup phase is the circular path check.  In the example above, it took nearly a minute to perform this step of the configuration verification.

What is the circular path check and why does it take so long?  The circular patch check is designed to ensure that you don't define any circular paths in your host, host dependency, or service dependency definitions.  If a circular path existed in your config files, Naemon could end up in a deadlock situation.  The most likely reason for the check taking so long is that I'm not using an efficient algorithm.  A much more efficient algorithm for detecting circular paths would be most welcomed.  Hint:  That means all you CompSci graduate students who have been emailing me about doing your thesis on Naemon can contribute some code back. :-)

If you want to skip the circular path check when Naemon starts, you can add the -x command line option like this:

<pre style="padding: 0 0 0 50px;">
/usr/local/nagios/bin/nagios -xd /usr/local/nagios/etc/nagios.cfg
</pre>
<p><span class="glyphicon glyphicon-exclamation-sign"></span> It is of utmost importance that you verify your configuration before starting/restarting Naemon when skipping circular path checks.  Failure to do so could lead to deadlocks in the Naemon logic.  You have been warned.

### Putting It All Together

Follow these steps if you want to make use of potential speedups from pre-caching your configuration and skipping circular path checks.

1. Verify your configuration and create the precache file with the following command:

<pre style="padding: 0 0 0 50px;">
/usr/local/nagios/bin/nagios -vp /usr/local/nagios/etc/nagios.cfg
</pre>

2. Stop Naemon if it is currently running.

3. Start Naemon like so to use the precached config file and skip circular path checks:

<pre style="padding: 0 0 0 50px;">
/usr/local/nagios/bin/nagios -uxd /usr/local/nagios/etc/nagios.cfg
</pre>

4. When you modify your original configuration files in the future and need to restart Naemon to make those changes take place, repeat step 1 to re-verify your config and regenerate your cached config file.  Once that is done you can restart Naemon through the web interface or by sending a SIGHUP signal.  If you don't re-generate the precached object file, Naemon will continue to use your old confguration because it is now reading from the precached file, rather than your source configuration files.

5. That's it!  Enjoy the increased startup speed.
