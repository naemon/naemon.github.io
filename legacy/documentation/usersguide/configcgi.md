---
layout: doctoc
title: CGI Configuration File Options
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="config.html">Configuration Overview</a>,
<a href="cgis.html">Information on the CGIs</a>, <a href="cgiauth.html">Authentication And Authorization In The CGIs</a>,
<a href="cgiincludes.html">CGI Footers and Headers</a>

### Notes

When creating and/or editing configuration files, keep the following in mind:

* Lines that start with a '#' character are taken to be comments and are not processed
* Variables names must begin at the start of the line - no white space is allowed before the name
* Variable names are case-sensitive

### Sample Configuration

{{ site.hint }}A sample CGI configuration file (<b>/etc/naemon/cgi.cfg</b>) is installed for you when you follow the <a href="quickstart.html">quickstart installation guide</a>.{{ site.end }}

### Config File Location

By default, Thruk expects the CGI configuration file to be named **cgi.cfg** and located in the config file directory along with the <a href="configmain.html">main config file</a>.
If you need to change the name of the file or its location, you can configure Thruk to load a different location by setting <b>cgi.cfg</b> in your <b>/etc/naemon/thruk_local.conf</b>.

### Configuration File Variables

Below you will find descriptions of each main Naemon configuration file option...



<a name="use_authentication"></a>

#### Authentication Usage

<table border="0">
<tr>
<td valign="top">Format:</td>
<td><b>use_authentication=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td valign="top">Example:</td>
<td><font color="red"><b>use_authentication=1</b></font></td>
</tr>
</table>

This option controls whether or not the CGIs will use the authentication and authorization
functionality when determining what information and commands users have access to.
I would strongly suggest that you use the authentication functionality for the CGIs.
If you decide not to use authentication, make sure to remove the
<a href="cgis.html#cmd_cgi">command CGI</a> to prevent unauthorized users from issuing commands to Naemon.
The CGI will not issue commands to Naemon if authentication is disabled, but I would suggest removing
it altogether just to be on the safe side.  More information on how to setup authentication and
configure authorization for the CGIs can be found <a href="cgiauth.html">here</a>.

* 0 = Don't use authentication functionality
* 1 = Use authentication and authorization functionality (default)

<a name="default_user_name"></a>
#### Default User Name

<table border="0">
<tr>
<td valign="top">Format:</td>
<td><b>default_user_name=&lt;username&gt;</b></td>
</tr>
<tr>
<td valign="top">Example:</td>
<td><font color="red"><b>default_user_name=guest</b></font></td>
</tr>
</table>

Setting this variable will define a default username that can access the CGIs.
This allows people within a secure domain (i.e., behind a firewall) to access
the CGIs without necessarily having to authenticate to the web server.
You may want to use this to avoid having to use basic authentication if you are
not using a secure server, as basic authentication transmits passwords in clear
text over the Internet.

**Important:**  Do *not* define a default username unless you are running a secure
web server and are sure that everyone who has access to the CGIs has been
authenticated in some manner! If you define this variable, anyone who has not
authenticated to the web server will inherit all rights you assign to this user!

<a name="authorized_for_system_information"></a>
<a name="authorized_contactgroup_for_system_information"></a>
#### System/Process Information Access

<table border="0">
<tr>
<td valign="top">Format:</td>
<td><b>authorized_for_system_information=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Groups:</td>
<td><b>authorized_contactgroup_for_system_information=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Example:</td>
<td><font color="red"><b>authorized_for_system_information=naemonadmin,theboss</b></font></td>
</tr>
</table>

This is a comma-delimited list of names of *authenticated users* who can view system/process information
in the <a href="cgis.html#extinfo_cgi">extended information CGI</a>. Users in this list are *not* automatically
authorized to issue system/process commands. If you want users to be able to issue system/process commands
as well, you must add them to the <a href="#authorized_for_system_commands">authorized_for_system_commands</a> variable.
More information on how to setup authentication and configure authorization for the CGIs can be found <a href="cgiauth.html">here</a>.

<a name="authorized_for_system_commands"></a>
<a name="authorized_contactgroup_for_system_commands"></a>
#### System/Process Command Access

<table border="0">
<tr>
<td valign="top">Format:</td>
<td><b>authorized_for_system_commands=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Groups:</td>
<td><b>authorized_contactgroup_for_system_commands=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Example:</td>
<td><font color="red"><b>authorized_for_system_commands=naemonadmin</b></font></td>
</tr>
</table>

This is a comma-delimited list of names of *authenticated users* who can issue system/process commands via the
<a href="cgis.html#cmd_cgi">command CGI</a>. Users in this list are *not* automatically authorized to view
system/process information. If you want users to be able to view system/process information as well, you
must add them to the <a href="#authorized_for_system_information">authorized_for_system_information</a> variable.
More information on how to setup authentication and configure authorization for the CGIs can be found <a href="cgiauth.html">here</a>.

