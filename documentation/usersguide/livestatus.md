---
layout: doctoc
title: Livestatus API
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="addons.html">Addons</a>

## Livestatus
Livestatus is one of the standard APIs for Naemon. It can be used to query live
status and configuration information from the Naemon core.
Detail description is available on <a href="http://mathias-kettner.de/checkmk_livestatus.html">mathias-kettner.de</a>.

### Syntax
Detailed description about the query language itself is on <a href="http://mathias-kettner.de/checkmk_livestatus.html">mathias-kettner.de</a>.


### Extended Functionality

In addition, Naemon's Livestatus has been improved by the following features:

#### Sort Support

```
Sort: <column name> <asc/desc>
```

Sorts the result set by the specified column in the given direction. Multiple
Sort lines can be added. First sort line takes precedence.

Example:

```
GET services
Sort: host_name asc
Sort: description desc
```


#### Offset

```
Offset: <number of lines>
```

Lines to skip from the beginning of the result set. Useful for pagination in
combination with Limit header.

Example:

```
GET services
Limit: 100
Offset: 300
```


#### OutputFormat: wrapped_json

An extension to the json output format.
The result set is packed in a json object, with a couple of possible fields:

- columns: an array of column names. (optional)
- data: an array of arrays, describing the result set, in the same syntax common
  json output, without embedded column names.
- total_count: The number of lines in the result set, except the limitation of
  Limit and Offset headers.


Example:

```
GET services
OutputFormat: wrapped_json
```



### Tables

The following tables are available for livestatus queries.

<!--
************************************************
* AUTO GENERATED PAGE - USE ./utils/print_livestatus_tables.pl SCRIPT
************************************************
-->



#### commands

<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'><tr><th data-defaultsort='asc'>Column</th>
    <th data-sort='true'>Type</th>
    <th data-sort='true'>Description</th>
</tr>
<tr><td>id</td><td>int</td><td>Command id</td></tr>
<tr><td>line</td><td>string</td><td>The shell command line</td></tr>
<tr><td>name</td><td>string</td><td>The name of the command</td></tr>
</table>


#### comments

<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'><tr><th data-defaultsort='asc'>Column</th>
    <th data-sort='true'>Type</th>
    <th data-sort='true'>Description</th>
</tr>
<tr><td>_host_</td><td></td><td>All columns from the <a href='#hosts'>hosts table</a> are available via host_ prefix.</td></tr>
<tr><td>_service_</td><td></td><td>All columns from the <a href='#services'>services table</a> are available via service_ prefix.</td></tr>
<tr><td>author</td><td>string</td><td>The contact that entered the comment</td></tr>
<tr><td>comment</td><td>string</td><td>A comment text</td></tr>
<tr><td>entry_time</td><td>time</td><td>The time the entry was made as UNIX timestamp</td></tr>
<tr><td>entry_type</td><td>int</td><td>The type of the comment: 1 is user, 2 is downtime, 3 is flap and 4 is acknowledgement</td></tr>
<tr><td>expire_time</td><td>time</td><td>The time of expiry of this comment as a UNIX timestamp</td></tr>
<tr><td>expires</td><td>int</td><td>Whether this comment expires</td></tr>
<tr><td>id</td><td>int</td><td>The id of the comment</td></tr>
<tr><td>is_service</td><td>int</td><td>0, if this entry is for a host, 1 if it is for a service</td></tr>
<tr><td>persistent</td><td>int</td><td>Whether this comment is persistent (0/1)</td></tr>
<tr><td>source</td><td>int</td><td>The source of the comment (0 is internal and 1 is external)</td></tr>
<tr><td>type</td><td>int</td><td>The type of the comment: 1 is host, 2 is service</td></tr>
</table>


#### contactgroups

<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'><tr><th data-defaultsort='asc'>Column</th>
    <th data-sort='true'>Type</th>
    <th data-sort='true'>Description</th>
</tr>
<tr><td>alias</td><td>string</td><td>The alias of the contactgroup</td></tr>
<tr><td>id</td><td>int</td><td>Contactgroup id</td></tr>
<tr><td>members</td><td>list</td><td>A list of all members of this contactgroup</td></tr>
<tr><td>name</td><td>string</td><td>The name of the contactgroup</td></tr>
</table>


#### contacts

<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'><tr><th data-defaultsort='asc'>Column</th>
    <th data-sort='true'>Type</th>
    <th data-sort='true'>Description</th>
</tr>
<tr><td>address1</td><td>string</td><td>The additional field address1</td></tr>
<tr><td>address2</td><td>string</td><td>The additional field address2</td></tr>
<tr><td>address3</td><td>string</td><td>The additional field address3</td></tr>
<tr><td>address4</td><td>string</td><td>The additional field address4</td></tr>
<tr><td>address5</td><td>string</td><td>The additional field address5</td></tr>
<tr><td>address6</td><td>string</td><td>The additional field address6</td></tr>
<tr><td>alias</td><td>string</td><td>The full name of the contact</td></tr>
<tr><td>can_submit_commands</td><td>int</td><td>Whether the contact is allowed to submit commands (0/1)</td></tr>
<tr><td>custom_variable_names</td><td>list</td><td>A list of all custom variables of the contact</td></tr>
<tr><td>custom_variable_values</td><td>list</td><td>A list of the values of all custom variables of the contact</td></tr>
<tr><td>custom_variables</td><td>dict</td><td>A dictionary of the custom variables</td></tr>
<tr><td>email</td><td>string</td><td>The email address of the contact</td></tr>
<tr><td>host_notification_period</td><td>string</td><td>The time period in which the contact will be notified about host problems</td></tr>
<tr><td>host_notifications_enabled</td><td>int</td><td>Whether the contact will be notified about host problems in general (0/1)</td></tr>
<tr><td>id</td><td>int</td><td>Contact id</td></tr>
<tr><td>in_host_notification_period</td><td>int</td><td>Whether the contact is currently in his/her host notification period (0/1)</td></tr>
<tr><td>in_service_notification_period</td><td>int</td><td>Whether the contact is currently in his/her service notification period (0/1)</td></tr>
<tr><td>modified_attributes</td><td>int</td><td>A bitmask specifying which attributes have been modified</td></tr>
<tr><td>modified_attributes_list</td><td>list</td><td>A list of all modified attributes</td></tr>
<tr><td>name</td><td>string</td><td>The login name of the contact person</td></tr>
<tr><td>pager</td><td>string</td><td>The pager address of the contact</td></tr>
<tr><td>service_notification_period</td><td>string</td><td>The time period in which the contact will be notified about service problems</td></tr>
<tr><td>service_notifications_enabled</td><td>int</td><td>Whether the contact will be notified about service problems in general (0/1)</td></tr>
</table>


#### downtimes

<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'><tr><th data-defaultsort='asc'>Column</th>
    <th data-sort='true'>Type</th>
    <th data-sort='true'>Description</th>
</tr>
<tr><td>_host_</td><td></td><td>All columns from the <a href='#hosts'>hosts table</a> are available via host_ prefix.</td></tr>
<tr><td>_service_</td><td></td><td>All columns from the <a href='#services'>services table</a> are available via service_ prefix.</td></tr>
<tr><td>author</td><td>string</td><td>The contact that scheduled the downtime</td></tr>
<tr><td>comment</td><td>string</td><td>A comment text</td></tr>
<tr><td>duration</td><td>int</td><td>The duration of the downtime in seconds</td></tr>
<tr><td>end_time</td><td>time</td><td>The end time of the downtime as UNIX timestamp</td></tr>
<tr><td>entry_time</td><td>time</td><td>The time the entry was made as UNIX timestamp</td></tr>
<tr><td>fixed</td><td>int</td><td>A 1 if the downtime is fixed, a 0 if it is flexible</td></tr>
<tr><td>id</td><td>int</td><td>The id of the downtime</td></tr>
<tr><td>is_service</td><td>int</td><td>0, if this entry is for a host, 1 if it is for a service</td></tr>
<tr><td>start_time</td><td>time</td><td>The start time of the downtime as UNIX timestamp</td></tr>
<tr><td>triggered_by</td><td>int</td><td>The id of the downtime this downtime was triggered by or 0 if it was not triggered by another downtime</td></tr>
<tr><td>type</td><td>int</td><td>The type of the downtime: 0 if it is active, 1 if it is pending</td></tr>
</table>


#### hostgroups

<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'><tr><th data-defaultsort='asc'>Column</th>
    <th data-sort='true'>Type</th>
    <th data-sort='true'>Description</th>
