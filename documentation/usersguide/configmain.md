---
layout: doctoc
title: Main Configuration File Options
---

{% include review_required.md %}


### Notes

When creating and/or editing configuration files, keep the following in mind:

* Lines that start with a '#' character are taken to be comments and are not processed
* Variables names must begin at the start of the line - no white space is allowed before the name
* Variable names are case-sensitive

### Sample Configuration File

<span class="glyphicon glyphicon-thumbs-up"></span> Tip: A sample main configuration file (*/usr/local/nagios/etc/nagios.cfg*) is installed for you when you follow the <a href="quickstart.html">quickstart installation guide</a>.

### Config File Location

The main configuration file is usually named *nagios.cfg* and located in the */usr/local/nagios/etc/* directory.

### Configuration File Variables

Below you will find descriptions of each main Naemon configuration file option...

<a name="log_file"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Log File**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**log_file=&lt;file_name&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**log_file=/usr/local/nagios/var/nagios.log**</font></td>
</tr>
</table>

This variable specifies where Naemon should create its main log file.  This should be the first
variable that you define in your configuration file, as Naemon will try to write errors that it
finds in the rest of your configuration data to this file.  If you have <a href="#log_rotation_method">log rotation</a> enabled, this file will automatically be rotated every hour, day, week, or month.

<a name="cfg_file"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Object Configuration File**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**cfg_file=&lt;file_name&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td>
<font color="red">**cfg_file=/usr/local/nagios/etc/hosts.cfg**</font>
<font color="red">**cfg_file=/usr/local/nagios/etc/services.cfg**</font>
<font color="red">**cfg_file=/usr/local/nagios/etc/commands.cfg**</font>
</td>
</tr>
</table>

This directive is used to specify an <a href="configobject.html">object configuration file</a> containing object definitions that Naemon should use for monitoring.  Object configuration files contain definitions for hosts, host groups, contacts, contact groups, services, commands, etc.  You can seperate your configuration information into several files and specify multiple *cfg_file=* statements to have each of them processed.

<a name="cfg_dir"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Object Configuration Directory**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**cfg_dir=&lt;directory_name&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td>
<font color="red">**cfg_dir=/usr/local/nagios/etc/commands**</font>
<font color="red">**cfg_dir=/usr/local/nagios/etc/services**</font>
<font color="red">**cfg_dir=/usr/local/nagios/etc/hosts**</font>
</td>
</tr>
</table>

This directive is used to specify a directory which contains <a href="configobject.html">object configuration files</a> that Naemon should use for monitoring.  All files in the directory with a *.cfg* extension are processed as object config files.  Additionally, Naemon will recursively process all config files in subdirectories of the directory you specify here.  You can seperate your configuration files into different directories and specify multiple *cfg_dir=* statements to have all config files in each directory processed.

<a name="object_cache_file"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Object Cache File**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**object_cache_file=&lt;file_name&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td>
<font color="red">**object_cache_file=/usr/local/nagios/var/objects.cache**</font>
</td>
</tr>
</table>

This directive is used to specify a file in which a cached copy of <a href="configobject.html">object definitions</a> should be stored.  The cache file is (re)created every time Naemon is (re)started and is used by the CGIs.   It is intended to speed up config file caching in the CGIs and allow you to edit the source <a href="#cfg_file">object config files</a> while Naemon is running without affecting the output displayed in the CGIs.

<a name="precached_object_file"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Precached Object File**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**precached_object_file=&lt;file_name&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td>
<font color="red">**precached_object_file=/usr/local/nagios/var/objects.precache**</font>
</td>
</tr>
</table>

This directive is used to specify a file in which a pre-processed, pre-cached copy of <a href="configobject.html">object definitions</a> should be stored.  This file can be used to drastically improve startup times in large/complex Naemon installations.  Read more information on how to speed up start times <a href="faststartup.html">here</a>.

<a name="resource_file"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Resource File**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**resource_file=&lt;file_name&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**resource_file=/usr/local/nagios/etc/resource.cfg**</font></td>
</tr>
</table>

This is used to specify an optional resource file that can contain $USERn$ <a href="macros.html">macro</a> definitions.  $USERn$ macros are useful for storing usernames, passwords, and items commonly used in command definitions (like directory paths).  The CGIs will *not* attempt to read resource files, so you can set restrictive permissions (600 or 660) on them to protect sensitive information.  You can include multiple resource files by adding multiple resource_file statements to the main config file - Naemon will process them all.  See the sample resource.cfg file in the *sample-config/* subdirectory of the Naemon distribution for an example of how to define $USERn$ macros.

<a name="temp_file"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Temp File**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**temp_file=&lt;file_name&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**temp_file=/usr/local/nagios/var/nagios.tmp**</font></td>
</tr>
</table>

This is a temporary file that Naemon periodically creates to use when updating comment data, status data, etc.  The file is deleted when it is no longer needed.

<a name="temp_path"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Temp Path**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**temp_path=&lt;dir_name&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**temp_path=/tmp**</font></td>
</tr>
</table>

This is a directory that Naemon can use as scratch space for creating temporary files used during the monitoring process.  You should run *tmpwatch*, or a similiar utility, on this directory occassionally to delete files older than 24 hours.

<a name="status_file"></a>
<a name="status_log"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Status File**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**status_file=&lt;file_name&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**status_file=/usr/local/nagios/var/status.dat**</font></td>
</tr>
</table>

This is the file that Naemon uses to store the current status, comment, and downtime information.  This file is used by the CGIs so that current monitoring status can be reported via a web interface.  The CGIs must have read access to this file in order to function properly.  This file is deleted every time Naemon stops and recreated when it starts.

<a name="status_update_interval"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Status File Update Interval**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**status_update_interval=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**status_update_interval=15**</font></td>
</tr>
</table>

This setting determines how often (in seconds) that Naemon will update status data in the <a href="#status_file">status file</a>.  The minimum update interval is 1 second.

<a name="nagios_user"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Naemon User**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**nagios_user=&lt;username/UID&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**nagios_user=nagios**</font></td>
</tr>
</table>



This is used to set the effective user that the Naemon process should run as.  After initial program startup and before starting to monitor anything, Naemon will drop its effective privileges and run as this user.  You may specify either a username or a UID.

<a name="nagios_group"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Naemon Group**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**nagios_group=&lt;groupname/GID&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**nagios_group=nagios**</font></td>
</tr>
</table>

This is used to set the effective group that the Naemon process should run as.  After initial program startup and before starting to monitor anything, Naemon will drop its effective privileges and run as this group.  You may specify either a groupname or a GID.

<a name="enable_notifications"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Notifications Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**enable_notifications=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**enable_notifications=1**</font></td>
</tr>
</table>

This option determines whether or not Naemon will send out <a href="notifications.html">notifications</a> when it initially (re)starts.  If this option is disabled, Naemon will not send out notifications for any host or service.  Note: If you have <a href="#retain_state_information">state retention</a> enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the <a href="#state_retention_file">state retention file</a>), *unless* you disable the <a href="#use_retained_program_state">use_retained_program_state</a> option.  If you want to change this option when state retention is active (and the <a href="#use_retained_program_state">use_retained_program_state</a> is enabled), you'll have to use the appropriate <a href="extcommands.html">external command</a> or change it via the web interface.  Values are as follows:

* 0 = Disable notifications
* 1 = Enable notifications (default)

<a name="execute_service_checks"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Service Check Execution Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**execute_service_checks=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**execute_service_checks=1**</font></td>
</tr>
</table>

This option determines whether or not Naemon will execute service checks when it initially (re)starts.  If this option is disabled, Naemon will not actively execute any service checks and will remain in a sort of "sleep" mode (it can still accept <a href="passivechecks.html">passive checks</a> unless you've <a href="#accept_passive_service_checks">disabled them</a>).   This option is most often used when configuring backup monitoring servers, as described in the documentation on <a href="redundancy.html">redundancy</a>, or when setting up a <a href="distributed.html">distributed</a> monitoring environment.  Note: If you have <a href="#retain_state_information">state retention</a> enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the <a href="#state_retention_file">state retention file</a>), *unless* you disable the <a href="#use_retained_program_state">use_retained_program_state</a> option.  If you want to change this option when state retention is active (and the <a href="#use_retained_program_state">use_retained_program_state</a> is enabled), you'll have to use the appropriate <a href="extcommands.html">external command</a> or change it via the web interface.  Values are as follows:

* 0 = Don't execute service checks
* 1 = Execute service checks (default)

<a name="accept_passive_service_checks"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Passive Service Check Acceptance Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**accept_passive_service_checks=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**accept_passive_service_checks=1**</font></td>
</tr>
</table>

This option determines whether or not Naemon will accept <a href="passivechecks.html">passive service checks</a> when it initially (re)starts.  If this option is disabled, Naemon will not accept any passive service checks.  Note: If you have <a href="#retain_state_information">state retention</a> enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the <a href="#state_retention_file">state retention file</a>), *unless* you disable the <a href="#use_retained_program_state">use_retained_program_state</a> option.  If you want to change this option when state retention is active (and the <a href="#use_retained_program_state">use_retained_program_state</a> is enabled), you'll have to use the appropriate <a href="extcommands.html">external command</a> or change it via the web interface.  Values are as follows:

* 0 = Don't accept passive service checks
* 1 = Accept passive service checks (default)

<a name="execute_host_checks"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Host Check Execution Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**execute_host_checks=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**execute_host_checks=1**</font></td>
</tr>
</table>

This option determines whether or not Naemon will execute on-demand and regularly scheduled host checks when it initially (re)starts.  If this option is disabled, Naemon will not actively execute any host checks, although it can still accept <a href="passivechecks.html">passive host checks</a> unless you've <a href="#accept_passive_host_checks">disabled them</a>).   This option is most often used when configuring backup monitoring servers, as described in the documentation on <a href="redundancy.html">redundancy</a>, or when setting up a <a href="distributed.html">distributed</a> monitoring environment.  Note: If you have <a href="#retain_state_information">state retention</a> enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the <a href="#state_retention_file">state retention file</a>), *unless* you disable the <a href="#use_retained_program_state">use_retained_program_state</a> option.  If you want to change this option when state retention is active (and the <a href="#use_retained_program_state">use_retained_program_state</a> is enabled), you'll have to use the appropriate <a href="extcommands.html">external command</a> or change it via the web interface.  Values are as follows:

* 0 = Don't execute host checks
* 1 = Execute host checks (default)

<a name="accept_passive_host_checks"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Passive Host Check Acceptance Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**accept_passive_host_checks=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**accept_passive_host_checks=1**</font></td>
</tr>
</table>

This option determines whether or not Naemon will accept <a href="passivechecks.html">passive host checks</a> when it initially (re)starts.  If this option is disabled, Naemon will not accept any passive host checks.  Note: If you have <a href="#retain_state_information">state retention</a> enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the <a href="#state_retention_file">state retention file</a>), *unless* you disable the <a href="#use_retained_program_state">use_retained_program_state</a> option.  If you want to change this option when state retention is active (and the <a href="#use_retained_program_state">use_retained_program_state</a> is enabled), you'll have to use the appropriate <a href="extcommands.html">external command</a> or change it via the web interface.  Values are as follows:

* 0 = Don't accept passive host checks
* 1 = Accept passive host checks (default)

<a name="enable_event_handlers"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Event Handler Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**enable_event_handlers=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**enable_event_handlers=1**</font></td>
</tr>
</table>

This option determines whether or not Naemon will run <a href="eventhandlers.html">event handlers</a> when it initially (re)starts.  If this option is disabled, Naemon will not run any host or service event handlers.  Note: If you have <a href="#retain_state_information">state retention</a> enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the <a href="#state_retention_file">state retention file</a>), *unless* you disable the <a href="#use_retained_program_state">use_retained_program_state</a> option.  If you want to change this option when state retention is active (and the <a href="#use_retained_program_state">use_retained_program_state</a> is enabled), you'll have to use the appropriate <a href="extcommands.html">external command</a> or change it via the web interface.  Values are as follows:

* 0 = Disable event handlers
* 1 = Enable event handlers (default)

<a name="log_rotation_method"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Log Rotation Method**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**log_rotation_method=&lt;n/h/d/w/m&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**log_rotation_method=d**</font></td>
</tr>
</table>

This is the rotation method that you would like Naemon to use for your log file.  Values are as follows:

* n = None (don't rotate the log - this is the default)
* h = Hourly (rotate the log at the top of each hour)
* d = Daily (rotate the log at midnight each day)
* w = Weekly (rotate the log at midnight on Saturday)
* m = Monthly (rotate the log at midnight on the last day of the month)

<a name="log_archive_path"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Log Archive Path**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**log_archive_path=&lt;path&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**log_archive_path=/usr/local/nagios/var/archives/**</font></td>
</tr>
</table>

This is the directory where Naemon should place log files that have been rotated.  This option is ignored if you choose to not use the <a href="#log_rotation_method">log rotation</a> functionality.

<a name="check_external_commands"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**External Command Check Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**check_external_commands=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**check_external_commands=1**</font></td>
</tr>
</table>

This option determines whether or not Naemon will check the <a href="#command_file">command file</a> for  commands that should be executed.  This option must be enabled if you plan on using the <a href="cgis.html#cmd_cgi">command CGI</a> to issue commands via the web interface. More information on external commands can be found <a href="extcommands.html">here</a>.

* 0 = Don't check external commands
* 1 = Check external commands (default)

<a name="command_check_interval"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**External Command Check Interval**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**command_check_interval=&lt;xxx&gt;[s]**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**command_check_interval=1**</font></td>
</tr>
</table>

If you specify a number with an "s" appended to it (i.e. 30s), this is the number of *seconds* to wait between external command checks.  If you leave off the "s", this is the number of "time units" to wait between external command checks. Unless you've changed the <a href="#interval_length">interval_length</a> value (as defined below) from the default value of 60, this number will mean minutes.

Note: By setting this value to **-1**, Naemon will check for external commands as often as possible.  Each time Naemon checks for external commands it will read and process all commands present in the <a href="#command_file">command file</a> before continuing on with its other duties.  More information on external commands can be found <a href="extcommands.html">here</a>.

<a name="command_file"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**External Command File**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**command_file=&lt;file_name&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**command_file=/usr/local/nagios/var/rw/nagios.cmd**</font></td>
</tr>
</table>

This is the file that Naemon will check for external commands to process.  The <a href="cgis.html#cmd_cgi">command CGI</a> writes commands to this file.  The external command file is implemented as a named pipe (FIFO), which is created when Naemon starts and removed when it shuts down.  If the file exists when Naemon starts, the Naemon process will terminate with an error message.  More information on external commands can be found <a href="extcommands.html">here</a>.

<a name="external_command_buffer_slots"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**External Command Buffer Slots**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**external_command_buffer_slots=&lt;#&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**external_command_buffer_slots=512**</font></td>
</tr>
</table>

Note: This is an advanced feature. This option determines how many buffer slots Naemon will reserve for caching external commands that have been read from the external command file by a worker thread, but have not yet been processed by the main thread of the Naemon deamon.  Each slot can hold one external command, so this option essentially determines how many commands can be buffered.  For installations where you process a large number of passive checks (e.g. <a href="distributed.html">distributed setups</a>), you may need to increase this number.  You should consider using MRTG to graph Naemon' usage of external command buffers.  You can read more on how to configure graphing <a href="mrtggraphs.html">here</a>.

<a name="check_for_updates"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Update Checks**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>

<td>**check_for_updates=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**check_for_updates=1**</font></td>
</tr>
</table>

This option determines whether Naemon will automatically check to see if new updates (releases) are available.  It is recommend that you enable this option to ensure that you stay on top of the latest critical patches to Naemon.  Naemon is critical to you - make sure you keep it in good shape.  Naemon will check once a day for new updates. Data collected by Naemon Enterprises from the update check is processed in accordance  with our privacy policy - see <a href="http://api.nagios.org">http://api.nagios.org</a> for details.

<a name="bare_update_checks"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Bare Update Checks**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**bare_update_checks=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**bare_update_checks**</font></td>
</tr>
</table>

This option deterines what data Naemon will send to api.nagios.org when it checks for updates.  By default, Naemon will send information on the current version of Naemon you have installed, as well as an indicator as to whether this was a new installation or not.  Naemon Enterprises uses this data to determine the number of users running specific version of Naemon.  Enable this option if you do not wish for this information to be sent.

<a name="lock_file"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Lock File**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**lock_file=&lt;file_name&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**lock_file=/tmp/nagios.lock**</font></td>
</tr>
</table>

This option specifies the location of the lock file that Naemon should create when it runs as a daemon (when started with the -d command line argument).  This file contains the process id (PID) number of the running Naemon process.

<a name="retain_state_information"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**State Retention Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**retain_state_information=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**retain_state_information=1**</font></td>
</tr>
</table>

This option determines whether or not Naemon will retain state information for hosts and services between program restarts.  If you enable this option, you should supply a value for the <a href="#state_retention_file">state_retention_file</a> variable.  When enabled, Naemon will save all state information for hosts and service before it shuts down (or restarts) and will read in previously saved state information when it starts up again.

* 0 = Don't retain state information
* 1 = Retain state information (default)

<a name="state_retention_file"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**State Retention File**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**state_retention_file=&lt;file_name&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**state_retention_file=/usr/local/nagios/var/retention.dat**</font></td>
</tr>
</table>

This is the file that Naemon will use for storing status, downtime, and comment information before it shuts down.  When Naemon is restarted it will use the information stored in this file for setting the initial states of services and hosts before it starts monitoring anything.   In order to make Naemon retain state information between program restarts, you must enable the <a href="#retain_state_information">retain_state_information</a> option.

<a name="retention_update_interval"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Automatic State Retention Update Interval**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**retention_update_interval=&lt;minutes&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**retention_update_interval=60**</font></td>
</tr>
</table>

This setting determines how often (in minutes) that Naemon will automatically save retention data during normal operation.  If you set this value to 0, Naemon will not save retention data at regular intervals, but it will still save retention data before shutting down or restarting.  If you have disabled state retention (with the <a href="#retain_state_information">retain_state_information</a> option), this option has no effect.

<a name="use_retained_program_state"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Use Retained Program State Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**use_retained_program_state=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**use_retained_program_state=1**</font></td>
</tr>
</table>

This setting determines whether or not Naemon will set various program-wide state variables based on the values saved in the retention file.  Some of these program-wide state variables that are normally saved across program restarts if state retention is enabled include the <a href="#enable_notifications">enable_notifications</a>, <a href="#enable_flap_detection">enable_flap_detection</a>, <a href="#enable_event_handlers">enable_event_handlers</a>, <a href="#execute_service_checks">execute_service_checks</a>, and <a href="#accept_passive_service_checks">accept_passive_service_checks</a> options. If you do not have <a href="#retain_state_information">state retention</a> enabled, this option has no effect.

* 0 = Don't use retained program state
* 1 = Use retained program state (default)

<a name="use_retained_scheduling_info"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Use Retained Scheduling Info Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**use_retained_scheduling_info=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**use_retained_scheduling_info=1**</font></td>
</tr>
</table>

This setting determines whether or not Naemon will retain scheduling info (next check times) for hosts and services when it restarts.  If you are adding a large number (or percentage) of hosts and services, I would recommend disabling this option when you first restart Naemon, as it can adversely skew the spread of initial checks.  Otherwise you will probably want to  leave it enabled.

* 0 = Don't use retained scheduling info
* 1 = Use retained scheduling info (default)

<a name="retained_host_attribute_mask"></a>
<a name="retained_service_attribute_mask"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Retained Host and Service Attribute Masks**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>
**retained_host_attribute_mask=&lt;number&gt;**
**retained_service_attribute_mask=&lt;number&gt;**
</td>
</tr>
<tr>
<td>Example:</td>
<td>
<font color="red">**retained_host_attribute_mask=0**</font>
<font color="red">**retained_service_attribute_mask=0**</font>
</td>
</tr>
</table>

WARNING: This is an advanced feature.  You'll need to read the Naemon source code to use this option effectively.

These options determine which host or service attributes are NOT retained across program restarts.  The values for these options are a bitwise AND of values specified by the "MODATTR_" definitions in the include/common.h source code file.  By default, all host and service attributes are retained.

<a name="retained_process_host_attribute_mask"></a>
<a name="retained_process_service_attribute_mask"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Retained Process Attribute Masks**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>
**retained_process_host_attribute_mask=&lt;number&gt;**
**retained_process_service_attribute_mask=&lt;number&gt;**
</td>
</tr>
<tr>
<td>Example:</td>
<td>
<font color="red">**retained_process_host_attribute_mask=0**</font>
<font color="red">**retained_process_service_attribute_mask=0**</font>
</td>
</tr>
</table>

WARNING: This is an advanced feature.  You'll need to read the Naemon source code to use this option effectively.

These options determine which process attributes are NOT retained across program restarts.  There are two masks because there are often separate host and service process attributes that can be changed.  For example, host checks can be disabled at the program level, while service checks are still enabled.  The values for these options are a bitwise AND of values specified by the "MODATTR_" definitions in the include/common.h source code file.  By default, all process attributes are retained.

<a name="retained_contact_host_attribute_mask"></a>
<a name="retained_contact_service_attribute_mask"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Retained Contact Attribute Masks**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>
**retained_contact_host_attribute_mask=&lt;number&gt;**
**retained_contact_service_attribute_mask=&lt;number&gt;**
</td>
</tr>
<tr>
<td>Example:</td>
<td>
<font color="red">**retained_contact_host_attribute_mask=0**</font>
<font color="red">**retained_contact_service_attribute_mask=0**</font>
</td>
</tr>
</table>

WARNING: This is an advanced feature.  You'll need to read the Naemon source code to use this option effectively.

These options determine which contact attributes are NOT retained across program restarts.  There are two masks because there are often separate host and service contact attributes that can be changed.  The values for these options are a bitwise AND of values specified by the "MODATTR_" definitions in the include/common.h source code file.  By default, all process attributes are retained.

<a name="use_syslog"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Syslog Logging Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**use_syslog=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**use_syslog=1**</font></td>
</tr>
</table>

This variable determines whether messages are logged to the syslog facility on your local host.  Values
are as follows:

* 0 = Don't use syslog facility
* 1 = Use syslog facility

<a name="log_notifications"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Notification Logging Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**log_notifications=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**log_notifications=1**</font></td>
</tr>
</table>

This variable determines whether or not notification messages are logged.  If you have a lot of contacts
or regular service failures your log file will grow relatively quickly.  Use this option to keep contact
notifications from being logged.

* 0 = Don't log notifications
* 1 = Log notifications

<a name="log_service_retries"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Service Check Retry Logging Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**log_service_retries=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**log_service_retries=1**</font></td>
</tr>
</table>

This variable determines whether or not service check retries are logged.  Service check retries occur when a
service check results in a non-OK state, but you have configured Naemon to retry the service more than once before
responding to the error.  Services in this situation are considered to be in "soft" states.  Logging service check retries
is mostly useful when attempting to debug Naemon or test out service <a href="eventhandlers.html">event handlers</a>.

* 0 = Don't log service check retries
* 1 = Log service check retries

<a name="log_host_retries"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Host Check Retry Logging Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**log_host_retries=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**log_host_retries=1**</font></td>
</tr>
</table>

This variable determines whether or not host check retries are logged.  Logging host check retries
is mostly useful when attempting to debug Naemon or test out host <a href="eventhandlers.html">event handlers</a>.

* 0 = Don't log host check retries
* 1 = Log host check retries

<a name="log_event_handlers"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Event Handler Logging Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**log_event_handlers=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**log_event_handlers=1**</font></td>
</tr>
</table>

This variable determines whether or not service and host <a href="eventhandlers.html">event handlers</a> are logged.
Event handlers are optional commands that can be run whenever a service or hosts changes state.  Logging event handlers
is most useful when debugging Naemon or first trying out your event handler scripts.

* 0 = Don't log event handlers
* 1 = Log event handlers

<a name="log_initial_states"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Initial States Logging Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**log_initial_states=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**log_initial_states=1**</font></td>
</tr>
</table>

This variable determines whether or not Naemon will force all initial host and service states to be logged, even if they result in an OK state.  Initial service and host states are normally only logged when there is a problem on the first check.  Enabling this option is useful if you are using an application that scans the log file to determine long-term state statistics for services and hosts.

* 0 = Don't log initial states (default)
* 1 = Log initial states

<a name="log_external_commands"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**External Command Logging Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**log_external_commands=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**log_external_commands=1**</font></td>
</tr>
</table>

This variable determines whether or not Naemon will log <a href="extcommands.html">external commands</a> that it receives from the <a href="#command_file">external command file</a>.  Note: This option does not control whether or not <a href="passivechecks.html">passive service checks</a> (which are a type of external command) get logged.  To enable or disable logging of passive checks, use the <a href="#log_passive_checks">log_passive_checks</a> option.

* 0 = Don't log external commands
* 1 = Log external commands (default)

<a name="log_passive_checks"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Passive Check Logging Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**log_passive_checks=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**log_passive_checks=1**</font></td>
</tr>
</table>

This variable determines whether or not Naemon will log <a href="passivechecks.html">passive host and service checks</a> that it receives from the <a href="#command_file">external command file</a>.  If you are setting up a <a href="distributed.html">distributed monitoring environment</a> or plan on handling a large number of passive checks on a regular basis, you may wish to disable this option so your log file doesn't get too large.

* 0 = Don't log passive checks
* 1 = Log passive checks (default)

<a name="global_host_event_handler"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Global Host Event Handler Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**global_host_event_handler=&lt;command&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**global_host_event_handler=log-host-event-to-db**</font></td>
</tr>
</table>

This option allows you to specify a host event handler command that is to be run for every host state change.  The global event handler is executed immediately prior to the event handler that you have optionally specified in each host definition.  The *command* argument is the short name of a command that you define in your <a href="configobject.html">object configuration file</a>.  The maximum amount of time that this command can run is controlled by the <a href="#event_handler_timeout">event_handler_timeout</a> option.  More information on event handlers can be found <a href="eventhandlers.html">here</a>.

<a name="global_service_event_handler"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Global Service Event Handler Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**global_service_event_handler=&lt;command&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**global_service_event_handler=log-service-event-to-db**</font></td>
</tr>
</table>

This option allows you to specify a service event handler command that is to be run for every service state change.  The global event handler is executed immediately prior to the event handler that you have optionally specified in each service definition.  The *command* argument is the short name of a command that you define in your <a href="configobject.html">object configuration file</a>.  The maximum amount of time that this command can run is controlled by the <a href="#event_handler_timeout">event_handler_timeout</a> option.  More information on event handlers can be found <a href="eventhandlers.html">here</a>.

<a name="sleep_time"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Inter-Check Sleep Time**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**sleep_time=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**sleep_time=1**</font></td>
</tr>
</table>

This is the number of seconds that Naemon will sleep before checking to see if the next service or host check in the scheduling queue should be executed.  Note that Naemon will only sleep after it "catches up" with queued service checks that have fallen behind.

<a name="service_inter_check_delay_method"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Service Inter-Check Delay Method**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**service_inter_check_delay_method=&lt;n/d/s/x.xx&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**service_inter_check_delay_method=s**</font></td>
</tr>
</table>

This option allows you to control how service checks are initially "spread out" in the event queue.  Using a "smart" delay calculation (the default) will cause Naemon to calculate an average check interval and spread initial checks of all services out over that interval, thereby helping to eliminate CPU load spikes.  Using no delay is generally *not* recommended, as it will cause all service checks to be scheduled for execution at the same time.  This means that you will generally have large CPU spikes when the services are all executed in parallel.   More information on how to estimate how the inter-check delay affects service check scheduling can be found <a href="checkscheduling.html#service_inter_check_delay">here</a>.  Values are as follows:

* n = Don't use any delay - schedule all service checks to run immediately (i.e. at the same time!)
* d = Use a "dumb" delay of 1 second between service checks
* s = Use a "smart" delay calculation to spread service checks out evenly (default)
* x.xx = Use a user-supplied inter-check delay of x.xx seconds

<a name="max_service_check_spread"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Maximum Service Check Spread**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**max_service_check_spread=&lt;minutes&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**max_service_check_spread=30**</font></td>
</tr>
</table>

This option determines the maximum number of minutes from when Naemon starts that all services (that are scheduled to be regularly checked) are checked.  This option will automatically adjust the <a href="#service_inter_check_delay_method">service inter-check delay method</a> (if necessary) to ensure that the initial checks of all services occur within the timeframe you specify.  In general, this option will not have an affect on service check scheduling if scheduling information is being retained using the <a href="#use_retained_scheduling_info">use_retained_scheduling_info</a> option.  Default value is **30** (minutes).

<a name="service_interleave_factor"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Service Interleave Factor**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**service_interleave_factor=&lt;s|*x*&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**service_interleave_factor=s**</font></td>
</tr>
</table>

This variable determines how service checks are interleaved. Interleaving allows for a more even distribution of service checks, reduced load on remote hosts, and faster overall detection of host problems.  Setting this value to 1 is equivalent to not interleaving the service checks (this is how versions of Naemon previous to 0.0.5 worked).  Set this value to **s** (smart) for automatic calculation of the interleave factor unless you have a specific reason to change it.  The best way to understand how interleaving works is to watch the <a href="cgis.html#status_cgi">status CGI</a> (detailed view) when Naemon is just starting.  You should see that the service check results are spread out as they begin to appear.  More information on how interleaving works can be found <a href="checkscheduling.html#service_interleaving">here</a>.

* *x* = A number greater than or equal to 1 that specifies the interleave factor to use.  An interleave factor of 1 is equivalent to not interleaving the service checks.
* s = Use a "smart" interleave factor calculation (default)

<a name="max_concurrent_checks"></a>

<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Maximum Concurrent Service Checks**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**max_concurrent_checks=&lt;max_checks&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**max_concurrent_checks=20**</font></td>
</tr>
</table>

This option allows you to specify the maximum number of service checks that can be run in parallel at any given time.  Specifying a value of 1 for this variable essentially prevents any service checks from being run in parallel.  Specifying a value of 0 (the default) does not place any restrictions on the number of concurrent checks.  You'll have to modify this value based on the system resources you have available on the machine that runs Naemon, as it directly affects the maximum load that will be imposed on the system (processor utilization, memory, etc.).  More information on how to estimate how many concurrent checks you should allow can be found <a href="checkscheduling.html#max_concurrent_checks">here</a>.

<a name="check_result_reaper_frequency"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Check Result Reaper Frequency**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**check_result_reaper_frequency=&lt;frequency_in_seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**check_result_reaper_frequency=5**</font></td>
</tr>
</table>

This option allows you to control the frequency *in seconds* of check result "reaper" events.  "Reaper" events process the results from host and service checks that have finished executing.  These events consitute the core of the monitoring logic in Naemon.

<a name="max_check_result_reaper_time"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Maximum Check Result Reaper Time**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**max_check_result_reaper_time=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**max_check_result_reaper_time=30**</font></td>
</tr>
</table>

This option allows you to control the maximum amount of time *in seconds* that host and service check result "reaper" events are allowed to run.  "Reaper" events process the results from host and service checks that have finished executing.  If there are a lot of results to process, reaper events may take a long time to finish, which might delay timely execution of new host and service checks.  This variable allows you to limit the amount of time that an individual reaper event will run before it hands control back over to Naemon for other portions of the monitoring logic.

<a name="check_result_path"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Check Result Path**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**check_result_path=&lt;path&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**check_result_path=/var/spool/nagios/checkresults**</font></td>
</tr>
</table>

This options determines which directory Naemon will use to temporarily store host and service check results before they are processed.  This directory should not be used to store any other files, as Naemon will periodically clean this directory of old file (see the <a href="#max_check_result_file_age">max_check_result_file_age</a> option for more information).

Note: Make sure that only a single instance of Naemon has access to the check result path.  If multiple instances of Naemon have their check result path set to the same directory, you will run into problems with check results being processed (incorrectly) by the wrong instance of Naemon!

<a name="max_check_result_file_age"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Max Check Result File Age**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**max_check_result_file_age=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**max_check_result_file_age=3600**</font></td>
</tr>
</table>

This options determines the maximum age in seconds that Naemon will consider check result files found in the <a href="#check_result_path">check_result_path</a> directory to be valid.  Check result files that are older that this threshold will be deleted by Naemon and the check results they contain will not be processed.  By using a value of zero (0) with this option, Naemon will process all check result files - even if they're older than your hardware :-).

<a name="host_inter_check_delay_method"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Host Inter-Check Delay Method**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**host_inter_check_delay_method=&lt;n/d/s/x.xx&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**host_inter_check_delay_method=s**</font></td>
</tr>
</table>

This option allows you to control how host checks *that are scheduled to be checked on a regular basis* are initially "spread out" in the event queue.  Using a "smart" delay calculation (the default) will cause Naemon to calculate an average check interval and spread initial checks of all hosts out over that interval, thereby helping to eliminate CPU load spikes.  Using no delay is generally *not* recommended.  Using no delay will cause all host checks to be scheduled for execution at the same time.  More information on how to estimate how the inter-check delay affects host check scheduling can be found <a href="checkscheduling.html#host_inter_check_delay">here</a>.Values are as follows:

* n = Don't use any delay - schedule all host checks to run immediately (i.e. at the same time!)
* d = Use a "dumb" delay of 1 second between host checks
* s = Use a "smart" delay calculation to spread host checks out evenly (default)
* x.xx = Use a user-supplied inter-check delay of x.xx seconds

<a name="max_host_check_spread"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Maximum Host Check Spread**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**max_host_check_spread=&lt;minutes&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**max_host_check_spread=30**</font></td>
</tr>
</table>

This option determines the maximum number of minutes from when Naemon starts that all hosts (that are scheduled to be regularly checked) are checked.  This option will automatically adjust the <a href="#host_inter_check_delay_method">host inter-check delay method</a> (if necessary) to ensure that the initial checks of all hosts occur within the timeframe you specify.  In general, this option will not have an affect on host check scheduling if scheduling information is being retained using the <a href="#use_retained_scheduling_info">use_retained_scheduling_info</a> option.  Default value is **30** (minutes).

<a name="interval_length"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Timing Interval Length**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**interval_length=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**interval_length=60**</font></td>
</tr>
</table>

This is the number of seconds per "unit interval" used for timing in the scheduling queue, re-notifications, etc. "Units intervals" are used in the object configuration file to determine how often to run a service check, how often to re-notify a contact, etc.

**Important:**  The default value for this is set to 60, which means that a "unit value" of 1 in the object configuration file will mean 60 seconds (1 minute).  I have not really tested other values for this variable, so proceed at your own risk if you decide to do so!

<a name="auto_reschedule_checks"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Auto-Rescheduling Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**auto_reschedule_checks=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**auto_reschedule_checks=1**</font></td>
</tr>
</table>

This option determines whether or not Naemon will attempt to automatically reschedule active host and service checks to

 "smooth" them out over time.  This can help to balance the load on the monitoring server, as it will attempt to keep the time between consecutive checks consistent, at the expense of executing checks on a more rigid schedule.

**WARNING:**  THIS IS AN EXPERIMENTAL FEATURE AND MAY BE REMOVED IN FUTURE VERSIONS.  ENABLING THIS OPTION CAN DEGRADE PERFORMANCE - RATHER THAN INCREASE IT - IF USED IMPROPERLY!

<a name="auto_rescheduling_interval"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Auto-Rescheduling Interval**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**auto_rescheduling_interval=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**auto_rescheduling_interval=30**</font></td>
</tr>
</table>

This option determines how often (in seconds) Naemon will attempt to automatically reschedule checks.  This option only has an effect if the <a href="#auto_reschedule_checks">auto_reschedule_checks</a> option is enabled.  Default is 30 seconds.

**WARNING:**  THIS IS AN EXPERIMENTAL FEATURE AND MAY BE REMOVED IN FUTURE VERSIONS.  ENABLING THE AUTO-RESCHEDULING OPTION CAN DEGRADE PERFORMANCE - RATHER THAN INCREASE IT - IF USED IMPROPERLY!

<a name="auto_rescheduling_window"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Auto-Rescheduling Window**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**auto_rescheduling_window=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**auto_rescheduling_window=180**</font></td>
</tr>
</table>

This option determines the "window" of time (in seconds) that Naemon will look at when automatically rescheduling checks. Only host and service checks that occur in the next X seconds (determined by this variable) will be rescheduled.  This option only has an effect if the <a href="#auto_reschedule_checks">auto_reschedule_checks</a> option is enabled.  Default is 180 seconds (3 minutes).

**WARNING:**  THIS IS AN EXPERIMENTAL FEATURE AND MAY BE REMOVED IN FUTURE VERSIONS.  ENABLING THE AUTO-RESCHEDULING OPTION CAN DEGRADE PERFORMANCE - RATHER THAN INCREASE IT - IF USED IMPROPERLY!

<a name="use_agressive_host_checking"></a>
<a name="use_aggressive_host_checking"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Aggressive Host Checking Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**use_aggressive_host_checking=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**use_aggressive_host_checking=0**</font></td>
</tr>
</table>

Naemon tries to be smart about how and when it checks the status of hosts.  In general, disabling this option will allow Naemon to make some smarter decisions and check hosts a bit faster.  Enabling this option will increase the amount of time required to check hosts, but may improve reliability a bit.  Unless you have problems with Naemon not recognizing that a host recovered, I would suggest **not** enabling this option.

* 0 = Don't use aggressive host checking (default)
* 1 = Use aggressive host checking

<a name="translate_passive_host_checks"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Translate Passive Host Checks Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**translate_passive_host_checks=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**translate_passive_host_checks=1**</font></td>
</tr>
</table>

This option determines whether or not Naemon will translate DOWN/UNREACHABLE passive host check results to their "correct" state from the viewpoint of the local Naemon instance.  This can be very useful in distributed and failover monitoring installations.  More information on passive check state translation can be found <a href="passivestatetranslation.html">here</a>.

* 0 = Disable check translation (default)
* 1 = Enable check translation

<a name="passive_host_checks_are_soft"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Passive Host Checks Are SOFT Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**passive_host_checks_are_soft=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**passive_host_checks_are_soft=1**</font></td>
</tr>
</table>

This option determines whether or not Naemon will treat <a href="passivechecks.html">passive host checks</a> as HARD states or SOFT states.  By default, a passive host check result will put a host into a <a href="statetypes.html">HARD state type</a>.  You can change this behavior by enabling this option.

* 0 = Passive host checks are HARD (default)
* 1 = Passive host checks are SOFT

<a name="enable_predictive_host_dependency_checks"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Predictive Host Dependency Checks Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**enable_predictive_host_dependency_checks=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**enable_predictive_host_dependency_checks=1**</font></td>
</tr>
</table>

This option determines whether or not Naemon will execute predictive checks of hosts that are being depended upon (as defined in <a href="objectdefinitions.html#hostdependency">host dependencies</a>) for a particular host when it changes state.  Predictive checks help ensure that the dependency logic is as accurate as possible.  More information on how predictive checks work can be found <a href="dependencychecks.html">here</a>.

* 0 = Disable predictive checks
* 1 = Enable predictive checks (default)

<a name="enable_predictive_service_dependency_checks"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Predictive Service Dependency Checks Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**enable_predictive_service_dependency_checks=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**enable_predictive_service_dependency_checks=1**</font></td>
</tr>
</table>

This option determines whether or not Naemon will execute predictive checks of services that are being depended upon (as defined in <a href="objectdefinitions.html#servicedependency">service dependencies</a>) for a particular service when it changes state.  Predictive checks help ensure that the dependency logic is as accurate as possible.  More information on how predictive checks work can be found <a href="dependencychecks.html">here</a>.

* 0 = Disable predictive checks
* 1 = Enable predictive checks (default)

<a name="cached_host_check_horizon"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Cached Host Check Horizon**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**cached_host_check_horizon=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**cached_host_check_horizon=15**</font></td>
</tr>
</table>

This option determines the maximum amount of time (in seconds) that the state of a previous host check is considered current.  Cached host states (from host checks that were performed more recently than the time specified by this value) can improve host check performance immensely.  Too high of a value for this option may result in (temporarily) inaccurate host states, while a low value may result in a performance hit for host checks.  Use a value of 0 if you want to disable host check caching.  More information on cached checks can be found <a href="cachedchecks.html">here</a>.

<a name="cached_service_check_horizon"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Cached Service Check Horizon**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**cached_service_check_horizon=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**cached_service_check_horizon=15**</font></td>
</tr>
</table>

This option determines the maximum amount of time (in seconds) that the state of a previous service check is considered current.  Cached service states (from service checks that were performed more recently than the time specified by this value) can improve service check performance when a lot of <a href="objectdefinitions.html#servicedependency">service dependencies</a> are used.  Too high of a value for this option may result in inaccuracies in the service dependency logic.  Use a value of 0 if you want to disable service check caching.  More information on cached checks can be found <a href="cachedchecks.html">here</a>.

<a name="use_large_installation_tweaks"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Large Installation Tweaks Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**use_large_installation_tweaks=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**use_large_installation_tweaks=0**</font></td>
</tr>
</table>

This option determines whether or not the Naemon daemon will take several shortcuts to improve performance.  These shortcuts result in the loss of a few features, but larger installations will likely see a lot of benefit from doing so.  More information on what optimizations are taken when you enable this option can be found <a href="largeinstalltweaks.html">here</a>.

* 0 = Don't use tweaks (default)
* 1 = Use tweaks

<a name="free_child_process_memory"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Child Process Memory Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**free_child_process_memory=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**free_child_process_memory=0**</font></td>
</tr>
</table>

This option determines whether or not Naemon will free memory in child processes when they are fork()ed off from the main process.  By default, Naemon frees memory.  However, if the <a href="#use_large_installation_tweaks">use_large_installation_tweaks</a> option is enabled, it will not.  By defining this option in your configuration file, you are able to override things to get the behavior you want.

* 0 = Don't free memory
* 1 = Free memory

<a name="child_processes_fork_twice"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Child Processes Fork Twice**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**child_processes_fork_twice=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**child_processes_fork_twice=0**</font></td>
</tr>
</table>

This option determines whether or not Naemon will fork() child processes twice when it executes host and service checks.  By default, Naemon fork()s twice.  However, if the <a href="#use_large_installation_tweaks">use_large_installation_tweaks</a> option is enabled, it will only fork() once.  By defining this option in your configuration file, you are able to override things to get the behavior you want.

* 0 = Fork() just once
* 1 = Fork() twice

<a name="enable_environment_macros"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Environment Macros Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**enable_environment_macros=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**enable_environment_macros=0**</font></td>
</tr>
</table>

This option determines whether or not the Naemon daemon will make all standard <a href="macrolist.html">macros</a> available as environment variables to your check, notification, event hander, etc. commands.  In large Naemon installations this can be problematic because it takes additional memory and (more importantly) CPU to compute the values of all macros and make them available to the environment.

* 0 = Don't make macros available as environment variables
* 1 = Make macros available as environment variables (default)

<a name="enable_flap_detection"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Flap Detection Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**enable_flap_detection=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**enable_flap_detection=0**</font></td>
</tr>
</table>

This option determines whether or not Naemon will try and detect hosts and services that are "flapping".  Flapping occurs when a host or service changes between states too frequently, resulting in a barrage of notifications being sent out.  When Naemon detects that a host or service is flapping, it will temporarily suppress notifications for that host/service until it stops flapping.  Flap detection is very experimental at this point, so use this feature with caution!  More information on how flap detection and handling works can be found <a href="flapping.html">here</a>.     Note: If you have <a href="#retain_state_information">state retention</a> enabled, Naemon will ignore this setting when it (re)starts and use the last known setting for this option (as stored in the <a href="#state_retention_file">state retention file</a>), *unless* you disable the <a href="#use_retained_program_state">use_retained_program_state</a> option.  If you want to change this option when state retention is active (and the <a href="#use_retained_program_state">use_retained_program_state</a> is enabled), you'll have to use the appropriate <a href="extcommands.html">external command</a> or change it via the web interface.

* 0 = Don't enable flap detection (default)
* 1 = Enable flap detection

<a name="low_service_flap_threshold"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Low Service Flap Threshold**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**low_service_flap_threshold=&lt;percent&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**low_service_flap_threshold=25.0**</font></td>
</tr>
</table>

This option is used to set the low threshold for detection of service flapping.  For more information on how flap detection and handling works (and how this option affects things) read <a href="flapping.html">this</a>.

<a name="high_service_flap_threshold"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**High Service Flap Threshold**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**high_service_flap_threshold=&lt;percent&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**high_service_flap_threshold=50.0**</font></td>
</tr>
</table>

This option is used to set the high threshold for detection of service flapping.  For more information on how flap detection and handling works (and how this option affects things) read <a href="flapping.html">this</a>.

<a name="low_host_flap_threshold"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Low Host Flap Threshold**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**low_host_flap_threshold=&lt;percent&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**low_host_flap_threshold=25.0**</font></td>
</tr>
</table>

This option is used to set the low threshold for detection of host flapping.  For more information on how flap detection and handling works (and how this option affects things) read <a href="flapping.html">this</a>.

<a name="high_host_flap_threshold"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**High Host Flap Threshold**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**high_host_flap_threshold=&lt;percent&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**high_host_flap_threshold=50.0**</font></td>
</tr>
</table>

This option is used to set the high threshold for detection of host flapping.  For more information on how flap detection and handling works (and how this option affects things) read <a href="flapping.html">this</a>.

<a name="soft_state_dependencies"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Soft State Dependencies Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**soft_state_dependencies=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**soft_state_dependencies=0**</font></td>
</tr>
</table>

This option determines whether or not Naemon will use soft state information when checking <a href="dependencies.html">host and service dependencies</a>.  Normally Naemon will only use the latest hard host or service state when checking dependencies.  If you want it to use the latest state (regardless of whether its a soft or hard <a href="statetypes.html">state type</a>), enable this option.

* 0 = Don't use soft state dependencies (default)
* 1 = Use soft state dependencies

<a name="service_check_timeout"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Service Check Timeout**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**service_check_timeout=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**service_check_timeout=60**</font></td>
</tr>
</table>

This is the maximum number of seconds that Naemon will allow service checks to run.  If checks exceed this limit, they are killed and a CRITICAL state is returned.   A timeout error will also be logged.

There is often widespread confusion as to what this option really does.  It is meant to be used as a last ditch mechanism to kill off plugins which are misbehaving and not exiting in a timely manner.  It should be set to something high (like 60 seconds or more), so that each service check normally finishes executing within this time limit.  If a service check runs longer than this limit, Naemon will kill it off thinking it is a runaway processes.

<a name="host_check_timeout"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Host Check Timeout**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**host_check_timeout=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**host_check_timeout=60**</font></td>
</tr>
</table>

This is the maximum number of seconds that Naemon will allow host checks to run.  If checks exceed this limit, they are killed and a CRITICAL state is returned and the host will be assumed to be DOWN.  A timeout error will also be logged.

There is often widespread confusion as to what this option really does.  It is meant to be used as a last ditch mechanism to kill off plugins which are misbehaving and not exiting in a timely manner.  It should be set to something high (like 60 seconds or more), so that each host check normally finishes executing within this time limit.  If a host check runs longer than this limit, Naemon will kill it off thinking it is a runaway processes.

<a name="event_handler_timeout"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Event Handler Timeout**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**event_handler_timeout=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**event_handler_timeout=60**</font></td>
</tr>
</table>

This is the maximum number of seconds that Naemon will allow <a href="eventhandlers.html">event handlers</a> to be run.  If an event handler exceeds this time limit it will be killed and a warning will be logged.

There is often widespread confusion as to what this option really does.  It is meant to be used as a last ditch mechanism to kill off commands which are misbehaving and not exiting in a timely manner.  It should be set to something high (like 60 seconds or more), so that each event handler command normally finishes executing within this time limit.  If an event handler runs longer than this limit, Naemon will kill it off thinking it is a runaway processes.

<a name="notification_timeout"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Notification Timeout**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**notification_timeout=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**notification_timeout=60**</font></td>
</tr>
</table>

This is the maximum number of seconds that Naemon will allow notification commands to be run.  If a notification command exceeds this time limit it will be killed and a warning will be logged.

There is often widespread confusion as to what this option really does.  It is meant to be used as a last ditch mechanism to kill off commands which are misbehaving and not exiting in a timely manner.  It should be set to something high (like 60 seconds or more), so that each notification command finishes executing within this time limit.  If a notification command runs longer than this limit, Naemon will kill it off thinking it is a runaway processes.

<a name="ocsp_timeout"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Obsessive Compulsive Service Processor Timeout**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**ocsp_timeout=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**ocsp_timeout=5**</font></td>
</tr>
</table>

This is the maximum number of seconds that Naemon will allow an <a href="#ocsp_command">obsessive compulsive service processor command</a> to be run.  If a command exceeds this time limit it will be killed and a warning will be logged.

<a name="ochp_timeout"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Obsessive Compulsive Host Processor Timeout**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**ochp_timeout=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**ochp_timeout=5**</font></td>
</tr>
</table>

This is the maximum number of seconds that Naemon will allow an <a href="#ochp_command">obsessive compulsive host processor command</a> to be run.  If a command exceeds this time limit it will be killed and a warning will be logged.

<a name="perfdata_timeout"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Performance Data Processor Command Timeout**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**perfdata_timeout=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**perfdata_timeout=5**</font></td>
</tr>
</table>

This is the maximum number of seconds that Naemon will allow a <a href="#host_perfdata_command">host performance data processor command</a> or <a href="#service_perfdata_command">service performance data processor command</a> to be run.  If a command exceeds this time limit it will be killed and a warning will be logged.

<a name="obsess_over_services"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Obsess Over Services Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**obsess_over_services=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**obsess_over_services=1**</font></td>
</tr>
</table>

This value determines whether or not Naemon will "obsess" over service checks results and run the <a href="#ocsp_command">obsessive compulsive service processor command</a> you define.  I know - funny name, but it was all I could think of.  This option is useful for performing <a href="distributed.html">distributed monitoring</a>.  If you're not doing distributed monitoring, don't enable this option.

* 0 = Don't obsess over services (default)
* 1 = Obsess over services

<a name="ocsp_command"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Obsessive Compulsive Service Processor Command**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**ocsp_command=&lt;command&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**ocsp_command=obsessive_service_handler**</font></td>
</tr>
</table>

This option allows you to specify a command to be run after *every* service check, which can be useful in <a href="distributed.html">distributed monitoring</a>.  This command is executed after any <a href="eventhandlers.html">event handler</a> or <a href="notifications.html">notification</a> commands.  The *command* argument is the short name of a <a href="objectdefinitions.html#command">command definition</a> that you define in your object configuration file.  The maximum amount of time that this command can run is controlled by the <a href="#ocsp_timeout">ocsp_timeout</a> option.   More information on distributed monitoring can be found <a href="distributed.html">here</a>.  This command is only executed if the <a href="#obsess_over_services">obsess_over_services</a> option is enabled globally and if the *obsess_over_service* directive in the <a href="objectdefinitions.html#service">service definition</a> is enabled.

<a name="obsess_over_hosts"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Obsess Over Hosts Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**obsess_over_hosts=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**obsess_over_hosts=1**</font></td>
</tr>
</table>

This value determines whether or not Naemon will "obsess" over host checks results and run the <a href="#ochp_command">obsessive compulsive host processor command</a> you define.  I know - funny name, but it was all I could think of.  This option is useful for performing <a href="distributed.html">distributed monitoring</a>.  If you're not doing distributed monitoring, don't enable this option.

* 0 = Don't obsess over hosts (default)
* 1 = Obsess over hosts

<a name="ochp_command"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Obsessive Compulsive Host Processor Command**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**ochp_command=&lt;command&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**ochp_command=obsessive_host_handler**</font></td>
</tr>
</table>

This option allows you to specify a command to be run after *every* host check, which can be useful in <a href="distributed.html">distributed monitoring</a>.  This command is executed after any <a href="eventhandlers.html">event handler</a> or <a href="notifications.html">notification</a> commands.  The *command* argument is the short name of a <a href="objectdefinitions.html#command">command definition</a> that you define in your object configuration file.  The maximum amount of time that this command can run is controlled by the <a href="#ochp_timeout">ochp_timeout</a> option.   More information on distributed monitoring can be found <a href="distributed.html">here</a>.  This command is only executed if the <a href="#obsess_over_hosts">obsess_over_hosts</a> option is enabled globally and if the *obsess_over_host* directive in the <a href="objectdefinitions.html#host">host definition</a> is enabled.

<a name="process_performance_data"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Performance Data Processing Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**process_performance_data=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**process_performance_data=1**</font></td>
</tr>
</table>

This value determines whether or not Naemon will process host and service check <a href="perfdata.html">performance data</a>.

* 0 = Don't process performance data (default)
* 1 = Process performance data

<a name="host_perfdata_command"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Host Performance Data Processing Command**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**host_perfdata_command=&lt;command&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**host_perfdata_command=process-host-perfdata**</font></td>
</tr>
</table>

This option allows you to specify a command to be run after *every* host check to process host <a href="perfdata.html">performance data</a> that may be returned from the check.  The *command* argument is the short name of a <a href="objectdefinitions.html#command">command definition</a> that you define in your object configuration file.  This command is only executed if the <a href="#process_performance_data">process_performance_data</a> option is enabled globally and if the *process_perf_data* directive in the <a href="objectdefinitions.html#host">host definition</a> is enabled.

<a name="service_perfdata_command"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Service Performance Data Processing Command**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**service_perfdata_command=&lt;command&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**service_perfdata_command=process-service-perfdata**</font></td>
</tr>
</table>

This option allows you to specify a command to be run after *every* service check to process service <a href="perfdata.html">performance data</a> that may be returned from the check.  The *command* argument is the short name of a <a href="objectdefinitions.html#command">command definition</a> that you define in your object configuration file.  This command is only executed if the <a href="#process_performance_data">process_performance_data</a> option is enabled globally and if the *process_perf_data* directive in the <a href="objectdefinitions.html#service">service definition</a> is enabled.

<a name="host_perfdata_file"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Host Performance Data File**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**host_perfdata_file=&lt;file_name&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**host_perfdata_file=/usr/local/nagios/var/host-perfdata.dat**</font></td>
</tr>
</table>

This option allows you to specify a file to which host <a href="perfdata.html">performance data</a> will be written after every host check.  Data will be written to the performance file as specified by the <a href="#host_perfdata_file_template">host_perfdata_file_template</a> option.  Performance data is only written to this file if the <a href="#process_performance_data">process_performance_data</a> option is enabled globally and if the *process_perf_data* directive in the <a href="objectdefinitions.html#host">host definition</a> is enabled.

<a name="service_perfdata_file"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Service Performance Data File**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**service_perfdata_file=&lt;file_name&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**service_perfdata_file=/usr/local/nagios/var/service-perfdata.dat**</font></td>
</tr>
</table>

This option allows you to specify a file to which service <a href="perfdata.html">performance data</a> will be written after every service check.  Data will be written to the performance file as specified by the <a href="#service_perfdata_file_template">service_perfdata_file_template</a> option.  Performance data is only written to this file if the <a href="#process_performance_data">process_performance_data</a> option is enabled globally and if the *process_perf_data* directive in the <a href="objectdefinitions.html#service">service definition</a> is enabled.

<a name="host_perfdata_file_template"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Host Performance Data File Template**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**host_perfdata_file_template=&lt;template&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**host_perfdata_file_template=[HOSTPERFDATA]\t$TIMET$\t$HOSTNAME$\t$HOSTEXECUTIONTIME$\t$HOSTOUTPUT$\t$HOSTPERFDATA$**</font></td>
</tr>
</table>

This option determines what (and how) data is written to the <a href="#host_perfdata_file">host performance data file</a>.  The template may contain <a href="macros.html">macros</a>, special characters (\t for tab, \r for carriage return, \n for newline) and plain text.  A newline is automatically added after each write to the performance data file.

<a name="service_perfdata_file_template"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Service Performance Data File Template**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**service_perfdata_file_template=&lt;template&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**service_perfdata_file_template=[SERVICEPERFDATA]\t$TIMET$\t$HOSTNAME$\t$SERVICEDESC$\t$SERVICEEXECUTIONTIME$\t$SERVICELATENCY$\t$SERVICEOUTPUT$\t$SERVICEPERFDATA$**</font></td>
</tr>
</table>

This option determines what (and how) data is written to the <a href="#service_perfdata_file">service performance data file</a>.  The template may contain <a href="macros.html">macros</a>, special characters (\t for tab, \r for carriage return, \n for newline) and plain text.  A newline is automatically added after each write to the performance data file.

<a name="host_perfdata_file_mode"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Host Performance Data File Mode**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**host_perfdata_file_mode=&lt;mode&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**host_perfdata_file_mode=a**</font></td>
</tr>
</table>

This option determines how the <a href="#host_perfdata_file">host performance data file</a> is opened.  Unless the file is a named pipe you'll probably want to use the default mode of append.

* a = Open file in append mode (default)
* w = Open file in write mode
* p = Open in non-blocking read/write mode (useful when writing to pipes)

<a name="service_perfdata_file_mode"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Service Performance Data File Mode**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**service_perfdata_file_mode=&lt;mode&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**service_perfdata_file_mode=a**</font></td>
</tr>
</table>

This option determines how the <a href="#service_perfdata_file">service performance data file</a> is opened.  Unless the file is a named pipe you'll probably want to use the default mode of append.

* a = Open file in append mode (default)
* w = Open file in write mode
* p = Open in non-blocking read/write mode (useful when writing to pipes)

<a name="host_perfdata_file_processing_interval"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Host Performance Data File Processing Interval**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**host_perfdata_file_processing_interval=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**host_perfdata_file_processing_interval=0**</font></td>
</tr>
</table>

This option allows you to specify the interval (in seconds) at which the <a href="#host_perfdata_file">host performance data file</a> is processed using the <a href="#host_perfdata_file_processing_command">host performance data file processing command</a>.  A value of 0 indicates that the performance data file should not be processed at regular intervals.

<a name="service_perfdata_file_processing_interval"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Service Performance Data File Processing Interval**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**service_perfdata_file_processing_interval=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**service_perfdata_file_processing_interval=0**</font></td>
</tr>
</table>

This option allows you to specify the interval (in seconds) at which the <a href="#service_perfdata_file">service performance data file</a> is processed using the <a href="#service_perfdata_file_processing_command">service performance data file processing command</a>.  A value of 0 indicates that the performance data file should not be processed at regular intervals.

<a name="host_perfdata_file_processing_command"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Host Performance Data File Processing Command**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**host_perfdata_file_processing_command=&lt;command&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**host_perfdata_file_processing_command=process-host-perfdata-file**</font></td>
</tr>
</table>

This option allows you to specify the command that should be executed to process the <a href="#host_perfdata_file">host performance data file</a>.  The *command* argument is the short name of a <a href="objectdefinitions.html#command">command definition</a> that you define in your object configuration file.  The interval at which this command is executed is determined by the <a href="#host_perfdata_file_processing_interval">host_perfdata_file_processing_interval</a> directive.

<a name="service_perfdata_file_processing_command"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Service Performance Data File Processing Command**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**service_perfdata_file_processing_command=&lt;command&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**service_perfdata_file_processing_command=process-service-perfdata-file**</font></td>
</tr>
</table>

This option allows you to specify the command that should be executed to process the <a href="#service_perfdata_file">service performance data file</a>.  The *command* argument is the short name of a <a href="objectdefinitions.html#command">command definition</a> that you define in your object configuration file.  The interval at which this command is executed is determined by the <a href="#service_perfdata_file_processing_interval">service_perfdata_file_processing_interval</a> directive.

<a name="check_for_orphaned_services"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Orphaned Service Check Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**check_for_orphaned_services=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**check_for_orphaned_services=1**</font></td>
</tr>
</table>

This option allows you to enable or disable checks for orphaned service checks. Orphaned service checks are checks which have been executed and have been removed from the event queue, but have not had any results reported in a long time.  Since no results have come back in for the service, it is not rescheduled in the event queue.  This can cause service checks to stop being executed.  Normally it is very rare for this to happen - it might happen if an external user or process killed off the process that was being used to execute a service check.  If this option is enabled and Naemon finds that results for a particular service check have not come back, it will log an error message and reschedule the service check.  If you start seeing service checks that never seem to get rescheduled, enable this option and see if you notice any log messages about orphaned services.

* 0 = Don't check for orphaned service checks
* 1 = Check for orphaned service checks (default)

<a name="check_for_orphaned_hosts"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Orphaned Host Check Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**check_for_orphaned_hosts=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**check_for_orphaned_hosts=1**</font></td>
</tr>
</table>

This option allows you to enable or disable checks for orphaned hoste checks. Orphaned host checks are checks which have been executed and have been removed from the event queue, but have not had any results reported in a long time.  Since no results have come back in for the host, it is not rescheduled in the event queue.  This can cause host checks to stop being executed.  Normally it is very rare for this to happen - it might happen if an external user or process killed off the process that was being used to execute a host check.  If this option is enabled and Naemon finds that results for a particular host check have not come back, it will log an error message and reschedule the host check.  If you start seeing host checks that never seem to get rescheduled, enable this option and see if you notice any log messages about orphaned hosts.

* 0 = Don't check for orphaned host checks
* 1 = Check for orphaned host checks (default)

<a name="check_service_freshness"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Service Freshness Checking Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**check_service_freshness=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**check_service_freshness=0**</font></td>
</tr>
</table>

This option determines whether or not Naemon will periodically check the "freshness" of service checks.  Enabling this option is useful for helping to ensure that <a href="passivechecks.html">passive service checks</a> are received in a timely manner.  More information on freshness checking can be found <a href="freshness.html">here</a>.

* 0 = Don't check service freshness
* 1 = Check service freshness (default)

<a name="service_freshness_check_interval"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Service Freshness Check Interval**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**service_freshness_check_interval=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**service_freshness_check_interval=60**</font></td>
</tr>
</table>

This setting determines how often (in seconds) Naemon will periodically check the "freshness" of service check results.  If you have disabled service freshness checking (with the <a href="#check_service_freshness">check_service_freshness</a> option), this option has no effect.  More information on freshness checking can be found <a href="freshness.html">here</a>.

<a name="check_host_freshness"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Host Freshness Checking Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**check_host_freshness=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**check_host_freshness=0**</font></td>
</tr>
</table>

This option determines whether or not Naemon will periodically check the "freshness" of host checks.  Enabling this option is useful for helping to ensure that <a href="passivechecks.html">passive host checks</a> are received in a timely manner.  More information on freshness checking can be found <a href="freshness.html">here</a>.

* 0 = Don't check host freshness
* 1 = Check host freshness (default)

<a name="host_freshness_check_interval"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Host Freshness Check Interval**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**host_freshness_check_interval=&lt;seconds&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**host_freshness_check_interval=60**</font></td>
</tr>
</table>

This setting determines how often (in seconds) Naemon will periodically check the "freshness" of host check results.  If you have disabled host freshness checking (with the <a href="#check_host_freshness">check_host_freshness</a> option), this option has no effect.  More information on freshness checking can be found <a href="freshness.html">here</a>.

<a name="additional_freshness_latency"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Additional Freshness Threshold Latency Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**additional_freshness_latency=&lt;#&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**additional_freshness_latency=15**</font></td>
</tr>
</table>

This option determines the number of seconds Naemon will add to any host or services freshness threshold it automatically calculates (e.g. those not specified explicity by the user).  More information on freshness checking can be found <a href="freshness.html">here</a>.

<a name="enable_embedded_perl"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Embedded Perl Interpreter Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**enable_embedded_perl=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**enable_embedded_perl=1**</font></td>
</tr>
</table>

This setting determines whether or not the embedded Perl interpreter is enabled on a program-wide basis.  Naemon must be compiled with support for embedded Perl for this option to have an effect.  More information on the embedded Perl interpreter can be found <a href="embeddedperl.html">here</a>.

<a name="use_embedded_perl_implicitly"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Embedded Perl Implicit Use Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**use_embedded_perl_implicitly=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**use_embedded_perl_implicitly=1**</font></td>
</tr>
</table>

This setting determines whether or not the embedded Perl interpreter should be used for Perl plugins/scripts that do not explicitly enable/disable it.  Naemon must be compiled with support for embedded Perl for this option to have an effect.  More information on the embedded Perl interpreter and the effect of this setting can be found <a href="embeddedperl.html">here</a>.

<a name="date_format"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Date Format**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**date_format=&lt;option&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**date_format=us**</font></td>
</tr>
</table>

This option allows you to specify what kind of date/time format Naemon should use in the web interface and date/time <a href="macros.html">macros</a>.  Possible options (along with example output) include:

<table border="1" class="Default">
<tr><th>Option</th><th>Output Format</th><th>Sample Output</th></tr>
<tr><td>us</td><td>MM/DD/YYYY HH:MM:SS</td><td>06/30/2002 03:15:00</td></tr>
<tr><td>euro</td><td>DD/MM/YYYY HH:MM:SS</td><td>30/06/2002 03:15:00</td></tr>
<tr><td>iso8601</td><td>YYYY-MM-DD HH:MM:SS</td><td>2002-06-30 03:15:00</td></tr>
<tr><td>strict-iso8601</td><td>YYYY-MM-DDTHH:MM:SS</td><td>2002-06-30T03:15:00</td></tr>
</table>

<a name="use_timezone"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Timezone Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**use_timezone=&lt;tz&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**use_timezone=US/Mountain**</font></td>
</tr>
</table>

This option allows you to override the default timezone that this instance of Naemon runs in.  Useful if you have multiple instances of Naemon that need to run from the same server, but have different local times associated with them.  If not specified, Naemon will use the system configured timezone.

<span class="glyphicon glyphicon-pencil"></span> Note: If you use this option to specify a custom timezone, you will also need to alter the Apache configuration directives for the CGIs to specify the timezone you want.  Example:

```
&lt;Directory "/usr/local/nagios/sbin/"&gt;
SetEnv TZ "US/Mountain"
...
&lt;/Directory&gt;
```

<a name="illegal_object_name_chars"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Illegal Object Name Characters**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**illegal_object_name_chars=&lt;chars...&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**illegal_object_name_chars=`~!$%^&amp;*"|'&lt;&gt;?,()=**</font></td>
</tr>
</table>

This option allows you to specify illegal characters that cannot be used in host names, service descriptions, or names of other object types.  Naemon will allow you to use most characters in object definitions, but I recommend not using the characters shown in the example above.  Doing may give you problems in the web interface, notification commands, etc.

<a name="illegal_macro_output_chars"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Illegal Macro Output Characters**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**illegal_macro_output_chars=&lt;chars...&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**illegal_macro_output_chars=`~$^&amp;"|'&lt;&gt;**</font></td>
</tr>
</table>

This option allows you to specify illegal characters that should be stripped from <a href="macros.html">macros</a> before being used in notifications, event handlers, and other commands.  This DOES NOT affect macros used in service or host check commands.  You can choose to not strip out the characters shown in the example above, but I recommend you do not do this.  Some of these characters are interpreted by the shell (i.e. the backtick) and can lead to security problems.  The following macros are stripped of the characters you specify:

**$HOSTOUTPUT$**, **$HOSTPERFDATA$**, **$HOSTACKAUTHOR$**, **$HOSTACKCOMMENT$**, **$SERVICEOUTPUT$**, **$SERVICEPERFDATA$**, **$SERVICEACKAUTHOR$**, and **$SERVICEACKCOMMENT$**

<a name="use_regexp_matching"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Regular Expression Matching Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**use_regexp_matching=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**use_regexp_matching=0**</font></td>
</tr>
</table>

This option determines whether or not various directives in your <a href="configobject.html">object definitions</a> will be processed as regular expressions.  More information on how this works can be found <a href="objecttricks.html">here</a>.

* 0 = Don't use regular expression matching (default)
* 1 = Use regular expression matching

<a name="use_true_regexp_matching"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**True Regular Expression Matching Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**use_true_regexp_matching=&lt;0/1&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**use_true_regexp_matching=0**</font></td>
</tr>
</table>

If you've enabled regular expression matching of various object directives using the <a href="#use_regexp_matching">use_regexp_matching</a> option, this option will determine when object directives are treated as regular expressions.  If this option is disabled (the default), directives will only be treated as regular expressions if they contain *****, **?**, **+**, or **\.**.  If this option is enabled, all appropriate directives will be treated as regular expression - be careful when enabling this!  More information on how this works can be found <a href="objecttricks.html">here</a>.

* 0 = Don't use true regular expression matching (default)
* 1 = Use true regular expression matching

<a name="admin_email"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Administrator Email Address**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**admin_email=&lt;email_address&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**admin_email=root@localhost.localdomain**</font></td>
</tr>
</table>

This is the email address for the administrator of the local machine (i.e. the one that Naemon is running on).
This value can be used in notification commands by using the **$ADMINEMAIL$** <a href="macros.html">macro</a>.

<a name="admin_pager"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Administrator Pager**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**admin_pager=&lt;pager_number_or_pager_email_gateway&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**admin_pager=pageroot@localhost.localdomain**</font></td>
</tr>
</table>

This is the pager number (or pager email gateway) for the administrator of the local machine (i.e. the one that Naemon is running on). The pager number/address can be used in notification commands by using the **$ADMINPAGER$** <a href="macros.html">macro</a>.

<a name="event_broker_options"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Event Broker Options**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**event_broker_options=&lt;#&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**event_broker_options=-1**</font></td>
</tr>
</table>

This option controls what (if any) data gets sent to the event broker and, in turn, to any loaded event broker modules.   This is an advanced option.  When in doubt, either broker nothing (if not using event broker modules) or broker everything (if using event broker modules). Possible values are shown below.

* 0 = Broker nothing
* -1 = Broker everything
* # = See BROKER_* definitions in source code (include/broker.h) for other values that can be OR'ed together

<a name="broker_module"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Event Broker Modules**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**broker_module=&lt;modulepath&gt; [moduleargs]**</td>

</tr>
<tr>
<td>Example:</td>
<td><font color="red">**broker_module=/usr/local/nagios/bin/ndomod.o cfg_file=/usr/local/nagios/etc/ndomod.cfg**</font></td>
</tr>
</table>

This directive is used to specify an event broker module that should by loaded by Naemon at startup.  Use multiple directives if you want to load more than one module.  Arguments that should be passed to the module at startup are seperated from the module path by a space.

!!! WARNING !!!

Do NOT overwrite modules while they are being used by Naemon or Naemon will crash in a fiery display of SEGFAULT glory.  This is a bug/limitation either in dlopen(), the kernel, and/or the filesystem.  And maybe Naemon...

The correct/safe way of updating a module is by using one of these methods:

* Shutdown Naemon, replace the module file, restart Naemon
* While Naemon is running... delete the original module file, move the new module file into place, restart Naemon
<a name="debug_file"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Debug File**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**debug_file=&lt;file_name&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**debug_file=/usr/local/nagios/var/nagios.debug**</font></td>
</tr>
</table>

This option determines where Naemon should write debugging information.  What (if any) information is written is determined by the <a href="#debug_level">debug_level</a> and <a href="#debug_verbosity">debug_verbosity</a> options.  You can have Naemon automaticaly rotate the debug file when it reaches a certain size by using the <a href="#max_debug_file_size">max_debug_file_size</a> option.

<a name="debug_level"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Debug Level**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**debug_level=&lt;#&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**debug_level=24**</font></td>
</tr>
</table>

This option determines what type of information Naemon should write to the <a href="#debug_file">debug_file</a>.  This value is a logical OR of the values below.

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

<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Debug Verbosity**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**debug_verbosity=&lt;#&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**debug_verbosity=1**</font></td>
</tr>
</table>

This option determines how much debugging information Naemon should write to the <a href="#debug_file">debug_file</a>.

* 0 = Basic information
* 1 = More detailed information (default)
* 2 = Highly detailed information

<a name="max_debug_file_size"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Maximum Debug File Size**</td>
</tr>
</table>
<table border="0" class="Default">
<tr>
<td>Format:</td>
<td>**max_debug_file_size=&lt;#&gt;**</td>
</tr>
<tr>
<td>Example:</td>
<td><font color="red">**max_debug_file_size=1000000**</font></td>
</tr>
</table>

This option determines the maximum size (in bytes) of the <a href="#debug_file">debug file</a>.  If the file grows larger than this size, it will be renamed with a .old  extension.  If a file already exists with a .old extension it will automatically be deleted.  This helps ensure your disk space usage doesn't get out of control when debugging Naemon.
