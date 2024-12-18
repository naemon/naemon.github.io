# CGI Configuration File Options

## Notes

When creating and/or editing configuration files, keep the following in mind:

* Lines that start with a `#` character are taken to be comments and are not processed
* Variables names must begin at the start of the line - no white space is allowed before the name
* Variable names are case-sensitive

## Sample Configuration

> [!TIP]
> A sample CGI configuration file (`/etc/naemon/cgi.cfg`) is installed for you when you follow the [quickstart installation guide](quickstart).

## Config File Location

By default, Thruk expects the CGI configuration file to be named `cgi.cfg` and located in the config file directory along with the [main config file](configmain).
If you need to change the name of the file or its location, you can configure Thruk to load a different location by setting `cgi.cfg` in your `/etc/naemon/thruk_local.conf`.

## Configuration File Variables

Below you will find descriptions of each main Naemon configuration file option...


### Authentication Usage {#use_authentication}

<table>
<tbody>
<tr>
<td>Format:</td>
<td><b>use_authentication=&lt;0/1&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">use_authentication=1</span>
</td>
</tr>
</tbody>
</table>

This option controls whether or not the CGIs will use the authentication and authorization
functionality when determining what information and commands users have access to.
I would strongly suggest that you use the authentication functionality for the CGIs.
If you decide not to use authentication, make sure to remove the
[command CGI](cgis#cmd_cgi) to prevent unauthorized users from issuing commands to Naemon.
The CGI will not issue commands to Naemon if authentication is disabled, but I would suggest removing
it altogether just to be on the safe side.  More information on how to setup authentication and
configure authorization for the CGIs can be found [here](cgiauth).

* `0` = Don't use authentication functionality
* `1` = Use authentication and authorization functionality (default)

### Default User Name {#default_user_name}

<table>
<tbody>
<tr>
<td>Format:</td>
<td><b>default_user_name=&lt;username&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">default_user_name=guest</span>
</td>
</tr>
</tbody>
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

### System/Process Information Access {#authorized_for_system_information}

<table>
<tbody>
<tr>
<td>Format:</td>
<td><b>authorized_for_system_information=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td>Groups:</td>
<td><b>authorized_contactgroup_for_system_information=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">authorized_for_system_information=naemonadmin,theboss</span>
</td>
</tr>
</tbody>
</table>

This is a comma-delimited list of names of *authenticated users* who can view system/process information
in the [extended information CGI](cgis#extinfo_cgi). Users in this list are *not* automatically
authorized to issue system/process commands. If you want users to be able to issue system/process commands
as well, you must add them to the [authorized_for_system_commands](#authorized_for_system_commands) variable.
More information on how to setup authentication and configure authorization for the CGIs can be found [here](cgiauth).

### System/Process Command Access {#authorized_for_system_commands}

<table>
<tbody>
<tr>
<td>Format:</td>
<td><b>authorized_for_system_commands=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td>Groups:</td>
<td><b>authorized_contactgroup_for_system_commands=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">authorized_for_system_commands=naemonadmin</span>
</td>
</tr>
</tbody>
</table>

This is a comma-delimited list of names of *authenticated users* who can issue system/process commands via the
[command CGI](cgis#cmd_cgi). Users in this list are *not* automatically authorized to view
system/process information. If you want users to be able to view system/process information as well, you
must add them to the [authorized_for_system_information](#authorized_for_system_information) variable.
More information on how to setup authentication and configure authorization for the CGIs can be found [here](cgiauth).

### Configuration Information Access {#authorized_for_configuration_information}

<table>
<tbody>
<tr>
<td>Format:</td>
<td><b>authorized_for_configuration_information=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td>Groups:</td>
<td><b>authorized_contactgroup_for_configuration_information=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">authorized_for_configuration_information=naemonadmin</span>
</td>
</tr>
</tbody>
</table>

This is a comma-delimited list of names of *authenticated users* who can view configuration information in
the [configuration CGI](cgis#config_cgi). Users in this list can view information on all
configured hosts, host groups, services, contacts, contact groups, time periods, and commands. More
information on how to setup authentication and configure authorization for the CGIs can be
found [here](cgiauth).

### Global Host Information Access {#authorized_for_all_hosts}

<table>
<tbody>
<tr>
<td>Format:</td>
<td><b>authorized_for_all_hosts=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td>Groups:</td>
<td><b>authorized_contactgroup_for_all_hosts=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">authorized_for_all_hosts=naemonadmin,theboss</span>
</td>
</tr>
</tbody>
</table>

This is a comma-delimited list of names of *authenticated users* who can view status and
configuration information for all hosts. Users in this list are also automatically
authorized to view information for all services. Users in this list are *not* automatically
authorized to issue commands for all hosts or services. If you want users able to issue
commands for all hosts and services as well, you must add them to
the [authorized_for_all_host_commands](#authorized_for_all_host_commands) variable.
More information on how to setup authentication and configure authorization for the CGIs can be found [here](cgiauth).

### Global Host Command Access {#authorized_for_all_host_commands}

<table>
<tbody>
<tr>
<td>Format:</td>
<td><b>authorized_for_all_host_commands=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td>Groups:</td>
<td><b>authorized_contactgroup_for_all_host_commands=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">authorized_for_all_host_commands=naemonadmin</span>
</td>
</tr>
</tbody>
</table>

This is a comma-delimited list of names of *authenticated users* who can issue commands for all
hosts via the [command CGI](cgis#cmd_cgi). Users in this list are also automatically
authorized to issue commands for all services. Users in this list are *not* automatically authorized
to view status or configuration information for all hosts or services. If you want users able to
view status and configuration information for all hosts and services as well, you must add them
to the [authorized_for_all_hosts](#authorized_for_all_hosts) variable. More information
on how to setup authentication and configure authorization for the CGIs can be found [here](cgiauth).

### Global Service Information Access {#authorized_for_all_services}

<table>
<tbody>
<tr>
<td>Format:</td>
<td><b>authorized_for_all_services=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td>Groups:</td>
<td><b>authorized_contactgroup_for_all_services=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">authorized_for_all_services=naemonadmin,theboss</span>
</td>
</tr>
</tbody>
</table>

This is a comma-delimited list of names of *authenticated users* who can view status and
configuration information for all services. Users in this list are *not* automatically
authorized to view information for all hosts. Users in this list are *not* automatically
authorized to issue commands for all services. If you want users able to issue commands
for all services as well, you must add them to the
[authorized_for_all_service_commands](#authorized_for_all_service_commands) variable.
More information on how to setup authentication and configure authorization for the CGIs
can be found [here](cgiauth).

### Global Service Command Access {#authorized_for_all_service_commands}

<table>
<tbody>
<tr>
<td>Format:</td>
<td><b>authorized_for_all_service_commands=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td>Groups:</td>
<td><b>authorized_contactgroup_for_all_service_commands=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">authorized_for_all_service_commands=naemonadmin</span>
</td>
</tr>
</tbody>
</table>

This is a comma-delimited list of names of *authenticated users* who can issue commands
for all services via the [command CGI](cgis#cmd_cgi). Users in this
list are *not* automatically authorized to issue commands for all hosts. Users in this
list are *not* automatically authorized to view status or configuration information for
all hosts. If you want users able to view status and configuration information for all
services as well, you must add them to the [authorized_for_all_services](#authorized_for_all_services) variable.
More information on how to setup authentication and configure authorization for the CGIs can be found [here](cgiauth).

### Read-Only Users {#authorized_for_read_only}

<table>
<tbody>
<tr>
<td>Format:</td>
<td><b>authorized_for_read_only=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;</b></td>
</tr>
<tr>
<td>Groups:</td>
<td><b>authorized_contactgroup_for_read_only=&lt;group1&gt;,&lt;group2&gt;,&lt;group3&gt;,...&lt;group*n*&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">authorized_for_read_only=john,mark</span>
</td>
</tr>
</tbody>
</table>

A comma-delimited list of usernames that have read-only rights in the CGIs. This will block any
service or host commands normally shown on the extinfo CGI pages. It will also block
comments from being shown to read-only users.

### Lock Author Names {#lock_author_names}

<table>
<tbody>
<tr>
<td>Format:</td>
<td><b>lock_author_names=[0/1]</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">lock_author_names=1</span>
</td>
</tr>
</tbody>
</table>

This option allows you to restrict users from changing the author name when
submitting comments, acknowledgements, and scheduled downtime from the web
interface. If this option is enabled, users will be unable to change the
author name associated with the command request.

* `0` = Allow users to change author names when submitting commands
* `1` = Prevent users from changing author names (default)

### CGI Refresh Rate {#refresh_rate}

<table>
<tbody>
<tr>
<td>Format:</td>
<td><b>refresh_rate=&lt;rate_in_seconds&gt;</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">refresh_rate=90</span>
</td>
</tr>
</tbody>
</table>

This option allows you to specify the number of seconds between page refreshes
for all pages which use automatic refresh. You can also always add `&refresh=<seconds>`
to the url to override the default refresh interval.

### Audio Alerts {#audio_alerts}

<table>
<tbody>
<tr>
<td>Format:</td>
<td>
<b>host_unreachable_sound=&lt;sound_file&gt;</b><br>
<b>host_down_sound=&lt;sound_file&gt;</b><br>
<b>service_critical_sound=&lt;sound_file&gt;</b><br>
<b>service_warning_sound=&lt;sound_file&gt;</b><br>
<b>service_unknown_sound=&lt;sound_file&gt;</b><br>
</td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">host_unreachable_sound=hostu.wav</span><br>
<span class="text-red bold">host_down_sound=hostd.wav</span><br>
<span class="text-red bold">service_critical_sound=critical.wav</span><br>
<span class="text-red bold">service_warning_sound=warning.wav</span><br>
<span class="text-red bold">service_unknown_sound=unknown.wav</span><br>
</td>
</tr>
</tbody>
</table>


These options allow you to specify an audio file that should be played in your
browser if there are problems when you are viewing the
[status CGI](cgis#status_cgi). If there are problems, the audio
file for the most critical type of problem will be played. The most critical type
of problem is on or more unreachable hosts, while the least critical is one or
more services in an unknown state (see the order in the example above). Audio
files are assumed to be in the `media/` subdirectory in your HTML
directory (i.e. `/usr/share/naemon/root/thruk/media`).

### Escape HTML Tags Option {#escape_html_tags}

<table>
<tbody>
<tr>
<td>Format:</td>
<td><b>escape_html_tags=[0/1]</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">escape_html_tags=1</span>
</td>
</tr>
</tbody>
</table>

This option determines whether or not HTML tags in host and service (plugin) output
is escaped in the CGIs. If you enable this option, your plugin output will not be
able to contain clickable hyperlinks.

### Notes URL Target {#notes_url_target}

<table>
<tbody>
<tr>
<td>Format:</td>
<td><b>notes_url_target=[target]</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">notes_url_target=_blank</span>
</td>
</tr>
</tbody>
</table>

This option determines the name of the frame target that notes URLs should be displayed in.
Valid options include `_blank`, `_self`, `_top`, `_parent`, or any other valid target name.

### Action URL Target {#action_url_target}

<table>
<tbody>
<tr>
<td>Format:</td>
<td><b>action_url_target=[target]</b></td>
</tr>
<tr>
<td>Example:</td>
<td>
<span class="text-red bold">action_url_target=_blank</span>
</td>
</tr>
</tbody>
</table>

This option determines the name of the frame target that action URLs should be displayed in.
Valid options include `_blank`, `_self`, `_top`, `_parent`, or any other valid target name.
