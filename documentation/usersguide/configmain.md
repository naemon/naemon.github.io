---
layout: doctoc
title: Main Configuration File Options
---
### Notes

When creating and/or editing configuration files, keep the following in mind:

* Lines that start with a '#' character are taken to be comments and are not processed
* Variables names must begin at the start of the line - no white space is allowed before the name
* Variable names are case-sensitive

### Sample Configuration File

{{ site.hint }}A sample main configuration file (*/etc/naemon/naemon.cfg*) is installed for you when you follow the <a href="quickstart.html">quickstart installation guide</a>.{{ site.end }}

### Config File Location

The main configuration file is usually named *naemon.cfg* and located in the */etc/naemon/* directory.

### Configuration File Variables

Below you will find descriptions of each main Naemon configuration file option...

#### Log File

<table border="0">
<tr>
<td>Format:</td>
<td><b>log_file=&lt;file_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>log_file=/var/log/naemon/naemon.log</b></font></td>
</tr>
</table>

This variable specifies where Naemon should create its main log file.

This should be the first variable that you define in your configuration file, as Naemon will try to write errors that it finds in the rest of your configuration data to this file.
If you have log rotation enabled, this file will automatically be rotated every hour, day, week, or month.

<a name="cfg_file"></a>
#### Object Configuration File

<table border="0">
<tr>
<td>Format:</td>
<td><b>cfg_file=&lt;file_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<font color="red"><b>cfg_file=/etc/naemon/hosts.cfg</b></font><br>
<font color="red"><b>cfg_file=/etc/naemon/services.cfg</b></font><br>
<font color="red"><b>cfg_file=/etc/naemon/commands.cfg</b></font><br>
</td>
</tr>
</table>

This directive is used to specify an <a href="configobject.html">object configuration file</a>
containing object definitions that Naemon should use for monitoring.

Object configuration files contain definitions for hosts, host groups, contacts, contact groups, services, commands, etc.

You can separate your configuration information into several files and specify
multiple <i>cfg_file=</i> statements to have each of them processed.

<a name="cfg_dir"></a>
#### Object Configuration Directory

<table border="0">
<tr>
<td>Format:</td>
<td><b>cfg_dir=&lt;directory_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<font color="red"><b>cfg_dir=/etc/naemon/commands</b></font><br>
<font color="red"><b>cfg_dir=/etc/naemon/services</b></font><br>
<font color="red"><b>cfg_dir=/etc/naemon/hosts</b></font><br>
</td>
</tr>
</table>

This directive is used to specify a directory which contains <a href="configobject.html">object
configuration files</a> that Naemon should use for monitoring.

All files in the directory with a <i>.cfg</i> extension are processed as object config files.

Additionally, Naemon will recursively process all config files in subdirectories of the directory you specify here.

You can separate your configuration files into different directories and specify multiple
<i>cfg_dir=</i> statements to have all config files in each directory processed.


<a name="object_cache_file"></a>
#### Object Cache File

<table border="0">
<tr>
<td>Format:</td>
<td><b>object_cache_file=&lt;file_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<font color="red"><b>object_cache_file=/var/lib/naemon/objects.cache</b></font>
</td>
</tr>
</table>

This directive is used to specify a file in which a cached copy of
<a href="configobject.html">object definitions</a> should be stored.

The cache file is (re)created every time Naemon is (re)started and is used by the CGIs.

It is intended to speed up config file caching in the CGIs and allow you to edit
the source <a href="#cfg_file">object config files</a> while Naemon is running without affecting the output displayed in the CGIs.

<a name="precached_object_file"></a>
#### Precached Object File

<table border="0">
<tr>
<td>Format:</td>
<td><b>precached_object_file=&lt;file_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<font color="red"><b>precached_object_file=/var/lib/naemon/objects.precache</b></font>
</td>
</tr>
</table>

This directive is used to specify a file in which a pre-processed, pre-cached
copy of <a href="configobject.html">object definitions</a> should be stored.
Experienced Naemon administrators might remember this once drastically improving startup
time in large/complex Naemon installation - alas, as the Naemon startup has been
heavily optimized since, the benefits of employing tricks such as this one is
these days rarely important.

Read more information on how to speed up start times <a href="faststartup.html">here</a>.

<a name="resource_file"></a>
#### Resource File

<table border="0">
<tr>
<td>Format:</td>
<td><b>resource_file=&lt;file_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>resource_file=/etc/naemon/resource.cfg</b></font></td>
</tr>
</table>

This is used to specify an optional resource file that can contain $USERn$ <a href="macros.html">macro</a> definitions.

$USERn$ macros are useful for storing usernames, passwords, and items commonly used in command definitions (like directory paths).

The CGIs will <i>not</i> attempt to read resource files, so you can set restrictive permissions (600 or 660) on them to protect sensitive information.

You can include multiple resource files by adding multiple resource_file statements to the main config file - Naemon will process them all.

See the sample resource.cfg file in the <i>sample-config/</i> subdirectory of
the Naemon distribution for an example of how to define $USERn$ macros.

<a name="temp_file"></a>
#### Temp File

<table border="0">
<tr>
<td>Format:</td>
<td><b>temp_file=&lt;file_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>temp_file=/var/lib/naemon/naemon.tmp</b></font></td>
</tr>
</table>

This is a temporary file that Naemon periodically creates to use when updating comment data, status data, etc.

The file is deleted when it is no longer needed.

<a name="temp_path"></a>
#### Temp Path

<table border="0">
<tr>
<td>Format:</td>
<td><b>temp_path=&lt;dir_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>temp_path=/tmp</b></font></td>
</tr>
</table>

This is a directory that Naemon can use as scratch space for creating temporary files used during the monitoring process.

You should run *tmpwatch*, or a similar utility, on this directory occasionally to delete files older than 24 hours.

<a name="status_file"></a>
<a name="status_log"></a>
#### Status File

<table border="0">
<tr>
<td>Format:</td>
<td><b>status_file=&lt;file_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>status_file=/var/lib/status.dat</b></font></td>
</tr>
</table>

This is the file that Naemon uses to store the current status, comment, and downtime information.

This file is used by the CGIs so that current monitoring status can be reported via a web interface.

The CGIs must have read access to this file in order to function properly.

This file is deleted every time Naemon stops and recreated when it starts.

<a name="status_update_interval"></a>
#### Status File Update Interval

<table border="0">
<tr>
<td>Format:</td>
<td><b>status_update_interval=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>status_update_interval=15</b></font></td>
</tr>
</table>

This setting determines how often (in seconds) that Naemon will update status data in the <a href="#status_file">status file</a>.

The minimum update interval is 1 second.

<a name="naemon_user"></a>
#### Naemon User

<table border="0">
<tr>
<td>Format:</td>
<td><b>naemon_user=&lt;username/UID&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>naemon_user=naemon</b></font></td>
</tr>
</table>

This is used to set the effective user that the Naemon process should run as.

After initial program startup and before starting to monitor anything, Naemon will drop its effective privileges and run as this user.

You may specify either a username or a UID.

<a name="naemon_group"></a>
#### Naemon Group

<table border="0">
<tr>
<td>Format:</td>
<td><b>naemon_group=&lt;groupname/GID&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>naemon_group=naemon</b></font></td>
</tr>
</table>

This is used to set the effective group that the Naemon process should run as.

After initial program startup and before starting to monitor anything, Naemon will drop its effective privileges and run as this group.

You may specify either a groupname or a GID.

<a name="enable_notifications"></a>
#### Notifications Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>enable_notifications=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>enable_notifications=1</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will send out <a href="notifications.html">notifications</a> when it initially (re)starts.

If this option is disabled, Naemon will not send out notifications for any host or service.

{{ site.note }}If you have <a href="#retain_state_information">state retention</a> enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the <a href="#state_retention_file">state retention file</a>), <i>unless</i> you disable the <a href="#use_retained_program_state">use_retained_program_state</a> option.{{ site.end }}

If you want to change this option when state retention is active (and the <a href="#use_retained_program_state">use_retained_program_state</a> is enabled), you'll have to use the appropriate <a href="extcommands.html">external command</a> or change it via the web interface.

Values are as follows:

* 0 = Disable notifications
* 1 = Enable notifications (default)

<a name="execute_service_checks"></a>
#### Service Check Execution Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>execute_service_checks=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>execute_service_checks=1</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will execute service checks when it initially (re)starts.

If this option is disabled, Naemon will not actively execute any service checks and will remain in a sort of "sleep" mode (it can still accept <a href="passivechecks.html">passive checks</a> unless you've <a href="#accept_passive_service_checks">disabled them</a>).

This option is most often used when configuring backup monitoring servers, as described in the documentation on <a href="redundancy.html">redundancy</a>, or when setting up a <a href="distributed.html">distributed</a> monitoring environment.

{{ site.note }}If you have <a href="#retain_state_information">state retention</a> enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the <a href="#state_retention_file">state retention file</a>), *unless* you disable the <a href="#use_retained_program_state">use_retained_program_state</a> option.{{ site.end }}

If you want to change this option when state retention is active (and the <a href="#use_retained_program_state">use_retained_program_state</a> is enabled), you'll have to use the appropriate <a href="extcommands.html">external command</a> or change it via the web interface.

Values are as follows:

* 0 = Don't execute service checks
* 1 = Execute service checks (default)

<a name="accept_passive_service_checks"></a>
#### Passive Service Check Acceptance Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>accept_passive_service_checks=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>accept_passive_service_checks=1</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will accept <a href="passivechecks.html">passive service checks</a> when it initially (re)starts.

If this option is disabled, Naemon will not accept any passive service checks.

{{ site.note }}If you have <a href="#retain_state_information">state retention</a> enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the <a href="#state_retention_file">state retention file</a>), <i>unless</i> you disable the <a href="#use_retained_program_state">use_retained_program_state</a> option.{{ site.end }}

If you want to change this option when state retention is active (and the <a href="#use_retained_program_state">use_retained_program_state</a> is enabled), you'll have to use the appropriate <a href="extcommands.html">external command</a> or change it via the web interface.

Values are as follows:

* 0 = Don't accept passive service checks
* 1 = Accept passive service checks (default)

<a name="execute_host_checks"></a>
#### Host Check Execution Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>execute_host_checks=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>execute_host_checks=1</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will execute on-demand and regularly scheduled host checks when it initially (re)starts.

If this option is disabled, Naemon will not actively execute any host checks, although it can still accept <a href="passivechecks.html">passive host checks</a> unless you've <a href="#accept_passive_host_checks">disabled them</a>).

This option is most often used when configuring backup monitoring servers, as described in the documentation on <a href="redundancy.html">redundancy</a>, or when setting up a <a href="distributed.html">distributed</a> monitoring environment.

{{ site.note }}If you have <a href="#retain_state_information">state retention</a> enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the <a href="#state_retention_file">state retention file</a>), <i>unless</i> you disable the <a href="#use_retained_program_state">use_retained_program_state</a> option.{{ site.end }}

If you want to change this option when state retention is active (and the <a href="#use_retained_program_state">use_retained_program_state</a> is enabled), you'll have to use the appropriate <a href="extcommands.html">external command</a> or change it via the web interface.

Values are as follows:

* 0 = Don't execute host checks
* 1 = Execute host checks (default)

<a name="accept_passive_host_checks"></a>
#### Passive Host Check Acceptance Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>accept_passive_host_checks=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>accept_passive_host_checks=1</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will accept <a href="passivechecks.html">passive host checks</a> when it initially (re)starts.

If this option is disabled, Naemon will not accept any passive host checks.

{{ site.note }}If you have <a href="#retain_state_information">state retention</a> enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the <a href="#state_retention_file">state retention file</a>), <i>unless</i> you disable the <a href="#use_retained_program_state">use_retained_program_state</a> option.{{ site.end }}

If you want to change this option when state retention is active (and the <a href="#use_retained_program_state">use_retained_program_state</a> is enabled), you'll have to use the appropriate <a href="extcommands.html">external command</a> or change it via the web interface.

Values are as follows:

* 0 = Don't accept passive host checks
* 1 = Accept passive host checks (default)

<a name="enable_event_handlers"></a>
#### Event Handler Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>enable_event_handlers=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>enable_event_handlers=1</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will run <a href="eventhandlers.html">event handlers</a> when it initially (re)starts.

If this option is disabled, Naemon will not run any host or service event handlers.

{{ site.note }}If you have <a href="#retain_state_information">state retention</a> enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the <a href="#state_retention_file">state retention file</a>), <i>unless</i> you disable the <a href="#use_retained_program_state">use_retained_program_state</a> option.{{ site.end }}

If you want to change this option when state retention is active (and the <a href="#use_retained_program_state">use_retained_program_state</a> is enabled), you'll have to use the appropriate <a href="extcommands.html">external command</a> or change it via the web interface.

Values are as follows:

* 0 = Disable event handlers
* 1 = Enable event handlers (default)

<a name="check_external_commands"></a>
#### External Command Check Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>check_external_commands=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>check_external_commands=1</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will check the <a href="#command_file">command file</a> for

commands that should be executed.

This option must be enabled if you plan on using the <a href="cgis.html#cmd_cgi">command CGI</a> to issue commands via the web interface. More information on external commands can be found <a href="extcommands.html">here</a>.

* 0 = Don't check external commands
* 1 = Check external commands (default)

<a name="command_file"></a>
#### External Command File

<table border="0">
<tr>
<td>Format:</td>
<td><b>command_file=&lt;file_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>command_file=/var/lib/naemon/rw/naemon.cmd</b></font></td>
</tr>
</table>

This is the file that Naemon will check for external commands to process.

The <a href="cgis.html#cmd_cgi">command CGI</a> writes commands to this file.

The external command file is implemented as a named pipe (FIFO), which is created when Naemon starts and removed when it shuts down.

If the file exists when Naemon starts, the Naemon process will terminate with an error message.

More information on external commands can be found <a href="extcommands.html">here</a>.

Check out the <a href="#query_socket">the query socket</a> for a way to submit these commands, and receive confirmation that Naemon accepted them.

<a name="lock_file"></a>
#### Lock File

<table border="0">
<tr>
<td>Format:</td>
<td><b>lock_file=&lt;file_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>lock_file=/tmp/naemon.lock</b></font></td>
</tr>
</table>

This option specifies the location of the lock file that Naemon should create when it runs as a daemon (when started with the -d command line argument).

This file contains the process id (PID) number of the running Naemon process.

<a name="retain_state_information"></a>
#### State Retention Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>retain_state_information=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>retain_state_information=1</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will retain state information for hosts and services between program restarts.

If you enable this option, you should supply a value for the <a href="#state_retention_file">state_retention_file</a> variable.

When enabled, Naemon will save all state information for hosts and service before
it shuts down (or restarts) and will read in previously saved state information when it starts up again.

* 0 = Don't retain state information
* 1 = Retain state information (default)

<a name="state_retention_file"></a>
#### State Retention File

<table border="0">
<tr>
<td>Format:</td>
<td><b>state_retention_file=&lt;file_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>state_retention_file=/var/lib/naemon/retention.dat</b></font></td>
</tr>
</table>

This is the file that Naemon will use for storing status, downtime, and comment information before it shuts down.

When Naemon is restarted it will use the information stored in this file for setting the initial states of services and hosts before it starts monitoring anything.

In order to make Naemon retain state information between program restarts, you
must enable the <a href="#retain_state_information">retain_state_information</a> option.

<a name="retention_update_interval"></a>
#### Automatic State Retention Update Interval

<table border="0">
<tr>
<td>Format:</td>
<td><b>retention_update_interval=&lt;minutes&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>retention_update_interval=60</b></font></td>
</tr>
</table>

This setting determines how often (in minutes) that Naemon will automatically save retention data during normal operation.

If you set this value to 0, Naemon will not save retention data at regular intervals, but it will still save retention data before shutting down or restarting.

If you have disabled state retention (with the <a href="#retain_state_information">retain_state_information</a> option), this option has no effect.

<a name="use_retained_program_state"></a>
#### Use Retained Program State Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>use_retained_program_state=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>use_retained_program_state=1</b></font></td>
</tr>
</table>

This setting determines whether or not Naemon will set various program-wide state
variables based on the values saved in the retention file.

Some of these program-wide state variables that are normally saved across program
restarts if state retention is enabled include the <a href="#enable_notifications">enable_notifications</a>,
<a href="#enable_flap_detection">enable_flap_detection</a>, <a href="#enable_event_handlers">enable_event_handlers</a>,
<a href="#execute_service_checks">execute_service_checks</a>,
and <a href="#accept_passive_service_checks">accept_passive_service_checks</a> options.
If you do not have <a href="#retain_state_information">state retention</a> enabled, this option has no effect.

* 0 = Don't use retained program state
* 1 = Use retained program state (default)

<a name="use_retained_scheduling_info"></a>
#### Use Retained Scheduling Info Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>use_retained_scheduling_info=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>use_retained_scheduling_info=1</b></font></td>
</tr>
</table>

This setting determines whether or not Naemon will retain scheduling info (next check times) for hosts and services when it restarts.

If you are adding a large number (or percentage) of hosts and services, I would recommend disabling this option when you first restart Naemon, as it can adversely skew the spread of initial checks.

Otherwise you will probably want to

leave it enabled.

* 0 = Don't use retained scheduling info
* 1 = Use retained scheduling info (default)

<a name="retained_host_attribute_mask"></a>
<a name="retained_service_attribute_mask"></a>
#### Retained Host and Service Attribute Masks

<table border="0">
<tr>
<td>Format:</td>
<td>
<b>retained_host_attribute_mask=&lt;number&gt;</b><br>
<b>retained_service_attribute_mask=&lt;number&gt;</b>
</td>
</tr>
<tr>
<td>Example:</td>
<td>
<font color="red"><b>retained_host_attribute_mask=0</b></font><br>
<font color="red"><b>retained_service_attribute_mask=0</b></font>
</td>
</tr>
</table>

WARNING: This is an advanced feature.

You'll need to read the Naemon source code to use this option effectively.

These options determine which host or service attributes are NOT retained across program restarts.

The values for these options are a bitwise AND of values specified by the "MODATTR_" definitions in the include/common.h source code file.

By default, all host and service attributes are retained.

<a name="retained_process_host_attribute_mask"></a>
<a name="retained_process_service_attribute_mask"></a>
#### Retained Process Attribute Masks

<table border="0">
<tr>
<td>Format:</td>
<td>
<b>retained_process_host_attribute_mask=&lt;number&gt;</b><br>
<b>retained_process_service_attribute_mask=&lt;number&gt;</b>
</td>
</tr>
<tr>
<td>Example:</td>
<td>
<font color="red"><b>retained_process_host_attribute_mask=0</b></font><br>
<font color="red"><b>retained_process_service_attribute_mask=0</b></font>
</td>
</tr>
</table>

WARNING: This is an advanced feature.

You'll need to read the Naemon source code to use this option effectively.

These options determine which process attributes are NOT retained across program restarts.

There are two masks because there are often separate host and service process attributes that can be changed.

For example, host checks can be disabled at the program level, while service checks are still enabled.

The values for these options are a bitwise AND of values specified by the "MODATTR_" definitions in the include/common.h source code file.

By default, all process attributes are retained.

<a name="retained_contact_host_attribute_mask"></a>
<a name="retained_contact_service_attribute_mask"></a>
#### Retained Contact Attribute Masks

<table border="0">
<tr>
<td>Format:</td>
<td>
<b>retained_contact_host_attribute_mask=&lt;number&gt;</b><br>
<b>retained_contact_service_attribute_mask=&lt;number&gt;</b>
</td>
</tr>
<tr>
<td>Example:</td>
<td>
<font color="red"><b>retained_contact_host_attribute_mask=0</b></font><br>
<font color="red"><b>retained_contact_service_attribute_mask=0</b></font>
</td>
</tr>
</table>

{{ site.warn }}
This is an advanced feature. You'll need to read the Naemon source code to use this option effectively.
{{ site.end }}

These options determine which contact attributes are NOT retained across program restarts.

There are two masks because there are often separate host and service contact attributes that can be changed.

The values for these options are a bitwise AND of values specified by the "MODATTR_" definitions in the include/common.h source code file.

By default, all process attributes are retained.

<a name="use_syslog"></a>
#### Syslog Logging Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>use_syslog=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>use_syslog=1</b></font></td>
</tr>
</table>

This variable determines whether messages are logged to the syslog facility on your local host.

Values
are as follows:

* 0 = Don't use syslog facility
* 1 = Use syslog facility

<a name="log_notifications"></a>
#### Notification Logging Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>log_notifications=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>log_notifications=1</b></font></td>
</tr>
</table>

This variable determines whether or not notification messages are logged.

If you have a lot of contacts
or regular service failures your log file will grow relatively quickly.

Use this option to keep contact notifications from being logged.

* 0 = Don't log notifications
* 1 = Log notifications

<a name="log_service_retries"></a>
#### Service Check Retry Logging Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>log_service_retries=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>log_service_retries=1</b></font></td>
</tr>
</table>

This variable determines whether or not service check retries are logged.

Service check retries occur when a service check results in a non-OK state, but you have configured Naemon to retry the service more than once before responding to the error.

Services in this situation are considered to be in "soft" states.

Logging service check retries is mostly useful when attempting to debug Naemon or test out service <a href="eventhandlers.html">event handlers</a>.

* 0 = Don't log service check retries
* 1 = Log service check retries

<a name="log_host_retries"></a>
#### Host Check Retry Logging Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>log_host_retries=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>log_host_retries=1</b></font></td>
</tr>
</table>

This variable determines whether or not host check retries are logged.

Logging host check retries is mostly useful when attempting to debug Naemon or test out host <a href="eventhandlers.html">event handlers</a>.

* 0 = Don't log host check retries
* 1 = Log host check retries

<a name="log_event_handlers"></a>
#### Event Handler Logging Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>log_event_handlers=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>log_event_handlers=1</b></font></td>
</tr>
</table>

This variable determines whether or not service and host <a href="eventhandlers.html">event handlers</a> are logged.

Event handlers are optional commands that can be run whenever a service or hosts changes state.

Logging event handlers is most useful when debugging Naemon or first trying out your event handler scripts.

* 0 = Don't log event handlers
* 1 = Log event handlers

<a name="log_initial_states"></a>
#### Initial States Logging Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>log_initial_states=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>log_initial_states=1</b></font></td>
</tr>
</table>

This variable determines whether or not Naemon will force all initial host and service states to be logged, even if they result in an OK state.

Initial service and host states are normally only logged when there is a problem on the first check.

Enabling this option is useful if you are using an application that scans the log file to determine long-term state statistics for services and hosts.

* 0 = Don't log initial states (default)
* 1 = Log initial states

<a name="log_external_commands"></a>
#### External Command Logging Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>log_external_commands=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>log_external_commands=1</b></font></td>
</tr>
</table>

This variable determines whether or not Naemon will log <a href="extcommands.html">external commands</a> that it receives from the <a href="#command_file">external command file</a>.

{{ site.note }}This option does not control whether or not <a href="passivechecks.html">passive service checks</a> (which are a type of external command) get logged.{{ site.end }}

To enable or disable logging of passive checks, use the <a href="#log_passive_checks">log_passive_checks</a> option.

* 0 = Don't log external commands
* 1 = Log external commands (default)

<a name="log_passive_checks"></a>
#### Passive Check Logging Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>log_passive_checks=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>log_passive_checks=1</b></font></td>
</tr>
</table>

This variable determines whether or not Naemon will log <a href="passivechecks.html">passive host and service checks</a> that it receives from the <a href="#command_file">external command file</a>.

If you are setting up a <a href="distributed.html">distributed monitoring environment</a> or plan on handling a large number of passive checks on a regular basis, you may wish to disable this option so your log file doesn't get too large.

* 0 = Don't log passive checks
* 1 = Log passive checks (default)

<a name="global_host_event_handler"></a>
#### Global Host Event Handler Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>global_host_event_handler=&lt;command&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>global_host_event_handler=log-host-event-to-db</b></font></td>
</tr>
</table>

This option allows you to specify a host event handler command that is to be run for every host state change.

The global event handler is executed immediately prior to the event handler that you have optionally specified in each host definition.

The <i>command</i> argument is the short name of a command that you define in your <a href="configobject.html">object configuration file</a>.

The maximum amount of time that this command can run is controlled by the <a href="#event_handler_timeout">event_handler_timeout</a> option.

More information on event handlers can be found <a href="eventhandlers.html">here</a>.

<a name="global_service_event_handler"></a>
#### Global Service Event Handler Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>global_service_event_handler=&lt;command&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>global_service_event_handler=log-service-event-to-db</b></font></td>
</tr>
</table>

This option allows you to specify a service event handler command that is to be run for every service state change.

The global event handler is executed immediately prior to the event handler that you have optionally specified in each service definition.

The <i>command</i> argument is the short name of a command that you define in your <a href="configobject.html">object configuration file</a>.

The maximum amount of time that this command can run is controlled by the <a href="#event_handler_timeout">event_handler_timeout</a> option.

More information on event handlers can be found <a href="eventhandlers.html">here</a>.

<a name="service_inter_check_delay_method"></a>
#### Service Inter-Check Delay Method

<table border="0">
<tr>
<td>Format:</td>
<td><b>service_inter_check_delay_method=&lt;n/d/s/x.xx&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>service_inter_check_delay_method=s</b></font></td>
</tr>
</table>

This option allows you to control how service checks are initially "spread out" in the event queue.

Using a "smart" delay calculation (the default) will cause Naemon to calculate an average check interval and spread initial checks of all services out over that interval, thereby helping to eliminate CPU load spikes.

Using no delay is generally <i>not</i> recommended, as it will cause all service checks to be scheduled for execution at the same time.

This means that you will generally have large CPU spikes when the services are all executed in parallel.

 More information on how to estimate how the inter-check delay affects service check scheduling can be found <a href="checkscheduling.html#service_inter_check_delay">here</a>.

Values are as follows:

* n = Don't use any delay - schedule all service checks to run immediately (i.e. at the same time!)
* d = Use a "dumb" delay of 1 second between service checks
* s = Use a "smart" delay calculation to spread service checks out evenly (default)
* x.xx = Use a user-supplied inter-check delay of x.xx seconds

<a name="max_service_check_spread"></a>
#### Maximum Service Check Spread

<table border="0">
<tr>
<td>Format:</td>
<td><b>max_service_check_spread=&lt;minutes&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>max_service_check_spread=30</b></font></td>
</tr>
</table>

This option determines the maximum number of minutes from when Naemon starts that all services (that are scheduled to be regularly checked) are checked.

This option will automatically adjust the <a href="#service_inter_check_delay_method">service inter-check delay method</a> (if necessary) to ensure that the initial checks of all services occur within the timeframe you specify.

In general, this option will not have an affect on service check scheduling if scheduling information is being retained using the <a href="#use_retained_scheduling_info">use_retained_scheduling_info</a> option.

Default value is <b>30</b> (minutes).

<a name="service_interleave_factor"></a>
#### Service Interleave Factor

<table border="0">
<tr>
<td>Format:</td>
<td><b>service_interleave_factor=&lt;s|*x*&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>service_interleave_factor=s</b></font></td>
</tr>
</table>

This variable determines how service checks are interleaved. Interleaving allows for a more even distribution of service checks, reduced load on remote hosts, and faster overall detection of host problems.

Setting this value to 1 is equivalent to not interleaving the service checks (this is how versions of Naemon previous to 0.0.5 worked).

Set this value to **s** (smart) for automatic calculation of the interleave factor unless you have a specific reason to change it.

The best way to understand how interleaving works is to watch the <a href="cgis.html#status_cgi">status CGI</a> (detailed view) when Naemon is just starting.

You should see that the service check results are spread out as they begin to appear.

More information on how interleaving works can be found <a href="checkscheduling.html#service_interleaving">here</a>.

* *x* = A number greater than or equal to 1 that specifies the interleave factor to use.

An interleave factor of 1 is equivalent to not interleaving the service checks.
* s = Use a "smart" interleave factor calculation (default)

<a name="max_concurrent_checks"></a>
#### Maximum Concurrent Service Checks

<table border="0">
<tr>
<td>Format:</td>
<td><b>max_concurrent_checks=&lt;max_checks&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>max_concurrent_checks=20</b></font></td>
</tr>
</table>

This option allows you to specify the maximum number of service checks that can be run in parallel at any given time.

Specifying a value of 1 for this variable essentially prevents any service checks from being run in parallel.

Specifying a value of 0 (the default) does not place any restrictions on the number of concurrent checks.

You'll have to modify this value based on the system resources you have available on the machine that runs Naemon, as it directly affects the maximum load that will be imposed on the system (processor utilization, memory, etc.).

More information on how to estimate how many concurrent checks you should allow can be found <a href="checkscheduling.html#max_concurrent_checks">here</a>.

<a name="check_result_reaper_frequency"></a>
#### Check Result Reaper Frequency

<table border="0">
<tr>
<td>Format:</td>
<td><b>check_result_reaper_frequency=&lt;frequency_in_seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>check_result_reaper_frequency=5</b></font></td>
</tr>
</table>

This option allows you to control the frequency *in seconds* of check result "reaper" events.

"Reaper" events process the results from host and service checks that have finished executing.

These events constitute the core of the monitoring logic in Naemon.

<a name="max_check_result_reaper_time"></a>
#### Maximum Check Result Reaper Time

<table border="0">
<tr>
<td>Format:</td>
<td><b>max_check_result_reaper_time=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>max_check_result_reaper_time=30</b></font></td>
</tr>
</table>

This option allows you to control the maximum amount of time *in seconds* that host and service check result "reaper" events are allowed to run.

"Reaper" events process the results from host and service checks that have finished executing.

If there are a lot of results to process, reaper events may take a long time to finish, which might delay timely execution of new host and service checks.

This variable allows you to limit the amount of time that an individual reaper event will run before it hands control back over to Naemon for other portions of the monitoring logic.

<a name="check_result_path"></a>
#### Check Result Path

<table border="0">
<tr>
<td>Format:</td>
<td><b>check_result_path=&lt;path&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>check_result_path=/var/spool/naemon/checkresults</b></font></td>
</tr>
</table>

This options determines which directory Naemon will use to temporarily store host and service check results before they are processed.

This directory should not be used to store any other files, as Naemon will periodically clean this directory
of old file (see the <a href="#max_check_result_file_age">max_check_result_file_age</a> option for more information).

{{ site.note }}Make sure that only a single instance of Naemon has access to the check result path.{{ site.end }}

If multiple instances of Naemon have their check result path set to the same directory, you will run into
problems with check results being processed (incorrectly) by the wrong instance of Naemon!

<a name="max_check_result_file_age"></a>
#### Max Check Result File Age

<table border="0">
<tr>
<td>Format:</td>
<td><b>max_check_result_file_age=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>max_check_result_file_age=3600</b></font></td>
</tr>
</table>

This options determines the maximum age in seconds that Naemon will consider check result files found in the <a href="#check_result_path">check_result_path</a> directory to be valid.

Check result files that are older that this threshold will be deleted by Naemon and the check results they contain will not be processed.

By using a value of zero (0) with this option, Naemon will process all check result files - even if they're older than your hardware :-).

<a name="host_inter_check_delay_method"></a>
#### Host Inter-Check Delay Method

<table border="0">
<tr>
<td>Format:</td>
<td><b>host_inter_check_delay_method=&lt;n/d/s/x.xx&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>host_inter_check_delay_method=s</b></font></td>
</tr>
</table>

This option allows you to control how host checks *that are scheduled to be checked on a regular basis* are initially "spread out" in the event queue.

Using a "smart" delay calculation (the default) will cause Naemon to calculate an average check interval and spread initial checks of all hosts out over that interval, thereby helping to eliminate CPU load spikes.

Using no delay is generally *not* recommended.

Using no delay will cause all host checks to be scheduled for execution at the same time.

More information on how to estimate how the inter-check delay affects host check scheduling can be found <a href="checkscheduling.html#host_inter_check_delay">here</a>.Values are as follows:

* n = Don't use any delay - schedule all host checks to run immediately (i.e. at the same time!)
* d = Use a "dumb" delay of 1 second between host checks
* s = Use a "smart" delay calculation to spread host checks out evenly (default)
* x.xx = Use a user-supplied inter-check delay of x.xx seconds

<a name="max_host_check_spread"></a>
#### Maximum Host Check Spread

<table border="0">
<tr>
<td>Format:</td>
<td><b>max_host_check_spread=&lt;minutes&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>max_host_check_spread=30</b></font></td>
</tr>
</table>

This option determines the maximum number of minutes from when Naemon starts that all hosts (that are scheduled to be regularly checked) are checked.

This option will automatically adjust the <a href="#host_inter_check_delay_method">host inter-check delay method</a> (if necessary) to ensure that the initial checks of all hosts occur within the timeframe you specify.

In general, this option will not have an affect on host check scheduling if scheduling information is being retained using the <a href="#use_retained_scheduling_info">use_retained_scheduling_info</a> option.

Default value is <b>30</b> (minutes).

<a name="interval_length"></a>
#### Timing Interval Length

<table border="0">
<tr>
<td>Format:</td>
<td><b>interval_length=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>interval_length=60</b></font></td>
</tr>
</table>

This is the number of seconds per "unit interval" used for timing in the scheduling queue, re-notifications, etc. "Units intervals" are used in the object configuration file to determine how often to run a service check, how often to re-notify a contact, etc.

{{ site.warn }}
The default value for this is set to 60, which means that a "unit value" of 1 in the object configuration file will mean 60 seconds (1 minute).
I have not really tested other values for this variable, so proceed at your own risk if you decide to do so!
{{ site.end }}

<a name="auto_reschedule_checks"></a>
#### Auto-Rescheduling Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>auto_reschedule_checks=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>auto_reschedule_checks=1</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will attempt to automatically reschedule active host and service checks to "smooth" them out over time.

This can help to balance the load on the monitoring server, as it will attempt to keep the time between consecutive checks consistent, at the expense of executing checks on a more rigid schedule.

{{ site.warning }}
THIS IS AN EXPERIMENTAL FEATURE AND MAY BE REMOVED IN FUTURE VERSIONS.
ENABLING THIS OPTION CAN DEGRADE PERFORMANCE - RATHER THAN INCREASE IT - IF USED IMPROPERLY!
{{ site.end }}

<a name="auto_rescheduling_interval"></a>
#### Auto-Rescheduling Interval

<table border="0">
<tr>
<td>Format:</td>
<td><b>auto_rescheduling_interval=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>auto_rescheduling_interval=30</b></font></td>
</tr>
</table>

This option determines how often (in seconds) Naemon will attempt to automatically reschedule checks.

This option only has an effect if the <a href="#auto_reschedule_checks">auto_reschedule_checks</a> option is enabled.

Default is 30 seconds.

{{ site.warn }}
THIS IS AN EXPERIMENTAL FEATURE AND MAY BE REMOVED IN FUTURE VERSIONS.
ENABLING THIS OPTION CAN DEGRADE PERFORMANCE - RATHER THAN INCREASE IT - IF USED IMPROPERLY!
{{ site.end }}

<a name="auto_rescheduling_window"></a>

#### Auto-Rescheduling Window

<table border="0">
<tr>
<td>Format:</td>
<td><b>auto_rescheduling_window=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>auto_rescheduling_window=180</b></font></td>
</tr>
</table>

This option determines the "window" of time (in seconds) that Naemon will look at when automatically rescheduling checks. Only host and service checks that occur in the next X seconds (determined by this variable) will be rescheduled.

This option only has an effect if the <a href="#auto_reschedule_checks">auto_reschedule_checks</a> option is enabled.

Default is 180 seconds (3 minutes).

{{ site.warn }}
THIS IS AN EXPERIMENTAL FEATURE AND MAY BE REMOVED IN FUTURE VERSIONS.
ENABLING THIS OPTION CAN DEGRADE PERFORMANCE - RATHER THAN INCREASE IT - IF USED IMPROPERLY!
{{ site.end }}

<a name="use_agressive_host_checking"></a>
<a name="use_aggressive_host_checking"></a>
#### Aggressive Host Checking Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>use_aggressive_host_checking=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>use_aggressive_host_checking=0</b></font></td>
</tr>
</table>

Naemon tries to be smart about how and when it checks the status of hosts.

In general, disabling this option will allow Naemon to make some smarter decisions and check hosts a bit faster.

Enabling this option will increase the amount of time required to check hosts, but may improve reliability a bit.

Unless you have problems with Naemon not recognizing that a host recovered, I would suggest **not** enabling this option.

* 0 = Don't use aggressive host checking (default)
* 1 = Use aggressive host checking

<a name="translate_passive_host_checks"></a>
#### Translate Passive Host Checks Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>translate_passive_host_checks=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>translate_passive_host_checks=1</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will translate DOWN/UNREACHABLE passive host check results to their "correct" state from the viewpoint of the local Naemon instance.

This can be very useful in distributed and failover monitoring installations.

More information on passive check state translation can be found <a href="passivestatetranslation.html">here</a>.

* 0 = Disable check translation (default)
* 1 = Enable check translation

<a name="passive_host_checks_are_soft"></a>
#### Passive Host Checks Are SOFT Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>passive_host_checks_are_soft=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>passive_host_checks_are_soft=1</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will treat <a href="passivechecks.html">passive host checks</a> as HARD states or SOFT states.

By default, a passive host check result will put a host into a <a href="statetypes.html">HARD state type</a>.

You can change this behavior by enabling this option.

* 0 = Passive host checks are HARD (default)
* 1 = Passive host checks are SOFT

<a name="enable_predictive_host_dependency_checks"></a>
#### Predictive Host Dependency Checks Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>enable_predictive_host_dependency_checks=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>enable_predictive_host_dependency_checks=1</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will execute predictive checks of hosts that are being depended upon (as defined in <a href="objectdefinitions.html#hostdependency">host dependencies</a>) for a particular host when it changes state.

Predictive checks help ensure that the dependency logic is as accurate as possible.

More information on how predictive checks work can be found <a href="dependencychecks.html">here</a>.

* 0 = Disable predictive checks
* 1 = Enable predictive checks (default)

<a name="enable_predictive_service_dependency_checks"></a>
#### Predictive Service Dependency Checks Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>enable_predictive_service_dependency_checks=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>enable_predictive_service_dependency_checks=1</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will execute predictive checks of services that are being depended upon (as defined in <a href="objectdefinitions.html#servicedependency">service dependencies</a>) for a particular service when it changes state.

Predictive checks help ensure that the dependency logic is as accurate as possible.

More information on how predictive checks work can be found <a href="dependencychecks.html">here</a>.

* 0 = Disable predictive checks
* 1 = Enable predictive checks (default)

<a name="cached_host_check_horizon"></a>
#### Cached Host Check Horizon

<table border="0">
<tr>
<td>Format:</td>
<td><b>cached_host_check_horizon=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>cached_host_check_horizon=15</b></font></td>
</tr>
</table>

This option determines the maximum amount of time (in seconds) that the state of a previous host check is considered current.

Cached host states (from host checks that were performed more recently than the time specified by this value) can improve host check performance immensely.

Too high of a value for this option may result in (temporarily) inaccurate host states, while a low value may result in a performance hit for host checks.

Use a value of 0 if you want to disable host check caching.

More information on cached checks can be found <a href="cachedchecks.html">here</a>.

<a name="cached_service_check_horizon"></a>
#### Cached Service Check Horizon

<table border="0">
<tr>
<td>Format:</td>
<td><b>cached_service_check_horizon=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>cached_service_check_horizon=15</b></font></td>
</tr>
</table>

This option determines the maximum amount of time (in seconds) that the state of a previous service check is considered current.

Cached service states (from service checks that were performed more recently than the time specified by this value) can improve service check performance when a lot of <a href="objectdefinitions.html#servicedependency">service dependencies</a> are used.

Too high of a value for this option may result in inaccuracies in the service dependency logic.

Use a value of 0 if you want to disable service check caching.

More information on cached checks can be found <a href="cachedchecks.html">here</a>.

<a name="use_large_installation_tweaks"></a>
#### Large Installation Tweaks Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>use_large_installation_tweaks=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>use_large_installation_tweaks=0</b></font></td>
</tr>
</table>

This option determines whether or not the Naemon daemon will take several shortcuts to improve performance.

These shortcuts result in the loss of a few features, but larger installations will likely see a lot of benefit from doing so.

More information on what optimizations are taken when you enable this option can be found <a href="largeinstalltweaks.html">here</a>.

* 0 = Don't use tweaks (default)
* 1 = Use tweaks

<a name="free_child_process_memory"></a>
#### Child Process Memory Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>free_child_process_memory=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>free_child_process_memory=0</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will free memory in child processes when they are fork()ed off from the main process.

By default, Naemon frees memory.

However, if the <a href="#use_large_installation_tweaks">use_large_installation_tweaks</a> option is enabled, it will not.

By defining this option in your configuration file, you are able to override things to get the behavior you want.

* 0 = Don't free memory
* 1 = Free memory

<a name="child_processes_fork_twice"></a>
#### Child Processes Fork Twice

<table border="0">
<tr>
<td>Format:</td>
<td><b>child_processes_fork_twice=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>child_processes_fork_twice=0</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will fork() child processes twice when it executes host and service checks.

By default, Naemon fork()s twice.

However, if the <a href="#use_large_installation_tweaks">use_large_installation_tweaks</a> option is enabled, it will only fork() once.

By defining this option in your configuration file, you are able to override things to get the behavior you want.

* 0 = Fork() just once
* 1 = Fork() twice

<a name="enable_environment_macros"></a>
#### Environment Macros Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>enable_environment_macros=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>enable_environment_macros=0</b></font></td>
</tr>
</table>

This option determines whether or not the Naemon daemon will make all standard <a href="macrolist.html">macros</a> available as environment variables to your check, notification, event hander, etc. commands.

In large Naemon installations this can be problematic because it takes additional memory and (more importantly) CPU to compute the values of all macros and make them available to the environment.

* 0 = Don't make macros available as environment variables
* 1 = Make macros available as environment variables (default)

<a name="enable_flap_detection"></a>
#### Flap Detection Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>enable_flap_detection=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>enable_flap_detection=0</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will try and detect hosts and services that are "flapping".

Flapping occurs when a host or service changes between states too frequently, resulting in a barrage of notifications being sent out.

When Naemon detects that a host or service is flapping, it will temporarily suppress notifications for that host/service until it stops flapping.

Flap detection is very experimental at this point, so use this feature with caution!

More information on how flap detection and handling works can be found <a href="flapping.html">here</a>.



{{ site.note }}If you have <a href="#retain_state_information">state retention</a> enabled, Naemon
will ignore this setting when it (re)starts and use the last known setting for this option
(as stored in the <a href="#state_retention_file">state retention file</a>), <i>unless</i> you
disable the <a href="#use_retained_program_state">use_retained_program_state</a> option.{{ site.end }}

If you want to change this option when state retention is active
(and the <a href="#use_retained_program_state">use_retained_program_state</a> is enabled),
you'll have to use the appropriate <a href="extcommands.html">external command</a> or change
it via the web interface.

* 0 = Don't enable flap detection (default)
* 1 = Enable flap detection

<a name="low_service_flap_threshold"></a>
#### Low Service Flap Threshold

<table border="0">
<tr>
<td>Format:</td>
<td><b>low_service_flap_threshold=&lt;percent&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>low_service_flap_threshold=25.0</b></font></td>
</tr>
</table>

This option is used to set the low threshold for detection of service flapping.

For more information on how flap detection and handling works (and how this option affects things) read <a href="flapping.html">this</a>.

<a name="high_service_flap_threshold"></a>
#### High Service Flap Threshold

<table border="0">
<tr>
<td>Format:</td>
<td><b>high_service_flap_threshold=&lt;percent&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>high_service_flap_threshold=50.0</b></font></td>
</tr>
</table>

This option is used to set the high threshold for detection of service flapping.

For more information on how flap detection and handling works (and how this option affects things) read <a href="flapping.html">this</a>.

<a name="low_host_flap_threshold"></a>
#### Low Host Flap Threshold

<table border="0">
<tr>
<td>Format:</td>
<td><b>low_host_flap_threshold=&lt;percent&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>low_host_flap_threshold=25.0</b></font></td>
</tr>
</table>

This option is used to set the low threshold for detection of host flapping.

For more information on how flap detection and handling works (and how this option affects things) read <a href="flapping.html">this</a>.

<a name="high_host_flap_threshold"></a>
#### High Host Flap Threshold

<table border="0">
<tr>
<td>Format:</td>
<td><b>high_host_flap_threshold=&lt;percent&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>high_host_flap_threshold=50.0</b></font></td>
</tr>
</table>

This option is used to set the high threshold for detection of host flapping.

For more information on how flap detection and handling works (and how this option affects things) read <a href="flapping.html">this</a>.

<a name="soft_state_dependencies"></a>
#### Soft State Dependencies Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>soft_state_dependencies=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>soft_state_dependencies=0</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will use soft state information when checking <a href="dependencies.html">host and service dependencies</a>.

Normally Naemon will only use the latest hard host or service state when checking dependencies.

If you want it to use the latest state (regardless of whether its a soft or hard <a href="statetypes.html">state type</a>), enable this option.

* 0 = Don't use soft state dependencies (default)
* 1 = Use soft state dependencies

<a name="service_check_timeout"></a>
#### Service Check Timeout

<table border="0">
<tr>
<td>Format:</td>
<td><b>service_check_timeout=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>service_check_timeout=60</b></font></td>
</tr>
</table>

This is the maximum number of seconds that Naemon will allow service checks to run.

If checks exceed this limit, they are killed and a CRITICAL state is returned.

 A timeout error will also be logged.

There is often widespread confusion as to what this option really does.

It is meant to be used as a last ditch mechanism to kill off plugins which are misbehaving and not exiting in a timely manner.

It should be set to something high (like 60 seconds or more), so that each service check normally finishes executing within this time limit.

If a service check runs longer than this limit, Naemon will kill it off thinking it is a runaway processes.

<a name="host_check_timeout"></a>
#### Host Check Timeout

<table border="0">
<tr>
<td>Format:</td>
<td><b>host_check_timeout=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>host_check_timeout=60</b></font></td>
</tr>
</table>

This is the maximum number of seconds that Naemon will allow host checks to run.

If checks exceed this limit, they are killed and a CRITICAL state is returned and the host will be assumed to be DOWN.

A timeout error will also be logged.

There is often widespread confusion as to what this option really does.

It is meant to be used as a last ditch mechanism to kill off plugins which are misbehaving and not exiting in a timely manner.

It should be set to something high (like 60 seconds or more), so that each host check normally finishes executing within this time limit.

If a host check runs longer than this limit, Naemon will kill it off thinking it is a runaway processes.

<a name="event_handler_timeout"></a>
#### Event Handler Timeout

<table border="0">
<tr>
<td>Format:</td>
<td><b>event_handler_timeout=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>event_handler_timeout=60</b></font></td>
</tr>
</table>

This is the maximum number of seconds that Naemon will allow <a href="eventhandlers.html">event handlers</a> to be run.

If an event handler exceeds this time limit it will be killed and a warning will be logged.

There is often widespread confusion as to what this option really does.

It is meant to be used as a last ditch mechanism to kill off commands which are misbehaving and not exiting in a timely manner.

It should be set to something high (like 60 seconds or more), so that each event handler command normally finishes executing within this time limit.

If an event handler runs longer than this limit, Naemon will kill it off thinking it is a runaway processes.

<a name="notification_timeout"></a>
#### Notification Timeout

<table border="0">
<tr>
<td>Format:</td>
<td><b>notification_timeout=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>notification_timeout=60</b></font></td>
</tr>
</table>

This is the maximum number of seconds that Naemon will allow notification commands to be run.

If a notification command exceeds this time limit it will be killed and a warning will be logged.

There is often widespread confusion as to what this option really does.

It is meant to be used as a last ditch mechanism to kill off commands which are misbehaving and not exiting in a timely manner.

It should be set to something high (like 60 seconds or more), so that each notification command finishes executing within this time limit.

If a notification command runs longer than this limit, Naemon will kill it off thinking it is a runaway processes.

<a name="ocsp_timeout"></a>
#### Obsessive Compulsive Service Processor Timeout

<table border="0">
<tr>
<td>Format:</td>
<td><b>ocsp_timeout=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>ocsp_timeout=5</b></font></td>
</tr>
</table>

This is the maximum number of seconds that Naemon will allow an <a href="#ocsp_command">obsessive compulsive service processor command</a> to be run.

If a command exceeds this time limit it will be killed and a warning will be logged.

<a name="ochp_timeout"></a>
#### Obsessive Compulsive Host Processor Timeout

<table border="0">
<tr>
<td>Format:</td>
<td><b>ochp_timeout=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>ochp_timeout=5</b></font></td>
</tr>
</table>

This is the maximum number of seconds that Naemon will allow an <a href="#ochp_command">obsessive compulsive host processor command</a> to be run.

If a command exceeds this time limit it will be killed and a warning will be logged.

<a name="perfdata_timeout"></a>
#### Performance Data Processor Command Timeout

<table border="0">
<tr>
<td>Format:</td>
<td><b>perfdata_timeout=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>perfdata_timeout=5</b></font></td>
</tr>
</table>

This is the maximum number of seconds that Naemon will allow a <a href="#host_perfdata_command">host performance data processor command</a> or <a href="#service_perfdata_command">service performance data processor command</a> to be run.

If a command exceeds this time limit it will be killed and a warning will be logged.

<a name="obsess_over_services"></a>
#### Obsess Over Services Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>obsess_over_services=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>obsess_over_services=1</b></font></td>
</tr>
</table>

This value determines whether or not Naemon will "obsess" over service checks results and run the <a href="#ocsp_command">obsessive compulsive service processor command</a> you define.

I know - funny name, but it was all I could think of.

This option is useful for performing <a href="distributed.html">distributed monitoring</a>.

If you're not doing distributed monitoring, don't enable this option.

* 0 = Don't obsess over services (default)
* 1 = Obsess over services

<a name="ocsp_command"></a>
#### Obsessive Compulsive Service Processor Command

<table border="0">
<tr>
<td>Format:</td>
<td><b>ocsp_command=&lt;command&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>ocsp_command=obsessive_service_handler</b></font></td>
</tr>
</table>

This option allows you to specify a command to be run after <i>every</i> service check, which can be useful in <a href="distributed.html">distributed monitoring</a>.

This command is executed after any <a href="eventhandlers.html">event handler</a> or <a href="notifications.html">notification</a> commands.

The <i>command</i> argument is the short name of a <a href="objectdefinitions.html#command">command definition</a> that you define in your object configuration file.

The maximum amount of time that this command can run is controlled by the <a href="#ocsp_timeout">ocsp_timeout</a> option.

 More information on distributed monitoring can be found <a href="distributed.html">here</a>.

This command is only executed if the <a href="#obsess_over_services">obsess_over_services</a> option is enabled globally and if the <i>obsess_over_service</i> directive in the <a href="objectdefinitions.html#service">service definition</a> is enabled.

<a name="obsess_over_hosts"></a>
#### Obsess Over Hosts Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>obsess_over_hosts=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>obsess_over_hosts=1</b></font></td>
</tr>
</table>

This value determines whether or not Naemon will "obsess" over host checks results and run the <a href="#ochp_command">obsessive compulsive host processor command</a> you define.

I know - funny name, but it was all I could think of.

This option is useful for performing <a href="distributed.html">distributed monitoring</a>.

If you're not doing distributed monitoring, don't enable this option.

* 0 = Don't obsess over hosts (default)
* 1 = Obsess over hosts

<a name="ochp_command"></a>
#### Obsessive Compulsive Host Processor Command

<table border="0">
<tr>
<td>Format:</td>
<td><b>ochp_command=&lt;command&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>ochp_command=obsessive_host_handler</b></font></td>
</tr>
</table>

This option allows you to specify a command to be run after <i>every</i> host check, which can be useful in <a href="distributed.html">distributed monitoring</a>.

This command is executed after any <a href="eventhandlers.html">event handler</a> or <a href="notifications.html">notification</a> commands.

The <i>command</i> argument is the short name of a <a href="objectdefinitions.html#command">command definition</a> that you define in your object configuration file.

The maximum amount of time that this command can run is controlled by the <a href="#ochp_timeout">ochp_timeout</a> option.

 More information on distributed monitoring can be found <a href="distributed.html">here</a>.

This command is only executed if the <a href="#obsess_over_hosts">obsess_over_hosts</a> option is enabled globally and if the <i>obsess_over_host</i> directive in the <a href="objectdefinitions.html#host">host definition</a> is enabled.

<a name="process_performance_data"></a>
#### Performance Data Processing Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>process_performance_data=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>process_performance_data=1</b></font></td>
</tr>
</table>

This value determines whether or not Naemon will process host and service check <a href="perfdata.html">performance data</a>.

* 0 = Don't process performance data (default)
* 1 = Process performance data

<a name="host_perfdata_command"></a>
#### Host Performance Data Processing Command

<table border="0">
<tr>
<td>Format:</td>
<td><b>host_perfdata_command=&lt;command&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>host_perfdata_command=process-host-perfdata</b></font></td>
</tr>
</table>

This option allows you to specify a command to be run after <i>every</i> host check to process host <a href="perfdata.html">performance data</a> that may be returned from the check.

The <i>command</i> argument is the short name of a <a href="objectdefinitions.html#command">command definition</a> that you define in your object configuration file.

This command is only executed if the <a href="#process_performance_data">process_performance_data</a> option is enabled globally and if the <i>process_perf_data</i> directive in the <a href="objectdefinitions.html#host">host definition</a> is enabled.

<a name="service_perfdata_command"></a>
#### Service Performance Data Processing Command

<table border="0">
<tr>
<td>Format:</td>
<td><b>service_perfdata_command=&lt;command&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>service_perfdata_command=process-service-perfdata</b></font></td>
</tr>
</table>

This option allows you to specify a command to be run after <i>every</i> service check to process service <a href="perfdata.html">performance data</a> that may be returned from the check.

The <i>command</i> argument is the short name of a <a href="objectdefinitions.html#command">command definition</a> that you define in your object configuration file.

This command is only executed if the <a href="#process_performance_data">process_performance_data</a> option is enabled globally and if the <i>process_perf_data</i> directive in the <a href="objectdefinitions.html#service">service definition</a> is enabled.

<a name="host_perfdata_file"></a>
#### Host Performance Data File

<table border="0">
<tr>
<td>Format:</td>
<td><b>host_perfdata_file=&lt;file_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>host_perfdata_file=/var/lib/naemon/host-perfdata.dat</b></font></td>
</tr>
</table>

This option allows you to specify a file to which host <a href="perfdata.html">performance data</a> will be written after every host check.

Data will be written to the performance file as specified by the <a href="#host_perfdata_file_template">host_perfdata_file_template</a> option.

Performance data is only written to this file if the <a href="#process_performance_data">process_performance_data</a> option is enabled globally and if the <i>process_perf_data</i> directive in the <a href="objectdefinitions.html#host">host definition</a> is enabled.

<a name="service_perfdata_file"></a>
#### Service Performance Data File

<table border="0">
<tr>
<td>Format:</td>
<td><b>service_perfdata_file=&lt;file_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>service_perfdata_file=/var/lib/naemon/service-perfdata.dat</b></font></td>
</tr>
</table>

This option allows you to specify a file to which service <a href="perfdata.html">performance data</a> will be written after every service check.

Data will be written to the performance file as specified by the <a href="#service_perfdata_file_template">service_perfdata_file_template</a> option.

Performance data is only written to this file if the <a href="#process_performance_data">process_performance_data</a> option is enabled globally and if the <i>process_perf_data</i> directive in the <a href="objectdefinitions.html#service">service definition</a> is enabled.

<a name="host_perfdata_file_template"></a>
#### Host Performance Data File Template

<table border="0">
<tr>
<td>Format:</td>
<td><b>host_perfdata_file_template=&lt;template&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>host_perfdata_file_template=[HOSTPERFDATA]\t$TIMET$\t$HOSTNAME$\t$HOSTEXECUTIONTIME$\t$HOSTOUTPUT$\t$HOSTPERFDATA$</b></font></td>
</tr>
</table>

This option determines what (and how) data is written to the <a href="#host_perfdata_file">host performance data file</a>.

The template may contain <a href="macros.html">macros</a>, special characters (\t for tab, \r for carriage return, \n for newline) and plain text.

A newline is automatically added after each write to the performance data file.

<a name="service_perfdata_file_template"></a>
#### Service Performance Data File Template

<table border="0">
<tr>
<td>Format:</td>
<td><b>service_perfdata_file_template=&lt;template&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>service_perfdata_file_template=[SERVICEPERFDATA]\t$TIMET$\t$HOSTNAME$\t$SERVICEDESC$\t$SERVICEEXECUTIONTIME$\t$SERVICELATENCY$\t$SERVICEOUTPUT$\t$SERVICEPERFDATA$</b></font></td>
</tr>
</table>

This option determines what (and how) data is written to the <a href="#service_perfdata_file">service performance data file</a>.

The template may contain <a href="macros.html">macros</a>, special characters (\t for tab, \r for carriage return, \n for newline) and plain text.

A newline is automatically added after each write to the performance data file.

<a name="host_perfdata_file_mode"></a>
#### Host Performance Data File Mode

<table border="0">
<tr>
<td>Format:</td>
<td><b>host_perfdata_file_mode=&lt;mode&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>host_perfdata_file_mode=a</b></font></td>
</tr>
</table>

This option determines how the <a href="#host_perfdata_file">host performance data file</a> is opened.

Unless the file is a named pipe you'll probably want to use the default mode of append.

* a = Open file in append mode (default)
* w = Open file in write mode
* p = Open in non-blocking read/write mode (useful when writing to pipes)

<a name="service_perfdata_file_mode"></a>
#### Service Performance Data File Mode

<table border="0">
<tr>
<td>Format:</td>
<td><b>service_perfdata_file_mode=&lt;mode&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>service_perfdata_file_mode=a</b></font></td>
</tr>
</table>

This option determines how the <a href="#service_perfdata_file">service performance data file</a> is opened.

Unless the file is a named pipe you'll probably want to use the default mode of append.

* a = Open file in append mode (default)
* w = Open file in write mode
* p = Open in non-blocking read/write mode (useful when writing to pipes)

<a name="host_perfdata_file_processing_interval"></a>
#### Host Performance Data File Processing Interval

<table border="0">
<tr>
<td>Format:</td>
<td><b>host_perfdata_file_processing_interval=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>host_perfdata_file_processing_interval=0</b></font></td>
</tr>
</table>

This option allows you to specify the interval (in seconds) at which the <a href="#host_perfdata_file">host performance data file</a> is processed using the <a href="#host_perfdata_file_processing_command">host performance data file processing command</a>.

A value of 0 indicates that the performance data file should not be processed at regular intervals.

<a name="service_perfdata_file_processing_interval"></a>
#### Service Performance Data File Processing Interval

<table border="0">
<tr>
<td>Format:</td>
<td><b>service_perfdata_file_processing_interval=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>service_perfdata_file_processing_interval=0</b></font></td>
</tr>
</table>

This option allows you to specify the interval (in seconds) at which the <a href="#service_perfdata_file">service performance data file</a> is processed using the <a href="#service_perfdata_file_processing_command">service performance data file processing command</a>.

A value of 0 indicates that the performance data file should not be processed at regular intervals.

<a name="host_perfdata_file_processing_command"></a>
#### Host Performance Data File Processing Command

<table border="0">
<tr>
<td>Format:</td>
<td><b>host_perfdata_file_processing_command=&lt;command&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>host_perfdata_file_processing_command=process-host-perfdata-file</b></font></td>
</tr>
</table>

This option allows you to specify the command that should be executed to process the <a href="#host_perfdata_file">host performance data file</a>.

The <i>command</i> argument is the short name of a <a href="objectdefinitions.html#command">command definition</a> that you define in your object configuration file.

The interval at which this command is executed is determined by the <a href="#host_perfdata_file_processing_interval">host_perfdata_file_processing_interval</a> directive.

<a name="service_perfdata_file_processing_command"></a>
#### Service Performance Data File Processing Command

<table border="0">
<tr>
<td>Format:</td>
<td><b>service_perfdata_file_processing_command=&lt;command&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>service_perfdata_file_processing_command=process-service-perfdata-file</b></font></td>
</tr>
</table>

This option allows you to specify the command that should be executed to process the <a href="#service_perfdata_file">service performance data file</a>.

The <i>command</i> argument is the short name of a <a href="objectdefinitions.html#command">command definition</a> that you define in your object configuration file.

The interval at which this command is executed is determined by the <a href="#service_perfdata_file_processing_interval">service_perfdata_file_processing_interval</a> directive.

<a name="check_for_orphaned_services"></a>
#### Orphaned Service Check Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>check_for_orphaned_services=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>check_for_orphaned_services=1</b></font></td>
</tr>
</table>

This option allows you to enable or disable checks for orphaned service checks. Orphaned service checks are checks which have been executed and have been removed from the event queue, but have not had any results reported in a long time.

Since no results have come back in for the service, it is not rescheduled in the event queue.

This can cause service checks to stop being executed.

Normally it is very rare for this to happen - it might happen if an external user or process killed off the process that was being used to execute a service check.

If this option is enabled and Naemon finds that results for a particular service check have not come back, it will log an error message and reschedule the service check.

If you start seeing service checks that never seem to get rescheduled, enable this option and see if you notice any log messages about orphaned services.

* 0 = Don't check for orphaned service checks
* 1 = Check for orphaned service checks (default)

<a name="check_for_orphaned_hosts"></a>
#### Orphaned Host Check Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>check_for_orphaned_hosts=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>check_for_orphaned_hosts=1</b></font></td>
</tr>
</table>

This option allows you to enable or disable checks for orphaned host checks. Orphaned host checks are checks which have been executed and have been removed from the event queue, but have not had any results reported in a long time.

Since no results have come back in for the host, it is not rescheduled in the event queue.

This can cause host checks to stop being executed.

Normally it is very rare for this to happen - it might happen if an external user or process killed off the process that was being used to execute a host check.

If this option is enabled and Naemon finds that results for a particular host check have not come back, it will log an error message and reschedule the host check.

If you start seeing host checks that never seem to get rescheduled, enable this option and see if you notice any log messages about orphaned hosts.

* 0 = Don't check for orphaned host checks
* 1 = Check for orphaned host checks (default)

<a name="check_service_freshness"></a>
#### Service Freshness Checking Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>check_service_freshness=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>check_service_freshness=0</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will periodically check the "freshness" of service checks.

Enabling this option is useful for helping to ensure that <a href="passivechecks.html">passive service checks</a> are received in a timely manner.

More information on freshness checking can be found <a href="freshness.html">here</a>.

* 0 = Don't check service freshness
* 1 = Check service freshness (default)

<a name="service_freshness_check_interval"></a>
#### Service Freshness Check Interval

<table border="0">
<tr>
<td>Format:</td>
<td><b>service_freshness_check_interval=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>service_freshness_check_interval=60</b></font></td>
</tr>
</table>

This setting determines how often (in seconds) Naemon will periodically check the "freshness" of service check results.

If you have disabled service freshness checking (with the <a href="#check_service_freshness">check_service_freshness</a> option), this option has no effect.

More information on freshness checking can be found <a href="freshness.html">here</a>.

<a name="check_host_freshness"></a>
#### Host Freshness Checking Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>check_host_freshness=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>check_host_freshness=0</b></font></td>
</tr>
</table>

This option determines whether or not Naemon will periodically check the "freshness" of host checks.

Enabling this option is useful for helping to ensure that <a href="passivechecks.html">passive host checks</a> are received in a timely manner.

More information on freshness checking can be found <a href="freshness.html">here</a>.

* 0 = Don't check host freshness
* 1 = Check host freshness (default)

<a name="host_freshness_check_interval"></a>
#### Host Freshness Check Interval

<table border="0">
<tr>
<td>Format:</td>
<td><b>host_freshness_check_interval=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>host_freshness_check_interval=60</b></font></td>
</tr>
</table>

This setting determines how often (in seconds) Naemon will periodically check the "freshness" of host check results.

If you have disabled host freshness checking (with the <a href="#check_host_freshness">check_host_freshness</a> option), this option has no effect.

More information on freshness checking can be found <a href="freshness.html">here</a>.

<a name="additional_freshness_latency"></a>
#### Additional Freshness Threshold Latency Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>additional_freshness_latency=&lt;#&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>additional_freshness_latency=15</b></font></td>
</tr>
</table>

This option determines the number of seconds Naemon will add to any host or services freshness threshold it automatically calculates (e.g. those not specified explicity by the user).

More information on freshness checking can be found <a href="freshness.html">here</a>.

<a name="date_format"></a>
#### Date Format

<table border="0">
<tr>
<td>Format:</td>
<td><b>date_format=&lt;option&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>date_format=us</b></font></td>
</tr>
</table>

This option allows you to specify what kind of date/time format Naemon should use in the web interface and date/time <a href="macros.html">macros</a>.

Possible options (along with example output) include:

<table border="1">
<tr><th>Option</th><th>Output Format</th><th>Sample Output</th></tr>
<tr><td>us</td><td>MM/DD/YYYY HH:MM:SS</td><td>06/30/2002 03:15:00</td></tr>
<tr><td>euro</td><td>DD/MM/YYYY HH:MM:SS</td><td>30/06/2002 03:15:00</td></tr>
<tr><td>iso8601</td><td>YYYY-MM-DD HH:MM:SS</td><td>2002-06-30 03:15:00</td></tr>
<tr><td>strict-iso8601</td><td>YYYY-MM-DDTHH:MM:SS</td><td>2002-06-30T03:15:00</td></tr>
</table>

<a name="use_timezone"></a>
#### Timezone Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>use_timezone=&lt;tz&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>use_timezone=US/Mountain</b></font></td>
</tr>
</table>

This option allows you to override the default timezone that this instance of Naemon runs in.

Useful if you have multiple instances of Naemon that need to run from the same server, but have different local times associated with them.

If not specified, Naemon will use the system configured timezone.

{{ site.note }}If you use this option to specify a custom timezone, you will
also need to alter Thruks configuration directives to specify the timezone you want.
See <a href="http://thruk.org/documentation/configuration.html#use_timezone">use_timezone</a> in the Thruk manual for details.{{ site.end }}


<a name="illegal_object_name_chars"></a>
#### Illegal Object Name Characters

<table border="0">
<tr>
<td>Format:</td>
<td><b>illegal_object_name_chars=&lt;chars...&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>illegal_object_name_chars=`~!$%^&amp;*"|'&lt;&gt;?,()=</b></font></td>
</tr>
</table>

This option allows you to specify illegal characters that cannot be used in host names, service descriptions, or names of other object types.

Naemon will allow you to use most characters in object definitions, but I recommend not using the characters shown in the example above.

Doing may give you problems in the web interface, notification commands, etc.

<a name="illegal_macro_output_chars"></a>
#### Illegal Macro Output Characters

<table border="0">
<tr>
<td>Format:</td>
<td><b>illegal_macro_output_chars=&lt;chars...&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>illegal_macro_output_chars=`~$^&amp;"|'&lt;&gt;</b></font></td>
</tr>
</table>

This option allows you to specify illegal characters that should be stripped from <a href="macros.html">macros</a> before being used in notifications, event handlers, and other commands.

This DOES NOT affect macros used in service or host check commands.

You can choose to not strip out the characters shown in the example above, but I recommend you do not do this.

Some of these characters are interpreted by the shell (i.e. the backtick) and can lead to security problems.

The following macros are stripped of the characters you specify:

* **$HOSTOUTPUT$**
* **$HOSTPERFDATA$**
* **$HOSTACKAUTHOR$**
* **$HOSTACKCOMMENT$**
* **$SERVICEOUTPUT$**
* **$SERVICEPERFDATA$**
* **$SERVICEACKAUTHOR$**
* **$SERVICEACKCOMMENT$**

<a name="use_regexp_matching"></a>
#### Regular Expression Matching Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>use_regexp_matching=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>use_regexp_matching=0</b></font></td>
</tr>
</table>

This option determines whether or not various directives in your <a href="configobject.html">object definitions</a> will be processed as regular expressions.

More information on how this works can be found <a href="objecttricks.html">here</a>.

* 0 = Don't use regular expression matching (default)
* 1 = Use regular expression matching

<a name="use_true_regexp_matching"></a>
#### True Regular Expression Matching Option

<table border="0">
<tr>
<td>Format:</td>
<td><b>use_true_regexp_matching=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>use_true_regexp_matching=0</b></font></td>
</tr>
</table>

If you've enabled regular expression matching of various object directives using the <a href="#use_regexp_matching">use_regexp_matching</a> option, this option will determine when object directives are treated as regular expressions.

If this option is disabled (the default), directives will only be treated as regular expressions if they contain <b>*</b>, <b>?</b>, <b>+</b>, or <b>\\.</b>.

If this option is enabled, all appropriate directives will be treated as regular expression - be careful when enabling this!

More information on how this works can be found <a href="objecttricks.html">here</a>.

* 0 = Don't use true regular expression matching (default)
* 1 = Use true regular expression matching

<a name="admin_email"></a>
#### Administrator Email Address

<table border="0">
<tr>
<td>Format:</td>
<td><b>admin_email=&lt;email_address&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>admin_email=root@localhost.localdomain</b></font></td>
</tr>
</table>

This is the email address for the administrator of the local machine (i.e. the one that Naemon is running on).
This value can be used in notification commands by using the **$ADMINEMAIL$** <a href="macros.html">macro</a>.

<a name="admin_pager"></a>
#### Administrator Pager

<table border="0">
<tr>
<td>Format:</td>
<td><b>admin_pager=&lt;pager_number_or_pager_email_gateway&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>admin_pager=pageroot@localhost.localdomain</b></font></td>
</tr>
</table>

This is the pager number (or pager email gateway) for the administrator of the local machine (i.e. the one that Naemon is running on). The pager number/address can be used in notification commands by using the **$ADMINPAGER$** <a href="macros.html">macro</a>.

<a name="event_broker_options"></a>
#### Event Broker Options

<table border="0">
<tr>
<td>Format:</td>
<td><b>event_broker_options=&lt;#&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>event_broker_options=-1</b></font></td>
</tr>
</table>

This option controls what (if any) data gets sent to the event broker and, in turn, to any loaded event broker modules.

 This is an advanced option.

When in doubt, either broker nothing (if not using event broker modules) or broker everything (if using event broker modules). Possible values are shown below.

* 0 = Broker nothing
* -1 = Broker everything
* # = See BROKER_* definitions in source code (include/broker.h) for other values that can be OR'ed together

<a name="broker_module"></a>
#### Event Broker Modules

<table border="0">
<tr>
<td>Format:</td>
<td><b>broker_module=&lt;modulepath&gt; [moduleargs]</b></td>

</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>broker_module=/usr/lib64/naemon-livestatus/livestatus.so /var/cache/naemon/live</b></font></td>
</tr>
</table>

This directive is used to specify an event broker module that should by loaded by Naemon at startup.

Use multiple directives if you want to load more than one module.

Arguments that should be passed to the module at startup are separated from the module path by a space.

<a name="debug_file"></a>

#### Debug File

<table border="0">
<tr>
<td>Format:</td>
<td><b>debug_file=&lt;file_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>debug_file=/var/lib/naemon/naemon.debug</b></font></td>
</tr>
</table>

This option determines where Naemon should write debugging information. What (if any) information is written is determined by the <a href="#debug_level">debug_level</a> and <a href="#debug_verbosity">debug_verbosity</a> options. You can have Naemon automatically rotate the debug file when it reaches a certain size by using the <a href="#max_debug_file_size">max_debug_file_size</a> option.

<a name="debug_level"></a>
#### Debug Level

<table border="0">
<tr>
<td>Format:</td>
<td><b>debug_level=&lt;#&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>debug_level=24</b></font></td>
</tr>
</table>

This option determines what type of information Naemon should write to the <a href="#debug_file">debug_file</a>.

This value is a logical OR of the values below.

* -1 = Log everything
* 0 = Log nothing (default)
* 1 = Function enter/exit information
* 2 = Config information
* 4 = Process information
* 8 = Scheduled event information
* 16 = Host/service check information
* 32 = Notification information
* 64 = Event broker information

<a name="debug_verbosity"></a>
#### Debug Verbosity

<table border="0">
<tr>
<td>Format:</td>
<td><b>debug_verbosity=&lt;#&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>debug_verbosity=1</b></font></td>
</tr>
</table>

This option determines how much debugging information Naemon should write to the <a href="#debug_file">debug_file</a>.

* 0 = Basic information
* 1 = More detailed information (default)
* 2 = Highly detailed information

<a name="max_debug_file_size"></a>
#### Maximum Debug File Size

<table border="0">
<tr>
<td>Format:</td>
<td><b>max_debug_file_size=&lt;#&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>max_debug_file_size=1000000</b></font></td>
</tr>
</table>

This option determines the maximum size (in bytes) of the <a href="#debug_file">debug file</a>.

If the file grows larger than this size, it will be renamed with a .old

extension.

If a file already exists with a .old extension it will automatically be deleted.

This helps ensure your disk space usage doesn't get out of control when debugging Naemon.

<a name="loadctl_options"></a>
#### Load control options

This option can be used to do changes to how Naemon distributes jobs to the workers. The value is a semicolon delimited string of equal sign delimited keys and values. You can modify the same settings via the query handler. This is currently experimental, but might help working around strange load issues.

<a name="check_workers"></a>
#### Check workers
<table border="0">
<tr>
<td>Format:</td>
<td><b>check_workers=&lt;#&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>check_workers=6</b></font></td>
</tr>
</table>

The number of worker processes to spin up at Naemon startup. Having this set too low will cause latency issues, while having this set too high will waste resources. It is typically not necessary to set this at all - if unset, Naemon will automatically scale this according to the number of CPUs in your system.

If you're experiencing checks that don't run the way they should, it could be an issue with either the number of workers, or the <a href="#loadctl_options">load control options</a>

<a name="query_socket"></a>
#### Query socket
<table border="0">
<tr>
<td>Format:</td>
<td><b>query_socket=&lt;file_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>query_socket=/var/lib/naemon/naemon.qh</b></font></td>
</tr>
</table>
This is the socket you can use for two-way communication with the Naemon process. This enables you to do things like submit external commands like with the <a href="#command_file">traditional command file</a> - and get a response about whether the command worked or not. It also allows you to inspect the state of your <a href="#check_workers">worker processes</a> - as well as modify the <a href="#loadctl_options">load control options</a> if they aren't behaving well.
