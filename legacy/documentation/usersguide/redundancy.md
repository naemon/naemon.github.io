---
layout: doctoc
title: Redundant and Failover Network Monitoring
---

{% include review_required.md %}

### Introduction

This section describes a few scenarios for implementing redundant monitoring hosts an various types of network
layouts. With redundant hosts, you can maintain the ability to monitor your network when the primary
host that runs Naemon fails or when portions of your network become unreachable.

{{ site.warning }}If you are just learning how to use Naemon, I would
suggest not trying to implement redundancy until you have becoming familiar with the <a href="#prerequisites">prerequisites</a> I've laid out.
Redundancy is a relatively complicated issue to understand, and even more difficult to implement properly.
{{ site.end }}

### Index

<a href="#prerequisites">Prerequisites</a><br>
<a href="#samples">Sample scripts</a><br>
<a href="#scenario_1">Scenario 1 - Redundant monitoring</a><br>
<a href="#scenario_2">Scenario 2 - Failover monitoring</a><br>

<a name="prerequisites"></a>

### Prerequisites

Before you can even think about implementing redundancy with Naemon, you need to be familiar with the following...

<ul>
<li>Implementing <a href="eventhandlers.html">event handlers</a> for hosts and services</li>
<li>Issuing <a href="extcommands.html">external commands</a> to Naemon via shell scripts</li>
<li>Executing plugins on remote hosts using either the <a href="addons.html#nrpe">NRPE addon</a> or some other method</li>
<li>Checking the status of the Naemon process with the <i>check_nagios</i> plugin</li>
</ul>

<a name="samples"></a>

### Sample Scripts

All of the sample scripts that I use in this documentation can be found in the <i>eventhandlers/</i> subdirectory of the Naemon distribution.  You'll probably need to modify them to work on your system...

<a name="scenario_1"></a>

### Scenario 1 - Redundant Monitoring

#### Introduction

This is an easy (and naive) method of implementing redundant monitoring hosts on your network and it will only protect against a limited number of failures.  More complex setups are necessary in order to provide smarter redundancy, better redundancy across different network segments, etc.

#### Goals

The goal of this type of redundancy implementation is simple.  Both the "master" and "slave" hosts monitor the same hosts and service on the network.  Under normal circumstances only the "master" host will be sending out notifications to contacts about problems.  We want the "slave" host running Naemon to take over the job of notifying contacts about problems if:

<ol>
<li>The "master" host that runs Naemon is down or..</li>
<li>The Naemon process on the "master" host stops running for some reason</li>
</ol>

#### Network Layout Diagram

The diagram below shows a very simple network setup.  For this scenario I will be assuming that hosts A and E are both running Naemon and are monitoring all the hosts shown.  Host A will be considered the "master" host and host E will be considered the "slave" host.


<table border="1">
<tr>
<td><img src="images/redundancy.png" border="0"></td>
</tr>
</table>

#### Initial Program Settings

The slave host (host E) has its initial <a href="configmain.html#enable_notifications">enable_notifications</a> directive disabled, thereby preventing it from sending out any host or service notifications.  You also want to make sure that the slave host has its <a  href="configmain.html#check_external_commands">check_external_commands</a> directive enabled.  That was easy enough...

#### Initial Configuration

Next we need to consider the differences between the <a href="configobject.html">object configuration file(s)</a> on the master and slave hosts...

I will assume that you have the master host (host A) setup to monitor services on all hosts shown in the diagram above.  The slave host (host E) should be setup to monitor the same services and hosts, with the following additions in the configuration file...

<ul>
<li>The host definition for host A (in the host E configuration file) should have a host <a href="eventhandlers.html">event handler</a> defined.  Lets say the name of the host event handler is <font color="red">handle-master-host-event</font>.</li>
<li>The configuration file on host E should have a service defined to check the status of the Naemon process on host A.  Lets assume that you define this service check to run the <i>check_nagios</i> plugin on host A.  This can be done by using one of the methods described in <b>this FAQ</b> (update this!).</li>
<li>The service definition for the Naemon process check on host A should have an <a href="eventhandlers.html">event handler</a> defined.  Lets say the name of the service event handler is <font color="red">handle-master-proc-event</font>.</li>
</ul>

It is important to note that host A (the master host) has no knowledge of host E (the slave host).  In this scenario it simply doesn't need to.  Of course you may be monitoring services on host E from host A, but that has nothing to do with the implementation of redundancy...

