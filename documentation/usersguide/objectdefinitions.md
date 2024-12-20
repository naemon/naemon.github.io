---
layout: doctoc
title: Object Definitions
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="configobject.html">Object Configuration Overview</a>,
<a href="objecttricks.html">Object Tricks</a>, <a href="objectinheritance.html">Object Inheritance</a>,
<a href="customobjectvars.html">Custom Object Variables</a>



### Introduction

One of the features of Naemon' object configuration format is that you can create object
definitions that inherit properties from other object definitions.

An explanation of how object inheritance works can be found <a href="objectinheritance.html">here</a>.

It is suggested that you familiarize yourself with object inheritance once you read
over the documentation presented below, as it will make the job of creating and
maintaining object definitions much easier than it otherwise would be.

{{ site.hint }}Also, read up on the <a href="objecttricks.html">object tricks</a> that offer shortcuts
for otherwise tedious configuration tasks.{{ site.end }}



{{ site.note }}When creating and/or editing configuration files, keep the following in mind:

<ol>
<li>Lines that start with a '#' character are taken to be comments and are not processed</li>
<li>Directive names are case-sensitive</li>
<li>Characters that appear after a semicolon (;) (unless escaped by backslash) in configuration lines are treated as comments and are not processed</li>
</ol>
{{ site.end }}



<a name="retention_notes"></a>

### Retention Notes

It is important to point out that several directives in host, service, and contact
definitions may not be picked up by Naemon when you change them in your configuration files.
Object directives that can exhibit this behavior are marked with an
asterisk (<a href="#retention_notes" class="bg-danger">*</a>).
The reason for this behavior is due to the fact that Naemon chooses to honor
values stored in the <a href="configmain.html#state_retention_file">state retention file</a> over
values found in the config files, assuming you have <a href="configmain.html#retain_state_information">state retention</a> enabled
on a program-wide basis <i>and</i> the value of the directive is changed during
runtime with an <a href="configmain.html#check_external_commands">external command</a>.

One way to get around this problem is to disable the retention of non-status information
using the <i>retain_nonstatus_information</i> directive in the host, service, and contact definitions.
Disabling this directive will cause Naemon to take the initial values for these directives from your config files,
rather than from the state retention file when it (re)starts.



### Sample Configuration Files

{{ site.note }}Sample object configuration files are installed in the <i>/etc/naemon/conf.d/</i>
directory when you follow the <a href="quickstart.html">quickstart installation guide</a>.{{ site.end }}



### Object Types

* <a href="#host">Host definitions</a>
* <a href="#hostgroup">Host group definitions</a>
* <a href="#service">Service definitions</a>
* <a href="#servicegroup">Service group definitions</a>
* <a href="#contact">Contact definitions</a>
* <a href="#contactgroup">Contact group definitions</a>
* <a href="#timeperiod">Time period definitions</a>
* <a href="#command">Command definitions</a>
* <a href="#servicedependency">Service dependency definitions</a>
* <a href="#serviceescalation">Service escalation definitions</a>
* <a href="#hostdependency">Host dependency definitions</a>
* <a href="#hostescalation">Host escalation definitions</a>



<a name="host"></a>

#### Host Definition

##### Description

A host definition is used to define a physical server, workstation, device, etc. that resides on your network.

##### Definition Format

{{ site.info }}Directives in red are required, while those in black are optional.{{ site.end }}

<table class="object_definition">
<tr><td colspan="3">define host {</td></tr>
<tr><td></td><td class="text-danger">host_name</td><td class="text-danger"><i>host_name</i></td></tr>
<tr><td></td><td class="text-danger">alias</td><td class="text-danger"><i>alias</i></td></tr>
<tr><td></td><td>display_name</td><td><i>display_name</i></td></tr>
<tr><td></td><td class="text-danger">address</td><td class="text-danger"><i>address</i></td></tr>
<tr><td></td><td>parents</td><td><i>host_names</i></td></tr>
<tr><td></td><td>hourly_value</td><td>#</td></tr>
<tr><td></td><td>hostgroups</td><td><i>hostgroup_names</i></td></tr>
<tr><td></td><td>check_command</td><td><i>command_name</i></td></tr>
<tr><td></td><td>initial_state</td><td>[o,d,u]</td></tr>
<tr><td></td><td class="text-danger">max_check_attempts</td><td class="text-danger">#</td></tr>
<tr><td></td><td>check_interval</td><td>#</td></tr>
<tr><td></td><td>retry_interval</td><td>#</td></tr>
<tr><td></td><td>active_checks_enabled</td><td>[0/1]</td></tr>
<tr><td></td><td>passive_checks_enabled</td><td>[0/1]</td></tr>
<tr><td></td><td class="text-danger">check_period</td><td class="text-danger"><i>timeperiod_name</i></td></tr>
<tr><td></td><td>obsess_over_host|obsess</td><td>[0/1]</td></tr>
<tr><td></td><td>check_freshness</td><td>[0/1]</td></tr>
<tr><td></td><td>freshness_threshold</td><td>#</td></tr>
<tr><td></td><td>event_handler</td><td><i>command_name</i></td></tr>
<tr><td></td><td>event_handler_enabled</td><td>[0/1]</td></tr>
<tr><td></td><td>low_flap_threshold</td><td>#</td></tr>
<tr><td></td><td>high_flap_threshold</td><td>#</td></tr>
<tr><td></td><td>flap_detection_enabled</td><td>[0/1]</td></tr>
<tr><td></td><td>flap_detection_options</td><td>[o,d,u]</td></tr>
<!--<tr><td></td><td>failure_prediction_enabled</td><td>[0/1]</td></tr>//-->
<tr><td></td><td>process_perf_data</td><td>[0/1]</td></tr>
<tr><td></td><td>retain_status_information</td><td>[0/1]</td></tr>
<tr><td></td><td>retain_nonstatus_information</td><td>[0/1]</td></tr>
<tr><td></td><td class="text-danger">contacts</td><td class="text-danger"><i>contacts</i></td></tr>
<tr><td></td><td class="text-danger">contact_groups</td><td class="text-danger"><i>contact_groups</i></td></tr>
<tr><td></td><td class="text-danger">notification_interval</td><td class="text-danger">#</td></tr>
<tr><td></td><td>first_notification_delay</td><td>#</td></tr>
<tr><td></td><td class="text-danger">notification_period</td><td class="text-danger"><i>timeperiod_name</i></td></tr>
<tr><td></td><td>notification_options</td><td>[d,u,r,f,s]</td></tr>
<tr><td></td><td>notifications_enabled</td><td>[0/1]</td></tr>
<tr><td></td><td>stalking_options</td><td>[o,d,u]</td></tr>
<tr><td></td><td>notes</td><td><i>note_string</i></td></tr>
<tr><td></td><td>notes_url</td><td><i>url</i></td></tr>
<tr><td></td><td>action_url</td><td><i>url</i></td></tr>
<tr><td></td><td>icon_image</td><td><i>image_file</i></td></tr>
<tr><td></td><td>icon_image_alt</td><td><i>alt_string</i></td></tr>
<tr><td></td><td>vrml_image</td><td><i>image_file</i></td></tr>
<tr><td></td><td>statusmap_image</td><td><i>image_file</i></td></tr>
<tr><td></td><td>2d_coords</td><td><i>x_coord,y_coord</i></td></tr>
<tr><td></td><td>3d_coords</td><td><i>x_coord,y_coord,z_coord</i></td></tr>
<tr><td colspan="3">}</td></tr>
</table>

##### Example Definition

<pre>
define host{
    host_name                       bogus-router
    alias                           Bogus Router #1
    address                         192.168.1.254
    parents                         server-backbone
    check_command                   check-host-alive
    check_interval                  5
    retry_interval                  1
    max_check_attempts              5
    check_period                    24x7
    process_perf_data               0
    retain_nonstatus_information    0
    contact_groups                  router-admins
    notification_interval           30
    notification_period             24x7
    notification_options            d,u,r
}
</pre>

##### Directive Descriptions

<table>
<tr>
<td valign="top"><strong>host_name</strong>:</td>
<td>
This directive is used to define a short name used to identify the host.

It is used in host group and service definitions to reference this particular host.

Hosts can have multiple services (which are monitored) associated with them.

When used properly, the $HOSTNAME$ <a href="macros.html">macro</a> will contain this short name.
</td>
</tr>
<tr>
<td valign="top"><strong>alias</strong>:</td>
<td>
This directive is used to define a longer name or description used to identify the host.

It is provided in order to allow you to more easily identify a particular host.

When used properly, the $HOSTALIAS$ <a href="macros.html">macro</a> will contain this alias/description.
</td>
</tr>
<tr>
<td valign="top"><strong>address</strong>:</td>
<td>
This directive is used to define the address of the host.

Normally, this is an IP address, although it could really be anything you want (so long as it can be used to check the status of the host).

You can use a FQDN to identify the host instead of an IP address, but if DNS services are not available this could cause problems. When used properly, the $HOSTADDRESS$ <a href="macros.html">macro</a> will contain this address.

{{ site.note }}If you do not specify an address directive in a host definition, the name of the host will be used as its address.{{ site.end }}

A word of caution about doing this, however - if DNS fails, most of your service checks will fail because the plugins will be unable to resolve the host name.
</td>
</tr>
<tr>
<td valign="top"><strong>display_name</strong>:</td>
<td>
This directive is used to define an alternate name that should be displayed in the web interface for this host.

If not specified, this defaults to the value you specify for the <i>host_name</i> directive.
</td>
</tr>
<tr>
<td valign="top"><strong>parents</strong>:</td>
<td>
This directive is used to define a comma-delimited list of short names of the "parent" hosts for this particular host.

Parent hosts are typically routers, switches, firewalls, etc. that lie between the monitoring host and a remote hosts.

A router, switch, etc. which is closest to the remote host is considered to be that host's "parent".

Read the "Determining Status and Reachability of Network Hosts" document located <a href="networkreachability.html">here</a> for more information. If this host is on the same network segment as the host doing the monitoring (without any intermediate routers, etc.) the host is considered to be on the local network and will not have a parent host.

Leave this value blank if the host does not have a parent host (i.e. it is on the same segment as the Naemon host).

 The order in which you specify parent hosts has no effect on how things are monitored.
</td>
</tr>
<tr>
<td valign="top"><strong>hourly_value</strong>:</td>
<td>
This directive is used to represent the value of the host to your organization. The value is currently used when determining whether to send notifications to a contact. If the host's hourly value plus the hourly values of all of the host's services is greater than or equal to the contact's minimum value, the contact will be notified. For example, you could set this value and the minimum value of contacts such that a system administrator would be notified when a development server goes down, but the CIO would only be notified when the company's production ecommerce database server was down. The value could also be used as a sort criteria when generating reports or for calculating a good system administrator's bonus. The hourly value defaults to zero.
</td>
</tr>
<tr>
<td valign="top"><strong>hostgroups</strong>:</td>
<td>
This directive is used to identify the <i>short name(s)</i> of the <a href="#hostgroup">hostgroup(s)</a> that the host belongs to.

Multiple hostgroups should be separated by commas.

This directive may be used as an alternative to (or in addition to) using the <i>members</i> directive in <a href="#hostgroup">hostgroup</a> definitions.
</td>
</tr>
<tr>
<td valign="top"><strong>check_command</strong>:</td>
<td>
This directive is used to specify the <i>short name</i> of the <a href="#command">command</a> that should be used to check if the host is up or down.

Typically, this command would try and ping the host to see if it is "alive".

The command must return a status of OK (0) or Naemon will assume the host is down.

If you leave this argument blank, the host will <i>not</i> be actively checked.

Thus, Naemon will likely always assume the host is up (it may show up as being in a "PENDING" state in the web interface).

This is useful if you are monitoring printers or other devices that are frequently turned off.

The maximum amount of time that the notification command can run is controlled by the <a href="configmain.html#host_check_timeout">host_check_timeout</a> option.
</td>
</tr>
<tr>
<td valign="top"><strong>initial_state</strong>:</td>
<td>
By default Naemon will assume that all hosts are in UP states when it starts.

You can override the initial state for a host by using this directive.

