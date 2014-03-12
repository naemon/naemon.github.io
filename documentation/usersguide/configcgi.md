---
layout: doctoc
title: CGI Configuration File Options
---



<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="config.html">Configuration Overview</a>, <a href="cgis.html">Information on the CGIs</a>, <a href="cgiauth.html">Authentication And Authorization In The CGIs</a>, <a href="cgiincludes.html">CGI Footers and Headers</a>

### Notes

When creating and/or editing configuration files, keep the following in mind:

* Lines that start with a '#' character are taken to be comments and are not processed
* Variables names must begin at the start of the line - no white space is allowed before the name
* Variable names are case-sensitive

### Sample Configuration

<span class="glyphicon glyphicon-thumbs-up"></span> Tip: A sample CGI configuration file (*/usr/local/nagios/etc/cgi.cfg*) is installed for you when you follow the <a href="quickstart.html">quickstart installation guide</a>.

### Config File Location

By default, Naemon expects the CGI configuration file to be named **cgi.cfg** and located in the config file directory along with the <a href="configmain.html">main config file</a>.  If you need to change the name of the file or its location, you can configure Apache to pass an environment variable named NAGIOS_CGI_CONFIG (which points to the correct location) to the CGIs.  See the Apache documentation for information on how to do this. 

### Configuration File Variables

Below you will find descriptions of each main Naemon configuration file option...

<a name="main_cfg_file"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Main Configuration File Location**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**main_config_file=&lt;file_name&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**main_config_file=/usr/local/nagios/etc/nagios.cfg**</font></td>
</tr>
</table>

This specifies the location of your <a href="configmain.html">main configuration file</a>.  The CGIs need to know where to find this file in order to get information about configuration information, current host and service status, etc.

<a name="physical_html_path"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Physical HTML Path**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**physical_html_path=&lt;path&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**physical_html_path=/usr/local/nagios/share**</font></td>
</tr>
</table>

This is the *physical* path where the HTML files for Naemon are kept on your workstation or server.  Naemon
assumes that the documentation and images files (used by the CGIs) are stored in subdirectories called *docs/* and *images/*, respectively.

<a name="url_html_path"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**URL HTML Path**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**url_html_path=&lt;path&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**url_html_path=/nagios**</font></td>
</tr>
</table>

If, when accessing Naemon via a web browser, you point to an URL like **http://www.myhost.com/nagios**, this value
should be */nagios*.  Basically, its the path portion of the URL that is used to access the Naemon HTML pages.

<a name="use_authentication"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Authentication Usage**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**use_authentication=&lt;0/1&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**use_authentication=1**</font></td>
</tr>
</table>

This option controls whether or not the CGIs will use the authentication and authorization functionality when determining what information and commands users have access to.  I would strongly suggest that you use the authentication functionality for the CGIs.  If you decide not to use authentication, make sure to remove the <a href="cgis.html#cmd_cgi">command CGI</a> to prevent unauthorized users from issuing commands to Naemon.  The CGI will not issue commands to Naemon if authentication is disabled, but I would suggest removing it altogether just to be on the safe side.  More information on how to setup authentication and configure authorization for the CGIs can be found <a href="cgiauth.html">here</a>.

* 0 = Don't use authentication functionality
* 1 = Use authentication and authorization functionality (default)

<a name="default_user_name"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Default User Name**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**default_user_name=&lt;username&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**default_user_name=guest**</font></td>
</tr>
</table>

Setting this variable will define a default username that can access the CGIs.  This allows people within a secure domain (i.e., behind a firewall) to access the CGIs without necessarily having to authenticate to the web server.   You may want to use this to avoid having to use basic authentication if you are not using a secure server, as basic authentication transmits passwords in clear text over the Internet.

**Important:**  Do *not* define a default username unless you are running a secure web server and are sure that everyone who has access to the CGIs has been authenticated in some manner!  If you define this variable, anyone who has not authenticated to the web server will inherit all rights you assign to this user!

<a name="authorized_for_system_information"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**System/Process Information Access**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**authorized_for_system_information=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**authorized_for_system_information=nagiosadmin,theboss**</font></td>
</tr>
</table>

This is a comma-delimited list of names of *authenticated users* who can view system/process information in the <a href="cgis.html#extinfo_cgi">extended information CGI</a>.  Users in this list are *not* automatically authorized to issue system/process commands.  If you want users to be able to issue system/process commands as well, you must add them to the <a href="#authorized_for_system_commands">authorized_for_system_commands</a> variable.  More information on how to setup authentication and configure authorization for the CGIs can be found <a href="cgiauth.html">here</a>.

