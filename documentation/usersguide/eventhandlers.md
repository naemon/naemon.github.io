---
layout: doctoc
title: Event Handlers
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="statetypes.html">State Types</a>, <a href="hostchecks.html">Host Checks</a>, <a href="servicechecks.html">Service Checks</a>

### Introduction

<img src="images/eventhandlers.png" border="0" style="float: right;" alt="Event Handlers" title="Event Handlers">

Event handlers are optional system commands (scripts or executables) that are run whenever a host or service state change occurs.

An obvious use for event handlers is the ability for Naemon to proactively fix problems before anyone is notified.  Some other uses for event handlers include:

<ul>
<li>Restarting a failed service</li>
<li>Entering a trouble ticket into a helpdesk system</li>
<li>Logging event information to a database</li>
<li>Cycling power on a host*</li>
<li>etc.</li>
</ul>

* Cycling power on a host that is experiencing problems with an automated script should not be implemented lightly.  Consider the consequences of this carefully before implementing automatic reboots. :-)

### When Are Event Handlers Executed?

Event handlers are executed when a service or host:

<ul>
<li>Is in a SOFT problem state</li>
<li>Initially goes into a HARD problem state</li>
<li>Initially recovers from a SOFT or HARD problem state</li>
</ul>

SOFT and HARD states are described in detail <a href="statetypes.html">here</a> .

### Event Handler Types

There are different types of optional event handlers that you can define to handle host and state changes:

<ul>
<li>Global host event handler</li>
<li>Global service event handler</li>
<li>Host-specific event handlers</li>
<li>Service-specific event handlers</li>
</ul>

Global host and service event handlers are run for <i>every</i> host or service state change that occurs, immediately prior to any host- or service-specific event handler that may be run.  You can specify global event handler commands by using the <a href="configmain.html#global_host_event_handler">global_host_event_handler</a> and <a href="configmain.html#global_service_event_handler">global_service_event_handler</a> options in your main configuration file.

Individual hosts and services can have their own event handler command that should be run to handle state changes.  You can specify an event handler that should be run by using the <i>event_handler</i> directive in your <a href="objectdefinitions.html#host">host</a> and <a href="objectdefinitions.html#service">service</a> definitions.  These host- and service-specific event handlers are executed immediately after the (optional) global host or service event handler is executed.

### Enabling Event Handlers

Event handlers can be enabled or disabled on a program-wide basis by using the <a href="configmain.html#enable_event_handlers">enable_event_handlers</a> in your main configuration file.

Host- and service-specific event handlers can be enabled or disabled by using the <i>event_handler_enabled</i> directive in your <a href="objectdefinitions.html#host">host</a> and <a href="objectdefinitions.html#service">service</a> definitions.  Host- and service-specific event handlers will not be executed if the global <a href="configmain.html#enable_event_handlers">enable_event_handlers</a> option is disabled.

### Event Handler Execution Order

As already mentioned, global host and service event handlers are executed immediately before host- or service-specific event handlers.

Event handlers are executed for HARD problem and recovery states immediately after notifications are sent out.

### Writing Event Handler Commands

Event handler commands will likely be shell or perl scripts, but they can be any type of executable that can run from a command prompt.  At a minimum, the scripts should take the following <a href="macros.html">macros</a> as arguments:

For Services: <a href="macrolist.html#servicestate"><b>$SERVICESTATE$</b></a>, <a href="macrolist.html#servicestatetype"><b>$SERVICESTATETYPE$</b></a>, <a href="macrolist.html#serviceattempt"><b>$SERVICEATTEMPT$</b></a><br>

For Hosts: <a href="macrolist.html#hoststate"><b>$HOSTSTATE$</b></a>, <a href="macrolist.html#hoststatetype"><b>$HOSTSTATETYPE$</b></a>, <a href="macrolist.html#hostattempt"><b>$HOSTATTEMPT$</b></a>

The scripts should examine the values of the arguments passed to it and take any necessary action based upon those values.  The best way to understand how event handlers work is to see an example.  Lucky for you, one is provided <a href="#example">below</a>.

{{ site.hint }}Additional sample event handler scripts can be found in the <i>contrib/eventhandlers/</i> subdirectory of the Naemon distribution. {{ site.end }}

Some of these sample scripts demonstrate the use of <a href="extcommands.html">external commands</a> to implement a <a href="redundancy.html">redundant</a> and <a href="distributed.html">distributed</a> monitoring environments.