Valid options are: <b>o</b> = UP, <b>d</b> = DOWN, and <b>u</b> = UNREACHABLE.
</td>
</tr>
<tr>
<td valign="top"><strong>max_check_attempts</strong>:</td>
<td>
This directive is used to define the number of times that Naemon will retry the host check command if it returns any state other than an OK state.

Setting this value to 1 will cause Naemon to generate an alert without retrying the host check.

{{ site.note }}If you do not want to check the status of the host, you must still set this to a minimum value of 1.{{ site.end }}

To bypass the host check, just leave the <i>check_command</i> option blank.
</td>
</tr>
<tr>
<td valign="top"><strong>check_interval</strong>:</td>
<td>
This directive is used to define the number of "time units" between regularly scheduled checks of the host.

Unless you've changed the <a href="configmain.html#interval_length">interval_length</a> directive from the default value of 60, this number will mean minutes.

More information on can be found in the <a href="hostchecks.html">host checks</a> documentation.

<strong>normal_check_interval</strong> is an alias for this directive.
</td>
</tr>
<tr>
<td valign="top"><strong>retry_interval</strong>:</td>
<td>
This directive is used to define the number of "time units" to wait before scheduling a re-check of the hosts.

Hosts are rescheduled at the retry interval when they have changed to a non-UP state.

Once the host has been retried <b>max_check_attempts</b> times without a change in its status, it will revert to being scheduled at its "normal" rate as defined by the <b>check_interval</b> value. Unless you've changed the <a href="configmain.html#interval_length">interval_length</a> directive from the default value of 60, this number will mean minutes.

If set to 0, the <b>check_interval</b> is used instead.

More information on can be found in the <a href="hostchecks.html">host checks</a> documentation.

<strong>retry_check_interval</strong> is an alias for this directive.
</td>
</tr>
<tr>
<td valign="top"><strong>active_checks_enabled <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive is used to determine whether or not active checks (either regularly scheduled or on-demand) of this host are enabled. Values: 0 = disable active host checks, 1 = enable active host checks (default).

<strong>checks_enabled</strong> is an alias for this directive.
</td>
</tr>
<tr>
<td valign="top"><strong>passive_checks_enabled <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive is used to determine whether or not passive checks are enabled for this host. Values: 0 = disable passive host checks, 1 = enable passive host checks (default).
</td>
</tr>
<tr>
<td valign="top"><strong>check_period</strong>:</td>
<td>
This directive is used to specify the short name of the <a href="#timeperiod">time period</a> during which active checks of this host can be made.
</td>
</tr>
<tr>
<td valign="top"><strong>obsess_over_host|obsess <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive determines whether or not checks for the host will be "obsessed" over using the <a href="configmain.html#ochp_command">ochp_command</a>.
</td>
</tr>
<tr>
<td valign="top"><strong>check_freshness <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive is used to determine whether or not <a href="freshness.html">freshness checks</a> are enabled for this host. Values: 0 = disable freshness checks, 1 = enable freshness checks (default).
</td>
</tr>
<tr>
<td valign="top"><strong>freshness_threshold</strong>:</td>
<td>
This directive is used to specify the freshness threshold (in seconds) for this host.

If you set this directive to a value of 0, Naemon will determine a freshness threshold to use automatically.
</td>
</tr>
<tr>
<td valign="top"><strong>event_handler</strong>:</td>
<td>
This directive is used to specify the <i>short name</i> of the <a href="#command">command</a> that should be run whenever a change in the state of the host is detected (i.e. whenever it goes down or recovers).

Read the documentation on
<a href="eventhandlers.html">event handlers</a> for a more detailed explanation of how to write scripts for handling events.

The maximum amount of time that the event handler command can run is controlled by the <a href="configmain.html#event_handler_timeout">event_handler_timeout</a> option.
</td>
</tr>
<tr>
<td valign="top"><strong>event_handler_enabled <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive is used to determine whether or not the event handler for this host is enabled. Values: 0 = disable host event handler, 1 = enable host event handler.
</td>
</tr>
<tr>
<td valign="top"><strong>low_flap_threshold</strong>:</td>
<td>
This directive is used to specify the low state change threshold used in flap detection for this host.

More information on flap detection can be found <a href="flapping.html">here</a>.

If you set this directive to a value of 0, the program-wide value specified by the <a href="configmain.html#low_host_flap_threshold">low_host_flap_threshold</a> directive will be used.
</td>
</tr>
<tr>
<td valign="top"><strong>high_flap_threshold</strong>:</td>
<td>
This directive is used to specify the high state change threshold used in flap detection for this host.

More information on flap detection can be found <a href="flapping.html">here</a>.

If you set this directive to a value of 0, the program-wide value specified by the <a href="configmain.html#high_host_flap_threshold">high_host_flap_threshold</a> directive will be used.
</td>
</tr>
<tr>
<td valign="top"><strong>flap_detection_enabled <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive is used to determine whether or not flap detection is enabled for this host.

More information on flap detection can be found <a href="flapping.html">here</a>. Values: 0 = disable host flap detection, 1 = enable host flap detection.
</td>
</tr>
<tr>
<td valign="top"><strong>flap_detection_options</strong>:</td>
<td>
This directive is used to determine what host states the <a href="flapping.html">flap detection logic</a> will use for this host.

Valid options are a combination of one or more of the following: <b>o</b> = UP states, <b>d</b> = DOWN states, <b>u</b> =

UNREACHABLE states.
</td>
</tr>
<!--
<tr>
<td valign="top"><strong>failure_prediction_enabled</strong>:</td>
<td>
This directive is used to determine whether or not failure prediction is enabled for this host.

Values: 0 = disable host failure prediction, 1 = enable host failure prediction.
</td>
</tr>
//-->
<tr>
<td valign="top"><strong>process_perf_data <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive is used to determine whether or not the processing of performance data is enabled for this host.

Values: 0 = disable performance data processing, 1 = enable performance data processing.
</td>
</tr>
<tr>
<td valign="top"><strong>retain_status_information</strong>:</td>
<td>
This directive is used to determine whether or not status-related information about the host is retained across program restarts.

This is only useful if you have enabled state retention using the <a href="configmain.html#retain_state_information">retain_state_information</a> directive.

Value: 0 = disable status information retention, 1 = enable status information retention.
</td>
</tr>
<tr>
<td valign="top"><strong>retain_nonstatus_information</strong>:</td>
<td>
This directive is used to determine whether or not non-status information about the host is retained across program restarts.

This is only useful if you have enabled state retention using the <a href="configmain.html#retain_state_information">retain_state_information</a> directive.

Value: 0 = disable non-status information retention, 1 = enable non-status information retention.
</td>
</tr>
<tr>
<td valign="top"><strong>contacts</strong>:</td>
<td>
This is a list of the <i>short names</i> of the <a href="#contact">contacts</a> that should be notified whenever there are problems (or recoveries) with this host.

Multiple contacts should be separated by commas.

Useful if you want notifications to go to just a few people and don't want to configure <a href="#contactgroup">contact groups</a>.

You must specify at least one contact or contact group in each host definition.
</td>
</tr>
<tr>
<td valign="top"><strong>contact_groups</strong>:</td>
<td>
This is a list of the <i>short names</i> of the <a href="#contactgroup">contact groups</a> that should be notified whenever there are problems (or recoveries) with this host.

Multiple contact groups should be separated by commas.

You must specify at least one contact or contact group in each host definition.
</td>
</tr>
<tr>
<td valign="top"><strong>notification_interval</strong>:</td>
<td>
This directive is used to define the number of "time units" to wait before re-notifying a contact that this service is <i>still</i> down or unreachable.

Unless you've changed the <a href="configmain.html#interval_length">interval_length</a> directive from the default value of 60, this number will mean minutes.

If you set this value to 0, Naemon will <i>not</i> re-notify contacts about problems for this host - only one problem notification will be sent out.
</td>
</tr>
<tr>
<td valign="top"><strong>first_notification_delay</strong>:</td>
<td>
This directive is used to define the number of "time units" to wait before sending out the first problem notification when this host enters a non-UP hard state.

Unless you've changed the <a href="configmain.html#interval_length">interval_length</a> directive from the default value of 60, this number will mean minutes.

If you set this value to 0, Naemon will start sending out notifications immediately.
</td>
</tr>
<tr>
<td valign="top"><strong>notification_period</strong>:</td>
<td>
This directive is used to specify the short name of the <a href="#timeperiod">time period</a> during which notifications of events for this host can be sent out to contacts.

If a host goes down, becomes unreachable, or recoveries during a time which is not covered by the time period, no notifications will be sent out.
</td>
</tr>
<tr>
<td valign="top"><strong>notification_options</strong>:</td>
<td>
This directive is used to determine when notifications for the host should be sent out.

Valid options are a combination of one or more of the following: <b>d</b> = send notifications on a DOWN state, <b>u</b> = send notifications on an UNREACHABLE state, <b>r</b> = send notifications on recoveries (OK state), <b>f</b> = send notifications when the host starts and stops <a href="flapping.html">flapping</a>, and <b>s</b> = send notifications when <a href="downtime.html">scheduled downtime</a> starts and ends.

If you specify <b>n</b> (none) as an option, no host notifications will be sent out.

If you do not specify any notification options, Naemon will assume that you want notifications to be sent out for all possible states.

Example: If you specify <b>d,r</b> in this field, notifications will only be sent out when the host goes DOWN and when it recovers from a DOWN state.
</td>
</tr>
<tr>
<td valign="top"><strong>notifications_enabled <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive is used to determine whether or not notifications for this host are enabled. Values: 0 = disable host notifications, 1 = enable host notifications.
</td>
</tr>
<tr>
<td valign="top"><strong>stalking_options</strong>:</td>
<td>
This directive determines which host states "stalking" is enabled for.

Valid options are a combination of one or more of the following: <b>o</b> = stalk on UP states, <b>d</b> = stalk on DOWN states, and <b>u</b> = stalk on UNREACHABLE states.

More information on state stalking can be found <a href="stalking.html">here</a>.
</td>
</tr>
<tr>
<td valign="top"><strong>notes</strong>:</td>
<td>
This directive is used to define an optional string of notes pertaining to the host.

If you specify a note here, you will see the it in the <a href="cgis.html#extinfo_cgi">extended information</a> CGI (when you are viewing information about the specified host).
</td>
</tr>
<tr>
<td valign="top"><strong>notes_url</strong>:</td>
<td>
This variable is used to define an optional URL that can be used to provide more information about the host.

If you specify an URL, you will see a red folder icon in the CGIs (when you are viewing host information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. <i>/naemon/cgi-bin/</i>).

This can be very useful if you want to make detailed information on the host, emergency contact methods, etc. available to other support staff.
</td>
</tr>
<tr>
<td valign="top"><strong>action_url</strong>:</td>
<td>
This directive is used to define an optional URL that can be used to provide more actions to be performed on the host.

If you specify an URL, you will see a red "splat" icon in the CGIs (when you are viewing host information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. <i>/naemon/cgi-bin/</i>).
</td>
</tr>
<tr>
<td valign="top"><strong>icon_image</strong>:</td>
<td>
This variable is used to define the name of a GIF, PNG, or JPG image that should be associated with this host.

This image will be displayed in the various places in the CGIs.

The image will look best if it is 40x40 pixels in size.

Images for hosts are assumed to be in the <b>logos/</b> subdirectory in your HTML images directory (i.e. <i>/usr/share/naemon/rootimages/logos</i>).
</td>
</tr>
<tr>
<td valign="top"><strong>icon_image_alt</strong>:</td>
<td>
This variable is used to define an optional string that is used in the ALT tag of the image specified by the <i>&lt;icon_image&gt;</i> argument.
</td>
</tr>
<tr>
<td valign="top"><strong>vrml_image</strong>:</td>
<td>
This variable is deprecated and not longer used.
</td>
</tr>
<tr>
<td valign="top"><strong>statusmap_image</strong>:</td>
<td>
This variable is used to define the name of an image that should be associated with this host in the <a href="cgis.html#statusmap_cgi">statusmap</a> CGI.

You can specify a JPEG, PNG, and GIF image if you want, although using a GD2 format image is recommended, as other image formats requires more processing time when the statusmap image is generated.

GD2 images can be created from PNG images by using the <b>pngtogd2</b> utility supplied with Thomas Boutell's <a href="http://www.boutell.com/gd/">gd library</a>.