<a name="authorized_for_system_commands"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**System/Process Command Access**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**authorized_for_system_commands=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**authorized_for_system_commands=nagiosadmin**</font></td>
</tr>
</table>

This is a comma-delimited list of names of *authenticated users* who can issue system/process commands via the <a href="cgis.html#cmd_cgi">command CGI</a>.  Users in this list are *not* automatically authorized to view system/process information.  If you want users to be able to view system/process information as well, you must add them to the <a href="#authorized_for_system_information">authorized_for_system_information</a> variable.  More information on how to setup authentication and configure authorization for the CGIs can be found <a href="cgiauth.html">here</a>.

<a name="authorized_for_configuration_information"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Configuration Information Access**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**authorized_for_configuration_information=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**authorized_for_configuration_information=nagiosadmin**</font></td>
</tr>
</table>

This is a comma-delimited list of names of *authenticated users* who can view configuration information in the <a href="cgis.html#config_cgi">configuration CGI</a>.  Users in this list can view information on all configured hosts, host groups, services, contacts, contact groups, time periods, and commands.  More information on how to setup authentication and configure authorization for the CGIs can be found <a href="cgiauth.html">here</a>.

<a name="authorized_for_all_hosts"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Global Host Information Access**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**authorized_for_all_hosts=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**authorized_for_all_hosts=nagiosadmin,theboss**</font></td>
</tr>
</table>

This is a comma-delimited list of names of *authenticated users* who can view status and configuration information for all hosts.  Users in this list are also automatically authorized to view information for all services.  Users in this list are *not* automatically authorized to issue commands for all hosts or services.  If you want users able to issue commands for all hosts and services as well, you must add them to the <a href="#authorized_for_all_host_commands">authorized_for_all_host_commands</a> variable.  More information on how to setup authentication and configure authorization for the CGIs can be found <a href="cgiauth.html">here</a>.

<a name="authorized_for_all_host_commands"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Global Host Command Access**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**authorized_for_all_host_commands=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**authorized_for_all_host_commands=nagiosadmin**</font></td>
</tr>
</table>

This is a comma-delimited list of names of *authenticated users* who can issue commands for all hosts via the <a href="cgis.html#cmd_cgi">command CGI</a>.  Users in this list are also automatically authorized to issue commands for all services.  Users in this list are *not* automatically authorized to view status or configuration information for all hosts or services.  If you want users able to view status and configuration information for all hosts and services as well, you must add them to the <a href="#authorized_for_all_hosts">authorized_for_all_hosts</a> variable.  More information on how to setup authentication and configure authorization for the CGIs can be found <a href="cgiauth.html">here</a>.

<a name="authorized_for_all_services"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Global Service Information Access**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**authorized_for_all_services=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**authorized_for_all_services=nagiosadmin,theboss**</font></td>
</tr>
</table>

This is a comma-delimited list of names of *authenticated users* who can view status and configuration information for all services.  Users in this list are *not* automatically authorized to view information for all hosts.  Users in this list are *not* automatically authorized to issue commands for all services.  If you want users able to issue commands for all services as well, you must add them to the <a href="#authorized_for_all_service_commands">authorized_for_all_service_commands</a> variable.  More information on how to setup authentication and configure authorization for the CGIs can be found <a href="cgiauth.html">here</a>.

<a name="authorized_for_all_service_commands"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Global Service Command Access**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**authorized_for_all_service_commands=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**authorized_for_all_service_commands=nagiosadmin**</font></td>
</tr>
</table>

This is a comma-delimited list of names of *authenticated users* who can issue commands for all services via the <a href="cgis.html#cmd_cgi">command CGI</a>.  Users in this list are *not* automatically authorized to issue commands for all hosts.  Users in this list are *not* automatically authorized to view status or configuration information for all hosts.  If you want users able to view status and configuration information for all services as well, you must add them to the <a href="#authorized_for_all_services">authorized_for_all_services</a> variable.  More information on how to setup authentication and configure authorization for the CGIs can be found <a href="cgiauth.html">here</a>.

