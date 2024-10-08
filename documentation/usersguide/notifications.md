---
layout: doctoc
title: Notifications
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="escalations.html">Escalations</a>, <a href="timeperiods.html">Timeperiods</a>, <a href="oncallrotation.html">On-Call Rotations</a>

### Introduction

<img src="images/objects-contacts.png" border="0" style="float: right;" alt="Contacts" title="Contacts">

This will attempt to explain exactly when and how host and service notifications are sent out, as well as who receives them.

Notification escalations are explained <a href="escalations.html">here</a>.

### When Do Notifications Occur?

The decision to send out notifications is made in the service check and host check logic.  Host and service notifications occur in the following instances...

<ul>
<li>When a hard state change occurs.  More information on state types and hard state changes can be found <a href="statetypes.html">here</a>.</li>
<li>When a host or service remains in a hard non-OK state and the time specified by the &lt;<i>notification_interval</i>&gt; option in the host or service definition has passed since the last notification was sent out (for that specified host or service).</li>
</ul>

### Who Gets Notified?

Each host and service definition has &lt;<i>contacts</i>&gt; and &lt;<i>contact_groups</i>&gt; options that specifies what contacts receive notifications for that particular host or service.  Contact groups can contain one or more individual contacts.

When Naemon sends out a host or service notification, it will notify each contact that is a member of any contact groups specified in the &lt;<i>contact_groups</i>&gt; option as well as individual contacts specified in the &lt;<i>contacts</i>&gt; option of the host/service definition. Naemon realizes that a contact may be a member of more than one contact group, so it removes duplicate contact notifications before it does anything.

By default all services on a host notifies the &lt;<i>contacts</i>&gt; and &lt;<i>contact_groups</i>&gt; configured in the host definition. There is however an exception to this; if either of &lt;<i>contacts</i>&gt; or &lt;<i>contact_groups</i>&gt; is configured on a service, notifications are only sent to those contacts.
More information about this can be found in <a href="objectinheritance.html#implied_inheritance">here</a>.

### What Filters Must Be Passed In Order For Notifications To Be Sent?

Just because there is a need to send out a host or service notification doesn't mean that any contacts are going to get notified.  There are several filters that potential notifications must pass before they are deemed worthy enough to be sent out.  Even then, specific contacts may not be notified if their notification filters do not allow for the notification to be sent to them.  Let's go into the filters that have to be passed in more detail...

### Program-Wide Filter:

The first filter that notifications must pass is a test of whether or not notifications are enabled on a program-wide basis.  This is initially determined by the <a href="configmain.html#enable_notifications">enable_notifications</a> directive in the main config file, but may be changed during runtime from the web interface.  If notifications are disabled on a program-wide basis, no host or service notifications can be sent out - period.  If they are enabled on a program-wide basis, there are still other tests that must be passed...

### Service and Host Filters:

The following filters are done before a service/host notification is sent:

* If the host / service is in a scheduled downtime no notifications are sent. Service notifications are also suppressed if the associated host is in a schedule downtime.
* If the host / service is flapping, no notifications are sent.
* Ensure that the current state matches the &lt;<i>notification_options</i>&gt; set in the object configuration.
* Ensure that the &lt;<i>notification_period</i>&gt; for the object is currently valid. If not within a valid time-period, a notification is scheduled for the next valid time present in the time period.
* For services check that the associated host is in a non-ok state. If the host is in a non-ok state no service notification is sent. Instead we send a single host notification.
* If a previous notification was sent, and the object has remained in the same non-ok state, the &lt;<i>notification_interval</i>&gt; is checked if enough time has passed.
* For recoveries, Naemon checks whether a notification was sent about the original problem. If no problem notification was sent, Naemon will not send a recovery notification.


### Contact Filters:

At this point the notification has passed the program mode filter and all host or service filters and Naemon starts to notify <a href="objectdefinitions.html#contact">all the people it should</a>.  Does this mean that each contact is going to receive the notification?  No!  Each contact has their own set of filters that the notification must pass before they receive it.

{{ site.note }}Contact filters are specific to each contact and do not affect whether or not other contacts receive notifications.{{ site.end }}

The first filter that must be passed for each contact are the notification options.  Each contact definition contains options that determine whether or not service notifications can be sent out for warning states, critical states, and recoveries.  Each contact definition also contains options that determine whether or not host notifications can be sent out when the host goes down, becomes unreachable, or recovers.  If the host or service notification does not pass these options, <b>the contact will not be notified</b>.  If it does pass these options, the notification gets passed to the next filter...

{{ site.note }}Notifications about host or service recoveries are only sent out if a notification was sent out for the original problem.  It doesn't make sense to get a recovery notification for something you never knew was a problem...{{ site.end }}

The last filter that must be passed for each contact is the time period test.  Each contact definition has a &lt;<i>notification_period</i>&gt; option that specifies which time period contains valid notification times for the contact.  If the time that the notification is being made does not fall within a valid time range in the specified time period, <b>the contact will not be notified</b>.  If it falls within a valid time range, the contact gets notified!

### Notification Methods

You can have Naemon notify you of problems and recoveries pretty much anyway you want: pager, cellphone, email, instant message, audio alert, electric shocker, etc.  How notifications are sent depend on the <a href="objectdefinitions.html#command">notification commands</a> that are defined in your <a href="config.html">object definition files</a>.