<a name="authorized_for_configuration_information"></a>
<a name="authorized_contactgroup_for_configuration_information"></a>
#### Configuration Information Access

<table border="0">
<tr>
<td valign="top">Format:</td>
<td><b>authorized_for_configuration_information=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Groups:</td>
<td><b>authorized_contactgroup_for_configuration_information=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Example:</td>
<td><font color="red"><b>authorized_for_configuration_information=naemonadmin</b></font></td>
</tr>
</table>

This is a comma-delimited list of names of *authenticated users* who can view configuration information in
the <a href="cgis.html#config_cgi">configuration CGI</a>. Users in this list can view information on all
configured hosts, host groups, services, contacts, contact groups, time periods, and commands. More
information on how to setup authentication and configure authorization for the CGIs can be
found <a href="cgiauth.html">here</a>.

<a name="authorized_for_all_hosts"></a>
<a name="authorized_contactgroup_for_all_hosts"></a>
#### Global Host Information Access

<table border="0">
<tr>
<td valign="top">Format:</td>
<td><b>authorized_for_all_hosts=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Groups:</td>
<td><b>authorized_contactgroup_for_all_hosts=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Example:</td>
<td><font color="red"><b>authorized_for_all_hosts=naemonadmin,theboss</b></font></td>
</tr>
</table>

This is a comma-delimited list of names of *authenticated users* who can view status and
configuration information for all hosts. Users in this list are also automatically
authorized to view information for all services. Users in this list are *not* automatically
authorized to issue commands for all hosts or services. If you want users able to issue
commands for all hosts and services as well, you must add them to
the <a href="#authorized_for_all_host_commands">authorized_for_all_host_commands</a> variable.
More information on how to setup authentication and configure authorization for the CGIs can be found <a href="cgiauth.html">here</a>.

<a name="authorized_for_all_host_commands"></a>
<a name="authorized_contactgroup_for_all_host_commands"></a>
#### Global Host Command Access

<table border="0">
<tr>
<td valign="top">Format:</td>
<td><b>authorized_for_all_host_commands=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Groups:</td>
<td><b>authorized_contactgroup_for_all_host_commands=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Example:</td>
<td><font color="red"><b>authorized_for_all_host_commands=naemonadmin</b></font></td>
</tr>
</table>

This is a comma-delimited list of names of *authenticated users* who can issue commands for all
hosts via the <a href="cgis.html#cmd_cgi">command CGI</a>. Users in this list are also automatically
authorized to issue commands for all services. Users in this list are *not* automatically authorized
to view status or configuration information for all hosts or services. If you want users able to
view status and configuration information for all hosts and services as well, you must add them
to the <a href="#authorized_for_all_hosts">authorized_for_all_hosts</a> variable. More information
on how to setup authentication and configure authorization for the CGIs can be found <a href="cgiauth.html">here</a>.

<a name="authorized_for_all_services"></a>
<a name="authorized_contactgroup_for_all_services"></a>
#### Global Service Information Access

<table border="0">
<tr>
<td valign="top">Format:</td>
<td><b>authorized_for_all_services=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Groups:</td>
<td><b>authorized_contactgroup_for_all_services=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Example:</td>
<td><font color="red"><b>authorized_for_all_services=naemonadmin,theboss</b></font></td>
</tr>
</table>

This is a comma-delimited list of names of *authenticated users* who can view status and
configuration information for all services. Users in this list are *not* automatically
authorized to view information for all hosts. Users in this list are *not* automatically
authorized to issue commands for all services. If you want users able to issue commands
for all services as well, you must add them to the
<a href="#authorized_for_all_service_commands">authorized_for_all_service_commands</a> variable.
More information on how to setup authentication and configure authorization for the CGIs
can be found <a href="cgiauth.html">here</a>.

<a name="authorized_for_all_service_commands"></a>
<a name="authorized_contactgroup_for_all_service_commands"></a>
#### Global Service Command Access

<table border="0">
<tr>
<td valign="top">Format:</td>
<td><b>authorized_for_all_service_commands=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Groups:</td>
<td><b>authorized_contactgroup_for_all_service_commands=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Example:</td>
<td><font color="red"><b>authorized_for_all_service_commands=naemonadmin</b></font></td>
</tr>
</table>

This is a comma-delimited list of names of *authenticated users* who can issue commands
for all services via the <a href="cgis.html#cmd_cgi">command CGI</a>. Users in this
list are *not* automatically authorized to issue commands for all hosts. Users in this
list are *not* automatically authorized to view status or configuration information for
all hosts. If you want users able to view status and configuration information for all
services as well, you must add them to the <a href="#authorized_for_all_services">authorized_for_all_services</a> variable.
More information on how to setup authentication and configure authorization for the CGIs can be found <a href="cgiauth.html">here</a>.