The GD2 images should be created in <i>uncompressed</i> format in order to minimize CPU load when the statusmap CGI is generating the network map image.

The image will look best if it is 40x40 pixels in size.

You can leave these option blank if you are not using the statusmap CGI.

Images for hosts are assumed to be in the <b>logos/</b> subdirectory in your HTML images directory (i.e. <i>/usr/share/naemon/rootimages/logos</i>).
</td>
</tr>
<tr>
<td valign="top"><strong>2d_coords</strong>:</td>
<td>
This variable is used to define coordinates to use when drawing the host in the <a href="cgis.html#statusmap_cgi">statusmap</a> CGI.

Coordinates should be given in positive integers, as they correspond to physical pixels in the generated image.

The origin for drawing (0,0) is in the upper left hand corner of the image and extends in the positive x direction (to the right) along the top of the image and in the positive y direction (down) along the left hand side of the image.

For reference, the size of the icons drawn is usually about 40x40 pixels (text takes a little extra space).

The coordinates you specify here are for the upper left hand corner of the host icon that is drawn.

The CGI will automatically calculate the maximum dimensions of the image it creates based on the largest x and y coordinates you specify.
</td>
</tr>
<tr>
<td valign="top"><strong>3d_coords</strong>:</td>
<td>
This variable is deprecated and not longer used.
</td>
</tr>
</table>



<a name="hostgroup"></a>

#### Host Group Definition

##### Description

A host group definition is used to group one or more hosts together for simplifying
configuration with <a href="objecttricks.html">object tricks</a> or display purposes in the <a href="cgis.html">CGIs</a>.

##### Definition Format

{{ site.info }}Directives in red are required, while those in black are optional.{{ site.end }}

<table class="object_definition">
<tr><td colspan="3">define hostgroup {</td></tr>
<tr><td></td><td class="text-danger">hostgroup_name</td><td class="text-danger"><i>hostgroup_name</i></td></tr>
<tr><td></td><td class="text-danger">alias</td><td class="text-danger"><i>alias</i></td></tr>
<tr><td></td><td>members</td><td><i>hosts</i></td></tr>
<tr><td></td><td>hostgroup_members</td><td><i>hostgroups</i></td></tr>
<tr><td></td><td>notes</td><td><i>note_string</i></td></tr>
<tr><td></td><td>notes_url</td><td><i>url</i></td></tr>
<tr><td></td><td>action_url</td><td><i>url</i></td></tr>
<tr><td colspan="3">}</td></tr>
</table>

##### Example Definition

<pre>
define hostgroup {
    hostgroup_name      novell-servers
    alias               Novell Servers
    members             netware1,netware2,netware3,netware4
}
</pre>


##### Directive Descriptions

<table>
<tr>
<td valign="top"><strong>hostgroup_name</strong>:</td>
<td>
This directive is used to define a short name used to identify the host group.
</td>
</tr>
<tr>
<td valign="top"><strong>alias</strong>:</td>
<td>
This directive is used to define is a longer name or description used to identify the host group.

It is provided in order to allow you to more easily identify a particular host group.
</td>
</tr>
<tr>
<td valign="top"><strong>members</strong>:</td>
<td>
This is a list of the <i>short names</i> of <a href="#host">hosts</a> that should be included in this group.

 Multiple host names should be separated by commas.

This directive may be used as an alternative to (or in addition to) the <i>hostgroups</i> directive in <a href="#host">host definitions</a>.
</td>
</tr>
<tr>
<td valign="top"><strong>hostgroup_members</strong>:</td>
<td>
This optional directive can be used to include hosts from other "sub" host groups in this host group.

Specify a comma-delimited list of short names of other host groups whose members should be included in this group.
</td>
</tr>
<tr>
<td valign="top"><strong>notes</strong>:</td>
<td>
This directive is used to define an optional string of notes pertaining to the host.

If you specify a note here, you will see the it in the <a href="cgis.html#extinfo_cgi">extended information</a> CGI (when you are viewing information about the specified host).
</td>
</tr>
<tr>
<td valign="top"><strong>notes_url</strong>:</td>
<td>
This variable is used to define an optional URL that can be used to provide more information about the host group.

If you specify an URL, you will see a red folder icon in the CGIs (when you are viewing hostgroup information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. <i>/naemon/cgi-bin/</i>).

This can be very useful if you want to make detailed information on the host group, emergency contact methods, etc. available to other support staff.
</td>
</tr>
<tr>
<td valign="top"><strong>action_url</strong>:</td>
<td>
This directive is used to define an optional URL that can be used to provide more actions to be performed on the host group.

If you specify an URL, you will see a red "splat" icon in the CGIs (when you are viewing hostgroup information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. <i>/naemon/cgi-bin/</i>).
</td>
</tr>
</table>



<a name="service"></a>

#### Service Definition

##### Description

A service definition is used to identify a "service" that runs on a host.

The term "service" is used very loosely.

It can mean an actual service that runs on the host (POP, SMTP, HTTP, etc.) or some other type of metric associated with the host (response to a ping, number of logged in users, free disk space, etc.).

The different arguments to a service definition are outlined below.

##### Definition Format

{{ site.info }}Directives in red are required, while those in black are optional.{{ site.end }}

<table class="object_definition">
<tr><td colspan="3">define service {</td></tr>
<tr><td></td><td class="text-danger">host_name</td><td class="text-danger"><i>host_name</i></td></tr>
<tr><td></td><td>hostgroup_name</td><td><i>hostgroup_name</i></td></tr>
<tr><td></td><td class="text-danger">service_description</td><td class="text-danger"><i>service_description</i></td></tr>
<tr><td></td><td>display_name</td><td><i>display_name</i></td></tr>
<tr><td></td><td>parents</td><td><i>single service_description or list of host_name,service_description</i></td></tr>
<tr><td></td><td>hourly_value</td><td>#</td></tr>
<tr><td></td><td>servicegroups</td><td>servicegroup_names</td></tr>
<tr><td></td><td>is_volatile</td><td>[0/1]</td></tr>
<tr><td></td><td class="text-danger">check_command</td><td class="text-danger"><i>command_name</i></td></tr>
<tr><td></td><td>initial_state</td><td>[o,w,u,c]</td></tr>
<tr><td></td><td class="text-danger">max_check_attempts</td><td class="text-danger">#</td></tr>
<tr><td></td><td class="text-danger">check_interval</td><td class="text-danger">#</td></tr>
<tr><td></td><td class="text-danger">retry_interval</td><td class="text-danger">#</td></tr>
<tr><td></td><td>active_checks_enabled</td><td>[0/1]</td></tr>
<tr><td></td><td>passive_checks_enabled</td><td>[0/1]</td></tr>
<tr><td></td><td class="text-danger">check_period</td><td class="text-danger"><i>timeperiod_name</i></td></tr>
<tr><td></td><td>obsess_over_service|obsess</td><td>[0/1]</td></tr>
<tr><td></td><td>check_freshness</td><td>[0/1]</td></tr>
<tr><td></td><td>freshness_threshold</td><td>#</td></tr>
<tr><td></td><td>event_handler</td><td><i>command_name</i></td></tr>
<tr><td></td><td>event_handler_enabled</td><td>[0/1]</td></tr>
<tr><td></td><td>low_flap_threshold</td><td>#</td></tr>
<tr><td></td><td>high_flap_threshold</td><td>#</td></tr>
<tr><td></td><td>flap_detection_enabled</td><td>[0/1]</td></tr>
<tr><td></td><td>flap_detection_options</td><td>[o,w,c,u]</td></tr>
<!--<tr><td></td><td>failure_prediction_enabled</td><td>[0/1]</td></tr>//-->
<tr><td></td><td>process_perf_data</td><td>[0/1]</td></tr>
<tr><td></td><td>retain_status_information</td><td>[0/1]</td></tr>
<tr><td></td><td>retain_nonstatus_information</td><td>[0/1]</td></tr>
<tr><td></td><td class="text-danger">notification_interval</td><td class="text-danger">#</td></tr>
<tr><td></td><td>first_notification_delay</td><td>#</td></tr>
<tr><td></td><td class="text-danger">notification_period</td><td class="text-danger"><i>timeperiod_name</i></td></tr>
<tr><td></td><td>notification_options</td><td>[w,u,c,r,f,s]</td></tr>
<tr><td></td><td>notifications_enabled</td><td>[0/1]</td></tr>
<tr><td></td><td class="text-danger">contacts</td><td class="text-danger"><i>contacts</i></td></tr>
<tr><td></td><td class="text-danger">contact_groups</td><td class="text-danger"><i>contact_groups</i></td></tr>
<tr><td></td><td>stalking_options</td><td>[o,w,u,c]</td></tr>
<tr><td></td><td>notes</td><td><i>note_string</i></td></tr>
<tr><td></td><td>notes_url</td><td><i>url</i></td></tr>
<tr><td></td><td>action_url</td><td><i>url</i></td></tr>
<tr><td></td><td>icon_image</td><td><i>image_file</i></td></tr>
<tr><td></td><td>icon_image_alt</td><td><i>alt_string</i></td></tr>
<tr><td colspan="3">}</td></tr>
</table>

##### Example Definition

<pre>
define service{
    host_name               linux-server
    service_description     check-disk-sda1
    check_command           check-disk!/dev/sda1
    max_check_attempts      5
    check_interval          5
    retry_interval          3
    check_period            24x7
    notification_interval   30
    notification_period     24x7
    notification_options    w,c,r
    contact_groups          linux-admins
}
</pre>

##### Directive Descriptions

<table>
<tr>
<td valign="top"><strong>host_name</strong>:</td>
<td>
This directive is used to specify the <i>short name(s)</i> of the <a href="#host">host(s)</a> that the service "runs" on or is associated with.

Multiple hosts should be separated by commas.
</td>
</tr>
<tr>
<td valign="top"><strong>hostgroup_name</strong>:</td>
<td>
This directive is used to specify the <i>short name(s)</i> of the <a href="#hostgroup">hostgroup(s)</a> that the service "runs" on or is associated with.

Multiple hostgroups should be separated by commas.

The hostgroup_name may be used instead of, or in addition to, the host_name directive.
</td>
</tr>
<tr>
<td valign="top"><strong>service_description;</strong>:</td>
<td>
This directive is used to define the description of the service, which may contain spaces, dashes, and colons (semicolons, apostrophes, and quotation marks should be avoided).

No two services associated with the same host can have the same description.

Services are uniquely identified with their <i>host_name</i> and <i>service_description</i> directives.
</td>
</tr>
<tr>
<td valign="top"><strong>display_name</strong>:</td>
<td>
This directive is used to define an alternate name that should be displayed in the web interface for this service.

If not specified, this defaults to the value you specify for the <i>service_description</i> directive.
</td>
</tr>
<tr>
<td valign="top"><strong>parents</strong>:</td>
<td>
This directive is used to define a comma-delimited list of short names of the "parent" services for this particular service. Parent services are typically other services that need to be available in order for a check of this service to occur. For example, if a service checks the status of a disk using SSH, the disk check service would have the SSH service as a parent. If the service has no parent services, simply omit the "parents" directive. More complex service dependencies may be specified with service dependency objects.

Valid option is either a single service description from the same host or a comma separated list of <i>host_name,servicedescription</i> tupel.
</td>
</tr>
<tr>
<td valign="top"><strong>hourly_value</strong>:</td>
<td>
This directive is used to represent the value of the service to your organization. The value is currently used when determining whether to send notifications to a contact. If the service's hourly value is greater than or equal to the contact's minimum value, the contact will be notified. For example, you could set this value and the minimum value of contacts such that a system administrator would be notified of a disk full event on a development server, but the CIO would only be notified when the company's production ecommerce database was down. The value could also be used as a sort criteria when generating reports or for calculating a good system administrator's bonus. The hourly value defaults to zero.
</td>
</tr>
<tr>
<td valign="top"><strong>servicegroups</strong>:</td>
<td>
This directive is used to identify the <i>short name(s)</i> of the <a href="#servicegroup">servicegroup(s)</a> that the service belongs to.

Multiple servicegroups should be separated by commas.