### Permissions For Event Handler Commands

Event handler commands will normally execute with the same permissions as the user under which
Naemon is running on your machine.  This can present a problem if you want to write an event handler that restarts system
services, as root privileges are generally required to do these sorts of tasks.

Ideally you should evaluate the types of event handlers you will be implementing and grant just enough permissions
to the Naemon user for executing the necessary system commands.  You might want to try using <a href="http://www.courtesan.com/sudo/sudo.html">sudo</a> to accomplish this.

<a name="example"></a>

### Service Event Handler Example

The example below assumes that you are monitoring the HTTP server on the local machine and have specified <i>restart-httpd</i> as the event handler command for the HTTP service definition.  Also, I will be assuming that you have set the <i>max_check_attempts</i> option for the service to be a value of 4 or greater (i.e. the service is checked 4 times before it is considered to have a real problem).  An abbreviated example service definition might look like this...

<pre>
define service{
	host_name			somehost
	service_description	HTTP
	max_check_attempts		4
	event_handler		restart-httpd
	...
	}
</pre>

Once the service has been defined with an event handler, we must define that event handler as a command.  An example command definition for <i>restart-httpd</i> is shown below.  Notice the macros in the command line that I am passing to the event handler script - these are important!

<pre>
define command{
	command_name	restart-httpd
	command_line	/usr/lib/naemon/plugins/eventhandlers/restart-httpd  $SERVICESTATE$ $SERVICESTATETYPE$ $SERVICEATTEMPT$
	}
</pre>

Now, let's actually write the event handler script (this is the <i>/usr/lib/naemon/plugins/eventhandlers/restart-httpd</i> script).

<pre>
#!/bin/sh
#
# Event handler script for restarting the web server on the local machine
#
# Note: This script will only restart the web server if the service is
#       retried 3 times (in a "soft" state) or if the web service somehow
#       manages to fall into a "hard" error state.
#

# What state is the HTTP service in?
case "$1" in
OK)
	# The service just came back up, so don't do anything...
	;;
WARNING)
	# We don't really care about warning states, since the service is probably still running...
	;;
UNKNOWN)
	# We don't know what might be causing an unknown error, so don't do anything...
	;;
CRITICAL)
	# Aha!  The HTTP service appears to have a problem - perhaps we should restart the server...

	# Is this a "soft" or a "hard" state?
	case "$2" in


	# We're in a "soft" state, meaning that Naemon is in the middle of retrying the
	# check before it turns into a "hard" state and contacts get notified...
	SOFT)

		# What check attempt are we on?  We don't want to restart the web server on the first
		# check, because it may just be a fluke!
		case "$3" in

		# Wait until the check has been tried 3 times before restarting the web server.
		# If the check fails on the 4th time (after we restart the web server), the state
		# type will turn to "hard" and contacts will be notified of the problem.
		# Hopefully this will restart the web server successfully, so the 4th check will
		# result in a "soft" recovery.  If that happens no one gets notified because we
		# fixed the problem!
		3)
			echo -n "Restarting HTTP service (3rd soft critical state)..."
			# Call the init script to restart the HTTPD server
			/etc/rc.d/init.d/httpd restart
			;;
			esac
		;;

	# The HTTP service somehow managed to turn into a hard error without getting fixed.
	# It should have been restarted by the code above, but for some reason it didn't.
	# Let's give it one last try, shall we?
	# Note: Contacts have already been notified of a problem with the service at this
	# point (unless you disabled notifications for this service)
	HARD)
		echo -n "Restarting HTTP service..."
		# Call the init script to restart the HTTPD server
		/etc/rc.d/init.d/httpd restart
		;;
	esac
	;;
esac
exit 0
</pre>

The sample script provided above will attempt to restart the web server on the local machine in two different instances:

<ul>
<li>After the service has been rechecked for the 3rd time and is in a SOFT CRITICAL state</li>
<li>After the service first goes into a HARD CRITICAL state</li>
</ul>

The script should theoretically restart and web server and fix the problem before the service goes into a HARD problem state, but we include a fallback case in the event it doesn't work the first time.  It should be noted that the event handler will only be executed the first time that the service falls into a HARD problem state.  This prevents Naemon from continuously executing the script to restart the web server if the service remains in a HARD problem state.  You don't want that. :-)

That's all there is to it!  Event handlers are pretty simple to write and implement, so give it a try and see what you can do.