#### Event Handler Command Definitions

We need to stop for a minute and describe what the command definitions for the event handlers on the slave host look like.  Here is an example...

<pre>
define command {
    command_name    handle-master-host-event
    command_line    /usr/lib/naemon/plugins/eventhandlers/handle-master-host-event $HOSTSTATE$ $HOSTSTATETYPE$
}

define command {
    command_name    handle-master-proc-event
    command_line    /usr/lib/naemon/plugins/eventhandlers/handle-master-proc-event $SERVICESTATE$ $SERVICESTATETYPE$
}
</pre>

This assumes that you have placed the event handler scripts in the <i>/usr/lib/naemon/plugins/eventhandlers</i> directory.  You may place them anywhere you wish, but you'll need to modify the examples I've given here.

#### Event Handler Scripts

Okay, now lets take a look at what the event handler scripts look like...

Host Event Handler (<font color="red">handle-master-host-event</font>):

<pre>
#!/bin/sh

# Only take action on hard host states...
case "$2" in
HARD)
	case "$1" in
	DOWN)
		# The master host has gone down!
		# We should now become the master host and take
		# over the responsibilities of monitoring the
		# network, so enable notifications...
		/usr/lib/naemon/plugins/eventhandlers/enable_notifications
		;;
	UP)
		# The master host has recovered!
		# We should go back to being the slave host and
		# let the master host do the monitoring, so
		# disable notifications...
		/usr/lib/naemon/plugins/eventhandlers/disable_notifications
		;;
	esac
	;;
esac
exit 0
</pre>

Service Event Handler (<font color="red">handle-master-proc-event</font>):

<pre>
#!/bin/sh

# Only take action on hard service states...
case "$2" in
HARD)
	case "$1" in
	CRITICAL)
		# The master Naemon process is not running!
		# We should now become the master host and
		# take over the responsibility of monitoring
		# the network, so enable notifications...
		/usr/lib/naemon/plugins/eventhandlers/enable_notifications
		;;
	WARNING)
	UNKNOWN)
		# The master Naemon process may or may not
		# be running.. We won't do anything here, but
		# to be on the safe side you may decide you
		# want the slave host to become the master in
		# these situations...
		;;
	OK)
		# The master Naemon process running again!
		# We should go back to being the slave host,
		# so disable notifications...
		/usr/lib/naemon/plugins/eventhandlers/disable_notifications
		;;
	esac
	;;
esac
exit 0
</pre>

#### What This Does For Us

The slave host (host E) initially has notifications disabled, so it won't send out any host or service notifications while the Naemon process on the master host (host A) is still running.

The Naemon process on the slave host (host E) becomes the master host when...

<ul>
<li>The master host (host A) goes down and the <i><font color="red">handle-master-host-event</font></i> host event handler is executed.</li>
<li>The Naemon process on the master host (host A) stops running and the <i><font color="red">handle-master-proc-event</font></i> service event handler is executed.</li>
</ul>

When the Naemon process on the slave host (host E) has notifications enabled, it will be able to send out notifications about any service or host problems or recoveries.  At this point host E has effectively taken over the responsibility of notifying contacts of host and service problems!

The Naemon process on host E returns to being the slave host when...

<ul>
<li>Host A recovers and the <i><font color="red">handle-master-host-event</font></i> host event handler is executed.</li>
<li>The Naemon process on host A recovers and the <i><font color="red">handle-master-proc-event</font></i> service event handler is executed.</li>
</ul>

When the Naemon process on host E has notifications disabled, it will not send out notifications about any service or host problems or recoveries.  At this point host E has handed over the responsibilities of notifying contacts of problems to the Naemon process on host A.  Everything is now as it was when we first started!

#### Time Lags

Redundancy in Naemon is by no means perfect.  One of the more obvious problems is the lag time between the master host failing and the slave host taking over.  This is affected by the following...

<ul>
<li>The time between a failure of the master host and the first time the slave host detects a problem</li>
<li>The time needed to verify that the master host really does have a problem (using service or host check retries on the slave host)</li>
<li>The time between the execution of the event handler and the next time that Naemon checks for external commands</li>
</ul>

You can minimize this lag by...

<ul>
<li>Ensuring that the Naemon process on host E (re)checks one or more services at a high frequency.
    This is done by using the <i>check_interval</i> and <i>retry_interval</i> arguments in each service definition.</li>