This directive may be used as an alternative to using the <i>members</i> directive in <a href="#servicegroup">servicegroup</a> definitions.
</td>
</tr>
<tr>
<td valign="top"><strong>is_volatile</strong>:</td>
<td>
This directive is used to denote whether the service is "volatile".

Services are normally <i>not</i> volatile.

More information on volatile service and how they differ from normal services can be found <a href="volatileservices.html">here</a>.

Value: 0 = service is not volatile, 1 = service is volatile.
</td>
</tr>
<tr>
<td valign="top"><strong>check_command</strong>:</td>
<td>
<p>
This directive is used to specify the <i>short name</i> of the <a href="#command">command</a> that Naemon will run in order to check the status of the service.

The maximum amount of time that the service check command can run is controlled by the <a href="configmain.html#service_check_timeout">service_check_timeout</a> option.</p>
</td>
</tr>
<tr>
<td valign="top"><strong>initial_state</strong>:</td>
<td>
By default Naemon will assume that all services are in OK states when it starts.

You can override the initial state for a service by using this directive.

Valid options are: <b>o</b> = OK, <b>w</b> = WARNING, <b>u</b> = UNKNOWN, and <b>c</b> = CRITICAL.
</td>
</tr>
<tr>
<td valign="top"><strong>max_check_attempts</strong>:</td>
<td>
This directive is used to define the number of times that Naemon will retry the service check command if it returns any state other than an OK state.

Setting this value to 1 will cause Naemon to generate an alert without retrying the service check again.
</td>
</tr>
<tr>
<td valign="top"><strong>check_interval</strong>:</td>
<td>
This directive is used to define the number of "time units" to wait before scheduling the next "regular" check of the service.

"Regular" checks are those that occur when the service is in an OK state or when the service is in a non-OK state, but has already been rechecked <b>max_check_attempts</b> number of times.

Unless you've changed the <a href="configmain.html#interval_length">interval_length</a> directive from the default value of 60, this number will mean minutes.

More information can be found in the <a href="servicechecks.html">service checks</a> documentation.

<strong>normal_check_interval</strong> is an alias for this directive.
</td>
</tr>
<tr>
<td valign="top"><strong>retry_interval</strong>:</td>
<td>
This directive is used to define the number of "time units" to wait before scheduling a re-check of the service.

Services are rescheduled at the retry interval when they have changed to a non-OK state.

Once the service has been retried <b>max_check_attempts</b> times without a change in its status, it will revert to being scheduled at its "normal" rate as defined by the <b>check_interval</b> value. Unless you've changed the <a href="configmain.html#interval_length">interval_length</a> directive from the default value of 60, this number will mean minutes.

If set to 0, the <b>check_interval</b> is used instead.

More information can be found in the <a href="servicechecks.html">service checks</a> documentation.

<strong>retry_check_interval</strong> is an alias for this directive.
</td>
</tr>
<tr>
<td valign="top"><strong>active_checks_enabled <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive is used to determine whether or not active checks of this service are enabled. Values: 0 = disable active service checks, 1 = enable active service checks (default).

<strong>checks_enabled</strong> is an alias for this directive.
</td>
</tr>
<tr>
<td valign="top"><strong>passive_checks_enabled <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive is used to determine whether or not passive checks of this service are enabled. Values: 0 = disable passive service checks, 1 = enable passive service checks (default).
</td>
</tr>
<tr>
<td valign="top"><strong>check_period</strong>:</td>
<td>
This directive is used to specify the short name of the <a href="#timeperiod">time period</a> during which active checks of this service can be made.
</td>
</tr>
<tr>
<td valign="top"><strong>obsess_over_service|obsess <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive determines whether or not checks for the service will be "obsessed" over using the <a href="configmain.html#ocsp_command">ocsp_command</a>.
</td>
</tr>
<tr>
<td valign="top"><strong>check_freshness <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive is used to determine whether or not <a href="freshness.html">freshness checks</a> are enabled for this service. Values: 0 = disable freshness checks, 1 = enable freshness checks (default).
</td>
</tr>
<tr>
<td valign="top"><strong>freshness_threshold</strong>:</td>
<td>
This directive is used to specify the freshness threshold (in seconds) for this service.

If you set this directive to a value of 0, Naemon will determine a freshness threshold to use automatically.
</td>
</tr>
<td valign="top"><strong>event_handler</strong>:</td>
<td>
This directive is used to specify the <i>short name</i> of the <a href="#command">command</a> that should be run whenever a change in the state of the service is detected (i.e. whenever it goes down or recovers).

Read the documentation on
<a href="eventhandlers.html">event handlers</a> for a more detailed explanation of how to write scripts for handling events.

The maximum amount of time that the event handler command can run is controlled by the <a href="configmain.html#event_handler_timeout">event_handler_timeout</a> option.
</td>
<tr>
<td valign="top"><strong>event_handler_enabled <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive is used to determine whether or not the event handler for this service is enabled. Values: 0 = disable service event handler, 1 = enable service event handler.
</td>
</tr>
<tr>
<td valign="top"><strong>low_flap_threshold</strong>:</td>
<td>
This directive is used to specify the low state change threshold used in flap detection for this service.

More information on flap detection can be found <a href="flapping.html">here</a>.

If you set this directive to a value of 0, the program-wide value specified by the <a href="configmain.html#low_service_flap_threshold">low_service_flap_threshold</a> directive will be used.
</td>
</tr>
<tr>
<td valign="top"><strong>high_flap_threshold</strong>:</td>
<td>
This directive is used to specify the high state change threshold used in flap detection for this service.

More information on flap detection can be found <a href="flapping.html">here</a>.

If you set this directive to a value of 0, the program-wide value specified by the <a href="configmain.html#high_service_flap_threshold">high_service_flap_threshold</a> directive will be used.
</td>
</tr>
<tr>
<td valign="top"><strong>flap_detection_enabled <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive is used to determine whether or not flap detection is enabled for this service.

More information on flap detection can be found <a href="flapping.html">here</a>. Values: 0 = disable service flap detection, 1 = enable service flap detection.
</td>
</tr>
<tr>
<td valign="top"><strong>flap_detection_options</strong>:</td>
<td>
This directive is used to determine what service states the <a href="flapping.html">flap detection logic</a> will use for this service.

Valid options are a combination of one or more of the following: <b>o</b> = OK states, <b>w</b> = WARNING states, <b>c</b> = CRITICAL states, <b>u</b> = UNKNOWN states.
</td>
</tr>
<!--
<tr>
<td valign="top"><strong>failure_prediction_enabled</strong>:</td>
<td>
This directive is used to determine whether or not failure prediction is enabled for this service.

Values: 0 = disable service failure prediction, 1 = enable service failure prediction.
</td>
</tr>
//-->
<tr>
<td valign="top"><strong>process_perf_data <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive is used to determine whether or not the processing of performance data is enabled for this service.

Values: 0 = disable performance data processing, 1 = enable performance data processing.
</td>
</tr>
<tr>
<td valign="top"><strong>retain_status_information</strong>:</td>
<td>
This directive is used to determine whether or not status-related information about the service is retained across program restarts.

This is only useful if you have enabled state retention using the <a href="configmain.html#retain_state_information">retain_state_information</a> directive.

Value: 0 = disable status information retention, 1 = enable status information retention.
</td>
</tr>
<tr>
<td valign="top"><strong>retain_nonstatus_information</strong>:</td>
<td>
This directive is used to determine whether or not non-status information about the service is retained across program restarts.

This is only useful if you have enabled state retention using the <a href="configmain.html#retain_state_information">retain_state_information</a> directive.

Value: 0 = disable non-status information retention, 1 = enable non-status information retention.
</td>
</tr>
<tr>
<td valign="top"><strong>notification_interval</strong>:</td>
<td>
This directive is used to define the number of "time units" to wait before re-notifying a contact that this service is <i>still</i> in a non-OK state.

Unless you've changed the <a href="configmain.html#interval_length">interval_length</a> directive from the default value of 60, this number will mean minutes.

If you set this value to 0, Naemon will <i>not</i> re-notify contacts about problems for this service - only one problem notification will be sent out.
</td>
</tr>
<tr>
<td valign="top"><strong>first_notification_delay</strong>:</td>
<td>
This directive is used to define the number of "time units" to wait before sending out the first problem notification when this service enters a non-OK state.

Unless you've changed the <a href="configmain.html#interval_length">interval_length</a> directive from the default value of 60, this number will mean minutes.

If you set this value to 0, Naemon will start sending out notifications immediately.
</td>
</tr>
<tr>
<td valign="top"><strong>notification_period</strong>:</td>
<td>
This directive is used to specify the short name of the <a href="#timeperiod">time period</a> during which notifications of events for this service can be sent out to contacts.

No service notifications will be sent out during times which is not covered by the time period.
</td>
</tr>
<tr>
<td valign="top"><strong>notification_options</strong>:</td>
<td>
This directive is used to determine when notifications for the service should be sent out.

Valid options are a combination of one or more of the following: <b>w</b> = send notifications on a WARNING state, <b>u</b> = send notifications on an UNKNOWN state, <b>c</b> = send notifications on a CRITICAL state, <b>r</b> = send notifications on recoveries (OK state), <b>f</b> = send notifications when the service starts and stops <a href="flapping.html">flapping</a>, and <b>s</b> = send notifications when <a href="downtime.html">scheduled downtime</a> starts and ends.

If you specify <b>n</b> (none) as an option, no service notifications will be sent out.

If you do not specify any notification options, Naemon will assume that you want notifications to be sent out for all possible states.

Example: If you specify <b>w,r</b> in this field, notifications will only be sent out when the service goes into a WARNING state and when it recovers from a WARNING state.
</td>
</tr>
<tr>
<td valign="top"><strong>notifications_enabled <a href="#retention_notes" class="bg-danger">*</a></strong>:</td>
<td>
This directive is used to determine whether or not notifications for this service are enabled. Values: 0 = disable service notifications, 1 = enable service notifications.
</td>
</tr>
<tr>
<td valign="top"><strong>contacts</strong>:</td>
<td>
This is a list of the <i>short names</i> of the <a href="#contact">contacts</a> that should be notified whenever there are problems (or recoveries) with this service.

Multiple contacts should be separated by commas.

Useful if you want notifications to go to just a few people and don't want to configure <a href="#contactgroup">contact groups</a>.

You must specify at least one contact or contact group in each service definition.
</td>
</tr>
<tr>
<td valign="top"><strong>contact_groups</strong>:</td>
<td>
This is a list of the <i>short names</i> of the <a href="#contactgroup">contact groups</a> that should be notified whenever there are problems (or recoveries) with this service.

Multiple contact groups should be separated by commas.

You must specify at least one contact or contact group in each service definition.
</td>
</tr>
<tr>
<td valign="top"><strong>stalking_options</strong>:</td>
<td>
This directive determines which service states "stalking" is enabled for.

Valid options are a combination of one or more of the following: <b>o</b> = stalk on OK states, <b>w</b> = stalk on WARNING states, <b>u</b> = stalk on UNKNOWN states, and <b>c</b> = stalk on CRITICAL states.

More information on state stalking can be found <a href="stalking.html">here</a>.
</td>
</tr>
<tr>
<td valign="top"><strong>notes</strong>:</td>
<td>
This directive is used to define an optional string of notes pertaining to the service.

If you specify a note here, you will see the it in the <a href="cgis.html#extinfo_cgi">extended information</a> CGI (when you are viewing information about the specified service).
</td>
</tr>
<tr>
<td valign="top"><strong>notes_url</strong>:</td>
<td>
This directive is used to define an optional URL that can be used to provide more information about the service.

If you specify an URL, you will see a red folder icon in the CGIs (when you are viewing service information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. <i>/naemon/cgi-bin/</i>).

This can be very useful if you want to make detailed information on the service, emergency contact methods, etc. available to other support staff.
</td>
</tr>
<tr>
<td valign="top"><strong>action_url</strong>:</td>
<td>
This directive is used to define an optional URL that can be used to provide more actions to be performed on the service.

If you specify an URL, you will see a red "splat" icon in the CGIs (when you are viewing service information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. <i>/naemon/cgi-bin/</i>).
</td>
</tr>
<tr>
<td valign="top"><strong>icon_image</strong>:</td>
<td>
This variable is used to define the name of a GIF, PNG, or JPG image that should be associated with this service.

