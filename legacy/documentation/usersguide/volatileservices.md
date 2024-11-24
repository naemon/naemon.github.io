---
layout: doctoc
title: Volatile Services
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="stalking.html">State Stalking</a>



### Introduction

Naemon has the ability to distinguish between "normal" services and "volatile" services.
The <i>is_volatile</i> option in each service definition allows you to specify whether a specific service is volatile or not.
For most people, the majority of all monitored services will be non-volatile (i.e. "normal").
However, volatile services can be very useful when used properly...



### What Are They Useful For?

Volatile services are useful for monitoring...

 - Things that automatically reset themselves to an "OK" state each time they are checked
 - Events such as security alerts which require attention every time there is a problem (and not just the first time)



### What's So Special About Volatile Services?

Volatile services differ from "normal" services in three important ways.
<i>Each time</i> they are checked when they are in a <a href="statetypes.html">hard</a> non-OK state,
and the check returns a non-OK state (i.e. no state change has occurred)...


 - The non-OK service state is logged
 - Contacts are notified about the problem (if that's <a href="notifications.html">what should be done</a>).
 - The <a href="eventhandlers.html">event handler</a> for the service is run (if one has been defined)

{{ site.note }}Notification intervals are ignored for volatile services.{{ site.end }}

These events normally only occur for services when they are in a non-OK state and a hard state change has just occurred.
In other words, they only happen the first time that a service goes into a non-OK state.
If future checks of the service result in the same non-OK state, no hard state change
occurs and none of the events mentioned take place again.

{{ site.hint }}If you are only interested in logging, consider using <a href="stalking.html">stalking</a> options instead. {{ site.end }}


### The Power Of Two

If you combine the features of volatile services and <a href="passivechecks.html">passive service checks</a>,
you can do some very useful things.
Examples of this include handling SNMP traps, security alerts, etc.

How about an example... Let's say you're running <a href="http://sourceforge.net/projects/sentrytools/">PortSentry</a> to
detect port scans on your machine and automatically firewall potential intruders.
If you want to let Naemon know about port scans, you could do the following...

<b>Naemon Configuration:</b>

 - Create a service definition called <i>Port Scans</i> and associate it with the host that PortSentry is running on.
 - Set the <i>max_check_attempts</i> directive in the service definition to 1.
   This will tell Naemon to immediate force the service into a <a href="statetypes.html">hard state</a> when a non-OK state is reported.
 - Set the <i>active_checks_enabled</i> directive in the service definition to 0. This prevents Naemon from actively checking the service.
 - Set the <i>passive_checks_enabled</i> directive in the service definition to 1. This enables passive checks for the service.
 - Set this <i>is_volatile</i> directive in the service definition to 1.

<b>PortSentry Configuration:</b>

Edit your PortSentry configuration file (portsentry.conf) and define a command for the <i>KILL_RUN_CMD</i> directive as follows:

<pre>
KILL_RUN_CMD="/usr/lib/naemon/plugins/eventhandlers/submit_check_result host_name 'Port Scans' 2 'Port scan from host $TARGET$ on port $PORT$. Host has been firewalled.'"
</pre>

Make sure to replace <i>host_name</i> with the short name of the host that the service is associated with.

<b>Port Scan Script:</b>

Create a shell script in the <i>/usr/lib/naemon/plugins/eventhandlers</i> directory named <i>submit_check_result</i>.
The contents of the shell script should be something similar to the following...

```bash
#!/bin/sh

# Write a command to the Naemon command file to cause
# it to process a service check result

echocmd="/bin/echo"

CommandFile="/usr/local/naemon/var/rw/naemon.cmd"

# get the current date/time in seconds since UNIX epoch
datetime=`date +%s`

# create the command line to add to the command file
cmdline="[$datetime] PROCESS_SERVICE_CHECK_RESULT;$1;$2;$3;$4"

# append the command to the end of the command file
`$echocmd $cmdline >> $CommandFile`
```

What will happen when PortSentry detects a port scan on the machine in the future?

 - PortSentry will firewall the host (this is a function of the PortSentry software)
 - PortSentry will execute the <i>submit_check_result</i> shell script and send a passive check result to Naemon
 - Naemon will read the external command file and see the passive service check submitted by PortSentry
 - Naemon will put the <i>Port Scans</i> service in a hard CRITICAL state and send notifications to contacts

Pretty neat, huh?