<li>Ensuring that the number of host rechecks for host A (on host E) allow for fast detection of host problems.
    This is done by using the <i>max_check_attempts</i> argument in the host definition.</li>
</ul>

When Naemon recovers on the host A, there is also some lag time before host E returns to being a slave host.  This is affected by the following...

<ul>
<li>The time between a recovery of host A and the time the Naemon process on host E detects the recovery</li>
<li>The time between the execution of the event handler on host B and the next time the Naemon process on host E checks for external commands</li>
</ul>

The exact lag times between the transfer of monitoring responsibilities will vary depending on how many services you have defined, the interval at which services are checked, and a lot of pure chance.  At any rate, its definitely better than nothing.

#### Special Cases

Here is one thing you should be aware of...  If host A goes down, host E will have notifications enabled and take over the responsibilities of notifying contacts of problems.  When host A recovers, host E will have notifications disabled.  If - when host A recovers - the Naemon process on host A does not start up properly, there will be a period of time when neither host is notifying contacts of problems!  Fortunately, the service check logic in Naemon accounts for this.  The next time the Naemon process on host E checks the status of the Naemon process on host A, it will find that it is not running.  Host E will then have notifications enabled again and take over all responsibilities of notifying contacts of problems.

The exact amount of time that neither host is monitoring the network is hard to determine.  Obviously, this period can be minimized by increasing the frequency of service checks (on host E) of the Naemon process on host A.  The rest is up to pure chance, but the total "blackout" time shouldn't be too bad.

<a name="scenario_2"></a>

### Scenario 2 - Failover Monitoring

#### Introduction

Failover monitoring is similar to, but slightly different than redundant monitoring (as discussed above in <a href="#scenario_1">scenario 1</a>).

#### Goals

The basic goal of failover monitoring is to have the Naemon process on the slave host sit idle while the Naemon process on the master host is running.  If the process on the master host stops running (or if the host goes down), the Naemon process on the slave host starts monitoring everything.

While the method described in <a href="#scenario_1">scenario 1</a> will allow you to continue receive notifications if the master monitoring hosts goes down, it does have some pitfalls.  The biggest problem is that the slave host is monitoring the same hosts and servers as the master <i>at the same time as the master</i>!  This can cause problems with excessive traffic and load on the machines being monitored if you have a lot of services defined.  Here's how you can get around that problem...

#### Initial Program Settings

Disable active service checks and notifications on the slave host using the <a href="configmain.html#execute_service_checks">execute_service_checks</a> and <a href="configmain.html#enable_notifications">enable_notifications</a> directives.  This will prevent the slave host from monitoring hosts and services and sending out notifications while the Naemon process on the master host is still up and running.  Make sure you also have the <a href="configmain.html#check_external_commands">check_external_commands</a> directive enabled on the slave host.

#### Master Process Check

Set up a cron job on the slave host that periodically (say every minute) runs a script that checks the status of the Naemon process on the master host (using the <i>check_nrpe</i> plugin on the slave host and the <a href="addons.html#nrpe">nrpe daemon</a> and <i>check_nagios</i> plugin on the master host).  The script should check the return code of the <i>check_nrpe plugin</i> .  If it returns a non-OK state, the script should send the appropriate commands to the <a href="configmain.html#command_file">external command file</a> to enable both notifications and active service checks.  If the plugin returns an OK state, the script should send commands to the external command file to disable both notifications and active checks.

By doing this you end up with only one process monitoring hosts and services at a time, which is much more efficient that monitoring everything twice.

Also of note, you <i>don't</i> need to define host and service handlers as mentioned in <a href="#scenario_1">scenario 1</a> because things are handled differently.

#### Additional Issues

At this point, you have implemented a very basic failover monitoring setup.  However, there is one more thing you should consider doing to make things work smoother.

The big problem with the way things have been setup thus far is the fact that the slave host doesn't have the current status of any services or hosts at the time it takes over the job of monitoring.  One way to solve this problem is to enable the <a href="configmain.html#ocsp_command">ocsp command</a> on the master host and have it send all service check results to the slave host using the <a href="addons.html#nsca">nsca addon</a>.  The slave host will then have up-to-date status information for all services at the time it takes over the job of monitoring things.  Since active service checks are not enabled on the slave host, it will not actively run any service checks.  However, it will execute host checks if necessary.  This means that both the master and slave hosts will be executing host checks as needed, which is not really a big deal since the majority of monitoring deals with service checks.

That's pretty much it as far as setup goes.
