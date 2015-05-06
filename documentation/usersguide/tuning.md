---
layout: doctoc
title: Tuning Naemon For Maximum Performance
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="largeinstalltweaks.html">Large Installation Tweaks</a>,
<a href="faststartup.html">Fast Startup Options</a>, <a href="mrtggraphs.html">Graphing Performance Info</a>



### Introduction

<img src="images/tuning.png" border="0" style="float: right; clear: both;" alt="Tuning" title="Tuning">

So you've finally got Naemon up and running and you want to know how you can
tweak it a bit. Tuning Naemon to increase performance can be necessary when
you start monitoring a large number (> 10,000) of hosts and services. Here are
a few things to look at for optimizing Naemon...



### Optimization Tips:

#### Graph performance

<b>Graph performance statistics with MRTG</b>.

In order to keep track of how well your Naemon installation handles load over
time and how your configuration changes affect it, you should be graphing
several important statistics with MRTG. This is really, really, really useful
when it comes to tuning the performance of a Naemon installation. Really.
Information on how to do this can be found <a href="mrtggraphs.html">here</a>.



#### Large Installation Tweaks

<b>Use large installation tweaks</b>.

Enabling the <a href="configmain.html#use_large_installation_tweaks">`use_large_installation_tweaks`</a>
option may provide you with better performance. Read more about what this
option does <a href="largeinstalltweaks.html">here</a>.



#### Reaper Frequency

<b>Check Result Reaper Frequency</b>.

The <a href="configmain.html#check_result_reaper_frequency">`check_result_reaper_frequency`</a>
variable determines how often Naemon should check for host and service check
results that need to be processed. The maximum amount of time it can spend
processing those results is determined by the max reaper time (see below). If
your reaper frequency is too high (too infrequent), you might see high
latencies for host and service checks.



#### Reaper Time

<b>Max Reaper Time</b>.

The <a href="configmain.html#max_check_result_reaper_time">`max_check_result_reaper_time`</a>
variables determines the maximum amount of time the Naemon daemon can spend
processing the results of host and service checks before moving on to other
things - like executing new host and service checks. Too high of a value can
result in large latencies for your host and service checks. Too low of a value
can have the same effect. If you're experiencing high latencies, adjust this
variable and see what effect it has. Again, you should be <a
href="mrtggraphs.html">graphing statistics</a> in order to make this
determination.



#### Service Latency

<b>Check service latencies to determine best value for maximum concurrent checks</b>.

Naemon can restrict the number of maximum concurrently executing service checks
to the value you specify with the <a href="configmain.html#max_concurrent_checks">`max_concurrent_checks`</a> option.
This is good because it gives you some control over how much load Naemon will
impose on your monitoring host, but it can also slow things down. If you are
seeing high latency values (> 10 or 15 seconds) for the majority of your
service checks (via the <a href="cgis.html#extinfo_cgi">extinfo CGI</a>), you
are probably starving Naemon of the checks it needs. That's not Naemon's fault
- its yours. Under ideal conditions, all service checks would have a latency
of 0, meaning they were executed at the exact time that they were scheduled to
be executed. However, it is normal for some checks to have small latency
values. I would recommend taking the minimum number of maximum concurrent
checks reported when running Naemon with the <b>-s</b> command line argument
and doubling it. Keep increasing it until the average check latency for your
services is fairly low. More information on service check scheduling can be
found <a href="checkscheduling.html">here</a>.



#### Use Passive Checks

<b>Use passive checks when possible</b>.

The overhead needed to process the results of <a href="passivechecks.html">passive
 service checks</a> is much lower than that of "normal" active checks, so make
use of that piece of info if you're monitoring a slew of services. It should
be noted that passive service checks are only really useful if you have some
external application doing some type of monitoring or reporting, so if you're
having Naemon do all the work, this won't help things.



#### Use Compiled Plugins

<b>Avoid using interpreted plugins</b>.

