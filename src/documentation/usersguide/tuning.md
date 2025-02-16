# Tuning Naemon For Maximum Performance

## Introduction

Tuning Naemon to increase performance can be necessary when
you start monitoring a large number (> 10,000) of hosts and services. Here are
a few things to look at for optimizing Naemon...

![No speed limit](/images/usersguide/svg/Zeichen_282_StVO.svg) {.img-bg .img-250-h}

## Optimization Tips

### Graph performance

In order to keep track of how well your Naemon installation handles load over
time and how your configuration changes affect it, you should be graphing
several important statistics. This is really, really, really useful
when it comes to tuning the performance of a Naemon installation. Really.
Information on how to do this can be found [here](graphs).

### Use a TMPFS

Using tmpfs for Naemon’s temporary data significantly enhances performance by
reducing disk I/O overhead.

### Reaper Frequency

The [check_result_reaper_frequency](configmain#check_result_reaper_frequency)
variable determines how often Naemon should check for host and service check
results that need to be processed. The maximum amount of time it can spend
processing those results is determined by the max reaper time (see below). If
your reaper frequency is too high (too infrequent), you might see high
latencies for host and service checks.

### Reaper Time

The [max_check_result_reaper_time](configmain#max_check_result_reaper_time)
variables determines the maximum amount of time the Naemon daemon can spend
processing the results of host and service checks before moving on to other
things - like executing new host and service checks. Too high of a value can
result in large latencies for your host and service checks. Too low of a value
can have the same effect. If you're experiencing high latencies, adjust this
variable and see what effect it has. Again, you should be
[graphing statistics](graphs) in order to make this determination.

### Service Latency

Naemon can restrict the number of maximum concurrently executing service checks
to the value you specify with the [max_concurrent_checks](configmain#max_concurrent_checks) option.
This is good because it gives you some control over how much load Naemon will
impose on your monitoring host, but it can also slow things down. If you are
seeing high latency values (> 10 or 15 seconds) for the majority of your
service checks (via the [extinfo CGI](cgis#extinfo_cgi)), you
are probably starving Naemon of the checks it needs. Under ideal conditions,
all service checks would have a latency of 0, meaning they were executed at the
exact time that they were scheduled to be executed. However, it is normal for
some checks to have small latency values.

### Use Compiled Plugins

One thing that will significantly reduce the load on your monitoring host is
the use of compiled (C/C++, etc.) plugins rather than interpreted script (Perl,
etc) plugins. While Perl scripts and such are easy to write and work well, the
fact that they are compiled/interpreted at every execution instance can
significantly increase the load on your monitoring host if you have a lot of
service checks. If you want to use Perl plugins, consider compiling them into
true executables using perlcc(1) (a utility which is part of the standard Perl
distribution) or compiling Naemon with an embedded Perl interpreter (see
below).

### Use Embedded Perl

If you're using a lot of Perl scripts for service checks, etc., you will
probably find that compiling the [embedded Perl interpreter](embeddedperl)
into the Naemon binary will speed things up.

### Optimization Host Checks

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

### Schedule Regular Host Checks

Scheduling regular checks of hosts can actually help performance in Naemon.
This is due to the way the [cached check logic](cachedchecks)
works (see below). Prior to Naemon, regularly scheduled host checks used to
result in a big performance hit. This is no longer the case, as host checks
are run in parallel - just like service checks. To schedule regular checks of
a host, set the `check_interval` directive in the [host definition](objectdefinitions#host)
to something greater than 0.

### Enable Cached Host Checks

Beginning with Naemon, on-demand host checks can benefit from caching.
On-demand host checks are performed whenever Naemon detects a service state
change. These on-demand checks are executed because Naemon wants to know if
the host associated with the service changed state. By enabling cached host
checks, you can optimize performance. In some cases, Naemon may be able to
used the old/cached state of the host, rather than actually executing a host
check command. This can speed things up and reduce load on monitoring server.
In order for cached checks to be effective, you need to schedule regular checks
of your hosts (see above). More information on cached checks can be found
[here](cachedchecks).

### Avoid Aggressive Host Checking

Unless you're having problems with Naemon recognizing host recoveries, it is
not recommended enabling the [use_aggressive_host_checking](configmain#use_aggressive_host_checking)
option. With this option turned off host checks will execute much faster,
resulting in speedier processing of service check results. However, host
recoveries can be missed under certain circumstances when this it turned off.
For example, if a host recovers and all of the services associated with that
host stay in non-OK states (and don't "wobble" between different non-OK
states), Naemon may miss the fact that the host has recovered.

### Optimize Hardware

NOTE: Hardware performance shouldn't be an issue unless:
1. you're monitoring thousands of services,
2. you're doing a lot of post-processing of performance data, etc.

Your system configuration and your hardware setup are going to
directly affect how your operating system performs, so they'll affect how
Naemon performs. The most common hardware optimization you can make is with
your hard drives. CPU and memory speed are obviously factors that affect
performance, but disk access is going to be your biggest bottleneck. Don't
store plugins, the status log, etc on slow drives (i.e. old IDE drives or NFS
mounts). If you've got them, use UltraSCSI drives or fast IDE drives. An
important note for IDE/Linux users is that many Linux installations do not
attempt to optimize disk access. If you don't change the disk access
parameters (by using a utility like `hdparam`), you'll loose out on a
`lot` of the speedy features of the new IDE drives.
