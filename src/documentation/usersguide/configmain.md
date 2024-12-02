# Main Configuration File Options

## Notes

When creating and/or editing configuration files, keep the following in mind:

* Lines that start with a `#` character are taken to be comments and are not processed
* Variables names must begin at the start of the line - no white space is allowed before the name
* Variable names are case-sensitive

## Sample Configuration File

> [!TIP]
> A sample main configuration file (`/etc/naemon/naemon.cfg`) is installed for you when you follow the [quickstart installation guide](quickstart).

## Config File Location

The main configuration file is usually named `naemon.cfg` and located in the `/etc/naemon/` directory.

## Configuration File Variables

Below you will find descriptions of each main Naemon configuration file option...

### Log File {#log_file}

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


### Include Dir {#include_dir}

<table border="0">
<tr>
<td>Format:</td>
<td><b>include_dir=&lt;directory_name&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>include_dir=/etc/naemon/module-conf.d</b></font></td>
</tr>
</table>

In order to provide drop-in support for new modules, you can also make use of
the include_dir directive. The `include_dir` directive causes Naemon to parse
any configuration (not just object configuration, as with cfg_dir) as if the
contents of the files in the pointed-to directory was included on this line.
The path to the directory is relative to the path of the main naemon.cfg
file.


### Object Configuration File {#cfg_file}

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

This directive is used to specify an [object configuration file](configobject)
containing object definitions that Naemon should use for monitoring.

Object configuration files contain definitions for hosts, host groups, contacts, contact groups, services, commands, etc.

You can separate your configuration information into several files and specify
multiple `cfg_file=` statements to have each of them processed.

### Object Configuration Directory {#cfg_dir}

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

This directive is used to specify a directory which contains [object configuration files](configobject)
that Naemon should use for monitoring.

All files in the directory with a `.cfg` extension are processed as object config files.

Additionally, Naemon will recursively process all config files in subdirectories of the directory you specify here.

You can separate your configuration files into different directories and specify multiple
`cfg_dir=` statements to have all config files in each directory processed.


### Object Cache File {#object_cache_file}

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
[object definitions](configobject) should be stored.

The cache file is (re)created every time Naemon is (re)started and is used by the CGIs.