This image will be displayed in the <a href="cgis.html#status_cgi">status</a> and <a href="cgis.html#extinfo_cgi">extended information</a> CGIs.

The image will look best if it is 40x40 pixels in size.

Images for services are assumed to be in the <b>logos/</b> subdirectory in your HTML images directory (i.e. <i>/usr/share/naemon/rootimages/logos</i>).
</td>
</tr>
<tr>
<td valign="top"><strong>icon_image_alt</strong>:</td>
<td>
This variable is used to define an optional string that is used in the ALT tag of the image specified by the <i>&lt;icon_image&gt;</i> argument.

The ALT tag is used in the <a href="cgis.html#status_cgi">status</a>, <a href="cgis.html#extinfo_cgi">extended information</a> and <a href="cgis.html#statusmap_cgi">statusmap</a> CGIs.
</td>
</tr>
</table>

<a name="servicegroup"></a>



#### Service Group Definition

##### Description

A service group definition is used to group one or more services together for simplifying
configuration with <a href="objecttricks.html">object tricks</a> or display purposes in the <a href="cgis.html">CGIs</a>.


##### Definition Format

{{ site.info }}Directives in red are required, while those in black are optional.{{ site.end }}

<table class="object_definition">
<tr><td colspan="3">define servicegroup {</td></tr>
<tr><td></td><td class="text-danger">servicegroup_name</td><td class="text-danger"><i>servicegroup_name</i></td></tr>
<tr><td></td><td class="text-danger">alias</td><td class="text-danger"><i>alias</i></td></tr>
<tr><td></td><td>members</td><td><i>services</i></td></tr>
<tr><td></td><td>servicegroup_members</td><td><i>servicegroups</i></td></tr>
<tr><td></td><td>notes</td><td><i>note_string</i></td></tr>
<tr><td></td><td>notes_url</td><td><i>url</i></td></tr>
<tr><td></td><td>action_url</td><td><i>url</i></td></tr>
<tr><td colspan="3">}</td></tr>
</table>


##### Example Definition

<pre>
define servicegroup{
    servicegroup_name   dbservices
    alias               Database Services
    members             ms1,SQL Server,ms1,SQL Server Agent,ms1,SQL DTC
}
</pre>


##### Directive Descriptions

<table>
<tr>
<td valign="top"><strong>servicegroup_name</strong>:</td>
<td>
This directive is used to define a short name used to identify the service group.
</td>
</tr>
<tr>
<td valign="top"><strong>alias</strong>:</td>
<td>
This directive is used to define is a longer name or description used to identify the service group.

It is provided in order to allow you to more easily identify a particular service group.
</td>
</tr>
<tr>
<td valign="top"><strong>members</strong>:</td>
<td>
<p>
This is a list of the <i>descriptions</i> of <a href="#service">services</a> (and the names of their corresponding hosts) that should be included in this group.

 Host and service names should be separated by commas.

This directive may be used as an alternative to the <i>servicegroups</i> directive in <a href="#service">service definitions</a>.

The format of the member directive is as follows (note that a host name must precede a service name/description):
</p>
<p>
members=&lt;host1&gt;,&lt;service1&gt;,&lt;host2&gt;,&lt;service2&gt;,...,&lt;host<i>n</i>&gt;,&lt;service<i>n</i>&gt;
</p>
</td>
</tr>
<tr>
<td valign="top"><strong>servicegroup_members</strong>:</td>
<td>
This optional directive can be used to include services from other "sub" service groups in this service group.

Specify a comma-delimited list of short names of other service groups whose members should be included in this group.
</td>
</tr>
<tr>
<td valign="top"><strong>notes</strong>:</td>
<td>
This directive is used to define an optional string of notes pertaining to the service group.

If you specify a note here, you will see the it in the <a href="cgis.html#extinfo_cgi">extended information</a> CGI (when you are viewing information about the specified service group).
</td>
</tr>
<tr>
<td valign="top"><strong>notes_url</strong>:</td>
<td>
This directive is used to define an optional URL that can be used to provide more information about the service group.

If you specify an URL, you will see a red folder icon in the CGIs (when you are viewing service group information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. <i>/naemon/cgi-bin/</i>).

This can be very useful if you want to make detailed information on the service group, emergency contact methods, etc. available to other support staff.
</td>
</tr>
<tr>
<td valign="top"><strong>action_url</strong>:</td>
<td>
This directive is used to define an optional URL that can be used to provide more actions to be performed on the service group.

If you specify an URL, you will see a red "splat" icon in the CGIs (when you are viewing service group information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. <i>/naemon/cgi-bin/</i>).
</td>
</tr>
</table>
<a name="contact"></a>



#### Contact Definition

##### Description
A contact definition is used to identify someone who should be contacted in the event of a problem on your network.
The different arguments to a contact definition are described below.

##### Definition Format

{{ site.info }}Directives in red are required, while those in black are optional.{{ site.end }}

<table class="object_definition">
<tr><td colspan="3">define contact {</td></tr>
<tr><td></td><td class="text-danger">contact_name</td><td class="text-danger"><i>contact_name</i></td></tr>
<tr><td></td><td>alias</td><td><i>alias</i></td></tr>
<tr><td></td><td>contactgroups</td><td><i>contactgroup_names</i></td></tr>
<tr><td></td><td>minimum_value</td><td>#</td></tr>
<tr><td></td><td class="text-danger">host_notifications_enabled</td><td class="text-danger">[0/1]</td></tr>
<tr><td></td><td class="text-danger">service_notifications_enabled</td><td class="text-danger">[0/1]</td></tr>
<tr><td></td><td class="text-danger">host_notification_period</td><td class="text-danger"><i>timeperiod_name</i></td></tr>
<tr><td></td><td class="text-danger">service_notification_period</td><td class="text-danger"><i>timeperiod_name</i></td></tr>
<tr><td></td><td class="text-danger">host_notification_options</td><td class="text-danger">[d,u,r,f,s,n]</td></tr>
<tr><td></td><td class="text-danger">service_notification_options</td><td class="text-danger">[w,u,c,r,f,s,n]</td></tr>
<tr><td></td><td class="text-danger">host_notification_commands</td><td class="text-danger"><i>command_name</i></td></tr>
<tr><td></td><td class="text-danger">service_notification_commands</td><td class="text-danger"><i>command_name</i></td></tr>
<tr><td></td><td>email</td><td><i>email_address</i></td></tr>
<tr><td></td><td>pager</td><td><i>pager_number or pager_email_gateway</i></td></tr>
<tr><td></td><td>address<i>x</i></td><td><i>additional_contact_address</i></td></tr>
<tr><td></td><td>can_submit_commands</td><td>[0/1]</td></tr>
<tr><td></td><td>retain_status_information</td><td>[0/1]</td></tr>
<tr><td></td><td>retain_nonstatus_information</td><td>[0/1]</td></tr>
<tr><td colspan="3">}</td></tr>
</table>

##### Example Definition
<pre>
define contact {
    contact_name                        jdoe
    alias                               John Doe
    host_notifications_enabled          1
    service_notifications_enabled       1
    service_notification_period         24x7
    host_notification_period            24x7
    service_notification_options        w,u,c,r
    host_notification_options           d,u,r
    service_notification_commands       notify-by-email
    host_notification_commands          host-notify-by-email
    email                               jdoe@localhost.localdomain
    pager                               555-5555@pagergateway.localhost.localdomain
    address1                            xxxxx.xyyy@icq.com
    address2                            555-555-5555
    can_submit_commands                 1
}
</pre>

##### Directive Descriptions

<table>
<tr>
<td valign="top"><strong>contact_name</strong>:</td>
<td>
This directive is used to define a short name used to identify the contact.

It is referenced in <a href="#contactgroup">contact group</a> definitions.

Under the right circumstances, the $CONTACTNAME$ <a href="macros.html">macro</a> will contain this
value.
</td>
</tr>
<tr>
<td valign="top"><strong>alias</strong>:</td>
<td>
This directive is used to define a longer name or description for the contact.

Under the rights circumstances, the $CONTACTALIAS$ <a href="macros.html">macro</a> will contain this value.

If not specified, the <i>contact_name</i> will be used as the alias.
</td>
</tr>
<tr>
<td valign="top"><strong>contactgroups</strong>:</td>
<td>
This directive is used to identify the <i>short name(s)</i> of the <a href="#contactgroup">contactgroup(s)</a> that the contact belongs to.

Multiple contactgroups should be separated by commas.

This directive may be used as an alternative to (or in addition to) using the <i>members</i> directive in <a href="#contactgroup">contactgroup</a> definitions.
</td>
</tr>
<tr>
<td valign="top"><strong>minimum_value</strong>:</td>
<td>
This directive is used as the value that the host or service hourly value must equal before notification is sent to this contact. The hourly values are intended to represent the value of a host or service to an organization. For example, you could set this value and the hourly value of a host such that a system administrator would be notified when a development server goes down, but the CIO would only be notified when the company's production ecommerce database server was down. The minimum value defaults to zero.
</td>
</tr>
<tr>
<td valign="top"><strong>host_notifications_enabled</strong>:</td>
<td>
This directive is used to determine whether or not the contact will receive notifications about host problems and recoveries.

Values: 0 = don't send notifications, 1 = send notifications.
</td>
</tr>
<tr>
<td valign="top"><strong>service_notifications_enabled</strong>:</td>
<td>
This directive is used to determine whether or not the contact will receive notifications about service problems and recoveries.

Values: 0 = don't send notifications, 1 = send notifications.
</td>
</tr>
<tr>
<td valign="top"><strong>host_notification_period</strong>:</td>
<td>
This directive is used to specify the short name of the <a href="#timeperiod">time period</a> during which the contact can be notified about host problems or recoveries.

You can think of this as an "on call" time for host notifications for the contact.

Read the documentation on <a href="timeperiods.html">time periods</a> for more information on how this works and potential problems that may result from improper use.
</td>
</tr>
<tr>
<td valign="top"><strong>service_notification_period</strong>:</td>
<td>
This directive is used to specify the short name of the <a href="#timeperiod">time period</a> during which the contact can be notified about service problems or recoveries.

You can think of this as an "on call" time for service notifications for the contact.

Read the documentation on <a href="timeperiods.html">time periods</a> for more information on how this works and potential problems that may result from improper use.
</td>
</tr>
<tr>
<td valign="top"><strong>host_notification_commands</strong>:</td>
<td>
This directive is used to define a list of the <i>short names</i> of the <a href="#command">commands</a> used to notify the contact of a <i>host</i> problem or recovery.

Multiple notification commands should be separated by commas.

All
notification commands are executed when the contact needs to be notified.

The maximum amount of time that a notification command can run is controlled by the <a href="configmain.html#notification_timeout">notification_timeout</a> option.
</td>
</tr>
<tr>
<td valign="top"><strong>host_notification_options</strong>:</td>
<td>
This directive is used to define the host states for which notifications can be sent out to this contact.

Valid options are a combination of one or more of the following: <b>d</b> = notify on DOWN host states, <b>u</b> = notify on UNREACHABLE host states, <b>r</b> = notify on host recoveries (UP states), <b>f</b> = notify when the host starts and stops <a href="flapping.html">flapping</a>, and <b>s</b> = send notifications when host or service <a href="downtime.html">scheduled downtime</a> starts and ends.

If you specify <b>n</b> (none) as an option, the contact will not receive any type of host notifications.
</td>
</tr>
<tr>
<td valign="top"><strong>service_notification_options</strong>:</td>
<td>
This directive is used to define the service states for which notifications can be sent out to this contact.

Valid options are a combination of one or more of the following: <b>w</b> = notify on WARNING service states, <b>u</b> = notify on UNKNOWN service states, <b>c</b> = notify on CRITICAL service states, <b>r</b> = notify on service recoveries (OK states), and <b>f</b> = notify when the service starts and stops <a href="flapping.html">flapping</a>.

If you specify <b>n</b> (none) as an option, the contact will not receive any type of service notifications.
</td>
</tr>
<tr>
<td valign="top"><strong>service_notification_commands</strong>:</td>
<td>
This directive is used to define a list of the <i>short names</i> of the <a href="#command">commands</a> used to notify the contact of a <i>service</i> problem or recovery.