<a name="authorized_for_read_only"></a>
#### Read-Only Users

<table border="0">
<tr>
<td valign="top">Format:</td>
<td><b>authorized_for_read_only=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Groups:</td>
<td><b>authorized_contactgroup_for_read_only=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td valign="top">Example:</td>
<td><font color="red"><b>authorized_for_read_only=john,mark</b></font></td>
</tr>
</table>

A comma-delimited list of usernames that have read-only rights in the CGIs. This will block any
service or host commands normally shown on the extinfo CGI pages. It will also block
comments from being shown to read-only users.

<a name="lock_author_names"></a>
#### Lock Author Names

<table border="0">
<tr>
<td valign="top">Format:</td>
<td><b>lock_author_names=[0/1]</b></td>
</tr>
<tr>
<td valign="top">Example:</td>
<td><font color="red"><b>lock_author_names=1</b></font></td>
</tr>
</table>

This option allows you to restrict users from changing the author name when
submitting comments, acknowledgements, and scheduled downtime from the web
interface. If this option is enabled, users will be unable to change the
author name associated with the command request.

* 0 = Allow users to change author names when submitting commands
* 1 = Prevent users from changing author names (default)

<a name="refresh_rate"></a>
#### CGI Refresh Rate

<table border="0">
<tr>
<td valign="top">Format:</td>
<td><b>refresh_rate=&lt;rate_in_seconds&gt;</b></td>
</tr>
<tr>
<td valign="top">Example:</td>
<td><font color="red"><b>refresh_rate=90</b></font></td>
</tr>
</table>

This option allows you to specify the number of seconds between page refreshes
for all pages which use automatic refresh. You can also always add &refresh=&lt;seconds&gt;
to the url to override the default refresh interval.

<a name="audio_alerts"></a>
#### Audio Alerts

<table border="0">
<tr>
<td valign="top">Formats:</td>
<td>
<b>host_unreachable_sound=&lt;sound_file&gt;</b><br>
<b>host_down_sound=&lt;sound_file&gt;</b><br>
<b>service_critical_sound=&lt;sound_file&gt;</b><br>
<b>service_warning_sound=&lt;sound_file&gt;</b><br>
<b>service_unknown_sound=&lt;sound_file&gt;</b><br>
</td>
</tr>
<tr>
<td valign="top">Examples:</td>
<td>
<font color="red"><b>host_unreachable_sound=hostu.wav</b></font><br>
<font color="red"><b>host_down_sound=hostd.wav</b></font><br>
<font color="red"><b>service_critical_sound=critical.wav</b></font><br>
<font color="red"><b>service_warning_sound=warning.wav</b></font><br>
<font color="red"><b>service_unknown_sound=unknown.wav</b></font><br>
</td>
</tr>
</table>

These options allow you to specify an audio file that should be played in your
browser if there are problems when you are viewing the
<a href="cgis.html#status_cgi">status CGI</a>. If there are problems, the audio
file for the most critical type of problem will be played. The most critical type
of problem is on or more unreachable hosts, while the least critical is one or
more services in an unknown state (see the order in the example above). Audio
files are assumed to be in the **media/** subdirectory in your HTML
directory (i.e. */usr/share/naemon/root/thruk/media*).

<a name="escape_html_tags"></a>
#### Escape HTML Tags Option

<table border="0">
<tr>
<td valign="top">Format:</td>
<td><b>escape_html_tags=[0/1]</b></td>
</tr>
<tr>
<td valign="top">Example:</td>
<td><font color="red"><b>escape_html_tags=1</b></font></td>
</tr>
</table>

This option determines whether or not HTML tags in host and service (plugin) output
is escaped in the CGIs. If you enable this option, your plugin output will not be
able to contain clickable hyperlinks.

<a name="notes_url_target"></a>
#### Notes URL Target

<table border="0">
<tr>
<td valign="top">Format:</td>
<td><b>notes_url_target=[target]</b></td>
</tr>
<tr>
<td valign="top">Example:</td>
<td><font color="red"><b>notes_url_target=_blank</b></font></td>
</tr>
</table>

This option determines the name of the frame target that notes URLs should be displayed in.
Valid options include *_blank*, *_self*, *_top*, *_parent*, or any other valid target name.

<a name="action_url_target"></a>
#### Action URL Target

<table border="0">
<tr>
<td valign="top">Format:</td>
<td><b>action_url_target=[target]</b></td>
</tr>
<tr>
<td valign="top">Example:</td>
<td><font color="red"><b>action_url_target=_blank</b></font></td>
</tr>
</table>

This option determines the name of the frame target that action URLs should be displayed in.
Valid options include *_blank*, *_self*, *_top*, *_parent*, or any other valid target name.