<a name="authorized_for_read_only"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Read-Only Users**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**authorized_for_read_only=&lt;user1&gt;,&lt;user2&gt;,&lt;user3&gt;,...&lt;user*n*&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**authorized_for_read_only=john,mark**</font></td>
</tr>
</table>

A comma-delimited list of usernames that have read-only rights in the CGIs.  This will block any service or host commands normally shown on the extinfo CGI pages.  It will also block comments from being shown to read-only users.

<a name="lock_author_names"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Lock Author Names**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**lock_author_names=[0/1]**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**lock_author_names=1**</font></td>
</tr>
</table>

This option allows you to restrict users from changing the author name when submitting comments, acknowledgements, and scheduled downtime from the web interface.  If this option is enabled, users will be unable to change the author name associated with the command request.

* 0 = Allow users to change author names when submitting commands
* 1 = Prevent users from changing author names (default)

<a name="statusmap_background_image"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Statusmap CGI Background Image**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**statusmap_background_image=&lt;image_file&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**statusmap_background_image=smbackground.gd2**</font></td>
</tr>
</table>

This option allows you to specify an image to be used as a background in the <a href="cgis.html#statusmap_cgi">statusmap CGI</a> if you use the user-supplied coordinates layout method.  The background image is not be available in any other layout methods.  It is assumed that the image resides in the HTML images path (i.e. /usr/local/nagios/share/images). This path is automatically determined by appending "/images" to the path specified by the <a href="#physical_html_path">physical_html_path</a> directive.  Note: The image file can be in GIF, JPEG, PNG, or GD2 format.  However, GD2 format (preferably in uncompressed format) is recommended, as it will reduce the CPU load when the CGI generates the map image.

<a name="color_transparency_index"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Statusmap CGI Color Transparency Indexes**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**
color_transparency_index_r=&lt;0-255&gt;
color_transparency_index_g=&lt;0-255&gt;
color_transparency_index_b=&lt;0-255&gt;
**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**
color_transparency_index_r=255
color_transparency_index_g=255
color_transparency_index_b=255
**</font></td>
</tr>
</table>

<p>
These options set the r,g,b values of the background color used the statusmap CGI,
so normal browsers that can't show real png transparency set the desired color as a background color instead (to make it look pretty).  Defaults to white: (R,G,B) = (255,255,255).

<a name="default_statusmap_layout"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Default Statusmap Layout Method**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**default_statusmap_layout=&lt;layout_number&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**default_statusmap_layout=4**</font></td>
</tr>
</table>

This option allows you to specify the default layout method used by the <a href="cgis.html#statusmap_cgi">statusmap CGI</a>. Valid options are:

<table border=1 cellspacing=0 cellpadding=5 class="Default">
<tr><th>&lt;layout_number&gt; Value</th><th>Layout Method</th></tr>
<tr><td>0</td><td>User-defined coordinates</td></tr>
<tr><td>1</td><td>Depth layers</td></tr>
<tr><td>2</td><td>Collapsed tree</td></tr>
<tr><td>3</td><td>Balanced tree</td></tr>
<tr><td>4</td><td>Circular</td></tr>
<tr><td>5</td><td>Circular (Marked Up)</td></tr>
<tr><td>6</td><td>Circular (Balloon)</td></tr>
</table>

<a name="statuswrl_include"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Statuswrl CGI Include World**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**statuswrl_include=&lt;vrml_file&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**statuswrl_include=myworld.wrl**</font></td>
</tr>
</table>

This option allows you to include your own objects in the generated VRML world.  It is assumed that the file resides in the path specified by the <a href="#physical_html_path">physical_html_path</a> directive.  Note:  This file must be a fully qualified VRML world (i.e. you can view it by itself in a VRML browser).

<a name="default_statuswrl_layout"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Default Statuswrl Layout Method**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**default_statuswrl_layout=&lt;layout_number&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**default_statuswrl_layout=4**</font></td>
</tr>
</table>

This option allows you to specify the default layout method used by the <a href="cgis.html#statuswrl_cgi">statuswrl CGI</a>. Valid options are:

<table border=1 cellspacing=0 cellpadding=5 class="Default">
<tr><th>&lt;layout_number&gt; Value</th><th>Layout Method</th></tr>
<tr><td>0</td><td>User-defined coordinates</td></tr>
<tr><td>2</td><td>Collapsed tree</td></tr>
<tr><td>3</td><td>Balanced tree</td></tr>
<tr><td>4</td><td>Circular</td></tr>
</table>