Multiple notification commands should be separated by commas.

All
notification commands are executed when the contact needs to be notified.

The maximum amount of time that a notification command can run is controlled by the <a href="configmain.html#notification_timeout">notification_timeout</a> option.
</td>
</tr>
<tr>
<td valign="top"><strong>email</strong>:</td>
<td>
This directive is used to define an email address for the contact.

Depending on how you configure your notification commands, it can be used to send out an alert email to the contact.

Under the right circumstances, the $CONTACTEMAIL$
<a href="macros.html">macro</a> will contain this value.
</td>
</tr>
<tr>
<td valign="top"><strong>pager</strong>:</td>
<td>
This directive is used to define a pager number for the contact.

It can also be an email address to a pager gateway
(i.e. pagejoe@pagenet.com).

Depending on how you configure your notification commands, it can be used to send out an alert page to the contact.

Under the right circumstances, the $CONTACTPAGER$ <a href="macros.html">macro</a> will contain this value.
</td>
</tr>
<tr>
<td valign="top"><strong>address<i>x</i></strong>:</td>
<td>
Address directives are used to define additional "addresses" for the contact.

These addresses can be anything - cell phone numbers, instant messaging addresses, etc.

Depending on how you configure your notification commands, they can be used to send out an alert to the contact.

Up to six addresses can be defined using these directives (<i>address1</i> through <i>address6</i>). The $CONTACTADDRESS<i>x</i>$ <a href="macros.html">macro</a> will contain this value.
</td>
</tr>
<tr>
<td valign="top"><strong>can_submit_commands</strong>:</td>
<td>
This directive is used to determine whether or not the contact can submit <a href="extcommands.html">external commands</a> to Naemon from the CGIs.

Values: 0 = don't allow contact to submit commands, 1 = allow contact to submit commands.
</td>
</tr>
<tr>
<td valign="top"><strong>retain_status_information</strong>:</td>
<td>
This directive is used to determine whether or not status-related information about the contact is retained across program restarts.

This is only useful if you have enabled state retention using the <a href="configmain.html#retain_state_information">retain_state_information</a> directive.

Value: 0 = disable status information retention, 1 = enable status information retention.
</td>
</tr>
<tr>
<td valign="top"><strong>retain_nonstatus_information</strong>:</td>
<td>
This directive is used to determine whether or not non-status information about the contact is retained across program restarts.

This is only useful if you have enabled state retention using the <a href="configmain.html#retain_state_information">retain_state_information</a> directive.

Value: 0 = disable non-status information retention, 1 = enable non-status information retention.
</td>
</tr>
</table>



<a name="contactgroup"></a>

#### Contact Group Definition

##### Description

A contact group definition is used to group one or more <a href="#contact">contacts</a>
together for the purpose of sending out alert/recovery <a href="notifications.html">notifications</a>.

##### Definition Format

{{ site.info }}Directives in red are required, while those in black are optional.{{ site.end }}

<table class="object_definition">
<tr><td colspan="3">define contactgroup {</td></tr>
<tr><td></td><td class="text-danger">contactgroup_name</td><td class="text-danger"><i>contactgroup_name</i></td></tr>
<tr><td></td><td class="text-danger">alias</td><td class="text-danger"><i>alias</i></td></tr>
<tr><td></td><td>members</td><td><i>contacts</i></td></tr>
<tr><td></td><td>contactgroup_members</td><td><i>contactgroups</i></td></tr>
<tr><td colspan="3">}</td></tr>
</table>


##### Example Definition

<pre>
define contactgroup {
    contactgroup_name       novell-admins
    alias                   Novell Administrators
    members                 jdoe,rtobert,tzach
}
</pre>


##### Directive Descriptions

<table>
<tr>
<td valign="top"><strong>contactgroup_name</strong>:</td>
<td>
This directive is a short name used to identify the contact group.
</td>
</tr>
<tr>
<td valign="top"><strong>alias</strong>:</td>
<td>
This directive is used to define a longer name or description used to identify the contact group.
</td>
</tr>
<tr>
<td valign="top"><strong>members</strong>:</td>
<td>
This optional directive is used to define a list of the <i>short names</i> of <a href="#contact">contacts </a> that should be included in this group.

 Multiple contact names should be separated by commas.

This directive may be used as an alternative to (or in addition to) using the <i>contactgroups</i> directive in <a href="#contact">contact</a> definitions.
</td>
</tr>
<tr>
<td valign="top"><strong>contactgroup_members</strong>:</td>
<td>
This optional directive can be used to include contacts from other "sub" contact groups in this contact group.

Specify a comma-delimited list of short names of other contact groups whose members should be included in this group.
</td>
</tr>
</table>



<a name="timeperiod"></a>

#### Time Period Definition

##### Description

A time period is a list of times during various days that are considered to be
"valid" times for notifications and service checks. It consists of time ranges
for each day of the week that "rotate" once the week has come to an end.

Different types of exceptions to the normal weekly time are supported,
including: specific weekdays, days of generic months, days of specific months, and calendar dates.

##### Definition Format

{{ site.info }}Directives in red are required, while those in black are optional.{{ site.end }}

<table class="object_definition">
<tr><td colspan="3">define timeperiod {</td></tr>
<tr><td></td><td class="text-danger">timeperiod_name</td><td class="text-danger"><i>timeperiod_name</i></td></tr>
<tr><td></td><td class="text-danger">alias</td><td class="text-danger"><i>alias</i></td></tr>
<tr><td></td><td>[weekday]</td><td><i>timeranges</i></td></tr>
<tr><td></td><td>[exception]</td><td><i>timeranges</i></td></tr>
<tr><td></td><td>exclude</td><td>[<i>timeperiod1,timeperiod2,...,timeperiodn</i>]</td></tr>
<tr><td colspan="3">}</td></tr>
</table>


##### Example Definitions

<pre>
define timeperiod {
    timeperiod_name                     nonworkhours
    alias                               Non-Work Hours
    sunday                              00:00-24:00                ; Every Sunday of every week
    monday                              00:00-09:00,17:00-24:00    ; Every Monday of every week
    tuesday                             00:00-09:00,17:00-24:00    ; Every Tuesday of every week
    wednesday                           00:00-09:00,17:00-24:00    ; Every Wednesday of every week
    thursday                            00:00-09:00,17:00-24:00    ; Every Thursday of every week
    friday                              00:00-09:00,17:00-24:00    ; Every Friday of every week
    saturday                            00:00-24:00                ; Every Saturday of every week
}

define timeperiod {
    timeperiod_name                     misc-single-days
    alias                               Misc Single Days
    1999-01-28                          00:00-24:00                ; January 28th, 1999
    monday 3                            00:00-24:00                ; 3rd Monday of every month
    day 2                               00:00-24:00                ; 2nd day of every month
    february 10                         00:00-24:00                ; February 10th of every year
    february -1                         00:00-24:00                ; Last day in February of every year
    friday -2                           00:00-24:00                ; 2nd to last Friday of every month
    thursday -1 november                00:00-24:00                ; Last Thursday in November of every year
}

define timeperiod {
    timeperiod_name                     misc-date-ranges
    alias                               Misc Date Ranges
    2007-01-01 - 2008-02-01             00:00-24:00                ; January 1st, 2007 to February 1st, 2008
    monday 3 - thursday 4               00:00-24:00                ; 3rd Monday to 4th Thursday of every month
    day 1 - 15                          00:00-24:00                ; 1st to 15th day of every month
    day 20 - -1                         00:00-24:00                ; 20th to the last day of every month
    july 10 - 15                        00:00-24:00                ; July 10th to July 15th of every year
    april 10 - may 15                   00:00-24:00                ; April 10th to May 15th of every year
    tuesday 1 april - friday 2 may      00:00-24:00                ; 1st Tuesday in April to 2nd Friday in May of every year
}

define timeperiod {
    timeperiod_name                     misc-skip-ranges
    alias                               Misc Skip Ranges
    2007-01-01 - 2008-02-01 / 3         00:00-24:00                ; Every 3 days from January 1st, 2007 to February 1st, 2008
    2008-04-01 / 7                      00:00-24:00                ; Every 7 days from April 1st, 2008 (continuing forever)
    monday 3 - thursday 4 / 2           00:00-24:00                ; Every other day from 3rd Monday to 4th Thursday of every month
    day 1 - 15 / 5                      00:00-24:00                ; Every 5 days from the 1st to the 15th day of every month
    july 10 - 15 / 2                    00:00-24:00                ; Every other day from July 10th to July 15th of every year
    tuesday 1 april - friday 2 may / 6  00:00-24:00                ; Every 6 days from the 1st Tuesday in April to the 2nd Friday in May of every year
}
</pre>

##### Directive Descriptions

<table>
<tr>
<td valign="top"><strong>timeperiod_name</strong>:</td>
<td>
This directives is the short name used to identify the time period.
</td>
</tr>
<tr>
<td valign="top"><strong>alias</strong>:</td>
<td>
This directive is a longer name or description used to identify the time period.
</td>
</tr>
<tr>
<td valign="top"><strong>[<i>weekday</i>]</strong>:</td>
<td>
The weekday directives ("<i>sunday</i>" through "<i>saturday</i>")are comma-delimited lists of time ranges that are "valid" times for a particular day of the week.

Notice that there are seven different days for which you can define time ranges (Sunday through Saturday).

Each time range is in the form of <b>HH:MM-HH:MM</b>, where hours are specified on a 24 hour clock.

For example, <b>00:15-24:00</b> means 12:15am in the morning for this day until 12:00am midnight (a 23 hour, 45 minute total time range).

If you wish to exclude an entire day from the timeperiod, simply do not include it in the timeperiod definition.
</td>
</tr>
<tr>
<td valign="top"><strong>[<i>exception</i>]</strong>:</td>
<td>
<p>
You can specify several different types of exceptions to the standard rotating weekday schedule.

Exceptions can take a number of different forms including single days of a specific or generic month, single weekdays in a month, or single calendar dates.

You can also specify a range of days/dates and even specify skip intervals to obtain functionality described by "every 3 days between these dates".

Rather than list all the possible formats for exception strings, I'll let you look at the example timeperiod definitions above to see what's possible. :-)

Weekdays and different types of exceptions all have different levels of precedence, so its important to understand how they can affect each other.

More information on this can be found in the documentation on <a href="timeperiods.html">timeperiods</a>.
</p>
</td>
</tr>
<tr>
<td valign="top"><strong>exclude</strong>:</td>
<td>
This directive is used to specify the short names of other timeperiod definitions whose time ranges should be excluded from this timeperiod.

Multiple timeperiod names should be separated with a comma.
</td>
</tr>
</table>



<a name="command"></a>

#### Command Definition

##### Description

A command definition is just that.

It defines a command.

Commands that can be defined include service checks, service notifications, service event
handlers, host checks, host notifications, and host event handlers.

Command definitions can contain <a href="macros.html">macros</a>, but you must
make sure that you include only those macros that are "valid" for the circumstances
when the command will be used.

More information on what macros are available and when they are "valid" can be
found <a href="macros.html">here</a>. The different arguments to a command definition are outlined below.



##### Definition Format

{{ site.info }}Directives in red are required, while those in black are optional.{{ site.end }}

<table class="object_definition">
<tr><td colspan="3">define command {</td></tr>
<tr><td></td><td class="text-danger">command_name</td><td class="text-danger"><i>command_name</i></td></tr>
<tr><td></td><td class="text-danger">command_line</td><td class="text-danger"><i>command_line</i></td></tr>
<tr><td colspan="3">}</td></tr>
</table>

##### Example Definition

<pre>
define command {
    command_name        check_pop
    command_line        /usr/lib/naemon/plugins/check_pop -H $HOSTADDRESS$
}
</pre>


##### Directive Descriptions

<table>
<tr>
<td valign="top"><strong>command_name</strong>:</td>
<td>
This directive is the short name used to identify the command.

It is referenced in <a href="#contact">contact</a>, <a href="#host">host</a>, and <a href="#service">service</a> definitions (in notification, check, and event handler directives), among other places.
</td>
</tr>
<tr>
<td valign="top"><strong>command_line</strong>:</td>
<td>
<p>
This directive is used to define what is actually executed by Naemon when the command is used for service or host checks, notifications, or <a href="eventhandlers.html">event handlers</a>. Before the command line is executed, all valid <a href="macros.html">macros</a> are replaced with their respective values.

