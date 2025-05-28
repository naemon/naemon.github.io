# Object Definitions

## See Also
- [Object Configuration Overview](configobject)
- [Object Tricks](objecttricks)
- [Object Inheritance](objectinheritance)
- [Custom Object Variables](customobjectvars)

## Introduction

One of the features of Naemon' object configuration format is that you can create object
definitions that inherit properties from other object definitions.

An explanation of how object inheritance works can be found [here](objectinheritance).

It is suggested that you familiarize yourself with object inheritance once you read
over the documentation presented below, as it will make the job of creating and
maintaining object definitions much easier than it otherwise would be.

> [!TIP]
> Also, read up on the [object tricks](objecttricks) that offer shortcuts
for otherwise tedious configuration tasks.


> [!NOTE]
> When creating and/or editing configuration files, keep the following in mind:
>
> 1. Lines that start with a `#` character are taken to be comments and are not processed
> 2. Directive names are case-sensitive
> 3. Characters that appear after a semicolon (`;`) (unless escaped by backslash `\`) in configuration lines are treated as comments and are not processed


## Retention Notes {#retention_notes}

It is important to point out that several directives in host, service, and contact
definitions may not be picked up by Naemon when you change them in your configuration files.
Object directives that can exhibit this behavior are marked with an
asterisk (<a href="#retention_notes" class="text-red">*</a>).
The reason for this behavior is due to the fact that Naemon chooses to honor
values stored in the [state retention file](configmain#state_retention_file) over
values found in the config files, assuming you have [state retention](configmain#retain_state_information) enabled
on a program-wide basis *and* the value of the directive is changed during
runtime with an [external command](configmain.html#check_external_commands).

One way to get around this problem is to disable the retention of non-status information
using the `retain_nonstatus_information` directive in the host, service, and contact definitions.
Disabling this directive will cause Naemon to take the initial values for these directives from your config files,
rather than from the state retention file when it (re)starts.



## Sample Configuration Files

> [!NOTE]
> Sample object configuration files are installed in the `/etc/naemon/conf.d/`
> directory when you follow the [quickstart installation guide](quickstart).



## Object Types

* [Host definitions](#host)
* [Host group definitions](#hostgroup)
* [Service definitions](#service)
* [Service group definitions](#servicegroup)
* [Contact definitions](#contact)
* [Contact group definitions](#contactgroup)
* [Time period definitions](#timeperiod)
* [Command definitions](#command)
* [Service dependency definitions](#servicedependency)
* [Service escalation definitions](#serviceescalation)
* [Host dependency definitions](#hostdependency)
* [Host escalation definitions](#hostescalation)



### Host Definition {#host}

#### Description

A host definition is used to define a physical server, workstation, device, etc. that resides on your network.

#### Definition Format

> [!IMPORTANT]
> Directives in red are required, while those in black are optional.

```js
define host {
    host_name                        host_name // [!code error]
    alias                            alias // [!code error]
    display_name                     display_name
    address                          address // [!code error]
    parents                          host_names
    hourly_value                     #
    hostgroups                       hostgroup_names
    check_command                    command_name
    initial_state                    [o,d,u]
    max_check_attempts               # // [!code error]
    check_interval                   #
    retry_interval                   #
    active_checks_enabled            [0/1]
    passive_checks_enabled           [0/1]
    check_period                     timeperiod_name // [!code error]
    obsess_over_host|obsess          [0/1]
    check_freshness                  [0/1]
    freshness_threshold              #
    event_handler                    command_name
    event_handler_enabled            [0/1]
    low_flap_threshold               #
    high_flap_threshold              #
    flap_detection_enabled           [0/1]
    flap_detection_options           [o,d,u]
    process_perf_data                [0/1]
    retain_status_information        [0/1]
    retain_nonstatus_information     [0/1]
    contacts                         contacts // [!code error]
    contact_groups                   contact_groups // [!code error]
    notification_interval            # // [!code error]
    first_notification_delay         #
    notification_period              timeperiod_name // [!code error]
    notification_options             [d,u,r,f,s]
    notifications_enabled            [0/1]
    stalking_options                 [o,d,u]
    notes                            note_string
    notes_url                        url
    action_url                       url
    icon_image                       image_file
    icon_image_alt                   alt_string
    vrml_image                       image_file
    statusmap_image                  image_file
    2d_coords                        x_coord,y_coord
    3d_coords                        x_coord,y_coord,z_coord
}
```

#### Example Definition

```
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
```

#### Directive Descriptions

<table>
<tbody>
<tr>
<td valign="top"><strong>host_name</strong>:</td>
<td>
This directive is used to define a short name used to identify the host.

It is used in host group and service definitions to reference this particular host.

Hosts can have multiple services (which are monitored) associated with them.

When used properly, the `$HOSTNAME$` [macro](macros) will contain this short name.
</td>
</tr>
<tr>
<td valign="top"><strong>alias</strong>:</td>
<td>
This directive is used to define a longer name or description used to identify the host.

It is provided in order to allow you to more easily identify a particular host.

When used properly, the `$HOSTALIAS$` [macro](macros) will contain this alias/description.
</td>
</tr>
<tr>
<td valign="top"><strong>address</strong>:</td>
<td>
This directive is used to define the address of the host.

Normally, this is an IP address, although it could really be anything you want (so long as it can be used to check the status of the host).

You can use a FQDN to identify the host instead of an IP address, but if DNS services are not available this could cause problems. When used properly, the `$HOSTADDRESS$` [macro](macros) will contain this address.

> [!NOTE]
> If you do not specify an address directive in a host definition, the name of the host will be used as its address.

A word of caution about doing this, however - if DNS fails, most of your service checks will fail because the plugins will be unable to resolve the host name.
</td>
</tr>
<tr>
<td valign="top"><strong>display_name</strong>:</td>
<td>
This directive is used to define an alternate name that should be displayed in the web interface for this host.

If not specified, this defaults to the value you specify for the `host_name` directive.
</td>
</tr>
<tr>
<td valign="top"><strong>parents</strong>:</td>
<td>
This directive is used to define a comma-delimited list of short names of the "parent" hosts for this particular host.

Parent hosts are typically routers, switches, firewalls, etc. that lie between the monitoring host and a remote hosts.

A router, switch, etc. which is closest to the remote host is considered to be that host's "parent".

Read the "Determining Status and Reachability of Network Hosts" document located [here](networkreachability) for more information. If this host is on the same network segment as the host doing the monitoring (without any intermediate routers, etc.) the host is considered to be on the local network and will not have a parent host.

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

This directive is used to identify the *short name(s)* of the [hostgroup(s)](#hostgroup) that the host belongs to.

Multiple hostgroups should be separated by commas.

This directive may be used as an alternative to (or in addition to) using the `members` directive in [hostgroup](#hostgroup) definitions.
</td>
</tr>
<tr>
<td valign="top"><strong>check_command</strong>:</td>
<td>
This directive is used to specify the *short name* of the [command](#command) that should be used to check if the host is up or down.

Typically, this command would try and ping the host to see if it is "alive".

The command must return a status of OK (0) or Naemon will assume the host is down.

If you leave this argument blank, the host will *not* be actively checked.

Thus, Naemon will likely always assume the host is up (it may show up as being in a "PENDING" state in the web interface).

This is useful if you are monitoring printers or other devices that are frequently turned off.

The maximum amount of time that the notification command can run is controlled by the [host_check_timeout](configmain#host_check_timeout) option.
</td>
</tr>
<tr>
<td valign="top"><strong>initial_state</strong>:</td>
<td>
By default Naemon will assume that all hosts are in UP states when it starts.

You can override the initial state for a host by using this directive.

Valid options are:
- `o` = UP
- `d` = DOWN
- `u` = UNREACHABLE

</td>
</tr>
<tr>
<td valign="top"><strong>max_check_attempts</strong>:</td>
<td>
This directive is used to define the number of times that Naemon will retry the host check command if it returns any state other than an OK state.

Setting this value to 1 will cause Naemon to generate an alert without retrying the host check.

> [!NOTE]
> If you do not want to check the status of the host, you must still set this to a minimum value of 1.

To bypass the host check, just leave the `check_command` option blank.
</td>
</tr>
<tr>
<td valign="top"><strong>check_interval</strong>:</td>
<td>

This directive is used to define the number of "time units" between regularly scheduled checks of the host.

Unless you've changed the [interval_length](configmain#interval_length) directive from the default value of 60, this number will mean minutes.

More information on can be found in the [host checks](hostchecks) documentation.

<strong>normal_check_interval</strong> is an alias for this directive.
</td>
</tr>
<tr>
<td valign="top"><strong>retry_interval</strong>:</td>
<td>
This directive is used to define the number of "time units" to wait before scheduling a re-check of the hosts.

Hosts are rescheduled at the retry interval when they have changed to a non-UP state.

Once the host has been retried `max_check_attempts` times without a change in its status, it will revert to being scheduled at its "normal" rate as defined by the `check_interval` value. Unless you've changed the [interval_length](configmain#interval_length) directive from the default value of 60, this number will mean minutes.

If set to `0`, the `check_interval` is used instead.

More information on can be found in the [host checks](hostchecks) documentation.

<strong>retry_check_interval</strong> is an alias for this directive.
</td>
</tr>
<tr>
<td valign="top"><strong>active_checks_enabled <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive is used to determine whether or not active checks (either regularly scheduled or on-demand) of this host are enabled. Values: `0` = disable active host checks, `1` = enable active host checks (default).

<strong>checks_enabled</strong> is an alias for this directive.
</td>
</tr>
<tr>
<td valign="top"><strong>passive_checks_enabled <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive is used to determine whether or not passive checks are enabled for this host. Values: `0` = disable passive host checks, `1` = enable passive host checks (default).

</td>
</tr>
<tr>
<td valign="top"><strong>check_period</strong>:</td>
<td>

This directive is used to specify the short name of the [time period](#timeperiod) during which active checks of this host can be made.

</td>
</tr>
<tr>
<td valign="top"><strong>obsess_over_host|obsess <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive determines whether or not checks for the host will be "obsessed" over using the [ochp_command](configmain#ochp_command).

</td>
</tr>
<tr>
<td valign="top"><strong>check_freshness <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive is used to determine whether or not [freshness checks](freshness) are enabled for this host. Values: `0` = disable freshness checks, `1` = enable freshness checks (default).
</td>
</tr>
<tr>
<td valign="top"><strong>freshness_threshold</strong>:</td>
<td>
This directive is used to specify the freshness threshold (in seconds) for this host.

If you set this directive to a value of `0`, Naemon will determine a freshness threshold to use automatically.
</td>
</tr>
<tr>
<td valign="top"><strong>event_handler</strong>:</td>
<td>

This directive is used to specify the *short name* of the [command](#command) that should be run whenever a change in the state of the host is detected (i.e. whenever it goes down or recovers).

Read the documentation on
[event handlers](eventhandlers) for a more detailed explanation of how to write scripts for handling events.

The maximum amount of time that the event handler command can run is controlled by the [event_handler_timeout](configmain#event_handler_timeout) option.

</td>
</tr>
<tr>
<td valign="top"><strong>event_handler_enabled <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive is used to determine whether or not the event handler for this host is enabled. Values: `0` = disable host event handler, `1` = enable host event handler.
</td>
</tr>
<tr>
<td valign="top"><strong>low_flap_threshold</strong>:</td>
<td>

This directive is used to specify the low state change threshold used in flap detection for this host.

More information on flap detection can be found [here](flapping).

If you set this directive to a value of `0`, the program-wide value specified by the [low_host_flap_threshold](configmain#low_host_flap_threshold) directive will be used.
</td>
</tr>
<tr>
<td valign="top"><strong>high_flap_threshold</strong>:</td>
<td>

This directive is used to specify the high state change threshold used in flap detection for this host.

More information on flap detection can be found [here](flapping).

If you set this directive to a value of `0`, the program-wide value specified by the [high_host_flap_threshold](configmain#high_host_flap_threshold) directive will be used.
</td>
</tr>
<tr>
<td valign="top"><strong>flap_detection_enabled <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive is used to determine whether or not flap detection is enabled for this host.

More information on flap detection can be found [here](flapping). Values: `0` = disable host flap detection, `1` = enable host flap detection.
</td>
</tr>
<tr>
<td valign="top"><strong>flap_detection_options</strong>:</td>
<td>

This directive is used to determine what host states the [flap detection logic](flapping) will use for this host.

Valid options are a combination of one or more of the following:
- `o` = UP states
- `d` = DOWN states
- `u` = UNREACHABLE states
-
</td>
</tr>

<tr>
<td valign="top"><strong>process_perf_data <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive is used to determine whether or not the processing of performance data is enabled for this host.

Values: `0` = disable performance data processing, `1` = enable performance data processing.

</td>
</tr>
<tr>
<td valign="top"><strong>retain_status_information</strong>:</td>
<td>
This directive is used to determine whether or not status-related information about the host is retained across program restarts.

This is only useful if you have enabled state retention using the [retain_state_information](configmain#retain_state_information) directive.

Value: `0` = disable status information retention, `1` = enable status information retention.

</td>
</tr>
<tr>
<td valign="top"><strong>retain_nonstatus_information</strong>:</td>
<td>
This directive is used to determine whether or not non-status information about the host is retained across program restarts.

This is only useful if you have enabled state retention using the [retain_state_information](configmain#retain_state_information) directive.

Value: `0` = disable non-status information retention, `1` = enable non-status information retention.

</td>
</tr>
<tr>
<td valign="top"><strong>contacts</strong>:</td>
<td>
This is a list of the *short names* of the [contacts](#contact) that should be notified whenever there are problems (or recoveries) with this host.

Multiple contacts should be separated by commas.

Useful if you want notifications to go to just a few people and don't want to configure [contact groups](#contactgroup).

You must specify at least one contact or contact group in each host definition.
</td>
</tr>
<tr>
<td valign="top"><strong>contact_groups</strong>:</td>
<td>

This is a list of the *short names* of the [contact groups](#contactgroup) that should be notified whenever there are problems (or recoveries) with this host.

Multiple contact groups should be separated by commas.

You must specify at least one contact or contact group in each host definition.

</td>
</tr>
<tr>
<td valign="top"><strong>notification_interval</strong>:</td>
<td>

This directive is used to define the number of "time units" to wait before re-notifying a contact that this service is *still* down or unreachable.

Unless you've changed the [interval_length](configmain#interval_length) directive from the default value of `60`, this number will mean minutes.

If you set this value to `0`, Naemon will *not* re-notify contacts about problems for this host - only one problem notification will be sent out.

</td>
</tr>
<tr>
<td valign="top"><strong>first_notification_delay</strong>:</td>
<td>
This directive is used to define the number of "time units" to wait before sending out the first problem notification when this host enters a non-UP hard state.

Unless you've changed the [interval_length](configmain#interval_length) directive from the default value of `60`, this number will mean minutes.

If you set this value to `0`, Naemon will start sending out notifications immediately.

</td>
</tr>
<tr>
<td valign="top"><strong>notification_period</strong>:</td>
<td>
This directive is used to specify the short name of the [time period](#timeperiod) during which notifications of events for this host can be sent out to contacts.

If a host goes down, becomes unreachable, or recoveries during a time which is not covered by the time period, no notifications will be sent out.

</td>
</tr>
<tr>
<td valign="top"><strong>notification_options</strong>:</td>
<td>
This directive is used to determine when notifications for the host should be sent out.

Valid options are a combination of one or more of the following:
- `d` = send notifications on a DOWN state,
- `u` = send notifications on an UNREACHABLE state,
- `r` = send notifications on recoveries (OK state),
- `f` = send notifications when the host starts and stops [flapping](flapping) and
- `s` = send notifications when [scheduled downtime](downtime) starts and ends.

If you specify `n` (none) as an option, no host notifications will be sent out.

If you do not specify any notification options, Naemon will assume that you want notifications to be sent out for all possible states.

**Example:** If you specify `d,r` in this field, notifications will only be sent out when the host goes DOWN and when it recovers from a DOWN state.

</td>
</tr>
<tr>
<td valign="top"><strong>notifications_enabled <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive is used to determine whether or not notifications for this host are enabled. Values: `0` = disable host notifications, `1` = enable host notifications.

</td>
</tr>
<tr>
<td valign="top"><strong>stalking_options</strong>:</td>
<td>

This directive determines which host states "stalking" is enabled for.

Valid options are a combination of one or more of the following:
- `o` = stalk on UP states,
- `d` = stalk on DOWN states, and
- `u` = stalk on UNREACHABLE states.

More information on state stalking can be found [here](stalking).

</td>
</tr>
<tr>
<td valign="top"><strong>notes</strong>:</td>
<td>

This directive is used to define an optional string of notes pertaining to the host.

If you specify a note here, you will see the it in the [extended information](cgis#extinfo_cgi) CGI (when you are viewing information about the specified host).

</td>
</tr>
<tr>
<td valign="top"><strong>notes_url</strong>:</td>
<td>

This variable is used to define an optional URL that can be used to provide more information about the host.

If you specify an URL, you will see a red folder icon in the CGIs (when you are viewing host information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. `/naemon/cgi-bin/`).

This can be very useful if you want to make detailed information on the host, emergency contact methods, etc. available to other support staff.

</td>
</tr>
<tr>
<td valign="top"><strong>action_url</strong>:</td>
<td>

This directive is used to define an optional URL that can be used to provide more actions to be performed on the host.

If you specify an URL, you will see a red "splat" icon in the CGIs (when you are viewing host information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. `/naemon/cgi-bin/`).

</td>
</tr>
<tr>
<td valign="top"><strong>icon_image</strong>:</td>
<td>

This variable is used to define the name of a GIF, PNG, or JPG image that should be associated with this host.

This image will be displayed in the various places in the CGIs.

The image will look best if it is 40x40 pixels in size.

Images for hosts are assumed to be in the `logos/` subdirectory in your HTML images directory (i.e. `/usr/share/naemon/rootimages/logos`).

</td>
</tr>
<tr>
<td valign="top"><strong>icon_image_alt</strong>:</td>
<td>

This variable is used to define an optional string that is used in the ALT tag of the image specified by the `<icon_image>` argument.

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

This variable is used to define the name of an image that should be associated with this host in the [statusmap](cgis#statusmap_cgi) CGI.

You can specify a JPEG, PNG, and GIF image if you want, although using a GD2 format image is recommended, as other image formats requires more processing time when the statusmap image is generated.

GD2 images can be created from PNG images by using the **pngtogd2** utility supplied with Thomas Boutell's [gd library](http://www.boutell.com/gd/).

The GD2 images should be created in *uncompressed* format in order to minimize CPU load when the statusmap CGI is generating the network map image.

The image will look best if it is 40x40 pixels in size.

You can leave these option blank if you are not using the statusmap CGI.

Images for hosts are assumed to be in the `logos/` subdirectory in your HTML images directory (i.e. `/usr/share/naemon/rootimages/logos`).

</td>
</tr>
<tr>
<td valign="top"><strong>2d_coords</strong>:</td>
<td>

This variable is used to define coordinates to use when drawing the host in the [statusmap](cgis#statusmap_cgi) CGI.

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
</tbody>
</table>



### Host Group Definition {#hostgroup}

#### Description

A host group definition is used to group one or more hosts together for simplifying
configuration with [object tricks](objecttricks) or display purposes in the [CGIs](cgis).

#### Definition Format

> [!IMPORTANT]
> Directives in red are required, while those in black are optional.

```js
define hostgroup {
    hostgroup_name      hostgroup_name // [!code error]
    alias               alias // [!code error]
    members             hosts
    hostgroup_members   hostgroups
    notes               note_string
    notes_url           url
    action_url          url
}
```

#### Example Definition

```
define hostgroup {
    hostgroup_name      novell-servers
    alias               Novell Servers
    members             netware1,netware2,netware3,netware4
}
```


#### Directive Descriptions

<table>
<tbody>
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

This is a list of the *short names* of [hosts](#host) that should be included in this group.

 Multiple host names should be separated by commas.

This directive may be used as an alternative to (or in addition to) the `hostgroups` directive in [host definitions](#host).

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

If you specify a note here, you will see the it in the [extended information](cgis#extinfo_cgi) CGI (when you are viewing information about the specified host).

</td>
</tr>
<tr>
<td valign="top"><strong>notes_url</strong>:</td>
<td>

This variable is used to define an optional URL that can be used to provide more information about the host group.

If you specify an URL, you will see a red folder icon in the CGIs (when you are viewing hostgroup information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. `/naemon/cgi-bin/`).

This can be very useful if you want to make detailed information on the host group, emergency contact methods, etc. available to other support staff.

</td>
</tr>
<tr>
<td valign="top"><strong>action_url</strong>:</td>
<td>

This directive is used to define an optional URL that can be used to provide more actions to be performed on the host group.

If you specify an URL, you will see a red "splat" icon in the CGIs (when you are viewing hostgroup information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. `/naemon/cgi-bin/`).

</td>
</tr>
</tbody>
</table>



### Service Definition {#service}

#### Description

A service definition is used to identify a "service" that runs on a host.

The term "service" is used very loosely.

It can mean an actual service that runs on the host (POP, SMTP, HTTP, etc.) or some other type of metric associated with the host (response to a ping, number of logged in users, free disk space, etc.).

The different arguments to a service definition are outlined below.

#### Definition Format

> [!IMPORTANT]
> Directives in red are required, while those in black are optional.

```js
define service {
    host_name                       host_name // [!code error]
    hostgroup_name                  hostgroup_name
    service_description             service_description // [!code error]
    display_name                    display_name
    parents	                        single service_description or list of host_name,service_description
    hourly_value                    #
    servicegroups                   servicegroup_names
    is_volatile                     [0/1]
    check_command                   command_name // [!code error]
    initial_state                   [o,w,u,c]
    max_check_attempts              # // [!code error]
    check_interval                  # // [!code error]
    retry_interval                  # // [!code error]
    active_checks_enabled           [0/1]
    passive_checks_enabled          [0/1]
    check_period                    timeperiod_name // [!code error]
    obsess_over_service|obsess      [0/1]
    check_freshness                 [0/1]
    freshness_threshold             #
    event_handler                   command_name
    event_handler_enabled           [0/1]
    low_flap_threshold              #
    high_flap_threshold             #
    flap_detection_enabled          [0/1]
    flap_detection_options          [o,w,c,u]
    process_perf_data               [0/1]
    retain_status_information       [0/1]
    retain_nonstatus_information    [0/1]
    notification_interval           # // [!code error]
    first_notification_delay        #
    notification_period             timeperiod_name // [!code error]
    notification_options            [w,u,c,r,f,s]
    notifications_enabled           [0/1]
    contacts                        contacts // [!code error]
    contact_groups                  contact_groups // [!code error]
    stalking_options                [o,w,u,c]
    notes                           note_string
    notes_url                       url
    action_url                      url
    icon_image                      image_file
    icon_image_alt                  alt_string
}
```

#### Example Definition

```
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
```

#### Directive Descriptions

<table>
<tbody>
<tr>
<td valign="top"><strong>host_name</strong>:</td>
<td>

This directive is used to specify the *short name(s)* of the [host(s)](#host) that the service "runs" on or is associated with.

Multiple hosts should be separated by commas.

</td>
</tr>
<tr>
<td valign="top"><strong>hostgroup_name</strong>:</td>
<td>

This directive is used to specify the *short name(s)* of the [hostgroup(s)](#hostgroup) that the service "runs" on or is associated with.

Multiple hostgroups should be separated by commas.

The `hostgroup_name` may be used instead of, or in addition to, the `host_name` directive.

</td>
</tr>
<tr>
<td valign="top"><strong>service_description</strong>:</td>
<td>

This directive is used to define the description of the service, which may contain spaces, dashes, and colons (semicolons, apostrophes, and quotation marks should be avoided).

No two services associated with the same host can have the same description.

Services are uniquely identified with their `host_name` and `service_description` directives.
</td>
</tr>
<tr>
<td valign="top"><strong>display_name</strong>:</td>
<td>
This directive is used to define an alternate name that should be displayed in the web interface for this service.

If not specified, this defaults to the value you specify for the `service_description` directive.
</td>
</tr>
<tr>
<td valign="top"><strong>parents</strong>:</td>
<td>

This directive is used to define a comma-delimited list of short names of the "parent" services for this particular service. Parent services are typically other services that need to be available in order for a check of this service to occur. For example, if a service checks the status of a disk using SSH, the disk check service would have the SSH service as a parent. If the service has no parent services, simply omit the "parents" directive. More complex service dependencies may be specified with service dependency objects.

Valid option is either a single service description from the same host or a comma separated list of `host_name,servicedescription` tupel.
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

This directive is used to identify the *short name(s)* of the [servicegroup(s)](#servicegroup) that the service belongs to.

Multiple servicegroups should be separated by commas.

This directive may be used as an alternative to using the `members` directive in [servicegroup](#servicegroup) definitions.

</td>
</tr>
<tr>
<td valign="top"><strong>is_volatile</strong>:</td>
<td>
This directive is used to denote whether the service is "volatile".

Services are normally *not* volatile.

More information on volatile service and how they differ from normal services can be found [here](volatileservices).

Value: `0` = service is not volatile, `1` = service is volatile.

</td>
</tr>
<tr>
<td valign="top"><strong>check_command</strong>:</td>
<td>

This directive is used to specify the *short name* of the [command](#command) that Naemon will run in order to check the status of the service.

The maximum amount of time that the service check command can run is controlled by the [service_check_timeout](configmain#service_check_timeout) option.
</td>
</tr>
<tr>
<td valign="top"><strong>initial_state</strong>:</td>
<td>

By default Naemon will assume that all services are in OK states when it starts.

You can override the initial state for a service by using this directive.

Valid options are:
- `o` = OK,
- `w` = WARNING,
- `u` = UNKNOWN, and
- `c` = CRITICAL

</td>
</tr>
<tr>
<td valign="top"><strong>max_check_attempts</strong>:</td>
<td>

This directive is used to define the number of times that Naemon will retry the service check command if it returns any state other than an OK state.

Setting this value to `1` will cause Naemon to generate an alert without retrying the service check again.

</td>
</tr>
<tr>
<td valign="top"><strong>check_interval</strong>:</td>
<td>

This directive is used to define the number of "time units" to wait before scheduling the next "regular" check of the service.

"Regular" checks are those that occur when the service is in an OK state or when the service is in a non-OK state, but has already been rechecked `max_check_attempts` number of times.

Unless you've changed the [interval_length](configmain#interval_length) directive from the default value of 60, this number will mean minutes.

More information can be found in the [service checks](servicechecks) documentation.

<strong>normal_check_interval</strong> is an alias for this directive.
</td>
</tr>
<tr>
<td valign="top"><strong>retry_interval</strong>:</td>
<td>

This directive is used to define the number of "time units" to wait before scheduling a re-check of the service.

Services are rescheduled at the retry interval when they have changed to a non-OK state.

Once the service has been retried `max_check_attempts` times without a change in its status, it will revert to being scheduled at its "normal" rate as defined by the `check_interval` value. Unless you've changed the [interval_length](configmain#interval_length) directive from the default value of 60, this number will mean minutes.

If set to `0`, the `check_interval` is used instead.

More information can be found in the [service checks](servicechecks) documentation.

<strong>retry_check_interval</strong> is an alias for this directive.
</td>
</tr>
<tr>
<td valign="top"><strong>active_checks_enabled <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive is used to determine whether or not active checks of this service are enabled. Values: `0` = disable active service checks, `1` = enable active service checks (default).

<strong>checks_enabled</strong> is an alias for this directive.
</td>
</tr>
<tr>
<td valign="top"><strong>passive_checks_enabled <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive is used to determine whether or not passive checks of this service are enabled. Values: `0` = disable passive service checks, `1` = enable passive service checks (default).

</td>
</tr>
<tr>
<td valign="top"><strong>check_period</strong>:</td>
<td>

This directive is used to specify the short name of the [time period](#timeperiod) during which active checks of this service can be made.

</td>
</tr>
<tr>
<td valign="top"><strong>obsess_over_service|obsess <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive determines whether or not checks for the service will be "obsessed" over using the [ocsp_command](configmain#ochp_command).

</td>
</tr>
<tr>
<td valign="top"><strong>check_freshness <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive is used to determine whether or not [freshness checks](freshness) are enabled for this service. Values: `0` = disable freshness checks, `1` = enable freshness checks (default).

</td>
</tr>
<tr>
<td valign="top"><strong>freshness_threshold</strong>:</td>
<td>

This directive is used to specify the freshness threshold (in seconds) for this service.

If you set this directive to a value of `0`, Naemon will determine a freshness threshold to use automatically.

</td>
</tr>
<tr>
<td valign="top"><strong>event_handler</strong>:</td>
<td>

This directive is used to specify the *short name* of the [command](#command) that should be run whenever a change in the state of the service is detected (i.e. whenever it goes down or recovers).

Read the documentation on
[event handlers](eventhandlers) for a more detailed explanation of how to write scripts for handling events.

The maximum amount of time that the event handler command can run is controlled by the [event_handler_timeout](configmain#event_handler_timeout) option.

</td>
</tr>
<tr>
<td valign="top"><strong>event_handler_enabled <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive is used to determine whether or not the event handler for this service is enabled. Values: `0` = disable service event handler, `1` = enable service event handler.

</td>
</tr>
<tr>
<td valign="top"><strong>low_flap_threshold</strong>:</td>
<td>

This directive is used to specify the low state change threshold used in flap detection for this service.

More information on flap detection can be found [here](flapping).

If you set this directive to a value of `0`, the program-wide value specified by the [low_service_flap_threshold](configmain#low_service_flap_threshold) directive will be used.

</td>
</tr>
<tr>
<td valign="top"><strong>high_flap_threshold</strong>:</td>
<td>

This directive is used to specify the high state change threshold used in flap detection for this service.

More information on flap detection can be found [here](flapping).

If you set this directive to a value of `0`, the program-wide value specified by the [high_service_flap_threshold](configmain#high_service_flap_threshold) directive will be used.

</td>
</tr>
<tr>
<td valign="top"><strong>flap_detection_enabled <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive is used to determine whether or not flap detection is enabled for this service.

More information on flap detection can be found [here](flapping). Values: `0` = disable service flap detection, `1` = enable service flap detection.

</td>
</tr>
<tr>
<td valign="top"><strong>flap_detection_options</strong>:</td>
<td>

This directive is used to determine what service states the [flap detection logic](flapping) will use for this service.

Valid options are a combination of one or more of the following: <b>o</b> = OK states, <b>w</b> = WARNING states, <b>c</b> = CRITICAL states, <b>u</b> = UNKNOWN states.

</td>
</tr>

<tr>
<td valign="top"><strong>process_perf_data <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive is used to determine whether or not the processing of performance data is enabled for this service.

Values: `0` = disable performance data processing, `1` = enable performance data processing.

</td>
</tr>
<tr>
<td valign="top"><strong>retain_status_information</strong>:</td>
<td>

This directive is used to determine whether or not status-related information about the service is retained across program restarts.

This is only useful if you have enabled state retention using the [retain_state_information](configmain#retain_state_information) directive.

Value: `0` = disable status information retention, `1` = enable status information retention.

</td>
</tr>
<tr>
<td valign="top"><strong>retain_nonstatus_information</strong>:</td>
<td>

This directive is used to determine whether or not non-status information about the service is retained across program restarts.

This is only useful if you have enabled state retention using the [retain_state_information](configmain#retain_state_information) directive.

Value: `0` = disable non-status information retention, `1` = enable non-status information retention.

</td>
</tr>
<tr>
<td valign="top"><strong>notification_interval</strong>:</td>
<td>

This directive is used to define the number of "time units" to wait before re-notifying a contact that this service is *still* in a non-OK state.

Unless you've changed the [interval_length](configmain#interval_length) directive from the default value of 60, this number will mean minutes.

If you set this value to `0`, Naemon will *not* re-notify contacts about problems for this service - only one problem notification will be sent out.

</td>
</tr>
<tr>
<td valign="top"><strong>first_notification_delay</strong>:</td>
<td>

This directive is used to define the number of "time units" to wait before sending out the first problem notification when this service enters a non-OK state.

Unless you've changed the [interval_length](configmain#interval_length) directive from the default value of 60, this number will mean minutes.

If you set this value to `0`, Naemon will start sending out notifications immediately.

</td>
</tr>
<tr>
<td valign="top"><strong>notification_period</strong>:</td>
<td>

This directive is used to specify the short name of the [time period](#timeperiod) during which notifications of events for this service can be sent out to contacts.

No service notifications will be sent out during times which is not covered by the time period.

</td>
</tr>
<tr>
<td valign="top"><strong>notification_options</strong>:</td>
<td>

This directive is used to determine when notifications for the service should be sent out.

Valid options are a combination of one or more of the following:
- `w` = send notifications on a WARNING state,
- `u` = send notifications on an UNKNOWN state,
- `c` = send notifications on a CRITICAL state,
- `r` = send notifications on recoveries (OK state),
- `f` = send notifications when the service starts and stops [flapping](flapping), and
- `s` = send notifications when [scheduled downtime](downtime) starts and ends.

If you specify `n` (none) as an option, no service notifications will be sent out.

If you do not specify any notification options, Naemon will assume that you want notifications to be sent out for all possible states.

**Example:** If you specify `w,r` in this field, notifications will only be sent out when the service goes into a WARNING state and when it recovers from a WARNING state.

</td>
</tr>
<tr>
<td valign="top"><strong>notifications_enabled <a href="#retention_notes" class="text-red">*</a></strong>:</td>
<td>

This directive is used to determine whether or not notifications for this service are enabled. Values: `0` = disable service notifications, `1` = enable service notifications.

</td>
</tr>
<tr>
<td valign="top"><strong>contacts</strong>:</td>
<td>

This is a list of the *short names* of the [contacts](#contact) that should be notified whenever there are problems (or recoveries) with this service.

Multiple contacts should be separated by commas.

Useful if you want notifications to go to just a few people and don't want to configure [contact groups](#contactgroup).

You must specify at least one contact or contact group in each service definition.

</td>
</tr>
<tr>
<td valign="top"><strong>contact_groups</strong>:</td>
<td>

This is a list of the *short names* of the [contact groups](#contactgroup) that should be notified whenever there are problems (or recoveries) with this service.

Multiple contact groups should be separated by commas.

You must specify at least one contact or contact group in each service definition.

</td>
</tr>
<tr>
<td valign="top"><strong>stalking_options</strong>:</td>
<td>

This directive determines which service states "stalking" is enabled for.

Valid options are a combination of one or more of the following:
- `o` = stalk on OK states,
- `w` = stalk on WARNING states,
- `u` = stalk on UNKNOWN states, and
- `c` = stalk on CRITICAL states

More information on state stalking can be found [here](stalking).

</td>
</tr>
<tr>
<td valign="top"><strong>notes</strong>:</td>
<td>

This directive is used to define an optional string of notes pertaining to the service.

If you specify a note here, you will see the it in the [extended information](cgis#extinfo_cgi) CGI (when you are viewing information about the specified service).

</td>
</tr>
<tr>
<td valign="top"><strong>notes_url</strong>:</td>
<td>

This directive is used to define an optional URL that can be used to provide more information about the service.

If you specify an URL, you will see a red folder icon in the CGIs (when you are viewing service information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. `/naemon/cgi-bin/`).

This can be very useful if you want to make detailed information on the service, emergency contact methods, etc. available to other support staff.

</td>
</tr>
<tr>
<td valign="top"><strong>action_url</strong>:</td>
<td>

This directive is used to define an optional URL that can be used to provide more actions to be performed on the service.

If you specify an URL, you will see a red "splat" icon in the CGIs (when you are viewing service information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. `/naemon/cgi-bin/`).

</td>
</tr>
<tr>
<td valign="top"><strong>icon_image</strong>:</td>
<td>

This variable is used to define the name of a GIF, PNG, or JPG image that should be associated with this service.

This image will be displayed in the [status](cgis#status_cgi) and [extended information](cgis#extinfo_cgi) CGIs.

The image will look best if it is 40x40 pixels in size.

Images for services are assumed to be in the `logos/` subdirectory in your HTML images directory (i.e. `/usr/share/naemon/rootimages/logos`).

</td>
</tr>
<tr>
<td valign="top"><strong>icon_image_alt</strong>:</td>
<td>

This variable is used to define an optional string that is used in the ALT tag of the image specified by the `<icon_image>` argument.

The ALT tag is used in the [status](cgis#status_cgi), [extended information](cgis#extinfo_cgi) and [statusmap](cgis#statusmap_cgi) CGIs.

</td>
</tr>
</tbody>
</table>



### Service Group Definition {#servicegroup}

#### Description

A service group definition is used to group one or more services together for simplifying
configuration with [object tricks](objecttricks) or display purposes in the [CGIs](cgis).


#### Definition Format

> [!IMPORTANT]
> Directives in red are required, while those in black are optional.

```js
define servicegroup {
    servicegroup_name       servicegroup_name // [!code error]
    alias                   alias // [!code error]
    members                 services
    servicegroup_members    servicegroups
    notes                   note_string
    notes_url               url
    action_url              url
}
```


#### Example Definition

```
define servicegroup{
    servicegroup_name       dbservices
    alias                   Database Services
    members                 ms1,SQL Server,ms1,SQL Server Agent,ms1,SQL DTC
}
```


#### Directive Descriptions

<table>
<tbody>
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

This is a list of the *descriptions* of [services](#service) (and the names of their corresponding hosts) that should be included in this group.

Host and service names should be separated by commas.

This directive may be used as an alternative to the `servicegroups` directive in [service definitions](#service).

The format of the member directive is as follows (note that a host name must precede a service name/description):

```
members=<host1>,<service1>,<host2>,<service2>,...,<hostn>,<servicen>
```

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

If you specify a note here, you will see the it in the [extended information](cgis#extinfo_cgi) CGI (when you are viewing information about the specified service group).

</td>
</tr>
<tr>
<td valign="top"><strong>notes_url</strong>:</td>
<td>

This directive is used to define an optional URL that can be used to provide more information about the service group.

If you specify an URL, you will see a red folder icon in the CGIs (when you are viewing service group information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. `/naemon/cgi-bin/`).

This can be very useful if you want to make detailed information on the service group, emergency contact methods, etc. available to other support staff.

</td>
</tr>
<tr>
<td valign="top"><strong>action_url</strong>:</td>
<td>

This directive is used to define an optional URL that can be used to provide more actions to be performed on the service group.

If you specify an URL, you will see a red "splat" icon in the CGIs (when you are viewing service group information) that links to the URL you specify here.

Any valid URL can be used.

If you plan on using relative paths, the base path will the the same as what is used to access the CGIs (i.e. `/naemon/cgi-bin/`).

</td>
</tr>
</tbody>
</table>


### Contact Definition {#contact}

#### Description
A contact definition is used to identify someone who should be contacted in the event of a problem on your network.
The different arguments to a contact definition are described below.

#### Definition Format

> [!IMPORTANT]
> Directives in red are required, while those in black are optional.

```js
define contact {
    contact_name                    contact_name // [!code error]
    alias                           alias
    contactgroups                   contactgroup_names
    minimum_value                   #
    host_notifications_enabled      [0/1] // [!code error]
    service_notifications_enabled   [0/1] // [!code error]
    host_notification_period        timeperiod_name // [!code error]
    service_notification_period     timeperiod_name // [!code error]
    host_notification_options       [d,u,r,f,s,n] // [!code error]
    service_notification_options    [w,u,c,r,f,s,n] // [!code error]
    host_notification_commands      command_name // [!code error]
    service_notification_commands   command_name // [!code error]
    email                           email_address
    pager                           pager_number or pager_email_gateway
    addressx                        additional_contact_address
    can_submit_commands             [0/1]
    retain_status_information       [0/1]
    retain_nonstatus_information    [0/1]
}
```

#### Example Definition

```
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
```

#### Directive Descriptions

<table>
<tbody>
<tr>
<td valign="top"><strong>contact_name</strong>:</td>
<td>
This directive is used to define a short name used to identify the contact.

It is referenced in [contact group](#contactgroup) definitions.

Under the right circumstances, the `$CONTACTNAME$` [macro](macros) will contain this value.

</td>
</tr>
<tr>
<td valign="top"><strong>alias</strong>:</td>
<td>

This directive is used to define a longer name or description for the contact.

Under the rights circumstances, the `$CONTACTALIAS$` [macro](macros) will contain this value.

If not specified, the `contact_name` will be used as the alias.
</td>
</tr>
<tr>
<td valign="top"><strong>contactgroups</strong>:</td>
<td>

This directive is used to identify the *short name(s)* of the [contactgroup(s)](#contactgroup) that the contact belongs to.

Multiple contactgroups should be separated by commas.

This directive may be used as an alternative to (or in addition to) using the `members` directive in [contactgroup](#contactgroup) definitions.

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

Values: `0` = don't send notifications, `1` = send notifications.

</td>
</tr>
<tr>
<td valign="top"><strong>service_notifications_enabled</strong>:</td>
<td>

This directive is used to determine whether or not the contact will receive notifications about service problems and recoveries.

Values: `0` = don't send notifications, `1` = send notifications.

</td>
</tr>
<tr>
<td valign="top"><strong>host_notification_period</strong>:</td>
<td>

This directive is used to specify the short name of the [time period](#timeperiod) during which the contact can be notified about host problems or recoveries.

You can think of this as an "on call" time for host notifications for the contact.

Read the documentation on [time periods](timeperiods) for more information on how this works and potential problems that may result from improper use.

</td>
</tr>
<tr>
<td valign="top"><strong>service_notification_period</strong>:</td>
<td>
This directive is used to specify the short name of the [time period](#timeperiod) during which the contact can be notified about service problems or recoveries.

You can think of this as an "on call" time for service notifications for the contact.

Read the documentation on [time periods](timeperiods) for more information on how this works and potential problems that may result from improper use.

</td>
</tr>
<tr>
<td valign="top"><strong>host_notification_commands</strong>:</td>
<td>

This directive is used to define a list of the *short names* of the [commands](#command) used to notify the contact of a *host* problem or recovery.

Multiple notification commands should be separated by commas.

All notification commands are executed when the contact needs to be notified.

The maximum amount of time that a notification command can run is controlled by the [notification_timeout](configmain#notification_timeout) option.

</td>
</tr>
<tr>
<td valign="top"><strong>host_notification_options</strong>:</td>
<td>

This directive is used to define the host states for which notifications can be sent out to this contact.

Valid options are a combination of one or more of the following:
- `d` = notify on DOWN host states,
- `u` = notify on UNREACHABLE host states,
- `r` = notify on host recoveries (UP states),
- `f` = notify when the host starts and stops [flapping](flapping), and
- `s` = send notifications when host or service [scheduled downtime](downtime) starts and ends.

If you specify `n` (none) as an option, the contact will not receive any type of host notifications.

</td>
</tr>
<tr>
<td valign="top"><strong>service_notification_options</strong>:</td>
<td>

This directive is used to define the service states for which notifications can be sent out to this contact.

Valid options are a combination of one or more of the following:
- `w` = notify on WARNING service states,
- `u` = notify on UNKNOWN service states,
- `c` = notify on CRITICAL service states,
- `r` = notify on service recoveries (OK states), and
- `f` = notify when the service starts and stops [flapping](flapping).

If you specify `n` (none) as an option, the contact will not receive any type of service notifications.

</td>
</tr>
<tr>
<td valign="top"><strong>service_notification_commands</strong>:</td>
<td>

This directive is used to define a list of the *short names* of the [commands](#command) used to notify the contact of a *service* problem or recovery.

Multiple notification commands should be separated by commas.

All notification commands are executed when the contact needs to be notified.

The maximum amount of time that a notification command can run is controlled by the [notification_timeout](configmain#notification_timeout) option.

</td>
</tr>
<tr>
<td valign="top"><strong>email</strong>:</td>
<td>
This directive is used to define an email address for the contact.

Depending on how you configure your notification commands, it can be used to send out an alert email to the contact.

Under the right circumstances, the `$CONTACTEMAIL$`
[macro](macros) will contain this value.

</td>
</tr>
<tr>
<td valign="top"><strong>pager</strong>:</td>
<td>

This directive is used to define a pager number for the contact.

It can also be an email address to a pager gateway
(i.e. `pagejoe@pagenet.com`).

Depending on how you configure your notification commands, it can be used to send out an alert page to the contact.

Under the right circumstances, the $CONTACTPAGER$ [macro](macros) will contain this value.

</td>
</tr>
<tr>
<td valign="top"><strong>address<i>x</i></strong>:</td>
<td>

Address directives are used to define additional "addresses" for the contact.

These addresses can be anything - cell phone numbers, instant messaging addresses, etc.

Depending on how you configure your notification commands, they can be used to send out an alert to the contact.

Up to six addresses can be defined using these directives (`address1` through `address6`). The `$CONTACTADDRESSx$` [macro](macros) will contain this value.

</td>
</tr>
<tr>
<td valign="top"><strong>can_submit_commands</strong>:</td>
<td>

This directive is used to determine whether or not the contact can submit [external commands](extcommands) to Naemon from the CGIs.

Values: `0` = don't allow contact to submit commands, `1` = allow contact to submit commands.

</td>
</tr>
<tr>
<td valign="top"><strong>retain_status_information</strong>:</td>
<td>

This directive is used to determine whether or not status-related information about the contact is retained across program restarts.

This is only useful if you have enabled state retention using the [retain_state_information](configmain#retain_state_information) directive.

Value: `0` = disable status information retention, `1` = enable status information retention.

</td>
</tr>
<tr>
<td valign="top"><strong>retain_nonstatus_information</strong>:</td>
<td>

This directive is used to determine whether or not non-status information about the contact is retained across program restarts.

This is only useful if you have enabled state retention using the [retain_state_information](configmain#retain_state_information) directive.

Value: `0` = disable non-status information retention, `1` = enable non-status information retention.

</td>
</tr>
</tbody>
</table>



### Contact Group Definition {#contactgroup}

#### Description

A contact group definition is used to group one or more [contacts](#contact)
together for the purpose of sending out alert/recovery <a href="notifications.html">notifications</a>.

#### Definition Format

> [!IMPORTANT]
> Directives in red are required, while those in black are optional.

```js
define contactgroup {
    contactgroup_name       contactgroup_name // [!code error]
    alias                   alias // [!code error]
    members                 contacts
    contactgroup_members    contactgroups
}
```


#### Example Definition

```
define contactgroup {
    contactgroup_name       novell-admins
    alias                   Novell Administrators
    members                 jdoe,rtobert,tzach
}
```


#### Directive Descriptions

<table>
<tbody>
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

This optional directive is used to define a list of the *short names* of [contacts](#contact) that should be included in this group.

 Multiple contact names should be separated by commas.

This directive may be used as an alternative to (or in addition to) using the `contactgroups` directive in [contacts](#contact) definitions.

</td>
</tr>
<tr>
<td valign="top"><strong>contactgroup_members</strong>:</td>
<td>

This optional directive can be used to include contacts from other "sub" contact groups in this contact group.

Specify a comma-delimited list of short names of other contact groups whose members should be included in this group.

</td>
</tr>
</tbody>
</table>


### Time Period Definition {#timeperiod}

#### Description

A time period is a list of times during various days that are considered to be
"valid" times for notifications and service checks. It consists of time ranges
for each day of the week that "rotate" once the week has come to an end.

Different types of exceptions to the normal weekly time are supported,
including: specific weekdays, days of generic months, days of specific months, and calendar dates.

#### Definition Format

> [!IMPORTANT]
> Directives in red are required, while those in black are optional.

```js
define timeperiod {
    timeperiod_name         timeperiod_name // [!code error]
    alias                   alias // [!code error]
    [weekday]               timeranges
    [exception]             timeranges
    exclude                 [timeperiod1,timeperiod2,...,timeperiodn]
}
```


#### Example Definitions

```
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
```

#### Directive Descriptions

<table>
<tbody>
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

The weekday directives (`sunday` through `saturday`)are comma-delimited lists of time ranges that are "valid" times for a particular day of the week.

Notice that there are seven different days for which you can define time ranges (Sunday through Saturday).

Each time range is in the form of `HH:MM-HH:MM`, where hours are specified on a 24 hour clock.

For example, `00:15-24:00` means 12:15am in the morning for this day until 12:00am midnight (a 23 hour, 45 minute total time range).

If you wish to exclude an entire day from the timeperiod, simply do not include it in the timeperiod definition.

</td>
</tr>
<tr>
<td valign="top"><strong>[<i>exception</i>]</strong>:</td>
<td>

You can specify several different types of exceptions to the standard rotating weekday schedule.

Exceptions can take a number of different forms including single days of a specific or generic month, single weekdays in a month, or single calendar dates.

You can also specify a range of days/dates and even specify skip intervals to obtain functionality described by "every 3 days between these dates".

Rather than list all the possible formats for exception strings, I'll let you look at the example timeperiod definitions above to see what's possible. <i class="fa-solid fa-face-smile"></i>

Weekdays and different types of exceptions all have different levels of precedence, so its important to understand how they can affect each other.

More information on this can be found in the documentation on [timeperiods](timeperiods).

</td>
</tr>
<tr>
<td valign="top"><strong>exclude</strong>:</td>
<td>

This directive is used to specify the short names of other timeperiod definitions whose time ranges should be excluded from this timeperiod.

Multiple timeperiod names should be separated with a comma.

</td>
</tr>
</tbody>
</table>



### Command Definition {#command}

#### Description

A command definition is just that.

It defines a command.

Commands that can be defined include service checks, service notifications, service event
handlers, host checks, host notifications, and host event handlers.

Command definitions can contain [macros](macros), but you must
make sure that you include only those macros that are "valid" for the circumstances
when the command will be used.

More information on what macros are available and when they are "valid" can be
found [here](macros). The different arguments to a command definition are outlined below.



#### Definition Format

> [!IMPORTANT]
> Directives in red are required, while those in black are optional.

```js
define command {
    command_name        command_name // [!code error]
    command_line        command_line // [!code error]
}
```

#### Example Definition

```
define command {
    command_name        check_pop
    command_line        /usr/lib/naemon/plugins/check_pop -H $HOSTADDRESS$
}
```


#### Directive Descriptions

<table>
<tbody>
<tr>
<td valign="top"><strong>command_name</strong>:</td>
<td>

This directive is the short name used to identify the command.

It is referenced in [contact](#contact), [host](#host), and [service](#service) definitions (in notification, check, and event handler directives), among other places.

</td>
</tr>
<tr>
<td valign="top"><strong>command_line</strong>:</td>
<td>

This directive is used to define what is actually executed by Naemon when the command is used for service or host checks, notifications, or [event handlers](eventhandlers). Before the command line is executed, all valid [macros](macros) are replaced with their respective values.

See the documentation on macros for determining when you can use different macros.

Note that the command line is *not* surrounded in quotes.

Also, if you want to pass a dollar sign (`$`) on the command line, you have to escape it with another dollar sign.

> [!TIP]
> You may not include a **semicolon** (`;`) in the `command_line` directive, because everything after it will be ignored as a config file comment.

It is possible to escape semicolons with a backslash.

You can work around this limitation by setting one of the [$USER$](macrolist#user) macros in your
[resource file](configmain#resource_file) to a semicolon and then referencing the appropriate `$USER$` macro in the `command_line` directive in place of the semicolon.

If you want to pass arguments to commands during runtime, you can use [$ARGn$ macros](macrolist#arg) in the `command_line` directive of the command definition and then separate individual arguments from the command name (and from each other) using bang (`!`) characters in the object definition directive (host check command, service event handler command, etc) that references the command.

More information on how arguments in command definitions are processed during runtime can be found in the documentation on [macros](macros).

</td>
</tr>
</tbody>
</table>


### Service Dependency Definition {#servicedependency}

#### Description

Service dependencies are an advanced feature of Naemon that allow you to suppress
notifications and active checks of services based on the status of one or more other services.

Service dependencies are optional and are mainly targeted at advanced users
who have complicated monitoring setups.

More information on how service dependencies work (read this!) can be
found [here](dependencies).


#### Definition Format

> [!TIP]Directives in red are required, while those in black are optional.
> However, you must supply at least one type of criteria for the definition to be of much use.

```js
define servicedependency {
    dependent_host_name                 host_name // [!code error]
    dependent_hostgroup_name            hostgroup_name
    servicegroup_name                   servicegroup_name
    dependent_servicegroup_name         servicegroup_name
    dependent_service_description       service_description // [!code error]
    host_name                           host_name // [!code error]
    hostgroup_name                      hostgroup_name
    service_description                 service_description // [!code error]
    inherits_parent                     [0/1]
    execution_failure_criteria          [o,w,u,c,p,n]
    notification_failure_criteria       [o,w,u,c,p,n]
    dependency_period                   timeperiod_name
}
```

#### Example Definition

```
define servicedependency {
    host_name                           WWW1
    service_description                 Apache Web Server
    dependent_host_name                 WWW1
    dependent_service_description       Main Web Site
    execution_failure_criteria          n
    notification_failure_criteria       w,u,c
}
```


#### Directive Descriptions

<table>
<tbody>
<tr>
<td valign="top"><strong>dependent_host_name</strong>:</td>
<td>

This directive is used to identify the *short name(s)* of the [host(s)](#host) that the *dependent* service "runs" on or is associated with.

Multiple hosts should be separated by commas.

Leaving this directive blank can be used to create ["same host" dependencies](objecttricks#same_host_dependency).

</td>
</tr>
<tr>
<td valign="top"><strong>dependent_hostgroup_name</strong>:</td>
<td>

This directive is used to specify the *short name(s)* of the [hostgroup(s)](#hostgroup) that the *dependent* service "runs" on or is associated with.

Multiple hostgroups should be separated by commas.

The dependent_hostgroup may be used instead of, or in addition to, the dependent_host directive.

</td>
</tr>
<tr>
<td valign="top"><strong>servicegroup_name</strong>:</td>
<td>

This directive is used to specify the *short name(s)* of the [servicegroup(s)](#servicegroup) that will inherit the dependency. Multiple servicegroups should be separated by commas.

</td>
</tr>
<tr>
<td valign="top"><strong>dependent_servicegroup_name</strong>:</td>
<td>

This directive is used to specify the *short name(s)* of the [servicegroup(s)](#servicegroup) that the dependent service "runs" on or is associated with. Multiple servicegroups should be separated by commas.

</td>
</tr>
<tr>
<td valign="top"><strong>dependent_service_description</strong>:</td>
<td>

This directive is used to identify the `description(s)` of the *dependent* [service(s)](#service). Multiple servics should be separated by commas.

</td>
</tr>
<tr>
<td valign="top"><strong>host_name</strong>:</td>
<td>

This directive is used to identify the *short name(s)* of the [host(s)](#host) that the service *that is being depended upon* (also referred to as the master service) "runs" on or is associated with.

Multiple hosts should be separated by commas.

</td>
</tr>
<tr>
<td valign="top"><strong>hostgroup_name</strong>:</td>
<td>

This directive is used to identify the *short name(s)* of the [hostgroup(s)](#hostgroup) that the service *that is being depended upon* (also referred to as the master service) "runs" on or is associated with.

Multiple hostgroups should be separated by commas.

The hostgroup_name may be used instead of, or in addition to, the host_name directive.

</td>
</tr>
<tr>
<td valign="top"><strong>service_description</strong>:</td>
<td>

This directive is used to identify the `description` of the [service](#service) *that is being depended upon* (also referred to as the master service).

</td>
</tr>
<tr>
<td valign="top"><strong>inherits_parent</strong>:</td>
<td>

This directive indicates whether or not the dependency inherits dependencies of the service *that is being depended upon* (also referred to as the master service).

In other words, if the master service is dependent upon other services and any one of those dependencies fail, this dependency will also fail.

</td>
</tr>
<tr>
<td valign="top"><strong>execution_failure_criteria</strong>:</td>
<td>

This directive is used to specify the criteria that determine when the dependent service should *not* be actively checked.

If the *master* service is in one of the failure states we specify, the *dependent* service will not be actively checked.

Valid options are a combination of one or more of the following (multiple options are separated with commas):
- `o` = fail on an OK state,
- `w` = fail on a WARNING state,
- `u` = fail on an UNKNOWN state,
- `c` = fail on a CRITICAL state, and
- `p` = fail on a pending state (e.g. the service has not yet been checked).

If you specify `n<` (none) as an option, the execution dependency will never fail and checks of the dependent service will always be actively checked (if other conditions allow for it to be).

**Example:** If you specify `o,c,u` in this field, the *dependent* service will not be actively checked if the *master* service is in either an OK, a CRITICAL, or an UNKNOWN state.

</td>
</tr>
<tr>
<td valign="top"><strong>notification_failure_criteria</strong>:</td>
<td>

This directive is used to define the criteria that determine when notifications for the dependent service should *not* be sent out.

If the *master* service is in one of the failure states we specify, notifications for the *dependent* service will not be sent to contacts.

Valid options are a combination of one or more of the following:
- `o` = fail on an OK state,
- `w` = fail on a WARNING state,
- `u` = fail on an UNKNOWN state,
- `c`= fail on a CRITICAL state, and
- `p` = fail on a pending state (e.g. the service has not yet been checked).

If you specify `n` (none) as an option, the notification dependency will never fail and notifications for the dependent service will always be sent out.

**Example:** If you specify `w` in this field, the notifications for the *dependent* service will not be sent out if the *master* service is in a WARNING state.

</td>
</tr>
<tr>
<td valign="top"><strong>dependency_period</strong>:</td>
<td>

This directive is used to specify the short name of the [time period](#timeperiod) during which this dependency is valid.

If this directive is not specified, the dependency is considered to be valid during all times.

</td>
</tr>
</tbody>
</table>



### Service Escalation Definition {#serviceescalation}

#### Description

Service escalations are *completely optional* and are used to escalate notifications for a particular service.

More information on how notification escalations work can be found <a href="escalations.html">here</a>.

#### Definition Format

> [!IMPORTANT]
> Directives in red are required, while those in black are optional.

```js
define serviceescalation {
	host_name               host_name // [!code error]
	hostgroup_name          hostgroup_name
	service_description     service_description // [!code error]
	contacts                contacts // [!code error]
	contact_groups	        contactgroup_name // [!code error]
	first_notification      # // [!code error]
	last_notification       # // [!code error]
	notification_interval   # // [!code error]
	escalation_period       timeperiod_name
	escalation_options      [w,u,c,r]
}
```

#### Example Definition

```
define serviceescalation {
    host_name               nt-3
    service_description     Processor Load
    first_notification      4
    last_notification       0
    notification_interval   30
    contact_groups          all-nt-admins,themanagers
}
```

#### Directive Descriptions

<table>
<tbody>
<tr>
<td valign="top"><strong>host_name</strong>:</td>
<td>

This directive is used to identify the *short name(s)* of the [host(s)](#host) that the [service](#service) escalation should apply to or is associated with.

</td>
</tr>
<tr>
<td valign="top"><strong>hostgroup_name</strong>:</td>
<td>

This directive is used to specify the *short name(s)* of the [hostgroup(s)](#hostgroup) that the service escalation should apply to or is associated with.

Multiple hostgroups should be separated by commas.

The hostgroup_name may be used instead of, or in addition to, the host_name directive.

</td>
</tr>
<tr>
<td valign="top"><strong>service_description</strong>:</td>
<td>

This directive is used to identify the *description* of the [service](#service) the escalation should apply to.

</td>
</tr>
<tr>
<td valign="top"><strong>first_notification</strong>:</td>
<td>

This directive is a number that identifies the *first* notification for which this escalation is effective.

For instance, if you set this value to `3`, this escalation will only be used if the service is in a non-OK state long enough for a third notification to go out.

</td>
</tr>
<tr>
<td valign="top"><strong>last_notification</strong>:</td>
<td>

This directive is a number that identifies the *last* notification for which this escalation is effective.

For instance, if you set this value to `5`, this escalation will not be used if more than five notifications are sent out for the service.

Setting this value to `0` means to keep using this escalation entry forever (no matter how many notifications go out).

</td>
</tr>
<tr>
<td valign="top"><strong>contacts</strong>:</td>
<td>

This is a list of the *short names* of the [contacts](#contact) that should be notified whenever there are problems (or recoveries) with this service.

Multiple contacts should be separated by commas.

Useful if you want notifications to go to just a few people and don't want to configure [contact groups](#contactgroup).

You must specify at least one contact or contact group in each service escalation definition.

</td>
</tr>
<tr>
<td valign="top"><strong>contact_groups</strong>:</td>
<td>

This directive is used to identify the *short name* of the [contact group](#contactgroup) that should be notified when the service notification is escalated.

Multiple contact groups should be separated by commas.

You must specify at least one contact or contact group in each service escalation definition.

</td>
</tr>
<tr>
<td valign="top"><strong>notification_interval</strong>:</td>
<td>

This directive is used to determine the interval at which notifications should be made while this escalation is valid.

If you specify a value of `0` for the interval, Naemon will send the first notification when this escalation definition is valid, but will then prevent any more problem notifications from being sent out for the host.

Notifications are sent out again until the host recovers.

This is useful if you want to stop having notifications sent out after a certain amount of time.

> [!NOTE]
> If multiple escalation entries for a host overlap for one or more notification ranges, the smallest notification interval from all escalation entries is used.

</td>
</tr>
<tr>
<td valign="top"><strong>escalation_period</strong>:</td>
<td>

This directive is used to specify the short name of the [time period](#timeperiod) during which this escalation is valid.

If this directive is not specified, the escalation is considered to be valid during all times.

</td>
</tr>
<tr>
<td valign="top"><strong>escalation_options</strong>:</td>
<td>

This directive is used to define the criteria that determine when this service escalation is used.

The escalation is used only if the service is in one of the states specified in this directive.

If this directive is not specified in a service escalation, the escalation is considered to be valid during all service states.

Valid options are a combination of one or more of the following:
- `r` = escalate on an OK (recovery) state,
- `w` = escalate on a WARNING state,
- `u` = escalate on an UNKNOWN state, and
- `c` = escalate on a CRITICAL state.

 **Example:** If you specify `w` in this field, the escalation will only be used if the service is in a WARNING state.

</td>
</tr>
</tbody>
</table>



### Host Dependency Definition {#hostdependency}

#### Description

Host dependencies are an advanced feature of Naemon that allow you to suppress
notifications for hosts based on the status of one or more other hosts.

Host dependencies are optional and are mainly targeted at advanced users who
have complicated monitoring setups.

More information on how host dependencies work (read this!) can be found
<a href="dependencies.html">here</a>.


#### Definition Format

> [!IMPORTANT]
> Directives in red are required, while those in black are optional.

```js
define hostdependency {
    dependent_host_name             host_name // [!code error]
    dependent_hostgroup_name        hostgroup_name
    host_name                       host_name // [!code error]
    hostgroup_name                  hostgroup_name
    inherits_parent                 [0/1]
    execution_failure_criteria      [o,d,u,p,n]
    notification_failure_criteria   [o,d,u,p,n]
    dependency_period               timeperiod_name
}
```

#### Example Definition

```
define hostdependency {
    host_name                           WWW1
    dependent_host_name                 DBASE1
    notification_failure_criteria       d,u
}
```

#### Directive Descriptions

<table>
<tbody>
<tr>
<td valign="top"><strong>dependent_host_name</strong>:</td>
<td>

This directive is used to identify the *short name(s)* of the *dependent* [host(s)](#host).

Multiple hosts should be separated by commas.

</td>
</tr>
<tr>
<td valign="top"><strong>dependent_hostgroup_name</strong>:</td>
<td>

This directive is used to identify the *short name(s)* of the *dependent* [hostgroup(s)](#hostgroup).

Multiple hostgroups should be separated by commas.

The dependent_hostgroup_name may be used instead of, or in addition to, the dependent_host_name directive.

</td>
</tr>
<tr>
<td valign="top"><strong>host_name</strong>:</td>
<td>

This directive is used to identify the *short name(s)* of the [host(s)](#host) *that is being depended upon* (also referred to as the master host).

Multiple hosts should be separated by commas.

</td>
</tr>
<tr>
<td valign="top"><strong>hostgroup_name</strong>:</td>
<td>

This directive is used to identify the *short name(s)* of the [hostgroup(s)](#hostgroup) *that is being depended upon* (also referred to as the master host).

Multiple hostgroups should be separated by commas.

The hostgroup_name may be used instead of, or in addition to, the host_name directive.

</td>
</tr>
<tr>
<td valign="top"><strong>inherits_parent</strong>:</td>
<td>

This directive indicates whether or not the dependency inherits dependencies of the host *that is being depended upon* (also referred to as the master host).

In other words, if the master host is dependent upon other hosts and any one of those dependencies fail, this dependency will also fail.

</td>
</tr>
<tr>
<td valign="top"><strong>execution_failure_criteria</strong>:</td>
<td>

This directive is used to specify the criteria that determine when the dependent host should *not* be actively checked.

If the *master* host is in one of the failure states we specify, the *dependent* host will not be actively checked.

Valid options are a combination of one or more of the following (multiple options are separated with commas):
- `o` = fail on an UP state,
- `d` = fail on a DOWN state,
- `u` = fail on an UNREACHABLE state, and
- `p` = fail on a pending state (e.g. the host has not yet been checked).

If you specify `n` (none) as an option, the execution dependency will never fail and the dependent host will always be actively checked (if other conditions allow for it to be).

**Example:** If you specify `u,d` in this field, the *dependent* host will not be actively checked if the *master* host is in either an UNREACHABLE or DOWN state.

</td>
</tr>
<tr>
<td valign="top"><strong>notification_failure_criteria</strong>:</td>
<td>

This directive is used to define the criteria that determine when notifications for the dependent host should *not* be sent out.

If the *master* host is in one of the failure states we specify, notifications for the *dependent* host will not be sent to contacts.

Valid options are a combination of one or more of the following:
- `o` = fail on an UP state,
- `d` = fail on a DOWN state,
- `u` = fail on an UNREACHABLE state, and
- `p` = fail on a pending state (e.g. the host has not yet been checked).

If you specify `n` (none) as an option, the notification dependency will never fail and notifications for the dependent host will always be sent out.

**Example:** If you specify `d` in this field, the notifications for the *dependent* host will not be sent out if the *master* host is in a DOWN state.

</td>
</tr>
<tr>
<td valign="top"><strong>dependency_period</strong>:</td>
<td>

This directive is used to specify the short name of the [time period](#timeperiod) during which this dependency is valid.

If this directive is not specified, the dependency is considered to be valid during all times.

</td>
</tr>
</tbody>
</table>



### Host Escalation Definition {#hostescalation}

#### Description

Host escalations are *completely optional* and are used to escalate notifications for a particular host.

More information on how notification escalations work can be found [here](escalations).

#### Definition Format

> [!IMPORTANT]
> Directives in red are required, while those in black are optional.

```js
define hostescalation {
    host_name               host_name // [!code error]
    hostgroup_name          hostgroup_name
    contacts                contacts // [!code error]
    contact_groups          contactgroup_name // [!code error]
    first_notification      # // [!code error]
    last_notification       # // [!code error]
    notification_interval   # // [!code error]
    escalation_period       timeperiod_name
    escalation_options      [d,u,r]
}
```


#### Example Definition

```
define hostescalation {
    host_name                   router-34
    first_notification          5
    last_notification           8
    notification_interval       60
    contact_groups              all-router-admins
}
```


#### Directive Descriptions

<table>
<tbody>
<tr>
<td valign="top"><strong>host_name</strong>:</td>
<td>

This directive is used to identify the *short name* of the [host](#host) that the escalation should apply to.

</td>
</tr>
<tr>
<td valign="top"><strong>hostgroup_name</strong>:</td>
<td>

This directive is used to identify the *short name(s)* of the [hostgroup(s)](#hostgroup) that the escalation should apply to.

Multiple hostgroups should be separated by commas.

If this is used, the escalation will apply to all hosts that are members of the specified hostgroup(s).

</td>
</tr>
<tr>
<td valign="top"><strong>first_notification</strong>:</td>
<td>

This directive is a number that identifies the *first* notification for which this escalation is effective.

For instance, if you set this value to `3`, this escalation will only be used if the host is down or unreachable long enough for a third notification to go out.

</td>
</tr>
<tr>
<td valign="top"><strong>last_notification</strong>:</td>
<td>

This directive is a number that identifies the *last* notification for which this escalation is effective.

For instance, if you set this value to `5`, this escalation will not be used if more than five notifications are sent out for the host.

Setting this value to `0` means to keep using this escalation entry forever (no matter how many notifications go out).

</td>
</tr>
<tr>
<td valign="top"><strong>contacts</strong>:</td>
<td>

This is a list of the *short names* of the [contacts](#contact) that should be notified whenever there are problems (or recoveries) with this host.

Multiple contacts should be separated by commas.

Useful if you want notifications to go to just a few people and don't want to configure [contact groups](#contactgroup).

You must specify at least one contact or contact group in each host escalation definition.

</td>
</tr>
<tr>
<td valign="top"><strong>contact_groups</strong>:</td>
<td>

This directive is used to identify the *short name* of the [contact group](#contactgroup) that should be notified when the host notification is escalated.

Multiple contact groups should be separated by commas.

You must specify at least one contact or contact group in each host escalation definition.

</td>
</tr>
<tr>
<td valign="top"><strong>notification_interval</strong>:</td>
<td>

This directive is used to determine the interval at which notifications should be made while this escalation is valid.

If you specify a value of `0` for the interval, Naemon will send the first notification when this escalation definition is valid, but will then prevent any more problem notifications from being sent out for the host.

Notifications are sent out again until the host recovers.

This is useful if you want to stop having notifications sent out after a certain amount of time.

> [!NOTE]
> If multiple escalation entries for a host overlap for one or more notification ranges, the smallest notification interval from all escalation entries is used.

</td>
</tr>
<tr>
<td valign="top"><strong>escalation_period</strong>:</td>
<td>

This directive is used to specify the short name of the [time period](#timeperiod) during which this escalation is valid.

If this directive is not specified, the escalation is considered to be valid during all times.

</td>
</tr>
<tr>
<td valign="top"><strong>escalation_options</strong>:</td>
<td>

This directive is used to define the criteria that determine when this host escalation is used.

The escalation is used only if the host is in one of the states specified in this directive.

If this directive is not specified in a host escalation, the escalation is considered to be valid during all host states.

Valid options are a combination of one or more of the following:
- `r` = escalate on an UP (recovery) state,
- `d` = escalate on a DOWN state, and
- `u` = escalate on an UNREACHABLE state.

 **Example:** If you specify `d` in this field, the escalation will only be used if the host is in a DOWN state.

</td>
</tr>
</tbody>
</table>