<a name="refresh_rate"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**CGI Refresh Rate**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**refresh_rate=&lt;rate_in_seconds&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**refresh_rate=90**</font></td>
</tr>
</table>

This option allows you to specify the number of seconds between page refreshes for the <a href="cgis.html#status_cgi">status</a>, <a href="cgis.html#statusmap_cgi">statusmap</a>, and <a href="cgis.html#extinfo_cgi">extinfo</a> CGIs.

<a name="audio_alerts"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Audio Alerts**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Formats:</td>
<td>
**host_unreachable_sound=&lt;sound_file&gt;**
**host_down_sound=&lt;sound_file&gt;**
**service_critical_sound=&lt;sound_file&gt;**
**service_warning_sound=&lt;sound_file&gt;**
**service_unknown_sound=&lt;sound_file&gt;**
</td>
</tr>
<tr>
<td valign=top>Examples:</td>
<td>
<font color="red">**host_unreachable_sound=hostu.wav**</font>
<font color="red">**host_down_sound=hostd.wav**</font>
<font color="red">**service_critical_sound=critical.wav**</font>
<font color="red">**service_warning_sound=warning.wav**</font>
<font color="red">**service_unknown_sound=unknown.wav**</font>
</td>
</tr>
</table>

These options allow you to specify an audio file that should be played in your browser if there are problems when you are viewing the <a href="cgis.html#status_cgi">status CGI</a>.  If there are problems, the audio file for the most critical type of problem will be played.  The most critical type of problem is on or more unreachable hosts, while the least critical is one or more services in an unknown state (see the order in the example above).  Audio files are assumed to be in the **media/** subdirectory in your HTML directory (i.e. */usr/local/nagios/share/media*).

<a name="ping_syntax"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Ping Syntax**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**ping_syntax=&lt;command&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**ping_syntax=/bin/ping -n -U -c 5 $HOSTADDRESS$**</font></td>
</tr>
</table>

This option determines what syntax should be used when attempting to ping a host from the WAP interface (using

the <a href="cgis.html#statuswml_cgi">statuswml CGI</a>.  You must include the full path to the ping binary, along with all required options.  The $HOSTADDRESS$ macro is substituted with the address of the host before the command is executed.

<a name="escape_html_tags"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Escape HTML Tags Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**escape_html_tags=[0/1]**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**escape_html_tags=1**</font></td>
</tr>
</table>

This option determines whether or not HTML tags in host and service (plugin) output is escaped in the CGIs.  If you enable this option, your plugin output will not be able to contain clickable hyperlinks.

<a name="notes_url_target"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Notes URL Target**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**notes_url_target=[target]**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**notes_url_target=_blank**</font></td>
</tr>
</table>

This option determines the name of the frame target that notes URLs should be displayed in.  Valid options include *_blank*, *_self*, *_top*, *_parent*, or any other valid target name.

<a name="action_url_target"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Action URL Target**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**action_url_target=[target]**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**action_url_target=_blank**</font></td>
</tr>
</table>

This option determines the name of the frame target that action URLs should be displayed in.  Valid options include *_blank*, *_self*, *_top*, *_parent*, or any other valid target name.

<a name="enable_splunk_integration"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Splunk Integration Option**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**enable_splunk_integration=[0/1]**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**enable_splunk_integration=1**</font></td>
</tr>
</table>

This option determines whether integration functionality with Splunk is enabled in the web interface.  If enabled, you'll be presented with "Splunk It" links in various places in the CGIs (log file, alert history, host/service detail, etc).  Useful if you're trying to research why a particular problem occurred. For more information on Splunk, visit <a href="http://www.splunk.com/" target="_blank">http://www.splunk.com/</a>.

<a name="splunk_url"></a>
<table border="0" width="100%" class="Default">
<tr>
<td bgcolor="#cbcbcb">**Splunk URL**</td>
</tr>
</table>

<table border="0" class="Default">
<tr>
<td valign=top>Format:</td>
<td>**splunk_url=&lt;path&gt;**</td>
</tr>
<tr>
<td valign=top>Example:</td>
<td><font color="red">**splunk_url=http://127.0.0.1:8000/**</font></td>
</tr>
</table>

This option is used to define the base URL to your Splunk interface.  This URL is used by the CGIs when creating links if the <a href="#enable_splunk_integration">enable_splunk_integration</a> option is enabled.