See the documentation on macros for determining when you can use different macros.

Note that the command line is <i>not</i> surrounded in quotes.

Also, if you want to pass a dollar sign ($) on the command line, you have to escape it with another dollar sign.
</p>
<p><strong>NOTE</strong>: You may not include a <b>semicolon</b> (;) in the <i>command_line</i> directive, because everything after it will be ignored as a config file comment.

It is possible to escape semicolons with a backslash.

You can work around this limitation by setting one of the <a href="macrolist.html#user"><b>$USER$</b></a> macros in your <a
href="configmain.html#resource_file">resource file</a> to a semicolon and then referencing the appropriate $USER$ macro in the <i>command_line</i> directive in place of the semicolon.
</p>
<p>
If you want to pass arguments to commands during runtime, you can use <a href="macrolist.html#arg"><b>$ARGn$</b> macros</a> in the <i>command_line</i> directive of the command definition and then separate individual arguments from the command name (and from each other) using bang (!) characters in the object definition directive (host check command, service event handler command, etc) that references the command.

More information on how arguments in command definitions are processed during runtime can be found in the documentation on <a href="macros.html">macros</a>.
</p>
</td>
</tr>
</table>



<a name="servicedependency"></a>

#### Service Dependency Definition

##### Description

Service dependencies are an advanced feature of Naemon that allow you to suppress
notifications and active checks of services based on the status of one or more other services.

Service dependencies are optional and are mainly targeted at advanced users
who have complicated monitoring setups.

More information on how service dependencies work (read this!) can be
found <a href="dependencies.html">here</a>.


##### Definition Format

{{ site.info }}Directives in red are required, while those in black are optional.
However, you must supply at least one type of criteria for the definition to be of much use.{{ site.end }}

<table class="object_definition">
<tr><td colspan="3">define servicedependency {</td></tr>
<tr><td></td><td class="text-danger">dependent_host_name</td><td class="text-danger"><i>host_name</i></td></tr>
<tr><td></td><td>dependent_hostgroup_name</td><td><i>hostgroup_name</i></td></tr>
<tr><td></td><td>servicegroup_name</td><td><i>servicegroup_name</i></td></tr>
<tr><td></td><td>dependent_servicegroup_name</td><td><i>servicegroup_name</i></td></tr>
<tr><td></td><td class="text-danger">dependent_service_description</td><td class="text-danger"><i>service_description</i></td></tr>
<tr><td></td><td class="text-danger">host_name</td><td class="text-danger"><i>host_name</i></td></tr>
<tr><td></td><td>hostgroup_name</td><td><i>hostgroup_name</i></td></tr>
<tr><td></td><td class="text-danger">service_description</td><td class="text-danger"><i>service_description</i></td></tr>
<tr><td></td><td>inherits_parent</td><td>[0/1]</td></tr>
<tr><td></td><td>execution_failure_criteria</td><td>[o,w,u,c,p,n]</td></tr>
<tr><td></td><td>notification_failure_criteria</td><td>[o,w,u,c,p,n]</td></tr>
<tr><td></td><td>dependency_period</td><td>timeperiod_name</td></tr>
<tr><td colspan="3">}</td></tr>
</table>

##### Example Definition

<pre>
define servicedependency {
    host_name                           WWW1
    service_description                 Apache Web Server
    dependent_host_name                 WWW1
    dependent_service_description       Main Web Site
    execution_failure_criteria          n
    notification_failure_criteria       w,u,c
}
</pre>


##### Directive Descriptions

<table>
<tr>
<td valign="top"><strong>dependent_host_name</strong>:</td>
<td>
This directive is used to identify the <i>short name(s)</i> of the <a href="#host">host(s)</a> that the <i>dependent</i> service "runs" on or is associated with.

Multiple hosts should be separated by commas.

Leaving this directive blank can be used to create <a href="objecttricks.html#same_host_dependency">"same host" dependencies</a>.
</td>
</tr>
<tr>
<td valign="top"><strong>dependent_hostgroup_name</strong>:</td>
<td>
This directive is used to specify the <i>short name(s)</i> of the <a href="#hostgroup">hostgroup(s)</a> that the <i>dependent</i> service "runs" on or is associated with.

Multiple hostgroups should be separated by commas.

The dependent_hostgroup may be used instead of, or in addition to, the dependent_host directive.
</td>
</tr>
<tr>
<td valign="top"><strong>servicegroup_name</strong>:</td>
<td>
This directive is used to specify the short name(s) of the servicegroup(s) that will inherit the dependency. Multiple servicegroups should be separated by commas.
</td>
</tr>
<tr>
<td valign="top"><strong>dependent_servicegroup_name</strong>:</td>
<td>
This directive is used to specify the short name(s) of the servicegroup(s) that the dependent service "runs" on or is associated with. Multiple servicegroups should be separated by commas.
</td>
</tr>
<tr>
<td valign="top"><strong>dependent_service_description</strong>:</td>
<td>
This directive is used to identify the <i>description(s)</i> of the <i>dependent</i> <a href="#service">service(s)</a>. Multiple servics should be separated by commas.
</td>
</tr>
<tr>
<td valign="top"><strong>host_name</strong>:</td>
<td>
This directive is used to identify the <i>short name(s)</i> of the <a href="#host">host(s)</a> that the service <i>that is being depended upon</i> (also referred to as the master service) "runs" on or is associated with.

Multiple hosts should be separated by commas.
</td>
</tr>
<tr>
<td valign="top"><strong>hostgroup_name</strong>:</td>
<td>
This directive is used to identify the <i>short name(s)</i> of the <a href="#host">hostgroup(s)</a> that the service <i>that is being depended upon</i> (also referred to as the master service) "runs" on or is associated with.

Multiple hostgroups should be separated by commas.

The hostgroup_name may be used instead of, or in addition to, the host_name directive.
</td>
</tr>
<tr>
<td valign="top"><strong>service_description</strong>:</td>
<td>
This directive is used to identify the <i>description</i> of the <a href="#service">service</a> <i>that is being depended upon</i> (also referred to as the master service).
</td>
</tr>
<tr>
<td valign="top"><strong>inherits_parent</strong>:</td>
<td>
This directive indicates whether or not the dependency inherits dependencies of the service <i>that is being depended upon</i> (also referred to as the master service).

In other words, if the master service is dependent upon other services and any one of those dependencies fail, this dependency will also fail.
</td>
</tr>
<tr>
<td valign="top"><strong>execution_failure_criteria</strong>:</td>
<td>
This directive is used to specify the criteria that determine when the dependent service should <i>not</i> be actively checked.

If the <i>master</i> service is in one of the failure states we specify, the <i>dependent</i> service will not be actively checked.

Valid options are a combination of one or more of the following (multiple options are separated with commas): <b>o</b> = fail on an OK state, <b>w</b> = fail on a WARNING state, <b>u</b> = fail on an UNKNOWN state, <b>c</b> = fail on a CRITICAL state, and <b>p</b> = fail on a pending state (e.g. the service has not yet been checked).

If you specify <b>n</b> (none) as an option, the execution dependency will never fail and checks of the dependent service will always be actively checked (if other conditions allow for it to be).

Example: If you specify <b>o,c,u</b> in this field, the <i>dependent</i> service will not be actively checked if the <i>master</i> service is in either an OK, a CRITICAL, or an UNKNOWN state.
</td>
</tr>
<tr>
<td valign="top"><strong>notification_failure_criteria</strong>:</td>
<td>
This directive is used to define the criteria that determine when notifications for the dependent service should <i>not</i> be sent out.

If the <i>master</i> service is in one of the failure states we specify, notifications for the <i>dependent</i> service will not be sent to contacts.

Valid options are a combination of one or more of the following: <b>o</b> = fail on an OK state, <b>w</b> = fail on a WARNING state, <b>u</b> = fail on an UNKNOWN state, <b>c</b> = fail on a CRITICAL state, and <b>p</b> = fail on a pending state (e.g. the service has not yet been checked).

If you specify <b>n</b> (none) as an option, the notification dependency will never fail and notifications for the dependent service will always be sent out.

Example: If you specify <b>w</b> in this field, the notifications for the <i>dependent</i> service will not be sent out if the <i>master</i> service is in a WARNING state.
</td>
</tr>
<tr>
<td valign="top"><strong>dependency_period</strong>:</td>
<td>
This directive is used to specify the short name of the <a href="#timeperiod">time period</a> during which this dependency is valid.

If this directive is not specified, the dependency is considered to be valid during all times.
</td>
</tr>
</table>



<a name="serviceescalation"></a>

#### Service Escalation Definition

##### Description

Service escalations are <i>completely optional</i> and are used to escalate notifications for a particular service.

More information on how notification escalations work can be found <a href="escalations.html">here</a>.

##### Definition Format

{{ site.info }}Directives in red are required, while those in black are optional.{{ site.end }}

<table class="object_definition">
<tr><td colspan="3">define serviceescalation {</td></tr>
<tr><td></td><td class="text-danger">host_name</td><td class="text-danger"><i>host_name</i></td></tr>
<tr><td></td><td>hostgroup_name</td><td><i>hostgroup_name</i></td></tr>
<tr><td></td><td class="text-danger">service_description</td><td class="text-danger"><i>service_description</i></td></tr>
<tr><td></td><td class="text-danger">contacts</td><td class="text-danger"><i>contacts</i></td></tr>
<tr><td></td><td class="text-danger">contact_groups</td><td class="text-danger"><i>contactgroup_name</i></td></tr>
<tr><td></td><td class="text-danger">first_notification</td><td class="text-danger">#</td></tr>
<tr><td></td><td class="text-danger">last_notification</td><td class="text-danger">#</td></tr>
<tr><td></td><td class="text-danger">notification_interval</td><td class="text-danger">#</td></tr>
<tr><td></td><td>escalation_period</td><td>timeperiod_name</td></tr>
<tr><td></td><td>escalation_options</td><td>[w,u,c,r]</td></tr>
<tr><td colspan="3">}</td></tr>
</table>

##### Example Definition
<pre>
define serviceescalation {
    host_name               nt-3
    service_description     Processor Load
    first_notification      4
    last_notification       0
    notification_interval   30
    contact_groups          all-nt-admins,themanagers
}
</pre>

##### Directive Descriptions

<table>
<tr>
<td valign="top"><strong>host_name</strong>:</td>
<td>
This directive is used to identify the <i>short name(s)</i> of the <a href="#host">host(s)</a> that the <a href="#service">service</a> escalation should apply to or is associated with.
</td>
</tr>
<tr>
<td valign="top"><strong>hostgroup_name</strong>:</td>
<td>
This directive is used to specify the <i>short name(s)</i> of the <a href="#hostgroup">hostgroup(s)</a> that the service escalation should apply to or is associated with.

Multiple hostgroups should be separated by commas.

The hostgroup_name may be used instead of, or in addition to, the host_name directive.
</td>
</tr>
<tr>
<td valign="top"><strong>service_description</strong>:</td>
<td>
This directive is used to identify the <i>description</i> of the <a href="#service">service</a> the escalation should apply to.
</td>
</tr>
<tr>
<td valign="top"><strong>first_notification</strong>:</td>
<td>
This directive is a number that identifies the <i>first</i> notification for which this escalation is effective.

For instance, if you set this value to 3, this escalation will only be used if the service is in a non-OK state long enough for a third notification to go out.
</td>
</tr>
<tr>
<td valign="top"><strong>last_notification</strong>:</td>
<td>
This directive is a number that identifies the <i>last</i> notification for which this escalation is effective.

For instance, if you set this value to 5, this escalation will not be used if more than five notifications are sent out for the service.

Setting this value to 0 means to keep using this escalation entry forever (no matter how many notifications go out).
</td>
</tr>
<tr>
<td valign="top"><strong>contacts</strong>:</td>
<td>
This is a list of the <i>short names</i> of the <a href="#contact">contacts</a> that should be notified whenever there are problems (or recoveries) with this service.

Multiple contacts should be separated by commas.

Useful if you want notifications to go to just a few people and don't want to configure <a href="#contactgroup">contact groups</a>.