{{ site.note }}If you install Naemon according to the <a href="quickstart.html">quickstart guide</a>, it should be configured to send email notifications.  You can see the email notification commands that are used by viewing the contents of the following file: <i>/usr/local/nagios/etc/objects/commands.cfg</i>.{{ site.end }}

Specific notification methods (paging, etc.) are not directly incorporated into the Naemon code as it just doesn't make much sense.  The "core" of Naemon is not designed to be an all-in-one application.  If service checks were embedded in Naemon' core it would be very difficult for users to add new check methods, modify existing checks, etc.  Notifications work in a similar manner.  There are a thousand different ways to do notifications and there are already a lot of packages out there that handle the dirty work, so why re-invent the wheel and limit yourself to a bike tire?  Its much easier to let an external entity (i.e. a simple script or a full-blown messaging system) do the messy stuff.  Some messaging packages that can handle notifications for pagers and cellphones are listed below in the resource section.

### Notification Type Macro

When crafting your notification commands, you need to take into account what type of notification is occurring.  The <a href="macrolist.html#notificationtype">$NOTIFICATIONTYPE$</a> macro contains a string that identifies exactly that.  The table below lists the possible values for the macro and their respective descriptions:

<table border="1">
<tr><th>Value</th><th>Description</th></tr>
<tr><td>PROBLEM</td><td>A service or host has just entered (or is still in) a problem state.  If this is a service notification, it means the service is either in a WARNING, UNKNOWN or CRITICAL state.  If this is a host notification, it means the host is in a DOWN or UNREACHABLE state.</td></tr>
<tr><td>RECOVERY</td><td>A service or host recovery has occurred.  If this is a service notification, it means the service has just returned to an OK state.  If it is a host notification, it means the host has just returned to an UP state.</td></tr>
<tr><td>ACKNOWLEDGEMENT</td><td>This notification is an acknowledgement notification for a host or service problem.  Acknowledgement notifications are initiated via the web interface by contacts for the particular host or service.</td></tr>
<tr><td>FLAPPINGSTART</td><td>The host or service has just started <a href="flapping.html">flapping</a>.</td></tr>
<tr><td>FLAPPINGSTOP</td><td>The host or service has just stopped <a href="flapping.html">flapping</a>.</td></tr>
<tr><td>FLAPPINGDISABLED</td><td>The host or service has just stopped <a href="flapping.html">flapping</a> because flap detection was disabled..</td></tr>
<tr><td>DOWNTIMESTART</td><td>The host or service has just entered a period of <a href="downtime.html">scheduled downtime</a>.  Future notifications will be suppressed.</td></tr>
<tr><td>DOWNTIMESTOP</td><td>The host or service has just exited from a period of <a href="downtime.html">scheduled downtime</a>.  Notifications about problems can now resume.</td></tr>
<tr><td>DOWNTIMECANCELLED</td><td>The period of <a href="downtime.html">scheduled downtime</a> for the host or service was just canceled.  Notifications about problems can now resume.</td></tr>
</table>

### Global notification handlers
Global host and service notification handlers are run for <i>every</i> host or service,
immediately prior to any host- or service-specific contact. The global notification handlers are only executed once per notification, regardless of the number of defined contacts for the particular host or service.

You can specify global notification handler commands by using the <a href="configmain.html#global_host_notification_handler">global_host_notification_handler</a> and <a href="configmain.html#global_service_notification_handler">global_service_notification_handler</a> options in your main configuration file.

Global notification handlers will respect these host- or service-specific filters:
<ul>
<li>Defined states in the &lt;<i>notification_options</i>&gt; object configuration.</li>
<li>The &lt;<i>notification_period</i>&gt; for the object is currently valid.</li>
<li>Value of &lt;<i>notifications_enabled</i>&gt; from the object configuration.</li>
</ul>

Global notification handlers will respect this global filter:
<ul>
<li>Value of <a href="configmain.html#enable_notifications">enable_notifications</a> directive in the main config file.</li>
</ul>


### Helpful Resources

There are many ways you could configure Naemon to send notifications out.  Its up to you to decide which method(s) you want to use.  Once you do that you'll have to install any necessary software and configure notification commands in your config files before you can use them.  Here are just a few possible notification methods:

<ul>
<li>Email</li>
<li>SMS</li>
<li>Twitter</li>
<li>Facebook, LinkedIn</li>
<li>Jabber, IRC</li>
<li>Audio alerts</li>
<li>etc...</li>
</ul>

Basically anything you can do from a command line can be tailored for use as a notification command.
If you're looking for an alternative to using email for sending messages to your pager or cellphone, check out these packages. They could be used in conjunction with Naemon to send out a notification via a modem when a problem
arises.  That way you don't have to rely on email to send notifications out (remember, email may *not* work if
there are network problems).

<ul>
<li><a href="http://www.gnokii.org/">Gnokii</a> (SMS software for contacting Nokia phones via GSM network)</li>
<li><a href="http://www.qpage.org/" target="_top">QuickPage</a> (alphanumeric pager software)</li>
<li><a href="http://www.sendpage.org/" target="_top">Sendpage</a> (paging software)</li>
</ul>

If you want to try out a non-traditional method of notification, you might want to mess around with audio alerts.  If you want to have audio alerts played on the monitoring server (with synthesized speech), check out <a href="http://www.cstr.ed.ac.uk/projects/festival/">Festival</a>.  If you'd rather leave the monitoring box alone and have audio alerts played on another box, check out the <a href="http://radscan.com/nas.html">Network Audio System (NAS)</a> and <a href="http://rplay.doit.org/">rplay</a> projects.