</tr>
<tr><td>action_url</td><td>string</td><td>An optional URL to custom actions or information about the hostgroup</td></tr>
<tr><td>alias</td><td>string</td><td>An alias of the hostgroup</td></tr>
<tr><td>id</td><td>int</td><td>Hostgroup id</td></tr>
<tr><td>members</td><td>list</td><td>A list of all host names that are members of the hostgroup</td></tr>
<tr><td>members_with_state</td><td>list</td><td>A list of all host names that are members of the hostgroup together with state and has_been_checked</td></tr>
<tr><td>name</td><td>string</td><td>Name of the hostgroup</td></tr>
<tr><td>notes</td><td>string</td><td>Optional notes to the hostgroup</td></tr>
<tr><td>notes_url</td><td>string</td><td>An optional URL with further information about the hostgroup</td></tr>
<tr><td>num_hosts</td><td>int</td><td>The total number of hosts in the group</td></tr>
<tr><td>num_hosts_down</td><td>int</td><td>The number of hosts in the group that are down</td></tr>
<tr><td>num_hosts_pending</td><td>int</td><td>The number of hosts in the group that are pending</td></tr>
<tr><td>num_hosts_unreach</td><td>int</td><td>The number of hosts in the group that are unreachable</td></tr>
<tr><td>num_hosts_up</td><td>int</td><td>The number of hosts in the group that are up</td></tr>
<tr><td>num_services</td><td>int</td><td>The total number of services of hosts in this group</td></tr>
<tr><td>num_services_crit</td><td>int</td><td>The total number of services with the state CRIT of hosts in this group</td></tr>
<tr><td>num_services_hard_crit</td><td>int</td><td>The total number of services with the state CRIT of hosts in this group</td></tr>
<tr><td>num_services_hard_ok</td><td>int</td><td>The total number of services with the state OK of hosts in this group</td></tr>
<tr><td>num_services_hard_unknown</td><td>int</td><td>The total number of services with the state UNKNOWN of hosts in this group</td></tr>
<tr><td>num_services_hard_warn</td><td>int</td><td>The total number of services with the state WARN of hosts in this group</td></tr>
<tr><td>num_services_ok</td><td>int</td><td>The total number of services with the state OK of hosts in this group</td></tr>
<tr><td>num_services_pending</td><td>int</td><td>The total number of services with the state Pending of hosts in this group</td></tr>
<tr><td>num_services_unknown</td><td>int</td><td>The total number of services with the state UNKNOWN of hosts in this group</td></tr>
<tr><td>num_services_warn</td><td>int</td><td>The total number of services with the state WARN of hosts in this group</td></tr>
<tr><td>worst_host_state</td><td>int</td><td>The worst state of all of the groups' hosts (UP <= UNREACHABLE <= DOWN)</td></tr>
<tr><td>worst_service_hard_state</td><td>int</td><td>The worst state of all services that belong to a host of this group (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
<tr><td>worst_service_state</td><td>int</td><td>The worst state of all services that belong to a host of this group (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
</table>


#### hosts

<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'><tr><th data-defaultsort='asc'>Column</th>
    <th data-sort='true'>Type</th>
    <th data-sort='true'>Description</th>
</tr>
<tr><td>accept_passive_checks</td><td>int</td><td>Whether passive host checks are accepted (0/1)</td></tr>
<tr><td>acknowledged</td><td>int</td><td>Whether the current host problem has been acknowledged (0/1)</td></tr>
<tr><td>acknowledgement_type</td><td>int</td><td>Type of acknowledgement (0: none, 1: normal, 2: stick)</td></tr>
<tr><td>action_url</td><td>string</td><td>An optional URL to custom actions or information about this host</td></tr>
<tr><td>action_url_expanded</td><td>string</td><td>The same as action_url, but with the most important macros expanded</td></tr>
<tr><td>active_checks_enabled</td><td>int</td><td>Whether active checks are enabled for the host (0/1)</td></tr>
<tr><td>address</td><td>string</td><td>IP address</td></tr>
<tr><td>alias</td><td>string</td><td>An alias name for the host</td></tr>
<tr><td>check_command</td><td>string</td><td>Naemon command for active host check of this host</td></tr>
<tr><td>check_flapping_recovery_notification</td><td>int</td><td>Whether to check to send a recovery notification when flapping stops (0/1)</td></tr>
<tr><td>check_freshness</td><td>int</td><td>Whether freshness checks are activated (0/1)</td></tr>
<tr><td>check_interval</td><td>float</td><td>Number of basic interval lengths between two scheduled checks of the host</td></tr>
<tr><td>check_options</td><td>int</td><td>The current check option, forced, normal, freshness... (0-2)</td></tr>
<tr><td>check_period</td><td>string</td><td>Time period in which this host will be checked. If empty then the host will always be checked.</td></tr>
<tr><td>check_source</td><td>string</td><td>The source of the check</td></tr>
<tr><td>check_type</td><td>int</td><td>Type of check (0: active, 1: passive)</td></tr>
<tr><td>checks_enabled</td><td>int</td><td>Whether checks of the host are enabled (0/1)</td></tr>
<tr><td>childs</td><td>list</td><td>A list of all direct children of the host</td></tr>
<tr><td>comments</td><td>list</td><td>A list of the ids of all comments of this host</td></tr>
<tr><td>comments_with_info</td><td>list</td><td>A list of all comments of the host with id, author and comment</td></tr>
<tr><td>contact_groups</td><td>list</td><td>A list of all contact groups this host is in</td></tr>
<tr><td>contacts</td><td>list</td><td>A list of all contacts of this host, either direct or via a contact group</td></tr>
<tr><td>current_attempt</td><td>int</td><td>Number of the current check attempts</td></tr>
<tr><td>current_notification_number</td><td>int</td><td>Number of the current notification</td></tr>
<tr><td>custom_variable_names</td><td>list</td><td>A list of the names of all custom variables</td></tr>
<tr><td>custom_variable_values</td><td>list</td><td>A list of the values of the custom variables</td></tr>
<tr><td>custom_variables</td><td>dict</td><td>A dictionary of the custom variables</td></tr>
<tr><td>display_name</td><td>string</td><td>Optional display name of the host</td></tr>
<tr><td>downtimes</td><td>list</td><td>A list of the ids of all scheduled downtimes of this host</td></tr>
<tr><td>downtimes_with_info</td><td>list</td><td>A list of the all scheduled downtimes of the host with id, author and comment</td></tr>
<tr><td>event_handler</td><td>string</td><td>Naemon command used as event handler</td></tr>
<tr><td>event_handler_enabled</td><td>int</td><td>Whether event handling is enabled (0/1)</td></tr>
<tr><td>execution_time</td><td>float</td><td>Time the host check needed for execution</td></tr>
<tr><td>filename</td><td>string</td><td>The value of the custom variable FILENAME</td></tr>
<tr><td>first_notification_delay</td><td>float</td><td>Delay before the first notification</td></tr>
<tr><td>flap_detection_enabled</td><td>int</td><td>Whether flap detection is enabled (0/1)</td></tr>
<tr><td>groups</td><td>list</td><td>A list of all host groups this host is in</td></tr>
<tr><td>hard_state</td><td>int</td><td>The effective hard state of the host (eliminates a problem in hard_state)</td></tr>
<tr><td>has_been_checked</td><td>int</td><td>Whether the host has already been checked (0/1)</td></tr>
<tr><td>high_flap_threshold</td><td>float</td><td>High threshold of flap detection</td></tr>
<tr><td>hourly_value</td><td>int</td><td>Hourly Value</td></tr>
<tr><td>icon_image</td><td>string</td><td>The name of an image file to be used in the web pages</td></tr>
<tr><td>icon_image_alt</td><td>string</td><td>Alternative text for the icon_image</td></tr>
<tr><td>icon_image_expanded</td><td>string</td><td>The same as icon_image, but with the most important macros expanded</td></tr>
<tr><td>id</td><td>int</td><td>Host id</td></tr>
<tr><td>in_check_period</td><td>int</td><td>Whether this host is currently in its check period (0/1)</td></tr>
<tr><td>in_notification_period</td><td>int</td><td>Whether this host is currently in its notification period (0/1)</td></tr>
<tr><td>initial_state</td><td>int</td><td>Initial host state</td></tr>
<tr><td>is_executing</td><td>int</td><td>is there a host check currently running... (0/1)</td></tr>
<tr><td>is_flapping</td><td>int</td><td>Whether the host state is flapping (0/1)</td></tr>
<tr><td>last_check</td><td>time</td><td>Time of the last check (Unix timestamp)</td></tr>
<tr><td>last_hard_state</td><td>int</td><td>Last hard state</td></tr>
<tr><td>last_hard_state_change</td><td>time</td><td>Time of the last hard state change (Unix timestamp)</td></tr>
<tr><td>last_notification</td><td>time</td><td>Time of the last notification (Unix timestamp)</td></tr>
<tr><td>last_state</td><td>int</td><td>State before last state change</td></tr>
<tr><td>last_state_change</td><td>time</td><td>Time of the last state change - soft or hard (Unix timestamp)</td></tr>
<tr><td>last_time_down</td><td>time</td><td>The last time the host was DOWN (Unix timestamp)</td></tr>
<tr><td>last_time_unreachable</td><td>time</td><td>The last time the host was UNREACHABLE (Unix timestamp)</td></tr>
<tr><td>last_time_up</td><td>time</td><td>The last time the host was UP (Unix timestamp)</td></tr>
<tr><td>latency</td><td>float</td><td>Time difference between scheduled check time and actual check time</td></tr>
<tr><td>long_plugin_output</td><td>string</td><td>Complete output from check plugin</td></tr>
<tr><td>low_flap_threshold</td><td>float</td><td>Low threshold of flap detection</td></tr>
<tr><td>max_check_attempts</td><td>int</td><td>Max check attempts for active host checks</td></tr>
<tr><td>modified_attributes</td><td>int</td><td>A bitmask specifying which attributes have been modified</td></tr>
<tr><td>modified_attributes_list</td><td>list</td><td>A list of all modified attributes</td></tr>
<tr><td>name</td><td>string</td><td>Host name</td></tr>
<tr><td>next_check</td><td>time</td><td>Scheduled time for the next check (Unix timestamp)</td></tr>
<tr><td>next_notification</td><td>time</td><td>Time of the next notification (Unix timestamp)</td></tr>
<tr><td>no_more_notifications</td><td>int</td><td>Whether to stop sending notifications (0/1)</td></tr>
<tr><td>notes</td><td>string</td><td>Optional notes for this host</td></tr>
<tr><td>notes_expanded</td><td>string</td><td>The same as notes, but with the most important macros expanded</td></tr>
<tr><td>notes_url</td><td>string</td><td>An optional URL with further information about the host</td></tr>
<tr><td>notes_url_expanded</td><td>string</td><td>Same es notes_url, but with the most important macros expanded</td></tr>
<tr><td>notification_interval</td><td>float</td><td>Interval of periodic notification or 0 if its off</td></tr>
<tr><td>notification_period</td><td>string</td><td>Time period in which problems of this host will be notified. If empty then notification will be always</td></tr>
<tr><td>notifications_enabled</td><td>int</td><td>Whether notifications of the host are enabled (0/1)</td></tr>
<tr><td>num_services</td><td>int</td><td>The total number of services of the host</td></tr>
<tr><td>num_services_crit</td><td>int</td><td>The number of the host's services with the soft state CRIT</td></tr>
<tr><td>num_services_hard_crit</td><td>int</td><td>The number of the host's services with the hard state CRIT</td></tr>
<tr><td>num_services_hard_ok</td><td>int</td><td>The number of the host's services with the hard state OK</td></tr>
<tr><td>num_services_hard_unknown</td><td>int</td><td>The number of the host's services with the hard state UNKNOWN</td></tr>
<tr><td>num_services_hard_warn</td><td>int</td><td>The number of the host's services with the hard state WARN</td></tr>
<tr><td>num_services_ok</td><td>int</td><td>The number of the host's services with the soft state OK</td></tr>
<tr><td>num_services_pending</td><td>int</td><td>The number of the host's services which have not been checked yet (pending)</td></tr>
<tr><td>num_services_unknown</td><td>int</td><td>The number of the host's services with the soft state UNKNOWN</td></tr>
<tr><td>num_services_warn</td><td>int</td><td>The number of the host's services with the soft state WARN</td></tr>
<tr><td>obsess</td><td>int</td><td>The current obsess setting... (0/1)</td></tr>
<tr><td>obsess_over_host</td><td>int</td><td>The current obsess setting... (0/1)</td></tr>
<tr><td>parents</td><td>list</td><td>A list of all direct parents of the host</td></tr>
<tr><td>pending_flex_downtime</td><td>int</td><td>Whether a flex downtime is pending (0/1)</td></tr>
<tr><td>percent_state_change</td><td>float</td><td>Percent state change</td></tr>
<tr><td>perf_data</td><td>string</td><td>Optional performance data of the last host check</td></tr>
<tr><td>plugin_output</td><td>string</td><td>Output of the last host check</td></tr>
<tr><td>pnpgraph_present</td><td>int</td><td>Whether there is a PNP4Nagios graph present for this host (0/1)</td></tr>
<tr><td>process_performance_data</td><td>int</td><td>Whether processing of performance data is enabled (0/1)</td></tr>
<tr><td>retry_interval</td><td>float</td><td>Number of basic interval lengths between checks when retrying after a soft error</td></tr>
<tr><td>scheduled_downtime_depth</td><td>int</td><td>The number of downtimes this host is currently in</td></tr>
<tr><td>services</td><td>list</td><td>A list of all services of the host</td></tr>
<tr><td>services_with_info</td><td>list</td><td>A list of all services including detailed information about each service</td></tr>
<tr><td>services_with_state</td><td>list</td><td>A list of all services of the host together with state and has_been_checked</td></tr>
<tr><td>should_be_scheduled</td><td>int</td><td>Whether Naemon still tries to run checks on this host (0/1)</td></tr>
<tr><td>state</td><td>int</td><td>The current state of the host (0: up, 1: down, 2: unreachable)</td></tr>
<tr><td>state_type</td><td>int</td><td>Type of the current state (0: soft, 1: hard)</td></tr>
<tr><td>statusmap_image</td><td>string</td><td>The name of in image file for the status map</td></tr>
<tr><td>total_services</td><td>int</td><td>The total number of services of the host</td></tr>
<tr><td>worst_service_hard_state</td><td>int</td><td>The worst hard state of all of the host's services (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
<tr><td>worst_service_state</td><td>int</td><td>The worst soft state of all of the host's services (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
<tr><td>x_3d</td><td>float</td><td>3D-Coordinates: X</td></tr>
<tr><td>y_3d</td><td>float</td><td>3D-Coordinates: Y</td></tr>
<tr><td>z_3d</td><td>float</td><td>3D-Coordinates: Z</td></tr>
</table>


#### hostsbygroup

<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'><tr><th data-defaultsort='asc'>Column</th>
    <th data-sort='true'>Type</th>
    <th data-sort='true'>Description</th>
</tr>
<tr><td>accept_passive_checks</td><td>int</td><td>Whether passive host checks are accepted (0/1)</td></tr>
<tr><td>acknowledged</td><td>int</td><td>Whether the current host problem has been acknowledged (0/1)</td></tr>
<tr><td>acknowledgement_type</td><td>int</td><td>Type of acknowledgement (0: none, 1: normal, 2: stick)</td></tr>
<tr><td>action_url</td><td>string</td><td>An optional URL to custom actions or information about this host</td></tr>
<tr><td>action_url_expanded</td><td>string</td><td>The same as action_url, but with the most important macros expanded</td></tr>
<tr><td>active_checks_enabled</td><td>int</td><td>Whether active checks are enabled for the host (0/1)</td></tr>
<tr><td>address</td><td>string</td><td>IP address</td></tr>
<tr><td>alias</td><td>string</td><td>An alias name for the host</td></tr>
<tr><td>check_command</td><td>string</td><td>Naemon command for active host check of this host</td></tr>
<tr><td>check_flapping_recovery_notification</td><td>int</td><td>Whether to check to send a recovery notification when flapping stops (0/1)</td></tr>
<tr><td>check_freshness</td><td>int</td><td>Whether freshness checks are activated (0/1)</td></tr>
<tr><td>check_interval</td><td>float</td><td>Number of basic interval lengths between two scheduled checks of the host</td></tr>
<tr><td>check_options</td><td>int</td><td>The current check option, forced, normal, freshness... (0-2)</td></tr>
<tr><td>check_period</td><td>string</td><td>Time period in which this host will be checked. If empty then the host will always be checked.</td></tr>
<tr><td>check_source</td><td>string</td><td>The source of the check</td></tr>
<tr><td>check_type</td><td>int</td><td>Type of check (0: active, 1: passive)</td></tr>
<tr><td>checks_enabled</td><td>int</td><td>Whether checks of the host are enabled (0/1)</td></tr>
<tr><td>childs</td><td>list</td><td>A list of all direct children of the host</td></tr>
<tr><td>comments</td><td>list</td><td>A list of the ids of all comments of this host</td></tr>
<tr><td>comments_with_info</td><td>list</td><td>A list of all comments of the host with id, author and comment</td></tr>
<tr><td>contact_groups</td><td>list</td><td>A list of all contact groups this host is in</td></tr>
<tr><td>contacts</td><td>list</td><td>A list of all contacts of this host, either direct or via a contact group</td></tr>
<tr><td>current_attempt</td><td>int</td><td>Number of the current check attempts</td></tr>
<tr><td>current_notification_number</td><td>int</td><td>Number of the current notification</td></tr>
<tr><td>custom_variable_names</td><td>list</td><td>A list of the names of all custom variables</td></tr>
<tr><td>custom_variable_values</td><td>list</td><td>A list of the values of the custom variables</td></tr>
<tr><td>custom_variables</td><td>dict</td><td>A dictionary of the custom variables</td></tr>
<tr><td>display_name</td><td>string</td><td>Optional display name of the host</td></tr>
<tr><td>downtimes</td><td>list</td><td>A list of the ids of all scheduled downtimes of this host</td></tr>
<tr><td>downtimes_with_info</td><td>list</td><td>A list of the all scheduled downtimes of the host with id, author and comment</td></tr>
<tr><td>event_handler</td><td>string</td><td>Naemon command used as event handler</td></tr>
<tr><td>event_handler_enabled</td><td>int</td><td>Whether event handling is enabled (0/1)</td></tr>
<tr><td>execution_time</td><td>float</td><td>Time the host check needed for execution</td></tr>
<tr><td>filename</td><td>string</td><td>The value of the custom variable FILENAME</td></tr>
<tr><td>first_notification_delay</td><td>float</td><td>Delay before the first notification</td></tr>
<tr><td>flap_detection_enabled</td><td>int</td><td>Whether flap detection is enabled (0/1)</td></tr>
<tr><td>groups</td><td>list</td><td>A list of all host groups this host is in</td></tr>
<tr><td>hard_state</td><td>int</td><td>The effective hard state of the host (eliminates a problem in hard_state)</td></tr>
<tr><td>has_been_checked</td><td>int</td><td>Whether the host has already been checked (0/1)</td></tr>
<tr><td>high_flap_threshold</td><td>float</td><td>High threshold of flap detection</td></tr>
<tr><td>hostgroup_action_url</td><td>string</td><td>An optional URL to custom actions or information about the hostgroup</td></tr>
<tr><td>hostgroup_alias</td><td>string</td><td>An alias of the hostgroup</td></tr>
<tr><td>hostgroup_id</td><td>int</td><td>Hostgroup id</td></tr>
<tr><td>hostgroup_members</td><td>list</td><td>A list of all host names that are members of the hostgroup</td></tr>
<tr><td>hostgroup_members_with_state</td><td>list</td><td>A list of all host names that are members of the hostgroup together with state and has_been_checked</td></tr>
<tr><td>hostgroup_name</td><td>string</td><td>Name of the hostgroup</td></tr>
<tr><td>hostgroup_notes</td><td>string</td><td>Optional notes to the hostgroup</td></tr>
<tr><td>hostgroup_notes_url</td><td>string</td><td>An optional URL with further information about the hostgroup</td></tr>
<tr><td>hostgroup_num_hosts</td><td>int</td><td>The total number of hosts in the group</td></tr>
<tr><td>hostgroup_num_hosts_down</td><td>int</td><td>The number of hosts in the group that are down</td></tr>
<tr><td>hostgroup_num_hosts_pending</td><td>int</td><td>The number of hosts in the group that are pending</td></tr>
<tr><td>hostgroup_num_hosts_unreach</td><td>int</td><td>The number of hosts in the group that are unreachable</td></tr>
<tr><td>hostgroup_num_hosts_up</td><td>int</td><td>The number of hosts in the group that are up</td></tr>
<tr><td>hostgroup_num_services</td><td>int</td><td>The total number of services of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_crit</td><td>int</td><td>The total number of services with the state CRIT of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_hard_crit</td><td>int</td><td>The total number of services with the state CRIT of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_hard_ok</td><td>int</td><td>The total number of services with the state OK of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_hard_unknown</td><td>int</td><td>The total number of services with the state UNKNOWN of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_hard_warn</td><td>int</td><td>The total number of services with the state WARN of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_ok</td><td>int</td><td>The total number of services with the state OK of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_pending</td><td>int</td><td>The total number of services with the state Pending of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_unknown</td><td>int</td><td>The total number of services with the state UNKNOWN of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_warn</td><td>int</td><td>The total number of services with the state WARN of hosts in this group</td></tr>
<tr><td>hostgroup_worst_host_state</td><td>int</td><td>The worst state of all of the groups' hosts (UP <= UNREACHABLE <= DOWN)</td></tr>
<tr><td>hostgroup_worst_service_hard_state</td><td>int</td><td>The worst state of all services that belong to a host of this group (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
<tr><td>hostgroup_worst_service_state</td><td>int</td><td>The worst state of all services that belong to a host of this group (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
<tr><td>hourly_value</td><td>int</td><td>Hourly Value</td></tr>
<tr><td>icon_image</td><td>string</td><td>The name of an image file to be used in the web pages</td></tr>
<tr><td>icon_image_alt</td><td>string</td><td>Alternative text for the icon_image</td></tr>
<tr><td>icon_image_expanded</td><td>string</td><td>The same as icon_image, but with the most important macros expanded</td></tr>
<tr><td>id</td><td>int</td><td>Host id</td></tr>
<tr><td>in_check_period</td><td>int</td><td>Whether this host is currently in its check period (0/1)</td></tr>
<tr><td>in_notification_period</td><td>int</td><td>Whether this host is currently in its notification period (0/1)</td></tr>
<tr><td>initial_state</td><td>int</td><td>Initial host state</td></tr>
<tr><td>is_executing</td><td>int</td><td>is there a host check currently running... (0/1)</td></tr>
<tr><td>is_flapping</td><td>int</td><td>Whether the host state is flapping (0/1)</td></tr>
<tr><td>last_check</td><td>time</td><td>Time of the last check (Unix timestamp)</td></tr>
<tr><td>last_hard_state</td><td>int</td><td>Last hard state</td></tr>
<tr><td>last_hard_state_change</td><td>time</td><td>Time of the last hard state change (Unix timestamp)</td></tr>
<tr><td>last_notification</td><td>time</td><td>Time of the last notification (Unix timestamp)</td></tr>
<tr><td>last_state</td><td>int</td><td>State before last state change</td></tr>
<tr><td>last_state_change</td><td>time</td><td>Time of the last state change - soft or hard (Unix timestamp)</td></tr>
<tr><td>last_time_down</td><td>time</td><td>The last time the host was DOWN (Unix timestamp)</td></tr>
<tr><td>last_time_unreachable</td><td>time</td><td>The last time the host was UNREACHABLE (Unix timestamp)</td></tr>
<tr><td>last_time_up</td><td>time</td><td>The last time the host was UP (Unix timestamp)</td></tr>
<tr><td>latency</td><td>float</td><td>Time difference between scheduled check time and actual check time</td></tr>
<tr><td>long_plugin_output</td><td>string</td><td>Complete output from check plugin</td></tr>
<tr><td>low_flap_threshold</td><td>float</td><td>Low threshold of flap detection</td></tr>
<tr><td>max_check_attempts</td><td>int</td><td>Max check attempts for active host checks</td></tr>
<tr><td>modified_attributes</td><td>int</td><td>A bitmask specifying which attributes have been modified</td></tr>
<tr><td>modified_attributes_list</td><td>list</td><td>A list of all modified attributes</td></tr>
<tr><td>name</td><td>string</td><td>Host name</td></tr>
<tr><td>next_check</td><td>time</td><td>Scheduled time for the next check (Unix timestamp)</td></tr>
<tr><td>next_notification</td><td>time</td><td>Time of the next notification (Unix timestamp)</td></tr>
<tr><td>no_more_notifications</td><td>int</td><td>Whether to stop sending notifications (0/1)</td></tr>
<tr><td>notes</td><td>string</td><td>Optional notes for this host</td></tr>
<tr><td>notes_expanded</td><td>string</td><td>The same as notes, but with the most important macros expanded</td></tr>
<tr><td>notes_url</td><td>string</td><td>An optional URL with further information about the host</td></tr>
<tr><td>notes_url_expanded</td><td>string</td><td>Same es notes_url, but with the most important macros expanded</td></tr>
<tr><td>notification_interval</td><td>float</td><td>Interval of periodic notification or 0 if its off</td></tr>
<tr><td>notification_period</td><td>string</td><td>Time period in which problems of this host will be notified. If empty then notification will be always</td></tr>
<tr><td>notifications_enabled</td><td>int</td><td>Whether notifications of the host are enabled (0/1)</td></tr>
<tr><td>num_services</td><td>int</td><td>The total number of services of the host</td></tr>
<tr><td>num_services_crit</td><td>int</td><td>The number of the host's services with the soft state CRIT</td></tr>
<tr><td>num_services_hard_crit</td><td>int</td><td>The number of the host's services with the hard state CRIT</td></tr>
<tr><td>num_services_hard_ok</td><td>int</td><td>The number of the host's services with the hard state OK</td></tr>
<tr><td>num_services_hard_unknown</td><td>int</td><td>The number of the host's services with the hard state UNKNOWN</td></tr>
<tr><td>num_services_hard_warn</td><td>int</td><td>The number of the host's services with the hard state WARN</td></tr>
<tr><td>num_services_ok</td><td>int</td><td>The number of the host's services with the soft state OK</td></tr>
<tr><td>num_services_pending</td><td>int</td><td>The number of the host's services which have not been checked yet (pending)</td></tr>
<tr><td>num_services_unknown</td><td>int</td><td>The number of the host's services with the soft state UNKNOWN</td></tr>
<tr><td>num_services_warn</td><td>int</td><td>The number of the host's services with the soft state WARN</td></tr>
<tr><td>obsess</td><td>int</td><td>The current obsess setting... (0/1)</td></tr>
<tr><td>obsess_over_host</td><td>int</td><td>The current obsess setting... (0/1)</td></tr>
<tr><td>parents</td><td>list</td><td>A list of all direct parents of the host</td></tr>
<tr><td>pending_flex_downtime</td><td>int</td><td>Whether a flex downtime is pending (0/1)</td></tr>
<tr><td>percent_state_change</td><td>float</td><td>Percent state change</td></tr>
<tr><td>perf_data</td><td>string</td><td>Optional performance data of the last host check</td></tr>
<tr><td>plugin_output</td><td>string</td><td>Output of the last host check</td></tr>
<tr><td>pnpgraph_present</td><td>int</td><td>Whether there is a PNP4Nagios graph present for this host (0/1)</td></tr>
<tr><td>process_performance_data</td><td>int</td><td>Whether processing of performance data is enabled (0/1)</td></tr>
<tr><td>retry_interval</td><td>float</td><td>Number of basic interval lengths between checks when retrying after a soft error</td></tr>
<tr><td>scheduled_downtime_depth</td><td>int</td><td>The number of downtimes this host is currently in</td></tr>
<tr><td>services</td><td>list</td><td>A list of all services of the host</td></tr>
<tr><td>services_with_info</td><td>list</td><td>A list of all services including detailed information about each service</td></tr>
<tr><td>services_with_state</td><td>list</td><td>A list of all services of the host together with state and has_been_checked</td></tr>
<tr><td>should_be_scheduled</td><td>int</td><td>Whether Naemon still tries to run checks on this host (0/1)</td></tr>
<tr><td>state</td><td>int</td><td>The current state of the host (0: up, 1: down, 2: unreachable)</td></tr>
<tr><td>state_type</td><td>int</td><td>Type of the current state (0: soft, 1: hard)</td></tr>
<tr><td>statusmap_image</td><td>string</td><td>The name of in image file for the status map</td></tr>
<tr><td>total_services</td><td>int</td><td>The total number of services of the host</td></tr>
<tr><td>worst_service_hard_state</td><td>int</td><td>The worst hard state of all of the host's services (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
<tr><td>worst_service_state</td><td>int</td><td>The worst soft state of all of the host's services (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
<tr><td>x_3d</td><td>float</td><td>3D-Coordinates: X</td></tr>
<tr><td>y_3d</td><td>float</td><td>3D-Coordinates: Y</td></tr>
<tr><td>z_3d</td><td>float</td><td>3D-Coordinates: Z</td></tr>
</table>


#### log

<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'><tr><th data-defaultsort='asc'>Column</th>
    <th data-sort='true'>Type</th>
    <th data-sort='true'>Description</th>
</tr>
<tr><td>_host_</td><td></td><td>All columns from the <a href='#hosts'>hosts table</a> are available via current_host_ prefix.</td></tr>
<tr><td>_service_</td><td></td><td>All columns from the <a href='#services'>services table</a> are available via current_service_ prefix.</td></tr>
<tr><td>attempt</td><td>int</td><td>The number of the check attempt</td></tr>
<tr><td>class</td><td>int</td><td>The class of the message as integer (0:info, 1:state, 2:program, 3:notification, 4:passive, 5:command)</td></tr>
<tr><td>command_name</td><td>string</td><td>The name of the command of the log entry (e.g. for notifications)</td></tr>
<tr><td>comment</td><td>string</td><td>A comment field used in various message types</td></tr>
<tr><td>contact_name</td><td>string</td><td>The name of the contact the log entry is about (might be empty)</td></tr>
<tr><td>host_name</td><td>string</td><td>The name of the host the log entry is about (might be empty)</td></tr>
<tr><td>lineno</td><td>int</td><td>The number of the line in the log file</td></tr>
<tr><td>message</td><td>string</td><td>The complete message line including the timestamp</td></tr>
<tr><td>options</td><td>string</td><td>The part of the message after the ':'</td></tr>
<tr><td>plugin_output</td><td>string</td><td>The output of the check, if any is associated with the message</td></tr>
<tr><td>service_description</td><td>string</td><td>The description of the service log entry is about (might be empty)</td></tr>
<tr><td>state</td><td>int</td><td>The state of the host or service in question</td></tr>
<tr><td>state_type</td><td>string</td><td>The type of the state (varies on different log classes)</td></tr>
<tr><td>time</td><td>time</td><td>Time of the log event (UNIX timestamp)</td></tr>
<tr><td>type</td><td>string</td><td>The type of the message (text before the colon), the message itself for info messages</td></tr>
</table>


#### servicegroups

<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'><tr><th data-defaultsort='asc'>Column</th>
    <th data-sort='true'>Type</th>
    <th data-sort='true'>Description</th>
</tr>
<tr><td>action_url</td><td>string</td><td>An optional URL to custom notes or actions on the service group</td></tr>
<tr><td>alias</td><td>string</td><td>An alias of the service group</td></tr>
<tr><td>id</td><td>int</td><td>Servicegroup id</td></tr>
<tr><td>members</td><td>list</td><td>A list of all members of the service group as host/service pairs</td></tr>
<tr><td>members_with_state</td><td>list</td><td>A list of all members of the service group with state and has_been_checked</td></tr>
<tr><td>name</td><td>string</td><td>The name of the service group</td></tr>
<tr><td>notes</td><td>string</td><td>Optional additional notes about the service group</td></tr>
<tr><td>notes_url</td><td>string</td><td>An optional URL to further notes on the service group</td></tr>
<tr><td>num_services</td><td>int</td><td>The total number of services in the group</td></tr>
<tr><td>num_services_crit</td><td>int</td><td>The number of services in the group that are CRIT</td></tr>
<tr><td>num_services_hard_crit</td><td>int</td><td>The number of services in the group that are CRIT</td></tr>
<tr><td>num_services_hard_ok</td><td>int</td><td>The number of services in the group that are OK</td></tr>
<tr><td>num_services_hard_unknown</td><td>int</td><td>The number of services in the group that are UNKNOWN</td></tr>
<tr><td>num_services_hard_warn</td><td>int</td><td>The number of services in the group that are WARN</td></tr>
<tr><td>num_services_ok</td><td>int</td><td>The number of services in the group that are OK</td></tr>
<tr><td>num_services_pending</td><td>int</td><td>The number of services in the group that are PENDING</td></tr>
<tr><td>num_services_unknown</td><td>int</td><td>The number of services in the group that are UNKNOWN</td></tr>
<tr><td>num_services_warn</td><td>int</td><td>The number of services in the group that are WARN</td></tr>
<tr><td>worst_service_state</td><td>int</td><td>The worst soft state of all of the groups services (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
</table>


#### services

<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'><tr><th data-defaultsort='asc'>Column</th>
    <th data-sort='true'>Type</th>
    <th data-sort='true'>Description</th>
</tr>
<tr><td>_host_</td><td></td><td>All columns from the <a href='#hosts'>hosts table</a> are available via host_ prefix.</td></tr>
<tr><td>accept_passive_checks</td><td>int</td><td>Whether the service accepts passive checks (0/1)</td></tr>
<tr><td>acknowledged</td><td>int</td><td>Whether the current service problem has been acknowledged (0/1)</td></tr>
<tr><td>acknowledgement_type</td><td>int</td><td>The type of the acknowledgement (0: none, 1: normal, 2: sticky)</td></tr>
<tr><td>action_url</td><td>string</td><td>An optional URL for actions or custom information about the service</td></tr>
<tr><td>action_url_expanded</td><td>string</td><td>The action_url with (the most important) macros expanded</td></tr>
<tr><td>active_checks_enabled</td><td>int</td><td>Whether active checks are enabled for the service (0/1)</td></tr>
<tr><td>check_command</td><td>string</td><td>Naemon command used for active checks</td></tr>
<tr><td>check_freshness</td><td>int</td><td>Whether freshness checks are activated (0/1)</td></tr>
<tr><td>check_interval</td><td>float</td><td>Number of basic interval lengths between two scheduled checks of the service</td></tr>
<tr><td>check_options</td><td>int</td><td>The current check option, forced, normal, freshness... (0/1)</td></tr>
<tr><td>check_period</td><td>string</td><td>The name of the check period of the service. It this is empty, the service is always checked.</td></tr>
<tr><td>check_source</td><td>string</td><td>The source of the check</td></tr>
<tr><td>check_type</td><td>int</td><td>The type of the last check (0: active, 1: passive)</td></tr>
<tr><td>checks_enabled</td><td>int</td><td>Whether active checks are enabled for the service (0/1)</td></tr>
<tr><td>comments</td><td>list</td><td>A list of all comment ids of the service</td></tr>
<tr><td>comments_with_info</td><td>list</td><td>A list of all comments of the service with id, author and comment</td></tr>
<tr><td>contact_groups</td><td>list</td><td>A list of all contact groups this service is in</td></tr>
<tr><td>contacts</td><td>list</td><td>A list of all contacts of the service, either direct or via a contact group</td></tr>
<tr><td>current_attempt</td><td>int</td><td>The number of the current check attempt</td></tr>
<tr><td>current_notification_number</td><td>int</td><td>The number of the current notification</td></tr>
<tr><td>custom_variable_names</td><td>list</td><td>A list of the names of all custom variables of the service</td></tr>
<tr><td>custom_variable_values</td><td>list</td><td>A list of the values of all custom variable of the service</td></tr>
<tr><td>custom_variables</td><td>dict</td><td>A dictionary of the custom variables</td></tr>
<tr><td>description</td><td>string</td><td>Description of the service (also used as key)</td></tr>
<tr><td>display_name</td><td>string</td><td>An optional display name</td></tr>
<tr><td>downtimes</td><td>list</td><td>A list of all downtime ids of the service</td></tr>
<tr><td>downtimes_with_info</td><td>list</td><td>A list of all downtimes of the service with id, author and comment</td></tr>
<tr><td>event_handler</td><td>string</td><td>Naemon command used as event handler</td></tr>
<tr><td>event_handler_enabled</td><td>int</td><td>Whether and event handler is activated for the service (0/1)</td></tr>
<tr><td>execution_time</td><td>float</td><td>Time the service check needed for execution</td></tr>
<tr><td>first_notification_delay</td><td>float</td><td>Delay before the first notification</td></tr>
<tr><td>flap_detection_enabled</td><td>int</td><td>Whether flap detection is enabled for the service (0/1)</td></tr>
<tr><td>groups</td><td>list</td><td>A list of all service groups the service is in</td></tr>
<tr><td>has_been_checked</td><td>int</td><td>Whether the service already has been checked (0/1)</td></tr>
<tr><td>high_flap_threshold</td><td>float</td><td>High threshold of flap detection</td></tr>
<tr><td>hourly_value</td><td>int</td><td>Hourly Value</td></tr>
<tr><td>icon_image</td><td>string</td><td>The name of an image to be used as icon in the web interface</td></tr>
<tr><td>icon_image_alt</td><td>string</td><td>An alternative text for the icon_image for browsers not displaying icons</td></tr>
<tr><td>icon_image_expanded</td><td>string</td><td>The icon_image with (the most important) macros expanded</td></tr>
<tr><td>id</td><td>int</td><td>Service id</td></tr>
<tr><td>in_check_period</td><td>int</td><td>Whether the service is currently in its check period (0/1)</td></tr>
<tr><td>in_notification_period</td><td>int</td><td>Whether the service is currently in its notification period (0/1)</td></tr>
<tr><td>initial_state</td><td>int</td><td>The initial state of the service</td></tr>
<tr><td>is_executing</td><td>int</td><td>is there a service check currently running... (0/1)</td></tr>
<tr><td>is_flapping</td><td>int</td><td>Whether the service is flapping (0/1)</td></tr>
<tr><td>last_check</td><td>time</td><td>The time of the last check (Unix timestamp)</td></tr>
<tr><td>last_hard_state</td><td>int</td><td>The last hard state of the service</td></tr>
<tr><td>last_hard_state_change</td><td>time</td><td>The time of the last hard state change (Unix timestamp)</td></tr>
<tr><td>last_notification</td><td>time</td><td>The time of the last notification (Unix timestamp)</td></tr>
<tr><td>last_state</td><td>int</td><td>The last state of the service</td></tr>
<tr><td>last_state_change</td><td>time</td><td>The time of the last state change (Unix timestamp)</td></tr>
<tr><td>last_time_critical</td><td>time</td><td>The last time the service was CRITICAL (Unix timestamp)</td></tr>
<tr><td>last_time_ok</td><td>time</td><td>The last time the service was OK (Unix timestamp)</td></tr>
<tr><td>last_time_unknown</td><td>time</td><td>The last time the service was UNKNOWN (Unix timestamp)</td></tr>
<tr><td>last_time_warning</td><td>time</td><td>The last time the service was in WARNING state (Unix timestamp)</td></tr>
<tr><td>latency</td><td>float</td><td>Time difference between scheduled check time and actual check time</td></tr>
<tr><td>long_plugin_output</td><td>string</td><td>Unabbreviated output of the last check plugin</td></tr>
<tr><td>low_flap_threshold</td><td>float</td><td>Low threshold of flap detection</td></tr>
<tr><td>max_check_attempts</td><td>int</td><td>The maximum number of check attempts</td></tr>
<tr><td>modified_attributes</td><td>int</td><td>A bitmask specifying which attributes have been modified</td></tr>
<tr><td>modified_attributes_list</td><td>list</td><td>A list of all modified attributes</td></tr>
<tr><td>next_check</td><td>time</td><td>The scheduled time of the next check (Unix timestamp)</td></tr>
<tr><td>next_notification</td><td>time</td><td>The time of the next notification (Unix timestamp)</td></tr>
<tr><td>no_more_notifications</td><td>int</td><td>Whether to stop sending notifications (0/1)</td></tr>
<tr><td>notes</td><td>string</td><td>Optional notes about the service</td></tr>
<tr><td>notes_expanded</td><td>string</td><td>The notes with (the most important) macros expanded</td></tr>
<tr><td>notes_url</td><td>string</td><td>An optional URL for additional notes about the service</td></tr>
<tr><td>notes_url_expanded</td><td>string</td><td>The notes_url with (the most important) macros expanded</td></tr>
<tr><td>notification_interval</td><td>float</td><td>Interval of periodic notification or 0 if its off</td></tr>
<tr><td>notification_period</td><td>string</td><td>The name of the notification period of the service. It this is empty, service problems are always notified.</td></tr>
<tr><td>notifications_enabled</td><td>int</td><td>Whether notifications are enabled for the service (0/1)</td></tr>
<tr><td>obsess</td><td>int</td><td>Whether 'obsess' is enabled for the service (0/1)</td></tr>
<tr><td>obsess_over_service</td><td>int</td><td>Whether 'obsess' is enabled for the service (0/1)</td></tr>
<tr><td>percent_state_change</td><td>float</td><td>Percent state change</td></tr>
<tr><td>perf_data</td><td>string</td><td>Performance data of the last check plugin</td></tr>
<tr><td>plugin_output</td><td>string</td><td>Output of the last check plugin</td></tr>
<tr><td>pnpgraph_present</td><td>int</td><td>Whether there is a PNP4Nagios graph present for this service (0/1)</td></tr>
<tr><td>process_performance_data</td><td>int</td><td>Whether processing of performance data is enabled for the service (0/1)</td></tr>
<tr><td>retry_interval</td><td>float</td><td>Number of basic interval lengths between checks when retrying after a soft error</td></tr>
<tr><td>scheduled_downtime_depth</td><td>int</td><td>The number of scheduled downtimes the service is currently in</td></tr>
<tr><td>should_be_scheduled</td><td>int</td><td>Whether Naemon still tries to run checks on this service (0/1)</td></tr>
<tr><td>state</td><td>int</td><td>The current state of the service (0: OK, 1: WARN, 2: CRITICAL, 3: UNKNOWN)</td></tr>
<tr><td>state_type</td><td>int</td><td>The type of the current state (0: soft, 1: hard)</td></tr>
</table>


#### servicesbygroup

<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'><tr><th data-defaultsort='asc'>Column</th>
    <th data-sort='true'>Type</th>
    <th data-sort='true'>Description</th>
</tr>
<tr><td>accept_passive_checks</td><td>int</td><td>Whether the service accepts passive checks (0/1)</td></tr>
<tr><td>acknowledged</td><td>int</td><td>Whether the current service problem has been acknowledged (0/1)</td></tr>
<tr><td>acknowledgement_type</td><td>int</td><td>The type of the acknowledgement (0: none, 1: normal, 2: sticky)</td></tr>
<tr><td>action_url</td><td>string</td><td>An optional URL for actions or custom information about the service</td></tr>
<tr><td>action_url_expanded</td><td>string</td><td>The action_url with (the most important) macros expanded</td></tr>
<tr><td>active_checks_enabled</td><td>int</td><td>Whether active checks are enabled for the service (0/1)</td></tr>
<tr><td>check_command</td><td>string</td><td>Naemon command used for active checks</td></tr>
<tr><td>check_freshness</td><td>int</td><td>Whether freshness checks are activated (0/1)</td></tr>
<tr><td>check_interval</td><td>float</td><td>Number of basic interval lengths between two scheduled checks of the service</td></tr>
<tr><td>check_options</td><td>int</td><td>The current check option, forced, normal, freshness... (0/1)</td></tr>
<tr><td>check_period</td><td>string</td><td>The name of the check period of the service. It this is empty, the service is always checked.</td></tr>
<tr><td>check_source</td><td>string</td><td>The source of the check</td></tr>
<tr><td>check_type</td><td>int</td><td>The type of the last check (0: active, 1: passive)</td></tr>
<tr><td>checks_enabled</td><td>int</td><td>Whether active checks are enabled for the service (0/1)</td></tr>
<tr><td>comments</td><td>list</td><td>A list of all comment ids of the service</td></tr>
<tr><td>comments_with_info</td><td>list</td><td>A list of all comments of the service with id, author and comment</td></tr>
<tr><td>contact_groups</td><td>list</td><td>A list of all contact groups this service is in</td></tr>
<tr><td>contacts</td><td>list</td><td>A list of all contacts of the service, either direct or via a contact group</td></tr>
<tr><td>current_attempt</td><td>int</td><td>The number of the current check attempt</td></tr>
<tr><td>current_notification_number</td><td>int</td><td>The number of the current notification</td></tr>
<tr><td>custom_variable_names</td><td>list</td><td>A list of the names of all custom variables of the service</td></tr>
<tr><td>custom_variable_values</td><td>list</td><td>A list of the values of all custom variable of the service</td></tr>
<tr><td>custom_variables</td><td>dict</td><td>A dictionary of the custom variables</td></tr>
<tr><td>description</td><td>string</td><td>Description of the service (also used as key)</td></tr>
<tr><td>display_name</td><td>string</td><td>An optional display name</td></tr>
<tr><td>downtimes</td><td>list</td><td>A list of all downtime ids of the service</td></tr>
<tr><td>downtimes_with_info</td><td>list</td><td>A list of all downtimes of the service with id, author and comment</td></tr>
<tr><td>event_handler</td><td>string</td><td>Naemon command used as event handler</td></tr>
<tr><td>event_handler_enabled</td><td>int</td><td>Whether and event handler is activated for the service (0/1)</td></tr>
<tr><td>execution_time</td><td>float</td><td>Time the service check needed for execution</td></tr>
<tr><td>first_notification_delay</td><td>float</td><td>Delay before the first notification</td></tr>
<tr><td>flap_detection_enabled</td><td>int</td><td>Whether flap detection is enabled for the service (0/1)</td></tr>
<tr><td>groups</td><td>list</td><td>A list of all service groups the service is in</td></tr>
<tr><td>has_been_checked</td><td>int</td><td>Whether the service already has been checked (0/1)</td></tr>
<tr><td>high_flap_threshold</td><td>float</td><td>High threshold of flap detection</td></tr>
<tr><td>host_accept_passive_checks</td><td>int</td><td>Whether passive host checks are accepted (0/1)</td></tr>
<tr><td>host_acknowledged</td><td>int</td><td>Whether the current host problem has been acknowledged (0/1)</td></tr>
<tr><td>host_acknowledgement_type</td><td>int</td><td>Type of acknowledgement (0: none, 1: normal, 2: stick)</td></tr>
<tr><td>host_action_url</td><td>string</td><td>An optional URL to custom actions or information about this host</td></tr>
<tr><td>host_action_url_expanded</td><td>string</td><td>The same as action_url, but with the most important macros expanded</td></tr>
<tr><td>host_active_checks_enabled</td><td>int</td><td>Whether active checks are enabled for the host (0/1)</td></tr>
<tr><td>host_address</td><td>string</td><td>IP address</td></tr>
<tr><td>host_alias</td><td>string</td><td>An alias name for the host</td></tr>
<tr><td>host_check_command</td><td>string</td><td>Naemon command for active host check of this host</td></tr>
<tr><td>host_check_flapping_recovery_notification</td><td>int</td><td>Whether to check to send a recovery notification when flapping stops (0/1)</td></tr>
<tr><td>host_check_freshness</td><td>int</td><td>Whether freshness checks are activated (0/1)</td></tr>
<tr><td>host_check_interval</td><td>float</td><td>Number of basic interval lengths between two scheduled checks of the host</td></tr>
<tr><td>host_check_options</td><td>int</td><td>The current check option, forced, normal, freshness... (0-2)</td></tr>
<tr><td>host_check_period</td><td>string</td><td>Time period in which this host will be checked. If empty then the host will always be checked.</td></tr>
<tr><td>host_check_source</td><td>string</td><td>The source of the check</td></tr>
<tr><td>host_check_type</td><td>int</td><td>Type of check (0: active, 1: passive)</td></tr>
<tr><td>host_checks_enabled</td><td>int</td><td>Whether checks of the host are enabled (0/1)</td></tr>
<tr><td>host_childs</td><td>list</td><td>A list of all direct children of the host</td></tr>
<tr><td>host_comments</td><td>list</td><td>A list of the ids of all comments of this host</td></tr>
<tr><td>host_comments_with_info</td><td>list</td><td>A list of all comments of the host with id, author and comment</td></tr>
<tr><td>host_contact_groups</td><td>list</td><td>A list of all contact groups this host is in</td></tr>
<tr><td>host_contacts</td><td>list</td><td>A list of all contacts of this host, either direct or via a contact group</td></tr>
<tr><td>host_current_attempt</td><td>int</td><td>Number of the current check attempts</td></tr>
<tr><td>host_current_notification_number</td><td>int</td><td>Number of the current notification</td></tr>
<tr><td>host_custom_variable_names</td><td>list</td><td>A list of the names of all custom variables</td></tr>
<tr><td>host_custom_variable_values</td><td>list</td><td>A list of the values of the custom variables</td></tr>
<tr><td>host_custom_variables</td><td>dict</td><td>A dictionary of the custom variables</td></tr>
<tr><td>host_display_name</td><td>string</td><td>Optional display name of the host</td></tr>
<tr><td>host_downtimes</td><td>list</td><td>A list of the ids of all scheduled downtimes of this host</td></tr>
<tr><td>host_downtimes_with_info</td><td>list</td><td>A list of the all scheduled downtimes of the host with id, author and comment</td></tr>
<tr><td>host_event_handler</td><td>string</td><td>Naemon command used as event handler</td></tr>
<tr><td>host_event_handler_enabled</td><td>int</td><td>Whether event handling is enabled (0/1)</td></tr>
<tr><td>host_execution_time</td><td>float</td><td>Time the host check needed for execution</td></tr>
<tr><td>host_filename</td><td>string</td><td>The value of the custom variable FILENAME</td></tr>
<tr><td>host_first_notification_delay</td><td>float</td><td>Delay before the first notification</td></tr>
<tr><td>host_flap_detection_enabled</td><td>int</td><td>Whether flap detection is enabled (0/1)</td></tr>
<tr><td>host_groups</td><td>list</td><td>A list of all host groups this host is in</td></tr>
<tr><td>host_hard_state</td><td>int</td><td>The effective hard state of the host (eliminates a problem in hard_state)</td></tr>
<tr><td>host_has_been_checked</td><td>int</td><td>Whether the host has already been checked (0/1)</td></tr>
<tr><td>host_high_flap_threshold</td><td>float</td><td>High threshold of flap detection</td></tr>
<tr><td>host_hourly_value</td><td>int</td><td>Hourly Value</td></tr>
<tr><td>host_icon_image</td><td>string</td><td>The name of an image file to be used in the web pages</td></tr>
<tr><td>host_icon_image_alt</td><td>string</td><td>Alternative text for the icon_image</td></tr>
<tr><td>host_icon_image_expanded</td><td>string</td><td>The same as icon_image, but with the most important macros expanded</td></tr>
<tr><td>host_id</td><td>int</td><td>Host id</td></tr>
<tr><td>host_in_check_period</td><td>int</td><td>Whether this host is currently in its check period (0/1)</td></tr>
<tr><td>host_in_notification_period</td><td>int</td><td>Whether this host is currently in its notification period (0/1)</td></tr>
<tr><td>host_initial_state</td><td>int</td><td>Initial host state</td></tr>
<tr><td>host_is_executing</td><td>int</td><td>is there a host check currently running... (0/1)</td></tr>
<tr><td>host_is_flapping</td><td>int</td><td>Whether the host state is flapping (0/1)</td></tr>
<tr><td>host_last_check</td><td>time</td><td>Time of the last check (Unix timestamp)</td></tr>
<tr><td>host_last_hard_state</td><td>int</td><td>Last hard state</td></tr>
<tr><td>host_last_hard_state_change</td><td>time</td><td>Time of the last hard state change (Unix timestamp)</td></tr>
<tr><td>host_last_notification</td><td>time</td><td>Time of the last notification (Unix timestamp)</td></tr>
<tr><td>host_last_state</td><td>int</td><td>State before last state change</td></tr>
<tr><td>host_last_state_change</td><td>time</td><td>Time of the last state change - soft or hard (Unix timestamp)</td></tr>
<tr><td>host_last_time_down</td><td>time</td><td>The last time the host was DOWN (Unix timestamp)</td></tr>
<tr><td>host_last_time_unreachable</td><td>time</td><td>The last time the host was UNREACHABLE (Unix timestamp)</td></tr>
<tr><td>host_last_time_up</td><td>time</td><td>The last time the host was UP (Unix timestamp)</td></tr>
<tr><td>host_latency</td><td>float</td><td>Time difference between scheduled check time and actual check time</td></tr>
<tr><td>host_long_plugin_output</td><td>string</td><td>Complete output from check plugin</td></tr>
<tr><td>host_low_flap_threshold</td><td>float</td><td>Low threshold of flap detection</td></tr>
<tr><td>host_max_check_attempts</td><td>int</td><td>Max check attempts for active host checks</td></tr>
<tr><td>host_modified_attributes</td><td>int</td><td>A bitmask specifying which attributes have been modified</td></tr>
<tr><td>host_modified_attributes_list</td><td>list</td><td>A list of all modified attributes</td></tr>
<tr><td>host_name</td><td>string</td><td>Host name</td></tr>
<tr><td>host_next_check</td><td>time</td><td>Scheduled time for the next check (Unix timestamp)</td></tr>
<tr><td>host_next_notification</td><td>time</td><td>Time of the next notification (Unix timestamp)</td></tr>
<tr><td>host_no_more_notifications</td><td>int</td><td>Whether to stop sending notifications (0/1)</td></tr>
<tr><td>host_notes</td><td>string</td><td>Optional notes for this host</td></tr>
<tr><td>host_notes_expanded</td><td>string</td><td>The same as notes, but with the most important macros expanded</td></tr>
<tr><td>host_notes_url</td><td>string</td><td>An optional URL with further information about the host</td></tr>
<tr><td>host_notes_url_expanded</td><td>string</td><td>Same es notes_url, but with the most important macros expanded</td></tr>
<tr><td>host_notification_interval</td><td>float</td><td>Interval of periodic notification or 0 if its off</td></tr>
<tr><td>host_notification_period</td><td>string</td><td>Time period in which problems of this host will be notified. If empty then notification will be always</td></tr>
<tr><td>host_notifications_enabled</td><td>int</td><td>Whether notifications of the host are enabled (0/1)</td></tr>
<tr><td>host_num_services</td><td>int</td><td>The total number of services of the host</td></tr>
<tr><td>host_num_services_crit</td><td>int</td><td>The number of the host's services with the soft state CRIT</td></tr>
<tr><td>host_num_services_hard_crit</td><td>int</td><td>The number of the host's services with the hard state CRIT</td></tr>
<tr><td>host_num_services_hard_ok</td><td>int</td><td>The number of the host's services with the hard state OK</td></tr>
<tr><td>host_num_services_hard_unknown</td><td>int</td><td>The number of the host's services with the hard state UNKNOWN</td></tr>
<tr><td>host_num_services_hard_warn</td><td>int</td><td>The number of the host's services with the hard state WARN</td></tr>
<tr><td>host_num_services_ok</td><td>int</td><td>The number of the host's services with the soft state OK</td></tr>
<tr><td>host_num_services_pending</td><td>int</td><td>The number of the host's services which have not been checked yet (pending)</td></tr>
<tr><td>host_num_services_unknown</td><td>int</td><td>The number of the host's services with the soft state UNKNOWN</td></tr>
<tr><td>host_num_services_warn</td><td>int</td><td>The number of the host's services with the soft state WARN</td></tr>
<tr><td>host_obsess</td><td>int</td><td>The current obsess setting... (0/1)</td></tr>
<tr><td>host_obsess_over_host</td><td>int</td><td>The current obsess setting... (0/1)</td></tr>
<tr><td>host_parents</td><td>list</td><td>A list of all direct parents of the host</td></tr>
<tr><td>host_pending_flex_downtime</td><td>int</td><td>Whether a flex downtime is pending (0/1)</td></tr>
<tr><td>host_percent_state_change</td><td>float</td><td>Percent state change</td></tr>
<tr><td>host_perf_data</td><td>string</td><td>Optional performance data of the last host check</td></tr>
<tr><td>host_plugin_output</td><td>string</td><td>Output of the last host check</td></tr>
<tr><td>host_pnpgraph_present</td><td>int</td><td>Whether there is a PNP4Nagios graph present for this host (0/1)</td></tr>
<tr><td>host_process_performance_data</td><td>int</td><td>Whether processing of performance data is enabled (0/1)</td></tr>
<tr><td>host_retry_interval</td><td>float</td><td>Number of basic interval lengths between checks when retrying after a soft error</td></tr>
<tr><td>host_scheduled_downtime_depth</td><td>int</td><td>The number of downtimes this host is currently in</td></tr>
<tr><td>host_services</td><td>list</td><td>A list of all services of the host</td></tr>
<tr><td>host_services_with_info</td><td>list</td><td>A list of all services including detailed information about each service</td></tr>
<tr><td>host_services_with_state</td><td>list</td><td>A list of all services of the host together with state and has_been_checked</td></tr>
<tr><td>host_should_be_scheduled</td><td>int</td><td>Whether Naemon still tries to run checks on this host (0/1)</td></tr>
<tr><td>host_state</td><td>int</td><td>The current state of the host (0: up, 1: down, 2: unreachable)</td></tr>
<tr><td>host_state_type</td><td>int</td><td>Type of the current state (0: soft, 1: hard)</td></tr>
<tr><td>host_statusmap_image</td><td>string</td><td>The name of in image file for the status map</td></tr>
<tr><td>host_total_services</td><td>int</td><td>The total number of services of the host</td></tr>
<tr><td>host_worst_service_hard_state</td><td>int</td><td>The worst hard state of all of the host's services (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
<tr><td>host_worst_service_state</td><td>int</td><td>The worst soft state of all of the host's services (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
<tr><td>host_x_3d</td><td>float</td><td>3D-Coordinates: X</td></tr>
<tr><td>host_y_3d</td><td>float</td><td>3D-Coordinates: Y</td></tr>
<tr><td>host_z_3d</td><td>float</td><td>3D-Coordinates: Z</td></tr>
<tr><td>hourly_value</td><td>int</td><td>Hourly Value</td></tr>
<tr><td>icon_image</td><td>string</td><td>The name of an image to be used as icon in the web interface</td></tr>
<tr><td>icon_image_alt</td><td>string</td><td>An alternative text for the icon_image for browsers not displaying icons</td></tr>
<tr><td>icon_image_expanded</td><td>string</td><td>The icon_image with (the most important) macros expanded</td></tr>
<tr><td>id</td><td>int</td><td>Service id</td></tr>
<tr><td>in_check_period</td><td>int</td><td>Whether the service is currently in its check period (0/1)</td></tr>
<tr><td>in_notification_period</td><td>int</td><td>Whether the service is currently in its notification period (0/1)</td></tr>
<tr><td>initial_state</td><td>int</td><td>The initial state of the service</td></tr>
<tr><td>is_executing</td><td>int</td><td>is there a service check currently running... (0/1)</td></tr>
<tr><td>is_flapping</td><td>int</td><td>Whether the service is flapping (0/1)</td></tr>
<tr><td>last_check</td><td>time</td><td>The time of the last check (Unix timestamp)</td></tr>
<tr><td>last_hard_state</td><td>int</td><td>The last hard state of the service</td></tr>
<tr><td>last_hard_state_change</td><td>time</td><td>The time of the last hard state change (Unix timestamp)</td></tr>
<tr><td>last_notification</td><td>time</td><td>The time of the last notification (Unix timestamp)</td></tr>
<tr><td>last_state</td><td>int</td><td>The last state of the service</td></tr>
<tr><td>last_state_change</td><td>time</td><td>The time of the last state change (Unix timestamp)</td></tr>
<tr><td>last_time_critical</td><td>time</td><td>The last time the service was CRITICAL (Unix timestamp)</td></tr>
<tr><td>last_time_ok</td><td>time</td><td>The last time the service was OK (Unix timestamp)</td></tr>
<tr><td>last_time_unknown</td><td>time</td><td>The last time the service was UNKNOWN (Unix timestamp)</td></tr>
<tr><td>last_time_warning</td><td>time</td><td>The last time the service was in WARNING state (Unix timestamp)</td></tr>
<tr><td>latency</td><td>float</td><td>Time difference between scheduled check time and actual check time</td></tr>
<tr><td>long_plugin_output</td><td>string</td><td>Unabbreviated output of the last check plugin</td></tr>
<tr><td>low_flap_threshold</td><td>float</td><td>Low threshold of flap detection</td></tr>
<tr><td>max_check_attempts</td><td>int</td><td>The maximum number of check attempts</td></tr>
<tr><td>modified_attributes</td><td>int</td><td>A bitmask specifying which attributes have been modified</td></tr>
<tr><td>modified_attributes_list</td><td>list</td><td>A list of all modified attributes</td></tr>
<tr><td>next_check</td><td>time</td><td>The scheduled time of the next check (Unix timestamp)</td></tr>
<tr><td>next_notification</td><td>time</td><td>The time of the next notification (Unix timestamp)</td></tr>
<tr><td>no_more_notifications</td><td>int</td><td>Whether to stop sending notifications (0/1)</td></tr>
<tr><td>notes</td><td>string</td><td>Optional notes about the service</td></tr>
<tr><td>notes_expanded</td><td>string</td><td>The notes with (the most important) macros expanded</td></tr>
<tr><td>notes_url</td><td>string</td><td>An optional URL for additional notes about the service</td></tr>
<tr><td>notes_url_expanded</td><td>string</td><td>The notes_url with (the most important) macros expanded</td></tr>
<tr><td>notification_interval</td><td>float</td><td>Interval of periodic notification or 0 if its off</td></tr>
<tr><td>notification_period</td><td>string</td><td>The name of the notification period of the service. It this is empty, service problems are always notified.</td></tr>
<tr><td>notifications_enabled</td><td>int</td><td>Whether notifications are enabled for the service (0/1)</td></tr>
<tr><td>obsess</td><td>int</td><td>Whether 'obsess' is enabled for the service (0/1)</td></tr>
<tr><td>obsess_over_service</td><td>int</td><td>Whether 'obsess' is enabled for the service (0/1)</td></tr>
<tr><td>percent_state_change</td><td>float</td><td>Percent state change</td></tr>
<tr><td>perf_data</td><td>string</td><td>Performance data of the last check plugin</td></tr>
<tr><td>plugin_output</td><td>string</td><td>Output of the last check plugin</td></tr>
<tr><td>pnpgraph_present</td><td>int</td><td>Whether there is a PNP4Nagios graph present for this service (0/1)</td></tr>
<tr><td>process_performance_data</td><td>int</td><td>Whether processing of performance data is enabled for the service (0/1)</td></tr>
<tr><td>retry_interval</td><td>float</td><td>Number of basic interval lengths between checks when retrying after a soft error</td></tr>
<tr><td>scheduled_downtime_depth</td><td>int</td><td>The number of scheduled downtimes the service is currently in</td></tr>
<tr><td>servicegroup_action_url</td><td>string</td><td>An optional URL to custom notes or actions on the service group</td></tr>
<tr><td>servicegroup_alias</td><td>string</td><td>An alias of the service group</td></tr>
<tr><td>servicegroup_id</td><td>int</td><td>Servicegroup id</td></tr>
<tr><td>servicegroup_members</td><td>list</td><td>A list of all members of the service group as host/service pairs</td></tr>
<tr><td>servicegroup_members_with_state</td><td>list</td><td>A list of all members of the service group with state and has_been_checked</td></tr>
<tr><td>servicegroup_name</td><td>string</td><td>The name of the service group</td></tr>
<tr><td>servicegroup_notes</td><td>string</td><td>Optional additional notes about the service group</td></tr>
<tr><td>servicegroup_notes_url</td><td>string</td><td>An optional URL to further notes on the service group</td></tr>
<tr><td>servicegroup_num_services</td><td>int</td><td>The total number of services in the group</td></tr>
<tr><td>servicegroup_num_services_crit</td><td>int</td><td>The number of services in the group that are CRIT</td></tr>
<tr><td>servicegroup_num_services_hard_crit</td><td>int</td><td>The number of services in the group that are CRIT</td></tr>
<tr><td>servicegroup_num_services_hard_ok</td><td>int</td><td>The number of services in the group that are OK</td></tr>
<tr><td>servicegroup_num_services_hard_unknown</td><td>int</td><td>The number of services in the group that are UNKNOWN</td></tr>
<tr><td>servicegroup_num_services_hard_warn</td><td>int</td><td>The number of services in the group that are WARN</td></tr>
<tr><td>servicegroup_num_services_ok</td><td>int</td><td>The number of services in the group that are OK</td></tr>
<tr><td>servicegroup_num_services_pending</td><td>int</td><td>The number of services in the group that are PENDING</td></tr>
<tr><td>servicegroup_num_services_unknown</td><td>int</td><td>The number of services in the group that are UNKNOWN</td></tr>
<tr><td>servicegroup_num_services_warn</td><td>int</td><td>The number of services in the group that are WARN</td></tr>
<tr><td>servicegroup_worst_service_state</td><td>int</td><td>The worst soft state of all of the groups services (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
<tr><td>should_be_scheduled</td><td>int</td><td>Whether Naemon still tries to run checks on this service (0/1)</td></tr>
<tr><td>state</td><td>int</td><td>The current state of the service (0: OK, 1: WARN, 2: CRITICAL, 3: UNKNOWN)</td></tr>
<tr><td>state_type</td><td>int</td><td>The type of the current state (0: soft, 1: hard)</td></tr>
</table>


#### servicesbyhostgroup

<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'><tr><th data-defaultsort='asc'>Column</th>
    <th data-sort='true'>Type</th>
    <th data-sort='true'>Description</th>
</tr>
<tr><td>accept_passive_checks</td><td>int</td><td>Whether the service accepts passive checks (0/1)</td></tr>
<tr><td>acknowledged</td><td>int</td><td>Whether the current service problem has been acknowledged (0/1)</td></tr>
<tr><td>acknowledgement_type</td><td>int</td><td>The type of the acknownledgement (0: none, 1: normal, 2: sticky)</td></tr>
<tr><td>action_url</td><td>string</td><td>An optional URL for actions or custom information about the service</td></tr>
<tr><td>action_url_expanded</td><td>string</td><td>The action_url with (the most important) macros expanded</td></tr>
<tr><td>active_checks_enabled</td><td>int</td><td>Whether active checks are enabled for the service (0/1)</td></tr>
<tr><td>check_command</td><td>string</td><td>Naemon command used for active checks</td></tr>
<tr><td>check_freshness</td><td>int</td><td>Whether freshness checks are activated (0/1)</td></tr>
<tr><td>check_interval</td><td>float</td><td>Number of basic interval lengths between two scheduled checks of the service</td></tr>
<tr><td>check_options</td><td>int</td><td>The current check option, forced, normal, freshness... (0/1)</td></tr>
<tr><td>check_period</td><td>string</td><td>The name of the check period of the service. It this is empty, the service is always checked.</td></tr>
<tr><td>check_source</td><td>string</td><td>The source of the check</td></tr>
<tr><td>check_type</td><td>int</td><td>The type of the last check (0: active, 1: passive)</td></tr>
<tr><td>checks_enabled</td><td>int</td><td>Whether active checks are enabled for the service (0/1)</td></tr>
<tr><td>comments</td><td>list</td><td>A list of all comment ids of the service</td></tr>
<tr><td>comments_with_info</td><td>list</td><td>A list of all comments of the service with id, author and comment</td></tr>
<tr><td>contact_groups</td><td>list</td><td>A list of all contact groups this service is in</td></tr>
<tr><td>contacts</td><td>list</td><td>A list of all contacts of the service, either direct or via a contact group</td></tr>
<tr><td>current_attempt</td><td>int</td><td>The number of the current check attempt</td></tr>
<tr><td>current_notification_number</td><td>int</td><td>The number of the current notification</td></tr>
<tr><td>custom_variable_names</td><td>list</td><td>A list of the names of all custom variables of the service</td></tr>
<tr><td>custom_variable_values</td><td>list</td><td>A list of the values of all custom variable of the service</td></tr>
<tr><td>custom_variables</td><td>dict</td><td>A dictionary of the custom variables</td></tr>
<tr><td>description</td><td>string</td><td>Description of the service (also used as key)</td></tr>
<tr><td>display_name</td><td>string</td><td>An optional display name</td></tr>
<tr><td>downtimes</td><td>list</td><td>A list of all downtime ids of the service</td></tr>
<tr><td>downtimes_with_info</td><td>list</td><td>A list of all downtimes of the service with id, author and comment</td></tr>
<tr><td>event_handler</td><td>string</td><td>Naemon command used as event handler</td></tr>
<tr><td>event_handler_enabled</td><td>int</td><td>Whether and event handler is activated for the service (0/1)</td></tr>
<tr><td>execution_time</td><td>float</td><td>Time the service check needed for execution</td></tr>
<tr><td>first_notification_delay</td><td>float</td><td>Delay before the first notification</td></tr>
<tr><td>flap_detection_enabled</td><td>int</td><td>Whether flap detection is enabled for the service (0/1)</td></tr>
<tr><td>groups</td><td>list</td><td>A list of all service groups the service is in</td></tr>
<tr><td>has_been_checked</td><td>int</td><td>Whether the service already has been checked (0/1)</td></tr>
<tr><td>high_flap_threshold</td><td>float</td><td>High threshold of flap detection</td></tr>
<tr><td>host_accept_passive_checks</td><td>int</td><td>Whether passive host checks are accepted (0/1)</td></tr>
<tr><td>host_acknowledged</td><td>int</td><td>Whether the current host problem has been acknowledged (0/1)</td></tr>
<tr><td>host_acknowledgement_type</td><td>int</td><td>Type of acknowledgement (0: none, 1: normal, 2: stick)</td></tr>
<tr><td>host_action_url</td><td>string</td><td>An optional URL to custom actions or information about this host</td></tr>
<tr><td>host_action_url_expanded</td><td>string</td><td>The same as action_url, but with the most important macros expanded</td></tr>
<tr><td>host_active_checks_enabled</td><td>int</td><td>Whether active checks are enabled for the host (0/1)</td></tr>
<tr><td>host_address</td><td>string</td><td>IP address</td></tr>
<tr><td>host_alias</td><td>string</td><td>An alias name for the host</td></tr>
<tr><td>host_check_command</td><td>string</td><td>Naemon command for active host check of this host</td></tr>
<tr><td>host_check_flapping_recovery_notification</td><td>int</td><td>Whether to check to send a recovery notification when flapping stops (0/1)</td></tr>
<tr><td>host_check_freshness</td><td>int</td><td>Whether freshness checks are activated (0/1)</td></tr>
<tr><td>host_check_interval</td><td>float</td><td>Number of basic interval lengths between two scheduled checks of the host</td></tr>
<tr><td>host_check_options</td><td>int</td><td>The current check option, forced, normal, freshness... (0-2)</td></tr>
<tr><td>host_check_period</td><td>string</td><td>Time period in which this host will be checked. If empty then the host will always be checked.</td></tr>
<tr><td>host_check_source</td><td>string</td><td>The source of the check</td></tr>
<tr><td>host_check_type</td><td>int</td><td>Type of check (0: active, 1: passive)</td></tr>
<tr><td>host_checks_enabled</td><td>int</td><td>Whether checks of the host are enabled (0/1)</td></tr>
<tr><td>host_childs</td><td>list</td><td>A list of all direct children of the host</td></tr>
<tr><td>host_comments</td><td>list</td><td>A list of the ids of all comments of this host</td></tr>
<tr><td>host_comments_with_info</td><td>list</td><td>A list of all comments of the host with id, author and comment</td></tr>
<tr><td>host_contact_groups</td><td>list</td><td>A list of all contact groups this host is in</td></tr>
<tr><td>host_contacts</td><td>list</td><td>A list of all contacts of this host, either direct or via a contact group</td></tr>
<tr><td>host_current_attempt</td><td>int</td><td>Number of the current check attempts</td></tr>
<tr><td>host_current_notification_number</td><td>int</td><td>Number of the current notification</td></tr>
<tr><td>host_custom_variable_names</td><td>list</td><td>A list of the names of all custom variables</td></tr>
<tr><td>host_custom_variable_values</td><td>list</td><td>A list of the values of the custom variables</td></tr>
<tr><td>host_custom_variables</td><td>dict</td><td>A dictionary of the custom variables</td></tr>
<tr><td>host_display_name</td><td>string</td><td>Optional display name of the host</td></tr>
<tr><td>host_downtimes</td><td>list</td><td>A list of the ids of all scheduled downtimes of this host</td></tr>
<tr><td>host_downtimes_with_info</td><td>list</td><td>A list of the all scheduled downtimes of the host with id, author and comment</td></tr>
<tr><td>host_event_handler</td><td>string</td><td>Naemon command used as event handler</td></tr>
<tr><td>host_event_handler_enabled</td><td>int</td><td>Whether event handling is enabled (0/1)</td></tr>
<tr><td>host_execution_time</td><td>float</td><td>Time the host check needed for execution</td></tr>
<tr><td>host_filename</td><td>string</td><td>The value of the custom variable FILENAME</td></tr>
<tr><td>host_first_notification_delay</td><td>float</td><td>Delay before the first notification</td></tr>
<tr><td>host_flap_detection_enabled</td><td>int</td><td>Whether flap detection is enabled (0/1)</td></tr>
<tr><td>host_groups</td><td>list</td><td>A list of all host groups this host is in</td></tr>
<tr><td>host_hard_state</td><td>int</td><td>The effective hard state of the host (eliminates a problem in hard_state)</td></tr>
<tr><td>host_has_been_checked</td><td>int</td><td>Whether the host has already been checked (0/1)</td></tr>
<tr><td>host_high_flap_threshold</td><td>float</td><td>High threshold of flap detection</td></tr>
<tr><td>host_hourly_value</td><td>int</td><td>Hourly Value</td></tr>
<tr><td>host_icon_image</td><td>string</td><td>The name of an image file to be used in the web pages</td></tr>
<tr><td>host_icon_image_alt</td><td>string</td><td>Alternative text for the icon_image</td></tr>
<tr><td>host_icon_image_expanded</td><td>string</td><td>The same as icon_image, but with the most important macros expanded</td></tr>
<tr><td>host_id</td><td>int</td><td>Host id</td></tr>
<tr><td>host_in_check_period</td><td>int</td><td>Whether this host is currently in its check period (0/1)</td></tr>
<tr><td>host_in_notification_period</td><td>int</td><td>Whether this host is currently in its notification period (0/1)</td></tr>
<tr><td>host_initial_state</td><td>int</td><td>Initial host state</td></tr>
<tr><td>host_is_executing</td><td>int</td><td>is there a host check currently running... (0/1)</td></tr>
<tr><td>host_is_flapping</td><td>int</td><td>Whether the host state is flapping (0/1)</td></tr>
<tr><td>host_last_check</td><td>time</td><td>Time of the last check (Unix timestamp)</td></tr>
<tr><td>host_last_hard_state</td><td>int</td><td>Last hard state</td></tr>
<tr><td>host_last_hard_state_change</td><td>time</td><td>Time of the last hard state change (Unix timestamp)</td></tr>
<tr><td>host_last_notification</td><td>time</td><td>Time of the last notification (Unix timestamp)</td></tr>
<tr><td>host_last_state</td><td>int</td><td>State before last state change</td></tr>
<tr><td>host_last_state_change</td><td>time</td><td>Time of the last state change - soft or hard (Unix timestamp)</td></tr>
<tr><td>host_last_time_down</td><td>time</td><td>The last time the host was DOWN (Unix timestamp)</td></tr>
<tr><td>host_last_time_unreachable</td><td>time</td><td>The last time the host was UNREACHABLE (Unix timestamp)</td></tr>
<tr><td>host_last_time_up</td><td>time</td><td>The last time the host was UP (Unix timestamp)</td></tr>
<tr><td>host_latency</td><td>float</td><td>Time difference between scheduled check time and actual check time</td></tr>
<tr><td>host_long_plugin_output</td><td>string</td><td>Complete output from check plugin</td></tr>
<tr><td>host_low_flap_threshold</td><td>float</td><td>Low threshold of flap detection</td></tr>
<tr><td>host_max_check_attempts</td><td>int</td><td>Max check attempts for active host checks</td></tr>
<tr><td>host_modified_attributes</td><td>int</td><td>A bitmask specifying which attributes have been modified</td></tr>
<tr><td>host_modified_attributes_list</td><td>list</td><td>A list of all modified attributes</td></tr>
<tr><td>host_name</td><td>string</td><td>Host name</td></tr>
<tr><td>host_next_check</td><td>time</td><td>Scheduled time for the next check (Unix timestamp)</td></tr>
<tr><td>host_next_notification</td><td>time</td><td>Time of the next notification (Unix timestamp)</td></tr>
<tr><td>host_no_more_notifications</td><td>int</td><td>Whether to stop sending notifications (0/1)</td></tr>
<tr><td>host_notes</td><td>string</td><td>Optional notes for this host</td></tr>
<tr><td>host_notes_expanded</td><td>string</td><td>The same as notes, but with the most important macros expanded</td></tr>
<tr><td>host_notes_url</td><td>string</td><td>An optional URL with further information about the host</td></tr>
<tr><td>host_notes_url_expanded</td><td>string</td><td>Same es notes_url, but with the most important macros expanded</td></tr>
<tr><td>host_notification_interval</td><td>float</td><td>Interval of periodic notification or 0 if its off</td></tr>
<tr><td>host_notification_period</td><td>string</td><td>Time period in which problems of this host will be notified. If empty then notification will be always</td></tr>
<tr><td>host_notifications_enabled</td><td>int</td><td>Whether notifications of the host are enabled (0/1)</td></tr>
<tr><td>host_num_services</td><td>int</td><td>The total number of services of the host</td></tr>
<tr><td>host_num_services_crit</td><td>int</td><td>The number of the host's services with the soft state CRIT</td></tr>
<tr><td>host_num_services_hard_crit</td><td>int</td><td>The number of the host's services with the hard state CRIT</td></tr>
<tr><td>host_num_services_hard_ok</td><td>int</td><td>The number of the host's services with the hard state OK</td></tr>
<tr><td>host_num_services_hard_unknown</td><td>int</td><td>The number of the host's services with the hard state UNKNOWN</td></tr>
<tr><td>host_num_services_hard_warn</td><td>int</td><td>The number of the host's services with the hard state WARN</td></tr>
<tr><td>host_num_services_ok</td><td>int</td><td>The number of the host's services with the soft state OK</td></tr>
<tr><td>host_num_services_pending</td><td>int</td><td>The number of the host's services which have not been checked yet (pending)</td></tr>
<tr><td>host_num_services_unknown</td><td>int</td><td>The number of the host's services with the soft state UNKNOWN</td></tr>
<tr><td>host_num_services_warn</td><td>int</td><td>The number of the host's services with the soft state WARN</td></tr>
<tr><td>host_obsess</td><td>int</td><td>The current obsess setting... (0/1)</td></tr>
<tr><td>host_obsess_over_host</td><td>int</td><td>The current obsess setting... (0/1)</td></tr>
<tr><td>host_parents</td><td>list</td><td>A list of all direct parents of the host</td></tr>
<tr><td>host_pending_flex_downtime</td><td>int</td><td>Whether a flex downtime is pending (0/1)</td></tr>
<tr><td>host_percent_state_change</td><td>float</td><td>Percent state change</td></tr>
<tr><td>host_perf_data</td><td>string</td><td>Optional performance data of the last host check</td></tr>
<tr><td>host_plugin_output</td><td>string</td><td>Output of the last host check</td></tr>
<tr><td>host_pnpgraph_present</td><td>int</td><td>Whether there is a PNP4Nagios graph present for this host (0/1)</td></tr>
<tr><td>host_process_performance_data</td><td>int</td><td>Whether processing of performance data is enabled (0/1)</td></tr>
<tr><td>host_retry_interval</td><td>float</td><td>Number of basic interval lengths between checks when retrying after a soft error</td></tr>
<tr><td>host_scheduled_downtime_depth</td><td>int</td><td>The number of downtimes this host is currently in</td></tr>
<tr><td>host_services</td><td>list</td><td>A list of all services of the host</td></tr>
<tr><td>host_services_with_info</td><td>list</td><td>A list of all services including detailed information about each service</td></tr>
<tr><td>host_services_with_state</td><td>list</td><td>A list of all services of the host together with state and has_been_checked</td></tr>
<tr><td>host_should_be_scheduled</td><td>int</td><td>Whether Naemon still tries to run checks on this host (0/1)</td></tr>
<tr><td>host_state</td><td>int</td><td>The current state of the host (0: up, 1: down, 2: unreachable)</td></tr>
<tr><td>host_state_type</td><td>int</td><td>Type of the current state (0: soft, 1: hard)</td></tr>
<tr><td>host_statusmap_image</td><td>string</td><td>The name of in image file for the status map</td></tr>
<tr><td>host_total_services</td><td>int</td><td>The total number of services of the host</td></tr>
<tr><td>host_worst_service_hard_state</td><td>int</td><td>The worst hard state of all of the host's services (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
<tr><td>host_worst_service_state</td><td>int</td><td>The worst soft state of all of the host's services (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
<tr><td>host_x_3d</td><td>float</td><td>3D-Coordinates: X</td></tr>
<tr><td>host_y_3d</td><td>float</td><td>3D-Coordinates: Y</td></tr>
<tr><td>host_z_3d</td><td>float</td><td>3D-Coordinates: Z</td></tr>
<tr><td>hostgroup_action_url</td><td>string</td><td>An optional URL to custom actions or information about the hostgroup</td></tr>
<tr><td>hostgroup_alias</td><td>string</td><td>An alias of the hostgroup</td></tr>
<tr><td>hostgroup_id</td><td>int</td><td>Hostgroup id</td></tr>
<tr><td>hostgroup_members</td><td>list</td><td>A list of all host names that are members of the hostgroup</td></tr>
<tr><td>hostgroup_members_with_state</td><td>list</td><td>A list of all host names that are members of the hostgroup together with state and has_been_checked</td></tr>
<tr><td>hostgroup_name</td><td>string</td><td>Name of the hostgroup</td></tr>
<tr><td>hostgroup_notes</td><td>string</td><td>Optional notes to the hostgroup</td></tr>
<tr><td>hostgroup_notes_url</td><td>string</td><td>An optional URL with further information about the hostgroup</td></tr>
<tr><td>hostgroup_num_hosts</td><td>int</td><td>The total number of hosts in the group</td></tr>
<tr><td>hostgroup_num_hosts_down</td><td>int</td><td>The number of hosts in the group that are down</td></tr>
<tr><td>hostgroup_num_hosts_pending</td><td>int</td><td>The number of hosts in the group that are pending</td></tr>
<tr><td>hostgroup_num_hosts_unreach</td><td>int</td><td>The number of hosts in the group that are unreachable</td></tr>
<tr><td>hostgroup_num_hosts_up</td><td>int</td><td>The number of hosts in the group that are up</td></tr>
<tr><td>hostgroup_num_services</td><td>int</td><td>The total number of services of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_crit</td><td>int</td><td>The total number of services with the state CRIT of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_hard_crit</td><td>int</td><td>The total number of services with the state CRIT of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_hard_ok</td><td>int</td><td>The total number of services with the state OK of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_hard_unknown</td><td>int</td><td>The total number of services with the state UNKNOWN of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_hard_warn</td><td>int</td><td>The total number of services with the state WARN of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_ok</td><td>int</td><td>The total number of services with the state OK of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_pending</td><td>int</td><td>The total number of services with the state Pending of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_unknown</td><td>int</td><td>The total number of services with the state UNKNOWN of hosts in this group</td></tr>
<tr><td>hostgroup_num_services_warn</td><td>int</td><td>The total number of services with the state WARN of hosts in this group</td></tr>
<tr><td>hostgroup_worst_host_state</td><td>int</td><td>The worst state of all of the groups' hosts (UP <= UNREACHABLE <= DOWN)</td></tr>
<tr><td>hostgroup_worst_service_hard_state</td><td>int</td><td>The worst state of all services that belong to a host of this group (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
<tr><td>hostgroup_worst_service_state</td><td>int</td><td>The worst state of all services that belong to a host of this group (OK <= WARN <= UNKNOWN <= CRIT)</td></tr>
<tr><td>hourly_value</td><td>int</td><td>Hourly Value</td></tr>
<tr><td>icon_image</td><td>string</td><td>The name of an image to be used as icon in the web interface</td></tr>
<tr><td>icon_image_alt</td><td>string</td><td>An alternative text for the icon_image for browsers not displaying icons</td></tr>
<tr><td>icon_image_expanded</td><td>string</td><td>The icon_image with (the most important) macros expanded</td></tr>
<tr><td>id</td><td>int</td><td>Service id</td></tr>
<tr><td>in_check_period</td><td>int</td><td>Whether the service is currently in its check period (0/1)</td></tr>
<tr><td>in_notification_period</td><td>int</td><td>Whether the service is currently in its notification period (0/1)</td></tr>
<tr><td>initial_state</td><td>int</td><td>The initial state of the service</td></tr>
<tr><td>is_executing</td><td>int</td><td>is there a service check currently running... (0/1)</td></tr>
<tr><td>is_flapping</td><td>int</td><td>Whether the service is flapping (0/1)</td></tr>
<tr><td>last_check</td><td>time</td><td>The time of the last check (Unix timestamp)</td></tr>
<tr><td>last_hard_state</td><td>int</td><td>The last hard state of the service</td></tr>
<tr><td>last_hard_state_change</td><td>time</td><td>The time of the last hard state change (Unix timestamp)</td></tr>
<tr><td>last_notification</td><td>time</td><td>The time of the last notification (Unix timestamp)</td></tr>
<tr><td>last_state</td><td>int</td><td>The last state of the service</td></tr>
<tr><td>last_state_change</td><td>time</td><td>The time of the last state change (Unix timestamp)</td></tr>
<tr><td>last_time_critical</td><td>time</td><td>The last time the service was CRITICAL (Unix timestamp)</td></tr>
<tr><td>last_time_ok</td><td>time</td><td>The last time the service was OK (Unix timestamp)</td></tr>
<tr><td>last_time_unknown</td><td>time</td><td>The last time the service was UNKNOWN (Unix timestamp)</td></tr>
<tr><td>last_time_warning</td><td>time</td><td>The last time the service was in WARNING state (Unix timestamp)</td></tr>
<tr><td>latency</td><td>float</td><td>Time difference between scheduled check time and actual check time</td></tr>
<tr><td>long_plugin_output</td><td>string</td><td>Unabbreviated output of the last check plugin</td></tr>
<tr><td>low_flap_threshold</td><td>float</td><td>Low threshold of flap detection</td></tr>
<tr><td>max_check_attempts</td><td>int</td><td>The maximum number of check attempts</td></tr>
<tr><td>modified_attributes</td><td>int</td><td>A bitmask specifying which attributes have been modified</td></tr>
<tr><td>modified_attributes_list</td><td>list</td><td>A list of all modified attributes</td></tr>
<tr><td>next_check</td><td>time</td><td>The scheduled time of the next check (Unix timestamp)</td></tr>
<tr><td>next_notification</td><td>time</td><td>The time of the next notification (Unix timestamp)</td></tr>
<tr><td>no_more_notifications</td><td>int</td><td>Whether to stop sending notifications (0/1)</td></tr>
<tr><td>notes</td><td>string</td><td>Optional notes about the service</td></tr>
<tr><td>notes_expanded</td><td>string</td><td>The notes with (the most important) macros expanded</td></tr>
<tr><td>notes_url</td><td>string</td><td>An optional URL for additional notes about the service</td></tr>
<tr><td>notes_url_expanded</td><td>string</td><td>The notes_url with (the most important) macros expanded</td></tr>
<tr><td>notification_interval</td><td>float</td><td>Interval of periodic notification or 0 if its off</td></tr>
<tr><td>notification_period</td><td>string</td><td>The name of the notification period of the service. It this is empty, service problems are always notified.</td></tr>
<tr><td>notifications_enabled</td><td>int</td><td>Whether notifications are enabled for the service (0/1)</td></tr>
<tr><td>obsess</td><td>int</td><td>Whether 'obsess' is enabled for the service (0/1)</td></tr>
<tr><td>obsess_over_service</td><td>int</td><td>Whether 'obsess' is enabled for the service (0/1)</td></tr>
<tr><td>percent_state_change</td><td>float</td><td>Percent state change</td></tr>
<tr><td>perf_data</td><td>string</td><td>Performance data of the last check plugin</td></tr>
<tr><td>plugin_output</td><td>string</td><td>Output of the last check plugin</td></tr>
<tr><td>pnpgraph_present</td><td>int</td><td>Whether there is a PNP4Nagios graph present for this service (0/1)</td></tr>
<tr><td>process_performance_data</td><td>int</td><td>Whether processing of performance data is enabled for the service (0/1)</td></tr>
<tr><td>retry_interval</td><td>float</td><td>Number of basic interval lengths between checks when retrying after a soft error</td></tr>
<tr><td>scheduled_downtime_depth</td><td>int</td><td>The number of scheduled downtimes the service is currently in</td></tr>
<tr><td>should_be_scheduled</td><td>int</td><td>Whether Naemon still tries to run checks on this service (0/1)</td></tr>
<tr><td>state</td><td>int</td><td>The current state of the service (0: OK, 1: WARN, 2: CRITICAL, 3: UNKNOWN)</td></tr>
<tr><td>state_type</td><td>int</td><td>The type of the current state (0: soft, 1: hard)</td></tr>
</table>


#### status

<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'><tr><th data-defaultsort='asc'>Column</th>
    <th data-sort='true'>Type</th>
    <th data-sort='true'>Description</th>
</tr>
<tr><td>accept_passive_host_checks</td><td>int</td><td>Whether passive host checks are accepted in general (0/1)</td></tr>
<tr><td>accept_passive_service_checks</td><td>int</td><td>Whether passive service checks are activated in general (0/1)</td></tr>
<tr><td>cached_log_messages</td><td>int</td><td>The current number of log messages MK Livestatus keeps in memory</td></tr>
<tr><td>check_external_commands</td><td>int</td><td>Whether Naemon checks for external commands at its command pipe (0/1)</td></tr>
<tr><td>check_host_freshness</td><td>int</td><td>Whether host freshness checking is activated in general (0/1)</td></tr>
<tr><td>check_service_freshness</td><td>int</td><td>Whether service freshness checking is activated in general (0/1)</td></tr>
<tr><td>connections</td><td>int</td><td>The number of client connections to Livestatus since program start</td></tr>
<tr><td>connections_rate</td><td>float</td><td>The averaged number of new client connections to Livestatus per second</td></tr>
<tr><td>enable_event_handlers</td><td>int</td><td>Whether event handlers are activated in general (0/1)</td></tr>
<tr><td>enable_flap_detection</td><td>int</td><td>Whether flap detection is activated in general (0/1)</td></tr>
<tr><td>enable_notifications</td><td>int</td><td>Whether notifications are enabled in general (0/1)</td></tr>
<tr><td>execute_host_checks</td><td>int</td><td>Whether host checks are executed in general (0/1)</td></tr>
<tr><td>execute_service_checks</td><td>int</td><td>Whether active service checks are activated in general (0/1)</td></tr>
<tr><td>forks</td><td>int</td><td>The number of process creations since program start</td></tr>
<tr><td>forks_rate</td><td>float</td><td>the averaged number of forks checks per second</td></tr>
<tr><td>host_checks</td><td>int</td><td>The number of host checks since program start</td></tr>
<tr><td>host_checks_rate</td><td>float</td><td>the averaged number of host checks per second</td></tr>
<tr><td>interval_length</td><td>int</td><td>The default interval length from naemon.cfg</td></tr>
<tr><td>last_command_check</td><td>time</td><td>The time of the last check for a command as UNIX timestamp (deprecated)</td></tr>
<tr><td>last_log_rotation</td><td>time</td><td>Time time of the last log file rotation</td></tr>
<tr><td>livecheck_overflows</td><td>int</td><td>The number of times a check could not be executed because now livecheck helper was free</td></tr>
<tr><td>livecheck_overflows_rate</td><td>float</td><td>The number of livecheck overflows per second</td></tr>
<tr><td>livechecks</td><td>int</td><td>The number of checks executed via livecheck</td></tr>
<tr><td>livechecks_rate</td><td>float</td><td>The averaged number of livechecks executed per second</td></tr>
<tr><td>livestatus_version</td><td>string</td><td>The version of the MK Livestatus module</td></tr>
<tr><td>log_messages</td><td>int</td><td>The number of new log messages since program start</td></tr>
<tr><td>log_messages_rate</td><td>float</td><td>the averaged number of new log messages per second</td></tr>
<tr><td>nagios_pid</td><td>int</td><td>The process ID of the Naemon main process</td></tr>
<tr><td>neb_callbacks</td><td>int</td><td>The number of NEB call backs since program start</td></tr>
<tr><td>neb_callbacks_rate</td><td>float</td><td>The averaged number of NEB call backs per second</td></tr>
<tr><td>num_hosts</td><td>int</td><td>The total number of hosts</td></tr>
<tr><td>num_services</td><td>int</td><td>The total number of services</td></tr>
<tr><td>obsess_over_hosts</td><td>int</td><td>Whether Naemon will obsess over host checks (0/1)</td></tr>
<tr><td>obsess_over_services</td><td>int</td><td>Whether Naemon will obsess over service checks and run the ocsp_command (0/1)</td></tr>
<tr><td>process_performance_data</td><td>int</td><td>Whether processing of performance data is activated in general (0/1)</td></tr>
<tr><td>program_start</td><td>time</td><td>The time of the last program start as UNIX timestamp</td></tr>
<tr><td>program_version</td><td>string</td><td>The version of the monitoring daemon</td></tr>
<tr><td>requests</td><td>int</td><td>The number of requests to Livestatus since program start</td></tr>
<tr><td>requests_rate</td><td>float</td><td>The averaged number of request to Livestatus per second</td></tr>
<tr><td>service_checks</td><td>int</td><td>The number of completed service checks since program start</td></tr>
<tr><td>service_checks_rate</td><td>float</td><td>The averaged number of service checks per second</td></tr>
</table>


#### timeperiods

<table class='table-bordered table-striped sortable table-condensed table-hover livestatus_table'><tr><th data-defaultsort='asc'>Column</th>
    <th data-sort='true'>Type</th>
    <th data-sort='true'>Description</th>
</tr>
<tr><td>alias</td><td>string</td><td>The alias of the timeperiod</td></tr>
<tr><td>id</td><td>int</td><td>Timeperiod id</td></tr>
<tr><td>in</td><td>int</td><td>Whether we are currently in this period (0/1)</td></tr>
<tr><td>name</td><td>string</td><td>The name of the timeperiod</td></tr>
</table>