You must specify at least one contact or contact group in each service escalation definition.
</td>
</tr>
<tr>
<td valign="top"><strong>contact_groups</strong>:</td>
<td>
This directive is used to identify the <i>short name</i> of the <a href="#contactgroup">contact group</a> that should be notified when the service notification is escalated.

Multiple contact groups should be separated by commas.

You must specify at least one contact or contact group in each service escalation definition.
</td>
</tr>
<tr>
<td valign="top"><strong>notification_interval</strong>:</td>
<td>
This directive is used to determine the interval at which notifications should be made while this escalation is valid.

If you specify a value of 0 for the interval, Naemon will send the first notification when this escalation definition is valid, but will then prevent any more problem notifications from being sent out for the host.

Notifications are sent out again until the host recovers.

This is useful if you want to stop having notifications sent out after a certain amount of time.

{{ site.note }}If multiple escalation entries for a host overlap for one or more notification ranges, the smallest notification interval from all escalation entries is used.{{ site.end }}
</td>
</tr>
<tr>
<td valign="top"><strong>escalation_period</strong>:</td>
<td>
This directive is used to specify the short name of the <a href="#timeperiod">time period</a> during which this escalation is valid.

If this directive is not specified, the escalation is considered to be valid during all times.
</td>
</tr>
<tr>
<td valign="top"><strong>escalation_options</strong>:</td>
<td>
This directive is used to define the criteria that determine when this service escalation is used.

The escalation is used only if the service is in one of the states specified in this directive.

If this directive is not specified in a service escalation, the escalation is considered to be valid during all service states.

Valid options are a combination of one or more of the following: <b>r</b> = escalate on an OK (recovery) state, <b>w</b> = escalate on a WARNING state, <b>u</b> = escalate on an UNKNOWN state, and <b>c</b> = escalate on a CRITICAL state.

 Example: If you specify <b>w</b> in this field, the escalation will only be used if the service is in a WARNING state.
</td>
</tr>
</table>




<a name="hostdependency"></a>

#### Host Dependency Definition

##### Description

Host dependencies are an advanced feature of Naemon that allow you to suppress
notifications for hosts based on the status of one or more other hosts.

Host dependencies are optional and are mainly targeted at advanced users who
have complicated monitoring setups.

More information on how host dependencies work (read this!) can be found
<a href="dependencies.html">here</a>.


##### Definition Format

{{ site.info }}Directives in red are required, while those in black are optional.{{ site.end }}

<table class="object_definition">
<tr><td colspan="3">define hostdependency {</td></tr>
<tr><td></td><td class="text-danger">dependent_host_name</td><td class="text-danger"><i>host_name</i></td></tr>
<tr><td></td><td>dependent_hostgroup_name</td><td><i>hostgroup_name</i></td></tr>
<tr><td></td><td class="text-danger">host_name</td><td class="text-danger"><i>host_name</i></td></tr>
<tr><td></td><td>hostgroup_name</td><td><i>hostgroup_name</i></td></tr>
<tr><td></td><td>inherits_parent</td><td>[0/1]</td></tr>
<tr><td></td><td>execution_failure_criteria</td><td>[o,d,u,p,n]</td></tr>
<tr><td></td><td>notification_failure_criteria</td><td>[o,d,u,p,n]</td></tr>
<tr><td></td><td>dependency_period</td><td>timeperiod_name</td></tr>
<tr><td colspan="3">}</td></tr>
</table>

##### Example Definition
<pre>
define hostdependency {
    host_name                           WWW1
    dependent_host_name                 DBASE1
    notification_failure_criteria       d,u
}
</pre>

##### Directive Descriptions

<table>
<tr>
<td valign="top"><strong>dependent_host_name</strong>:</td>
<td>
This directive is used to identify the <i>short name(s)</i> of the <i>dependent</i> <a href="#host">host(s)</a>.

Multiple hosts should be separated by commas.
</td>
</tr>
<tr>
<td valign="top"><strong>dependent_hostgroup_name</strong>:</td>
<td>
This directive is used to identify the <i>short name(s)</i> of the <i>dependent</i> <a href="#host">hostgroup(s)</a>.

Multiple hostgroups should be separated by commas.

The dependent_hostgroup_name may be used instead of, or in addition to, the dependent_host_name directive.
</td>
</tr>
<tr>
<td valign="top"><strong>host_name</strong>:</td>
<td>
This directive is used to identify the <i>short name(s)</i> of the <a href="#host">host(s)</a> <i>that is being depended upon</i> (also referred to as the master host).

Multiple hosts should be separated by commas.
</td>
</tr>
<tr>
<td valign="top"><strong>hostgroup_name</strong>:</td>
<td>
This directive is used to identify the <i>short name(s)</i> of the <a href="#host">hostgroup(s)</a> <i>that is being depended upon</i> (also referred to as the master host).

Multiple hostgroups should be separated by commas.

The hostgroup_name may be used instead of, or in addition to, the host_name directive.
</td>
</tr>
<tr>
<td valign="top"><strong>inherits_parent</strong>:</td>
<td>
This directive indicates whether or not the dependency inherits dependencies of the host <i>that is being depended upon</i> (also referred to as the master host).

In other words, if the master host is dependent upon other hosts and any one of those dependencies fail, this dependency will also fail.
</td>
</tr>
<tr>
<td valign="top"><strong>execution_failure_criteria</strong>:</td>
<td>
This directive is used to specify the criteria that determine when the dependent host should <i>not</i> be actively checked.

If the <i>master</i> host is in one of the failure states we specify, the <i>dependent</i> host will not be actively checked.

Valid options are a combination of one or more of the following (multiple options are separated with commas): <b>o</b> = fail on an UP state, <b>d</b> = fail on a DOWN state, <b>u</b> = fail on an UNREACHABLE state, and <b>p</b> = fail on a pending state (e.g. the host has not yet been checked).

If you specify <b>n</b> (none) as an option, the execution dependency will never fail and the dependent host will always be actively checked (if other conditions allow for it to be).

Example: If you specify <b>u,d</b> in this field, the <i>dependent</i> host will not be actively checked if the <i>master</i> host is in either an UNREACHABLE or DOWN state.
</td>
</tr>
<tr>
<td valign="top"><strong>notification_failure_criteria</strong>:</td>
<td>
This directive is used to define the criteria that determine when notifications for the dependent host should <i>not</i> be sent out.

If the <i>master</i> host is in one of the failure states we specify, notifications for the <i>dependent</i> host will not be sent to contacts.

Valid options are a combination of one or more of the following: <b>o</b> = fail on an UP state, <b>d</b> = fail on a DOWN state, <b>u</b> = fail on an UNREACHABLE state, and <b>p</b> = fail on a pending state (e.g. the host has not yet been checked).

If you specify <b>n</b> (none) as an option, the notification dependency will never fail and notifications for the dependent host will always be sent out.

Example: If you specify <b>d</b> in this field, the notifications for the <i>dependent</i> host will not be sent out if the <i>master</i> host is in a DOWN state.
</td>
</tr>
<tr>
<td valign="top"><strong>dependency_period</strong>:</td>
<td>
This directive is used to specify the short name of the <a href="#timeperiod">time period</a> during which this dependency is valid.

If this directive is not specified, the dependency is considered to be valid during all times.
</td>
</tr>
</table>



<a name="hostescalation"></a>

#### Host Escalation Definition

##### Description

Host escalations are <i>completely optional</i> and are used to escalate notifications for a particular host.

More information on how notification escalations work can be found <a href="escalations.html">here</a>.

##### Definition Format

{{ site.info }}Directives in red are required, while those in black are optional.{{ site.end }}

<table class="object_definition">
<tr><td colspan="3">define hostescalation {</td></tr>
<tr><td></td><td class="text-danger">host_name</td><td class="text-danger"><i>host_name</i></td></tr>
<tr><td></td><td>hostgroup_name</td><td><i>hostgroup_name</i></td></tr>
<tr><td></td><td class="text-danger">contacts</td><td class="text-danger"><i>contacts</i></td></tr>
<tr><td></td><td class="text-danger">contact_groups</td><td class="text-danger"><i>contactgroup_name</i></td></tr>
<tr><td></td><td class="text-danger">first_notification</td><td class="text-danger">#</td></tr>
<tr><td></td><td class="text-danger">last_notification</td><td class="text-danger">#</td></tr>
<tr><td></td><td class="text-danger">notification_interval</td><td class="text-danger">#</td></tr>
<tr><td></td><td>escalation_period</td><td>timeperiod_name</td></tr>
<tr><td></td><td>escalation_options</td><td>[d,u,r]</td></tr>
<tr><td colspan="3">}</td></tr>
</table>


##### Example Definition

<pre>
define hostescalation {
    host_name                   router-34
    first_notification          5
    last_notification           8
    notification_interval       60
    contact_groups              all-router-admins
}
</pre>


##### Directive Descriptions

<table>
<tr>
<td valign="top"><strong>host_name</strong>:</td>
<td>
This directive is used to identify the <i>short name</i> of the <a href="#host">host</a> that the escalation should apply to.
</td>
</tr>
<tr>
<td valign="top"><strong>hostgroup_name</strong>:</td>
<td>
This directive is used to identify the <i>short name(s)</i> of the <a href="#hostgroup">hostgroup(s)</a> that the escalation should apply to.

Multiple hostgroups should be separated by commas.

If this is used, the escalation will apply to all hosts that are members of the specified hostgroup(s).
</td>
</tr>
<tr>
<td valign="top"><strong>first_notification</strong>:</td>
<td>
This directive is a number that identifies the <i>first</i> notification for which this escalation is effective.

For instance, if you set this value to 3, this escalation will only be used if the host is down or unreachable long enough for a third notification to go out.
</td>
</tr>
<tr>
<td valign="top"><strong>last_notification</strong>:</td>
<td>
This directive is a number that identifies the <i>last</i> notification for which this escalation is effective.

For instance, if you set this value to 5, this escalation will not be used if more than five notifications are sent out for the host.

Setting this value to 0 means to keep using this escalation entry forever (no matter how many notifications go out).
</td>
</tr>
<tr>
<td valign="top"><strong>contacts</strong>:</td>
<td>
This is a list of the <i>short names</i> of the <a href="#contact">contacts</a> that should be notified whenever there are problems (or recoveries) with this host.

Multiple contacts should be separated by commas.

Useful if you want notifications to go to just a few people and don't want to configure <a href="#contactgroup">contact groups</a>.

You must specify at least one contact or contact group in each host escalation definition.
</td>
</tr>
<tr>
<td valign="top"><strong>contact_groups</strong>:</td>
<td>
This directive is used to identify the <i>short name</i> of the <a href="#contactgroup">contact group</a> that should be notified when the host notification is escalated.

Multiple contact groups should be separated by commas.

You must specify at least one contact or contact group in each host escalation definition.
</td>
</tr>
<tr>
<td valign="top"><strong>notification_interval</strong>:</td>
<td>
This directive is used to determine the interval at which notifications should be made while this escalation is valid.

If you specify a value of 0 for the interval, Naemon will send the first notification when this escalation definition is valid, but will then prevent any more problem notifications from being sent out for the host.

Notifications are sent out again until the host recovers.

This is useful if you want to stop having notifications sent out after a certain amount of time.

{{ site.note }}If multiple escalation entries for a host overlap for one or more notification ranges, the smallest notification interval from all escalation entries is used.{{ site.end }}
</td>
</tr>
<tr>
<td valign="top"><strong>escalation_period</strong>:</td>
<td>
This directive is used to specify the short name of the <a href="#timeperiod">time period</a> during which this escalation is valid.

If this directive is not specified, the escalation is considered to be valid during all times.
</td>
</tr>
<tr>
<td valign="top"><strong>escalation_options</strong>:</td>
<td>
This directive is used to define the criteria that determine when this host escalation is used.

The escalation is used only if the host is in one of the states specified in this directive.

If this directive is not specified in a host escalation, the escalation is considered to be valid during all host states.

Valid options are a combination of one or more of the following: <b>r</b> = escalate on an UP (recovery) state, <b>d</b> = escalate on a DOWN state, and <b>u</b> = escalate on an UNREACHABLE state.

 Example: If you specify <b>d</b> in this field, the escalation will only be used if the host is in a DOWN state.
</td>
</tr>
</table>