One thing that will significantly reduce the load on your monitoring host is
the use of compiled (C/C++, etc.) plugins rather than interpreted script (Perl,
etc) plugins. While Perl scripts and such are easy to write and work well, the
fact that they are compiled/interpreted at every execution instance can
significantly increase the load on your monitoring host if you have a lot of
service checks. If you want to use Perl plugins, consider compiling them into
true executables using perlcc(1) (a utility which is part of the standard Perl
distribution) or compiling Naemon with an embedded Perl interpreter (see
below).



#### Use Embedded Perl

<b>Use the embedded Perl interpreter</b>.

If you're using a lot of Perl scripts for service checks, etc., you will
probably find that compiling the <a href="embeddedperl.html">embedded Perl
interpreter</a> into the Naemon binary will speed things up.



#### Optimization Host Checks

<b>Optimize host check commands</b>.

If you're checking host states using the check_ping plugin you'll find that
host checks will be performed much faster if you break up the checks. Instead
of specifying a `max_attempts` value of 1 in the host definition and
having the check_ping plugin send 10 ICMP packets to the host, it would be much
faster to set the `max_attempts` value to 10 and only send out 1 ICMP
packet each time. This is due to the fact that Naemon can often determine the
status of a host after executing the plugin once, so you want to make the first
check as fast as possible. This method does have its pitfalls in some
situations (i.e. hosts that are slow to respond may be assumed to be down), but
you'll see faster host checks if you use it. Another option would be to use a
faster plugin (i.e. check_icmp) as the `host_check_command` instead of
check_ping.



#### Schedule Regular Host Checks

<b>Schedule regular host checks</b>.

Scheduling regular checks of hosts can actually help performance in Naemon.
This is due to the way the <a href="cachedchecks.html">cached check logic</a>
works (see below). Prior to Naemon, regularly scheduled host checks used to
result in a big performance hit. This is no longer the case, as host checks
are run in parallel - just like service checks. To schedule regular checks of
a host, set the <i>check_interval</i> directive in the <a
href="objectdefinitions.html#host">host definition</a> to something greater
than 0.



#### Enable Cached Host Checks

<b>Enable cached host checks</b>.

Beginning with Naemon, on-demand host checks can benefit from caching.
On-demand host checks are performed whenever Naemon detects a service state
change. These on-demand checks are executed because Naemon wants to know if
the host associated with the service changed state. By enabling cached host
checks, you can optimize performance. In some cases, Naemon may be able to
used the old/cached state of the host, rather than actually executing a host
check command. This can speed things up and reduce load on monitoring server.
In order for cached checks to be effective, you need to schedule regular checks
of your hosts (see above). More information on cached checks can be found <a
href="cachedchecks.html">here</a>.



#### Avoid Aggressive Host Checking

<b>Don't use aggressive host checking</b>.
Unless you're having problems with Naemon recognizing host recoveries, I would
recommend not enabling the <a
href="configmain.html#use_agressive_host_checking">`use_aggressive_host_checking`</a>
option. With this option turned off host checks will execute much faster,
resulting in speedier processing of service check results. However, host
recoveries can be missed under certain circumstances when this it turned off.
For example, if a host recovers and all of the services associated with that
host stay in non-OK states (and don't "wobble" between different non-OK
states), Naemon may miss the fact that the host has recovered. A few people
may need to enable this option, but the majority don't and I would recommend not
using it unless you find it necessary...



#### Optimize Hardware

<b>Optimize hardware for maximum performance</b>.

NOTE: Hardware performance shouldn't be an issue unless: 1) you're monitoring
thousands of services, 2) you're doing a lot of post-processing of performance
data, etc. Your system configuration and your hardware setup are going to
directly affect how your operating system performs, so they'll affect how
Naemon performs. The most common hardware optimization you can make is with
your hard drives. CPU and memory speed are obviously factors that affect
performance, but disk access is going to be your biggest bottleneck. Don't
store plugins, the status log, etc on slow drives (i.e. old IDE drives or NFS
mounts). If you've got them, use UltraSCSI drives or fast IDE drives. An
important note for IDE/Linux users is that many Linux installations do not
attempt to optimize disk access. If you don't change the disk access
parameters (by using a utility like <b>hdparam</b>), you'll loose out on a
<b>lot</b> of the speedy features of the new IDE drives.