It is intended to speed up config file caching in the CGIs and allow you to edit
the source [object config files](#cfg_file) while Naemon is running without affecting the output displayed in the CGIs.

### Precached Object File {#precached_object_file}

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
copy of [object definitions](configobject) should be stored.
Experienced Naemon administrators might remember this once drastically improving startup
time in large/complex Naemon installation - alas, as the Naemon startup has been
heavily optimized since, the benefits of employing tricks such as this one is
these days rarely important.

Read more information on how to speed up start times [here](faststartup).

### Resource File {#resource_file}

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

This is used to specify an optional resource file that can contain $USERn$ [macro](macros) definitions.

`$USERn$` macros are useful for storing usernames, passwords, and items commonly used in command definitions (like directory paths).

The CGIs will **not** attempt to read resource files, so you can set restrictive permissions (600 or 660) on them to protect sensitive information.

You can include multiple resource files by adding multiple `resource_file` statements to the main config file - Naemon will process them all.

See the sample resource.cfg file in the `sample-config/` subdirectory of
the Naemon distribution for an example of how to define `$USERn$` macros.

### Temp File {#temp_file}

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

### Temp Path {#temp_path}

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

### Status File {#status_file}

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

### Status File Update Interval {#status_update_interval}

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

This setting determines how often (in seconds) that Naemon will update status data in the [status file](#status_file).

The minimum update interval is 1 second.

### Naemon User  <Badge type="danger">removed</Badge> {#naemon_user}

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

### Naemon Group  <Badge type="danger">removed</Badge> {#naemon_group}

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

### Notifications Option {#enable_notifications}

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

This option determines whether or not Naemon will send out [notifications](notifications) when it initially (re)starts.

If this option is disabled, Naemon will not send out notifications for any host or service.

> [!NOTE]
> If you have [state retention](#retain_state_information) enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the [state retention file](state_retention_file)), *unless* you disable the [use_retained_program_state](#use_retained_program_state) option.

If you want to change this option when state retention is active (and the [use_retained_program_state](#use_retained_program_state)  is enabled), you'll have to use the appropriate [external command](extcommands) or change it via the web interface.

Values are as follows:

* `0` = Disable notifications
* `1` = Enable notifications (default)

### Service Check Execution Option {#execute_service_checks}

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

If this option is disabled, Naemon will not actively execute any service checks and will remain in a sort of "sleep" mode (it can still accept [passive checks](passivechecks) unless you've [disabled them]#accept_passive_service_checks()).

This option is most often used when configuring backup monitoring servers, as described in the documentation on [redundancy](redundancy), or when setting up a [distributed](distributed) monitoring environment.

> [!NOTE]
> If you have [state retention](#retain_state_information) enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the [state retention file](state_retention_file)), *unless* you disable the [use_retained_program_state](#use_retained_program_state)  option.

If you want to change this option when state retention is active (and the [use_retained_program_state](#use_retained_program_state)  is enabled), you'll have to use the appropriate [external command](extcommands) or change it via the web interface.

Values are as follows:

* `0` = Don't execute service checks
* `1` = Execute service checks (default)

### Passive Service Check Acceptance Option {#accept_passive_service_checks}

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

This option determines whether or not Naemon will accept [passive service checks](passivechecks) when it initially (re)starts.

If this option is disabled, Naemon will not accept any passive service checks.

> [!NOTE]
> If you have [state retention](#retain_state_information) enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the [state retention file](state_retention_file)), *unless* you disable the [use_retained_program_state](#use_retained_program_state)  option.

If you want to change this option when state retention is active (and the [use_retained_program_state](#use_retained_program_state)  is enabled), you'll have to use the appropriate [external command](extcommands) or change it via the web interface.

Values are as follows:

* `0` = Don't accept passive service checks
* `1` = Accept passive service checks (default)

### Host Check Execution Option {#execute_host_checks}

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

If this option is disabled, Naemon will not actively execute any host checks, although it can still accept [passive host checks](passivechecks) unless you've [disabled them](#accept_passive_host_checks)).

This option is most often used when configuring backup monitoring servers, as described in the documentation on [redundancy](redundancy), or when setting up a [distributed](distributed) monitoring environment.

> [!NOTE]
> If you have [state retention](#retain_state_information) enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the [state retention file](state_retention_file)), *unless* you disable the [use_retained_program_state](#use_retained_program_state)  option.

If you want to change this option when state retention is active (and the [use_retained_program_state](#use_retained_program_state)  is enabled), you'll have to use the appropriate [external command](extcommands) or change it via the web interface.

Values are as follows:

* `0` = Don't execute host checks
* `1` = Execute host checks (default)

### Passive Host Check Acceptance Option {#accept_passive_host_checks}

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

This option determines whether or not Naemon will accept [passive host checks](passivechecks) when it initially (re)starts.

If this option is disabled, Naemon will not accept any passive host checks.

> [!NOTE]
> If you have [state retention](#retain_state_information) enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the [state retention file](state_retention_file)), *unless* you disable the [use_retained_program_state](#use_retained_program_state)  option.

If you want to change this option when state retention is active (and the [use_retained_program_state](#use_retained_program_state)  is enabled), you'll have to use the appropriate [external command](extcommands) or change it via the web interface.

Values are as follows:

* `0` = Don't accept passive host checks
* `1` = Accept passive host checks (default)

### Event Handler Option {#enable_event_handlers}

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

This option determines whether or not Naemon will run [event handlers](eventhandlers) when it initially (re)starts.

If this option is disabled, Naemon will not run any host or service event handlers.

> [!NOTE]
> If you have [state retention](#retain_state_information) enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the [state retention file](state_retention_file)), *unless* you disable the [use_retained_program_state](#use_retained_program_state)

If you want to change this option when state retention is active (and the [use_retained_program_state](#use_retained_program_state)  is enabled), you'll have to use the appropriate [external command](extcommands) or change it via the web interface.

Values are as follows:

* `0` = Disable event handlers
* `1` = Enable event handlers (default)

### External Command Check Option {#check_external_commands}

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

This option determines whether or not Naemon will check the [command file](command_file) for

commands that should be executed.

This option must be enabled if you plan on using the [command CGI](cgis#cmd_cgi) to issue commands via the web interface. More information on external commands can be found [here](extcommands).

* `0` = Don't check external commands
* `1` = Check external commands (default)

### External Command File {#command_file}

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

The [command CGI](cgis#cmd_cgi) writes commands to this file.

The external command file is implemented as a named pipe (FIFO), which is created when Naemon starts and removed when it shuts down.

If the file exists when Naemon starts, the Naemon process will terminate with an error message.

More information on external commands can be found [here](extcommands).

Check out the [the query socket](#query_socket) for a way to submit these commands, and receive confirmation that Naemon accepted them.

### Lock File {#lock_file}

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

### State Retention Option {#retain_state_information}

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

If you enable this option, you should supply a value for the [state_retention_file](#state_retention_file) variable.

When enabled, Naemon will save all state information for hosts and service before
it shuts down (or restarts) and will read in previously saved state information when it starts up again.

* `0` = Don't retain state information
* `1` = Retain state information (default)

### State Retention File {#state_retention_file}

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
must enable the [retain_state_information](#retain_state_information) option.

### Automatic State Retention Update Interval {#retention_update_interval}

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

If you have disabled state retention (with the [retain_state_information](#retain_state_information) option), this option has no effect.

### Use Retained Program State Option {#use_retained_program_state}

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
restarts if state retention is enabled include the [enable_notifications](#enable_notifications),
[enable_flap_detection](#enable_flap_detection), [enable_event_handlers](#enable_event_handlers),
[execute_service_checks](#execute_service_checks),
and [accept_passive_service_checks](#accept_passive_service_checks) options.
If you do not have [state retention](#retain_state_information) enabled, this option has no effect.

* `0` = Don't use retained program state
* `1` = Use retained program state (default)

### Use Retained Scheduling Info Option {#use_retained_scheduling_info}

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

If you are adding a large number (or percentage) of hosts and services, it is recommended to disable this option when you first restart Naemon, as it can adversely skew the spread of initial checks.

Otherwise you will probably want to

leave it enabled.

* `0` = Don't use retained scheduling info
* `1` = Use retained scheduling info (default)

### Retained Scheduling Randomize Window Option {#retained_scheduling_randomize_window}

<table border="0">
<tr>
<td>Format:</td>
<td><b>retained_scheduling_randomize_window=&lt;seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>retained_scheduling_randomize_window=60</b></font></td>
</tr>
</table>

If [use_retained_scheduling info](#use_retained_scheduling_info) is enabled, this setting sets the window (in seconds), in which checks that were supposed to executed during a restart, is rescheduled.

That is, if set to 60 seconds, then all checks that were missed due to a restart will be scheduled randomly to be executed in the first 60 seconds after a restart.

If the retained_scheduling_randomize_window is larger than the objects check_interval, the check_interval is used instead.

Default is 60 seconds.

### Retained Host and Service Attribute Masks {#retained_service_attribute_mask}

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

### Retained Process Attribute Masks {#retained_process_service_attribute_mask}

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

### Retained Contact Attribute Masks {#retained_contact_service_attribute_mask}

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

> [!WARNING]
> This is an advanced feature. You'll need to read the Naemon source code to use this option effectively.

These options determine which contact attributes are NOT retained across program restarts.

There are two masks because there are often separate host and service contact attributes that can be changed.

The values for these options are a bitwise AND of values specified by the "MODATTR_" definitions in the include/common.h source code file.

By default, all process attributes are retained.

### Syslog Logging Option {#use_syslog}

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

* `0` = Don't use syslog facility
* `1` = Use syslog facility

### Notification Logging Option {#log_notifications}

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

* `0` = Don't log notifications
* `1` = Log notifications

### Global Notification Logging Option <Badge type="tip" text="1.4.3" /> {#log_global_notifications}

<table border="0">
<tr>
<td>Format:</td>
<td><b>log_global_notifications=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>log_global_notifications=1</b></font></td>
</tr>
</table>

This variable determines whether or not notification send by the global notification handler are logged.

If you have a lot of notifications
or regular service failures your log file will grow relatively quickly.

Use this option to keep global notifications from being logged.

* `0` = Don't log global notifications
* `1` = Log global notifications

### Service Check Retry Logging Option {#log_service_retries}

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

Logging service check retries is mostly useful when attempting to debug Naemon or test out service [event handlers](eventhandlers).

* `0` = Don't log service check retries
* `1` = Log service check retries

### Host Check Retry Logging Option {#log_host_retries}

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

Logging host check retries is mostly useful when attempting to debug Naemon or test out host [event handlers](eventhandlers).

* `0` = Don't log host check retries
* `1` = Log host check retries

### Event Handler Logging Option {#log_event_handlers}

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

This variable determines whether or not service and host [event handlers](eventhandlers) are logged.

Event handlers are optional commands that can be run whenever a service or hosts changes state.

Logging event handlers is most useful when debugging Naemon or first trying out your event handler scripts.

* `0` = Don't log event handlers
* `1` = Log event handlers

### Initial States Logging Option {#log_initial_states}

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

* `0` = Don't log initial states (default)
* `1` = Log initial states

### External Command Logging Option {#log_external_commands}

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

This variable determines whether or not Naemon will log [external commands](extcommands) that it receives from the [external command file](#command_file).

> [!NOTE]
> This option does not control whether or not [passive service checks](passivechecks) (which are a type of external command) get logged.

To enable or disable logging of passive checks, use the [log_passive_checks](#log_passive_checks) option.

* `0` = Don't log external commands
* `1` = Log external commands (default)

### Passive Check Logging Option {#log_passive_checks}

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

This variable determines whether or not Naemon will log [passive host and service checks](passivechecks) that it receives from the [external command file](#command_file).

If you are setting up a [distributed monitoring environment](distributed) or plan on handling a large number of passive checks on a regular basis, you may wish to disable this option so your log file doesn't get too large.

* `0` = Don't log passive checks
* `1` = Log passive checks (default)

### Global Host Event Handler Option {#global_host_event_handler}

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

The `command` argument is the short name of a command that you define in your [object configuration file](configobject).

The maximum amount of time that this command can run is controlled by the [event_handler_timeout](#event_handler_timeout) option.

More information on event handlers can be found [here](eventhandlers).

### Global Service Event Handler Option {#global_service_event_handler}

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

The `command` argument is the short name of a command that you define in your [object configuration file](configobject).

The maximum amount of time that this command can run is controlled by the [event_handler_timeout](#event_handler_timeout) option.

More information on event handlers can be found [here](eventhandlers).

### Global Host Notification Handler Option<Badge type="tip" text="1.4.3" /> {#global_host_notification_handler}

<table border="0">
<tr>
<td>Format:</td>
<td><b>global_host_notification_handler=&lt;command&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>global_host_notification_handler=send-generic-host-notification</b></font></td>
</tr>
</table>

This option allow you to specify a host notification handler command that is to be run for every host.
The global notification handler is executed immediately prior to the other notifications that you have optionally specified in each host definition.

The global notification command will also be executed for hosts, that have no contacts assigned.

The `command` argument is the short name of a command that you define in your [object configuration file](configobject).

The maximum amount of time that this command can run is controlled by the [notification_timeout](#notification_timeout) option.

More information on notifications can be found [here](notifications).

### Global Service Notification Handler Option<Badge type="tip" text="1.4.3" /> {#global_service_notification_handler}

<table border="0">
<tr>
<td>Format:</td>
<td><b>global_service_notification_handler=&lt;command&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>global_service_notification_handler=send-generic-service-notification</b></font></td>
</tr>
</table>

This option allow you to specify a service notification handler command that is to be run for every service.
The global notification handler is executed immediately prior to the other notifications that you have optionally specified in each service definition.

The global notification command will also be executed for services, that have no contacts assigned.

The `command` argument is the short name of a command that you define in your [object configuration file](configobject).

The maximum amount of time that this command can run is controlled by the [notification_timeout](#notification_timeout) option.

More information on notifications can be found [here](notifications).

### Service Inter-Check Delay Method <Badge type="danger">removed</Badge> {#service_inter_check_delay_method}

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

Using no delay is generally *not* recommended, as it will cause all service checks to be scheduled for execution at the same time.

This means that you will generally have large CPU spikes when the services are all executed in parallel.

Values are as follows:

* `n` = Don't use any delay - schedule all service checks to run immediately (i.e. at the same time!)
* `d` = Use a "dumb" delay of 1 second between service checks
* `s` = Use a "smart" delay calculation to spread service checks out evenly (default)
* `x.xx` = Use a user-supplied inter-check delay of x.xx seconds

### Maximum Service Check Spread <Badge type="danger">removed</Badge> {#max_service_check_spread}

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

This option will automatically adjust the [service inter-check delay method](#service_inter_check_delay_method) (if necessary) to ensure that the initial checks of all services occur within the timeframe you specify.

In general, this option will not have an affect on service check scheduling if scheduling information is being retained using the [use_retained_scheduling_info](#use_retained_scheduling_info) option.

Default value is **30** (minutes).

### Service Interleave Factor <Badge type="danger">removed</Badge> {#service_interleave_factor}

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

The best way to understand how interleaving works is to watch the [status CGI](cgis#status_cgi) (detailed view) when Naemon is just starting.

You should see that the service check results are spread out as they begin to appear.

* `x` = A number greater than or equal to 1 that specifies the interleave factor to use.

An interleave factor of 1 is equivalent to not interleaving the service checks.
* `s` = Use a "smart" interleave factor calculation (default)

### Maximum Concurrent Service Checks {#max_concurrent_checks}

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

Specifying a value of `1` for this variable essentially prevents any service checks from being run in parallel.

Specifying a value of `0` (the default) does not place any restrictions on the number of concurrent checks.

You'll have to modify this value based on the system resources you have available on the machine that runs Naemon, as it directly affects the maximum load that will be imposed on the system (processor utilization, memory, etc.).

### Check Result Reaper Frequency {#check_result_reaper_frequency}

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

### Maximum Check Result Reaper Time {#max_check_result_reaper_time}

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

### Check Result Path {#check_result_path}

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
of old file (see the [max_check_result_file_age](#max_check_result_file_age) option for more information).

> [!NOTE]
> Make sure that only a single instance of Naemon has access to the check result path.

If multiple instances of Naemon have their check result path set to the same directory, you will run into
problems with check results being processed (incorrectly) by the wrong instance of Naemon!

### Max Check Result File Age {#max_check_result_file_age}

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

This options determines the maximum age in seconds that Naemon will consider check result files found in the [check_result_path](#check_result_path) directory to be valid.

Check result files that are older that this threshold will be deleted by Naemon and the check results they contain will not be processed.

By using a value of zero (0) with this option, Naemon will process all check result files - even if they're older than your hardware <i class="fa-solid fa-face-smile"></i>.

### Host Inter-Check Delay Method <Badge type="danger">removed</Badge> {#host_inter_check_delay_method}

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

* `n` = Don't use any delay - schedule all host checks to run immediately (i.e. at the same time!)
* `d` = Use a "dumb" delay of 1 second between host checks
* `s` = Use a "smart" delay calculation to spread host checks out evenly (default)
* `x.xx` = Use a user-supplied inter-check delay of x.xx seconds

### Maximum Host Check Spread <Badge type="danger">removed</Badge> {#max_host_check_spread}

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

This option will automatically adjust the [host inter-check delay method](#host_inter_check_delay_method) (if necessary) to ensure that the initial checks of all hosts occur within the timeframe you specify.

In general, this option will not have an affect on host check scheduling if scheduling information is being retained using the [use_retained_scheduling_info](#use_retained_scheduling_info) option.

Default value is <b>30</b> (minutes).

### Timing Interval Length {#interval_length}

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

> [!WARNING]
> The default value for this is set to 60, which means that a "unit value" of 1 in the object configuration file will mean 60 seconds (1 minute).
> Any other values for this variable is poorly tested, so proceed at your own risk if you decide to change this.

### Auto-Rescheduling Option <Badge type="danger">removed</Badge> {#auto_reschedule_checks}

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

> [!WARNING]
> This functionality is obsolete and setting this option no longer has any effects.
> It remains for compatibility with older configuration files.

### Auto-Rescheduling Interval  <Badge type="danger">removed</Badge> {#auto_rescheduling_interval}

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

> [!WARNING]
> This functionality is obsolete and setting this option no longer has any effects.
> It remains for compatibility with older configuration files.

### Auto-Rescheduling Window <Badge type="danger">removed</Badge> {#auto_rescheduling_window}

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

> [!WARNING]
> This functionality is obsolete and setting this option no longer has any effects.
> It remains for compatibility with older configuration files.

### Aggressive Host Checking Option {#use_aggressive_host_checking}

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

Unless you have problems with Naemon not recognizing that a host recovered, it is suggested to keep this option  **disabled**

* `0` = Don't use aggressive host checking (default)
* `1` = Use aggressive host checking

### Translate Passive Host Checks Option {#translate_passive_host_checks}

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

More information on passive check state translation can be found [here](passivestatetranslation).

* `0` = Disable check translation (default)
* `1` = Enable check translation

### Passive Host Checks Are SOFT Option {#passive_host_checks_are_soft}

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

This option determines whether or not Naemon will treat [passive host checks](passivechecks) as HARD states or SOFT states.

By default, a passive host check result will put a host into a [HARD state type](statetypes).

You can change this behavior by enabling this option.

* `0` = Passive host checks are HARD (default)
* `1` = Passive host checks are SOFT

### Predictive Host Dependency Checks Option {#enable_predictive_host_dependency_checks}

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

This option determines whether or not Naemon will execute predictive checks of hosts that are being depended upon (as defined in [host dependencies](objectdefinitions#hostdependency)) for a particular host when it changes state.

Predictive checks help ensure that the dependency logic is as accurate as possible.

More information on how predictive checks work can be found [here](dependencychecks).

* `0` = Disable predictive checks
* `1` = Enable predictive checks (default)

### Predictive Service Dependency Checks Option {#enable_predictive_service_dependency_checks}

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

This option determines whether or not Naemon will execute predictive checks of services that are being depended upon (as defined in [service dependencies](objectdefinitions#servicedependency)) for a particular service when it changes state.

Predictive checks help ensure that the dependency logic is as accurate as possible.

More information on how predictive checks work can be found [here](dependencychecks).

* `0` = Disable predictive checks
* `1` = Enable predictive checks (default)

### Cached Host Check Horizon {#cached_host_check_horizon}

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

More information on cached checks can be found [here](cachedchecks).

### Cached Service Check Horizon {#cached_service_check_horizon}

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

Cached service states (from service checks that were performed more recently than the time specified by this value) can improve service check performance when a lot of [service dependencies](objectdefinitions#servicedependency) are used.

Too high of a value for this option may result in inaccuracies in the service dependency logic.

Use a value of 0 if you want to disable service check caching.

More information on cached checks can be found [here](cachedchecks).

### Large Installation Tweaks Option <Badge type="danger">removed</Badge> {#use_large_installation_tweaks}

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

* `0` = Don't use tweaks (default)
* `1` = Use tweaks

### Child Process Memory Option <Badge type="danger">removed</Badge> {#free_child_process_memory}

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

By defining this option in your configuration file, you are able to override things to get the behavior you want.

* `0` = Don't free memory
* `1` = Free memory

### Child Processes Fork Twice <Badge type="danger">removed</Badge> {#child_processes_fork_twice}

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

By defining this option in your configuration file, you are able to override things to get the behavior you want.

* `0` = Fork() just once
* `1` = Fork() twice

### Environment Macros Option <Badge type="danger">removed</Badge> {#enable_environment_macros}

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

This option determines whether or not the Naemon daemon will make all standard [macros](macrolist) available as environment variables to your check, notification, event hander, etc. commands.

In large Naemon installations this can be problematic because it takes additional memory and (more importantly) CPU to compute the values of all macros and make them available to the environment.

* `0` = Don't make macros available as environment variables
* `1` = Make macros available as environment variables (default)

### Flap Detection Option {#enable_flap_detection}

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

More information on how flap detection and handling works can be found [here](flapping).



> [!NOTE]
> If you have [state retention](#retain_state_information) enabled, Naemon
> will ignore this setting when it (re)starts and use the last known setting for this option
> (as stored in the [state retention file](state_retention_file)), *unless* you
> disable the [use_retained_program_state](#use_retained_program_state)  option.

If you want to change this option when state retention is active
(and the [use_retained_program_state](#use_retained_program_state)  is enabled),
you'll have to use the appropriate [external command](extcommands) or change
it via the web interface.

* `0` = Don't enable flap detection (default)
* `1` = Enable flap detection

### Low Service Flap Threshold {#low_service_flap_threshold}

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

For more information on how flap detection and handling works (and how this option affects things) read [this](flapping).

### High Service Flap Threshold {#high_service_flap_threshold}

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

For more information on how flap detection and handling works (and how this option affects things) read [this](flapping).

### Low Host Flap Threshold {#low_host_flap_threshold}

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

For more information on how flap detection and handling works (and how this option affects things) read [this](flapping).

### High Host Flap Threshold {#high_host_flap_threshold}

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

For more information on how flap detection and handling works (and how this option affects things) read [this](flapping).

### Soft State Dependencies Option {#soft_state_dependencies}

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

This option determines whether or not Naemon will use soft state information when checking [host and service dependencies](dependencies).

Normally Naemon will only use the latest hard host or service state when checking dependencies.

If you want it to use the latest state (regardless of whether its a soft or hard [state type](statetypes)), enable this option.

* `0` = Don't use soft state dependencies (default)
* `1` = Use soft state dependencies

### Service Check Timeout {#service_check_timeout}

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

### Host Check Timeout {#host_check_timeout}

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

### Event Handler Timeout {#event_handler_timeout}

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

This is the maximum number of seconds that Naemon will allow [event handlers](eventhandlers) to be run.

If an event handler exceeds this time limit it will be killed and a warning will be logged.

There is often widespread confusion as to what this option really does.

It is meant to be used as a last ditch mechanism to kill off commands which are misbehaving and not exiting in a timely manner.

It should be set to something high (like 60 seconds or more), so that each event handler command normally finishes executing within this time limit.

If an event handler runs longer than this limit, Naemon will kill it off thinking it is a runaway processes.

### Notification Timeout {#notification_timeout}

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

### Obsessive Compulsive Service Processor Timeout {#ocsp_timeout}

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

This is the maximum number of seconds that Naemon will allow an [obsessive compulsive service processor command](#ocsp_command) to be run.

If a command exceeds this time limit it will be killed and a warning will be logged.

### Obsessive Compulsive Host Processor Timeout {#ochp_timeout}

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

This is the maximum number of seconds that Naemon will allow an [obsessive compulsive host processor command](#ochp_command) to be run.

If a command exceeds this time limit it will be killed and a warning will be logged.

### Performance Data Processor Command Timeout {#perfdata_timeout}

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

This is the maximum number of seconds that Naemon will allow a [host performance data processor command](#host_perfdata_command) or [service performance data processor command](#service_perfdata_command) to be run.

If a command exceeds this time limit it will be killed and a warning will be logged.

### Obsess Over Services Option {#obsess_over_services}

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

This value determines whether or not Naemon will "obsess" over service checks results and run the [obsessive compulsive service processor command](#ocsp_command) you define.

This option is useful for performing [distributed monitoring](distributed).

If you're not doing distributed monitoring, don't enable this option.

* `0` = Don't obsess over services (default)
* `1` = Obsess over services

### Obsessive Compulsive Service Processor Command {#ocsp_command}

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

This option allows you to specify a command to be run after *every* service check, which can be useful in [distributed monitoring](distributed).

This command is executed after any [event handler](eventhandlers) or [notification](notifications) commands.

The `command` argument is the short name of a [command definition](objectdefinitions#command) that you define in your object configuration file.

The maximum amount of time that this command can run is controlled by the [ocsp_timeout](#ocsp_timeout) option.

 More information on distributed monitoring can be found [here](distributed).

This command is only executed if the [obsess_over_services](#obsess_over_services) option is enabled globally and if the `obsess_over_service` directive in the [service definition](objectdefinitions#service)is enabled.

### Obsess Over Hosts Option {#obsess_over_hosts}

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

This value determines whether or not Naemon will "obsess" over host checks results and run the [obsessive compulsive host processor command](#ochp_command) you define.

This option is useful for performing [distributed monitoring](distributed).

If you're not doing distributed monitoring, don't enable this option.

* `0` = Don't obsess over hosts (default)
* `1` = Obsess over hosts

### Obsessive Compulsive Host Processor Command {#ochp_command}

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

This option allows you to specify a command to be run after *every* host check, which can be useful in [distributed monitoring](distributed).

This command is executed after any [event handler](eventhandlers) or [notification](notifications) commands.

The `command` argument is the short name of a [command definition](objectdefinitions#command) that you define in your object configuration file.

The maximum amount of time that this command can run is controlled by the [ochp_timeout](#ochp_timeout) option.

 More information on distributed monitoring can be found [here](distributed).

This command is only executed if the [obsess_over_hosts](#obsess_over_hosts) option is enabled globally and if the `obsess_over_host` directive in the [host definition](objectdefinitions#host) is enabled.

### Performance Data Processing Option {#process_performance_data}

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

This value determines whether or not Naemon will process host and service check [performance data](perfdata).

* `0` = Don't process performance data (default)
* `1` = Process performance data

### Host Performance Data Processing Command {#host_perfdata_command}

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

This option allows you to specify a command to be run after *every* host check to process host [performance data](perfdata) that may be returned from the check.

The `command` argument is the short name of a [command definition](objectdefinitions#command) that you define in your object configuration file.

This command is only executed if the [process_performance_data](#process_performance_data) option is enabled globally and if the `process_perf_data` directive in the [host definition](objectdefinitions#host) is enabled.

### Service Performance Data Processing Command {#service_perfdata_command}

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

This option allows you to specify a command to be run after *every* service check to process service [performance data](perfdata) that may be returned from the check.

The `command` argument is the short name of a [command definition](objectdefinitions#command) that you define in your object configuration file.

This command is only executed if the [process_performance_data](#process_performance_data) option is enabled globally and if the `process_perf_data` directive in the [service definition](objectdefinitions#service)is enabled.

### Host Performance Data File {#host_perfdata_file}

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

This option allows you to specify a file to which host [performance data](perfdata) will be written after every host check.

Data will be written to the performance file as specified by the [host_perfdata_file_template](#host_perfdata_file_template) option.

Performance data is only written to this file if the [process_performance_data](#process_performance_data) option is enabled globally and if the `process_perf_data` directive in the [host definition](objectdefinitions#host) is enabled.

### Service Performance Data File {#service_perfdata_file}

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

This option allows you to specify a file to which service [performance data](perfdata) will be written after every service check.

Data will be written to the performance file as specified by the [service_perfdata_file_template](#service_perfdata_file_template) option.

Performance data is only written to this file if the [process_performance_data](#process_performance_data) option is enabled globally and if the `process_perf_data` directive in the [service definition](objectdefinitions#service)is enabled.

### Host Performance Data File Template {#host_perfdata_file_template}

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

This option determines what (and how) data is written to the [host performance data file](#host_perfdata_file).

The template may contain [macros](macros), special characters (\t for tab, \r for carriage return, \n for newline) and plain text.

A newline is automatically added after each write to the performance data file.

### Service Performance Data File Template {#service_perfdata_file_template}

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

This option determines what (and how) data is written to the [service performance data file](#service_perfdata_file).

The template may contain [macros](macros), special characters (\t for tab, \r for carriage return, \n for newline) and plain text.

A newline is automatically added after each write to the performance data file.

### Host Performance Data File Mode {#host_perfdata_file_mode}

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

This option determines how the [host performance data file](#host_perfdata_file) is opened.

Unless the file is a named pipe you'll probably want to use the default mode of append.

* `a` = Open file in append mode (default)
* `w` = Open file in write mode
* `p` = Open in non-blocking read/write mode (useful when writing to pipes)

### Service Performance Data File Mode {#service_perfdata_file_mode}

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

This option determines how the [service performance data file](#service_perfdata_file) is opened.

Unless the file is a named pipe you'll probably want to use the default mode of append.

* `a` = Open file in append mode (default)
* `w` = Open file in write mode
* `p` = Open in non-blocking read/write mode (useful when writing to pipes)

### Host Performance Data File Processing Interval {#host_perfdata_file_processing_interval}

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

This option allows you to specify the interval (in seconds) at which the [host performance data file](#host_perfdata_file) is processed using the [host performance data file processing command](#host_perfdata_file_processing_command).

A value of 0 indicates that the performance data file should not be processed at regular intervals.

### Service Performance Data File Processing Interval {#service_perfdata_file_processing_interval}

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

This option allows you to specify the interval (in seconds) at which the [service performance data file](#service_perfdata_file) is processed using the [service performance data file processing command](#service_perfdata_file_processing_command).

A value of 0 indicates that the performance data file should not be processed at regular intervals.

### Host Performance Data File Processing Command {#host_perfdata_file_processing_command}

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

This option allows you to specify the command that should be executed to process the [host performance data file](#host_perfdata_file).

The `command` argument is the short name of a [command definition](objectdefinitions#command) that you define in your object configuration file.

The interval at which this command is executed is determined by the [host_perfdata_file_processing_interval](#host_perfdata_file_processing_interval) directive.

### Service Performance Data File Processing Command {#service_perfdata_file_processing_command}

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

This option allows you to specify the command that should be executed to process the [service performance data file](#service_perfdata_file).

The `command` argument is the short name of a [command definition](objectdefinitions#command) that you define in your object configuration file.

The interval at which this command is executed is determined by the [service_perfdata_file_processing_interval](#service_perfdata_file_processing_interval) directive.

### Orphaned Service Check Option {#check_for_orphaned_services}

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

* `0` = Don't check for orphaned service checks
* `1` = Check for orphaned service checks (default)

### Orphaned Host Check Option {#check_for_orphaned_hosts}

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

* `0` = Don't check for orphaned host checks
* `1` = Check for orphaned host checks (default)

### Service Freshness Checking Option {#check_service_freshness}

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

Enabling this option is useful for helping to ensure that [passive service checks](passivechecks) are received in a timely manner.

More information on freshness checking can be found [here](freshness).

* `0` = Don't check service freshness
* `1` = Check service freshness (default)

### Service Freshness Check Interval {#service_freshness_check_interval}

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

If you have disabled service freshness checking (with the [check_service_freshness](#check_service_freshness) option), this option has no effect.

More information on freshness checking can be found [here](freshness).

### Host Freshness Checking Option {#check_host_freshness}

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

Enabling this option is useful for helping to ensure that [passive host checks](passivechecks) are received in a timely manner.

More information on freshness checking can be found [here](freshness).

* `0` = Don't check host freshness
* `1` = Check host freshness (default)

### Host Freshness Check Interval {#host_freshness_check_interval}

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

If you have disabled host freshness checking (with the [check_host_freshness](#check_host_freshness) option), this option has no effect.

More information on freshness checking can be found [here](freshness).

### Additional Freshness Threshold Latency Option {#additional_freshness_latency}

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

More information on freshness checking can be found [here](freshness).

### Date Format {#date_format}

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

This option allows you to specify what kind of date/time format Naemon should use in the web interface and date/time [macros](macros).

Possible options (along with example output) include:

| Option         | Output Format       | Sample Output       |
|----------------|---------------------|---------------------|
| us             | MM/DD/YYYY HH:MM:SS | 06/30/2002 03:15:00 |
| euro           | DD/MM/YYYY HH:MM:SS | 30/06/2002 03:15:00 |
| iso8601        | YYYY-MM-DD HH:MM:SS | 2002-06-30 03:15:00 |
| strict-iso8601 | YYYY-MM-DDTHH:MM:SS | 2002-06-30T03:15:00 |


### Timezone Option {#use_timezone}

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

> [!NOTE]
> If you use this option to specify a custom timezone, you will
> also need to alter Thruks configuration directives to specify the timezone you want.
> See [use_timezone](https://thruk.org/documentation/configuration.html#use_timezone) in the Thruk manual for details.


### Illegal Object Name Characters {#illegal_object_name_chars}

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

Naemon will allow you to use most characters in object definitions, but it is recommended not using the characters shown in the example above.

Doing may give you problems in the web interface, notification commands, etc.

### Illegal Macro Output Characters {#illegal_macro_output_chars}

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

This option allows you to specify illegal characters that should be stripped from [macros](macros) before being used in notifications, event handlers, and other commands.

This DOES NOT affect macros used in service or host check commands.

You can choose to not strip out the characters shown in the example above, but I recommend you do not do this.

Some of these characters are interpreted by the shell (i.e. the backtick) and can lead to security problems.

The following macros are stripped of the characters you specify:

* `$HOSTOUTPUT$`
* `$LONGHOSTOUTPUT$`
* `$HOSTPERFDATA$`
* `$HOSTACKAUTHOR$`
* `$HOSTACKCOMMENT$`
* `$SERVICEOUTPUT$`
* `$LONGSERVICEOUTPUT$`
* `$SERVICEPERFDATA$`
* `$SERVICEACKAUTHOR$`
* `$SERVICEACKCOMMENT$`
* `$HOSTCHECKCOMMAND$`
* `$SERVICECHECKCOMMAND$`
* `$HOSTNOTES$`
* `$SERVICENOTES$`
* `$HOSTGROUPNOTES$`
* `$SERVICEGROUPNOTES$`

### Regular Expression Matching Option {#use_regexp_matching}

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

This option determines whether or not various directives in your [object definitions](configobject) will be processed as regular expressions.

More information on how this works can be found [here](objecttricks).

* `0` = Don't use regular expression matching (default)
* `1` = Use regular expression matching

### True Regular Expression Matching Option {#use_true_rgexp_matching}

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

If you've enabled regular expression matching of various object directives using the [use_regexp_matching](#use_regexp_matching) option, this option will determine when object directives are treated as regular expressions.

If this option is disabled (the default), directives will only be treated as regular expressions if they contain `*`, `?`, `+`, or `\.`.

If this option is enabled, all appropriate directives will be treated as regular expression - be careful when enabling this!

More information on how this works can be found [here](objecttricks).

* `0` = Don't use true regular expression matching (default)
* `1` = Use true regular expression matching

### Administrator Email Address {#admin_email}

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
This value can be used in notification commands by using the `$ADMINEMAIL$` [macro](macros).

### Administrator Pager {#admin_pager}

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

This is the pager number (or pager email gateway) for the administrator of the local machine (i.e. the one that Naemon is running on). The pager number/address can be used in notification commands by using the `$ADMINPAGER$` [macro](macros).

### Event Broker Options {#event_broker_options}

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

* `0` = Broker nothing
* `-1` = Broker everything
* `#` = See BROKER_* definitions in source code (`src/naemon/broker.h`) for other values that can be OR'ed together

### Event Broker Modules {#broker_module}

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


### Debug File {#debug_file}

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

This option determines where Naemon should write debugging information. What (if any) information is written is determined by the [debug_level](#debug_level) and [debug_verbosity](#debug_verbosity) options. You can have Naemon automatically rotate the debug file when it reaches a certain size by using the [max_debug_file_size](#max_debug_file_size) option.

### Debug Level {#debug_level}

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

This option determines what type of information Naemon should write to the [debug_file](#debug_file).

This value is a logical OR of the values below.

* `-1` = Log everything
* `0` = Log nothing (default)
* `1` = Function enter/exit information
* `2` = Config information
* `4` = Process information
* `8` = Scheduled event information
* `16` = Host/service check information
* `32` = Notification information
* `64` = Event broker information

### Debug Verbosity {#debug_verbosity}

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

This option determines how much debugging information Naemon should write to the [debug_file](#debug_file).

* `0` = Basic information
* `1` = More detailed information (default)
* `2` = Highly detailed information

### Maximum Debug File Size {#max_debug_file_size}

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

This option determines the maximum size (in bytes) of the [debug file](#debug_file).

If the file grows larger than this size, it will be renamed with a .old

extension.

If a file already exists with a .old extension it will automatically be deleted.

This helps ensure your disk space usage doesn't get out of control when debugging Naemon.

### Load control options {#loadctl_options}

This option can be used to do changes to how Naemon distributes jobs to the workers. The value is a semicolon delimited string of equal sign delimited keys and values. You can modify the same settings via the query handler. This is currently experimental, but might help working around strange load issues.

### Check workers {#check_workers}

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

If you're experiencing checks that don't run the way they should, it could be an issue with either the number of workers, or the [load control options](#loadctl_options)

### Query socket {#query_socket}

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

This is the socket you can use for two-way communication with the Naemon process. This enables you to do things like submit external commands like with the [traditional command file](#command_file) - and get a response about whether the command worked or not. It also allows you to inspect the state of your [worker processes](#check_workers) - as well as modify the [load control options](#loadctl_options) if they aren't behaving well.

### Circular Dependencies <Badge type="tip" text="1.0.7" /> {#circular_dependencies}

<table border="0">
<tr>
<td>Format:</td>
<td><b>allow_circular_dependencies=&lt;#&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>allow_circular_dependencies=1</b></font></td>
</tr>
</table>
Allow circular dependencies in naemon's host graph. When this is disabled, the host graph must be a Directed Acyclic Graph.

Enabling this will cause following to stop working:

* scheduling and propagating downtime
* enabling/disabling and propagation notifications

Values are as follows:

* `0` = Disable circular dependencies (default)
* `1` = Enable circular dependencies

> [!WARNING]
THIS IS AN EXPERIMENTAL FEATURE AND MAY BE REMOVED IN FUTURE VERSIONS.
ENABLING THIS OPTION CAN DEGRADE PERFORMANCE - RATHER THAN INCREASE IT - IF USED IMPROPERLY!


### Host Down Disable Servicechecks {#host_down_disable_service_checks}
<table border="0">
<tr>
<td>Format:</td>
<td><b>host_down_disable_service_checks=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red"><b>host_down_disable_service_checks=1</b></font></td>
</tr>
</table>

This option will disable all service checks if the host is not in an UP state.

While desirable in some environments, enabling this value can distort report
values as the expected quantity of checks will not have been performed
