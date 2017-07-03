---
layout: doctoc
title: Performance Data
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="plugins.html">Plugins</a>, <a href="pluginapi.html">Plugin API</a>

### Introduction

Naemon is designed to allow <a href="plugins.html">plugins</a> to return optional performance data in addition to normal status data, as well as allow you to pass that performance data to external applications for processing.  A description of the different types of performance data, as well as information on how to go about processing that data is described below...

### Types of Performance Data

There are two basic categories of performance data that can be obtained from Naemon:

<ol>
<li>Check performance data</li>
<li>Plugin performance data</li>
</ol>

Check performance data is internal data that relates to the actual execution of a host or service check.  This might include things like service check latency (i.e. how "late" was the service check from its scheduled execution time) and the number of seconds a host or service check took to execute.  This type of performance data is available for all checks that are performed.  The <a href="macrolist.html#hostexecutiontime">$HOSTEXECUTIONTIME$</a> and <a href="macrolist.html#serviceexecutiontime">$SERVICEEXECUTIONTIME$</a> <a href="macros.html">macros</a> can be used to determine the number of seconds a host or service check was running and the <a href="macrolist.html#hostlatency">$HOSTLATENCY$</a> and <a href="macrolist.html#servicelatency">$SERVICELATENCY$</a> macros can be used to determine how "late" a regularly-scheduled host or service check was.

Plugin performance data is external data specific to the plugin used to perform the host or service check.  Plugin-specific data can include things like percent packet loss, free disk space, processor load, number of current users, etc. - basically any type of metric that the plugin is measuring when it executes.   Plugin-specific performance data is optional and may not be supported by all plugins.  Plugin-specific performance data (if available) can be obtained by using the <a href="macrolist.html#hostperfdata">$HOSTPERFDATA$</a> and <a href="macrolist.html#serviceperfdata">$SERVICEPERFDATA$</a> <a href="macros.html">macros</a>.  Read on for more information on how plugins can return performance data to Naemon for inclusion in the $HOSTPERFDATA$ and $SERVICEPERFDATA$ macros.

### Plugin Performance Data

At a minimum, Naemon plugins must return a single line of human-readable text that indicates the status of some type of measurable data.  For example, the check_ping plugin might return a line of text like the following:

<pre>
PING ok - Packet loss = 0%, RTA = 0.80 ms
</pre>

With this simple type of output, the entire line of text is available in the $HOSTOUTPUT$ or $SERVICEOUTPUT$ <a href="macros.html">macros</a> (depending on whether this plugin was used as a host check or service check).

Plugins can return optional performance data in their output by sending the normal, human-readable text string that they usually would, followed by a pipe character (|), and then a string containing one or more performance data metrics.  Let's take the check_ping plugin as an example and assume that it has been enhanced to return percent packet loss and average round trip time as performance data metrics.  Sample output from the plugin might look like this:

<pre>
PING ok - Packet loss = 0%, RTA = 0.80 ms | percent_packet_loss=0, rta=0.80
</pre>

When Naemon sees this plugin output format it will split the output into two parts:

<ol>
<li>Everything before the pipe character is considered to be the "normal" plugin output and will be stored in either the $HOSTOUTPUT$ or $SERVICEOUTPUT$ macro</li>
<li>Everything after the pipe character is considered to be the plugin-specific performance data and will be stored in the $HOSTPERFDATA$ or $SERVICEPERFDATA$ macro</li>
</ol>

In the example above, the $HOSTOUTPUT$ or $SERVICEOUTPUT$ macro would contain "<i>PING ok - Packet loss = 0%, RTA = 0.80 ms</i>" (without quotes) and the $HOSTPERFDATA$ or $SERVICEPERFDATA$ macro would contain "<i>percent_packet_loss=0, rta=0.80</i>" (without quotes).

Multiple lines of performance data (as well as normal text output) can be obtained from plugins, as described in the <a href="pluginapi.html">plugin API documentation</a>.

{{ site.note }}The Naemon daemon doesn't directly process plugin performance data, so it doesn't really care what the performance data looks like.  There aren't really any inherent limitations on the format or content of the performance data.  However, if you are using an external addon to process the performance data (i.e. PerfParse), the addon may be expecting that the plugin returns performance data in a specific format.  Check the documentation that comes with the addon for more information.{{ site.end }}



### Processing Performance Data

If you want to process the performance data that is available from Naemon and the plugins, you'll need to do the following:

<ol>
<li>Enable the <a href="configmain.html#process_performance_data">process_performance_data</a> option.<br><br></li>
<li>Configure Naemon so that performance data is either written to files and/or processed by executing commands.</li>
</ol>

Read on for information on how to process performance data by writing to files or executing commands.

### Processing Performance Data Using Commands

The most flexible way to process performance data is by having Naemon execute commands (that you specify) to process or redirect the data for later processing by external applications.  The commands that Naemon executes to process host and service performance data are determined by the <a href="configmain.html#host_perfdata_command">host_perfdata_command</a> and <a href="configmain.html#service_perfdata_command">service_perfdata_command</a> options, respectively.

An example command definition that redirects service check performance data to a text file for later processing by another application is shown below:

<pre>
define command{
	command_name	store-service-perfdata
	command_line	/bin/echo -e "$LASTSERVICECHECK$\t$HOSTNAME$\t$SERVICEDESC$\t$SERVICESTATE$\t$SERVICEATTEMPT$\t$SERVICESTATETYPE$\t$SERVICEEXECUTIONTIME$\t$SERVICELATENCY$\t$SERVICEOUTPUT$\t$SERVICEPERFDATA$" &gt;&gt; /var/cache/naemon/service-perfdata.dat
	}
</pre>

{{ site.hint }}This method, while flexible, comes with a relatively high CPU overhead.{{ site.end }}

If you're processing performance data for a large number of hosts and services, you'll probably want Naemon to write performance data to files instead.  This method is described in the next section.

### Writing Performance Data To Files

You can have Naemon write all host and service performance data directly to text files using the <a href="configmain.html#host_perfdata_file">host_perfdata_file</a> and <a href="configmain.html#service_perfdata_file">service_perfdata_file</a> options.  The format in which host and service performance data is written to those files is determined by the <a href="configmain.html#host_perfdata_file_template">host_perfdata_file_template</a> and <a href="configmain.html#service_perfdata_file_template">service_perfdata_file_template</a> options.

An example file format template for service performance data might look like this:

<pre>
service_perfdata_file_template=[SERVICEPERFDATA]\t$TIMET$\t$HOSTNAME$\t$SERVICEDESC$\t$SERVICEEXECUTIONTIME$\t$SERVICELATENCY$\t$SERVICEOUTPUT$\t$SERVICEPERFDATA$
</pre>

By default, the text files will be opened in "append" mode. If you need to change the modes to "write" or "non-blocking read/write" (useful when writing to pipes), you can use the <a href="configmain.html#host_perfdata_file_mode">host_perfdata_file_mode</a> and <a href="configmain.html#service_perfdata_file_mode">service_perfdata_file_mode</a> options.

Additionally, you can have Naemon periodically execute commands to periocially process the performance data files (e.g. rotate them) using the <a href="configmain.html#host_perfdata_file_processing_command">host_perfdata_file_processing_command</a> and <a href="configmain.html#service_perfdata_file_processing_command">service_perfdata_file_processing_command</a> options.  The interval at which these commands are executed are governed by the <a href="configmain.html#host_perfdata_file_processing_interval">host_perfdata_file_processing_interval</a> and <a href="configmain.html#service_perfdata_file_processing_interval">service_perfdata_file_processing_interval</a> options, respectively.
