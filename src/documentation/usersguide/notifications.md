# Notifications

<div class="fa-icon-bg">
    <i class="fa-solid fa-bullhorn fa-7x"></i>
</div>

## See Also
- [Escalations](escalations)
- [Time Periods](timeperiods)
- [On-Call Rotations](oncallrotation)


## Introduction

This will attempt to explain exactly when and how host and service notifications are sent out, as well as who receives them.

Notification escalations are explained [here](escalations).

## When Do Notifications Occur?

The decision to send out notifications is made in the service check and host check logic.  Host and service notifications occur in the following instances...

- When a hard state change occurs.  More information on state types and hard state changes can be found [here](statetypes).
- When a host or service remains in a hard non-OK state and the time specified by the `notification_interval` option in the host or service definition has passed since the last notification was sent out (for that specified host or service).

## Who Gets Notified?

Each host and service definition has `contacts` and `contact_groups` options that specifies what contacts receive notifications for that particular host or service.  Contact groups can contain one or more individual contacts.

When Naemon sends out a host or service notification, it will notify each contact that is a member of any contact groups specified in the `contact_groups` option as well as individual contacts specified in the `contacts` option of the host/service definition. Naemon realizes that a contact may be a member of more than one contact group, so it removes duplicate contact notifications before it does anything.

By default all services on a host notifies the `contacts` and `contact_groups` configured in the host definition. There is however an exception to this; if either of `contacts` or `contact_groups` is configured on a service, notifications are only sent to those contacts.
More information about this can be found in [here](objectinheritance#implied_inheritance).

## What Filters Must Be Passed In Order For Notifications To Be Sent?

Just because there is a need to send out a host or service notification doesn't mean that any contacts are going to get notified.  There are several filters that potential notifications must pass before they are deemed worthy enough to be sent out.  Even then, specific contacts may not be notified if their notification filters do not allow for the notification to be sent to them.  Let's go into the filters that have to be passed in more detail...

## Program-Wide Filter

The first filter that notifications must pass is a test of whether or not notifications are enabled on a program-wide basis.  This is initially determined by the [enable_notifications](configmain#enable_notifications) directive in the main config file, but may be changed during runtime from the web interface.  If notifications are disabled on a program-wide basis, no host or service notifications can be sent out - period.  If they are enabled on a program-wide basis, there are still other tests that must be passed...

## Service and Host Filters

The following filters are done before a service/host notification is sent:

- If the host / service is in a scheduled downtime no notifications are sent. Service notifications are also suppressed if the associated host is in a schedule downtime.
- If the host / service is flapping, no notifications are sent.
- Ensure that the current state matches the `notification_options` set in the object configuration.
- Ensure that the `notification_period` for the object is currently valid. If not within a valid time-period, a notification is scheduled for the next valid time present in the time period.
- For services check that the associated host is in a non-ok state. If the host is in a non-ok state no service notification is sent. Instead we send a single host notification.
- If a previous notification was sent, and the object has remained in the same non-ok state, the `notification_interval` is checked if enough time has passed.
- For recoveries, Naemon checks whether a notification was sent about the original problem. If no problem notification was sent, Naemon will not send a recovery notification.


## Contact Filters

At this point the notification has passed the program mode filter and all host or service filters and Naemon starts to notify [all the people it should](objectdefinitions#contact).  Does this mean that each contact is going to receive the notification?  No!  Each contact has their own set of filters that the notification must pass before they receive it.

> [!NOTE]
> Contact filters are specific to each contact and do not affect whether or not other contacts receive notifications.

The first filter that must be passed for each contact are the notification options.  Each contact definition contains options that determine whether or not service notifications can be sent out for warning states, critical states, and recoveries.  Each contact definition also contains options that determine whether or not host notifications can be sent out when the host goes down, becomes unreachable, or recovers.  If the host or service notification does not pass these options, **the contact will not be notified**.  If it does pass these options, the notification gets passed to the next filter...

> [!NOTE]
> Notifications about host or service recoveries are only sent out if a notification was sent out for the original problem.  It doesn't make sense to get a recovery notification for something you never knew was a problem...

The last filter that must be passed for each contact is the time period test.  Each contact definition has a `notification_period` option that specifies which time period contains valid notification times for the contact.  If the time that the notification is being made does not fall within a valid time range in the specified time period, **the contact will not be notified**.  If it falls within a valid time range, the contact gets notified!

## Notification Methods

You can have Naemon notify you of problems and recoveries pretty much anyway you want: pager, cellphone, email, instant message, audio alert, electric shocker, etc.  How notifications are sent depend on the [notification commands](objectdefinitions#command) that are defined in your [object definition files](config).

> [!NOTE]
> If you install Naemon according to the [quickstart guide](quickstart), it should be configured to send email notifications.  You can see the email notification commands that are used by viewing the contents of the following file: `/usr/local/nagios/etc/objects/commands.cfg`.

Specific notification methods (paging, etc.) are not directly incorporated into the Naemon code as it just doesn't make much sense.  The "core" of Naemon is not designed to be an all-in-one application.  If service checks were embedded in Naemon' core it would be very difficult for users to add new check methods, modify existing checks, etc.  Notifications work in a similar manner.  There are a thousand different ways to do notifications and there are already a lot of packages out there that handle the dirty work, so why re-invent the wheel and limit yourself to a bike tire?  Its much easier to let an external entity (i.e. a simple script or a full-blown messaging system) do the messy stuff.  Some messaging packages that can handle notifications for pagers and cellphones are listed below in the resource section.

## Notification Type Macro

When crafting your notification commands, you need to take into account what type of notification is occurring.  The [$NOTIFICATIONTYPE$](macrolist#notificationtype) macro contains a string that identifies exactly that.  The table below lists the possible values for the macro and their respective descriptions:


| Value             | Description                                                                                                                                                                                                                                                               |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| PROBLEM           | A service or host has just entered (or is still  in) a problem state.  If this is a service notification, it means the  service is either in a WARNING, UNKNOWN or CRITICAL state.  If this is a  host notification, it means the host is in a DOWN or UNREACHABLE state. |
| RECOVERY          | A service or host recovery has occurred.  If  this is a service notification, it means the service has just returned  to an OK state.  If it is a host notification, it means the host has  just returned to an UP state.                                                 |
| ACKNOWLEDGEMENT   | This notification is an acknowledgement  notification for a host or service problem.  Acknowledgement  notifications are initiated via the web interface by contacts for the  particular host or service.                                                                 |
| FLAPPINGSTART     | The host or service has just started [flapping](flapping).                                                                                                                                                                                                                |
| FLAPPINGSTOP      | The host or service has just stopped [flapping](flapping).                                                                                                                                                                                                                |
| FLAPPINGDISABLED  | The host or service has just stopped [flapping](flapping) because flap detection was disabled..                                                                                                                                                                           |
| DOWNTIMESTART     | The host or service has just entered a period of [scheduled downtime](downtime).  Future notifications will be suppressed.                                                                                                                                                |
| DOWNTIMESTOP      | The host or service has just exited from a period of [scheduled downtime](downtime).  Notifications about problems can now resume.                                                                                                                                        |
| DOWNTIMECANCELLED | The period of [scheduled downtime](downtime) for the host or service was just canceled.  Notifications about problems can now resume.                                                                                                                                     |


## Global notification handlers
Global host and service notification handlers are run for **every** host or service,
immediately prior to any host- or service-specific contact. The global notification handlers are only executed once per notification, regardless of the number of defined contacts for the particular host or service.

You can specify global notification handler commands by using the [global_host_notification_handler](configmain#global_host_notification_handler) and [global_service_notification_handler](configmain#global_service_notification_handler) options in your main configuration file.

Global notification handlers will respect these host- or service-specific filters:

- Defined states in the `notification_options<` object configuration.
- The `notification_period` for the object is currently valid.
- Value of `notifications_enabled` from the object configuration.

Global notification handlers will respect this global filter:

- Value of [enable_notifications](configmain#enable_notifications) directive in the main config file.



## Helpful Resources

There are many ways you could configure Naemon to send notifications out.  Its up to you to decide which method(s) you want to use.  Once you do that you'll have to install any necessary software and configure notification commands in your config files before you can use them.  Here are just a few possible notification methods:


- Email
- SMS
- Twitter
- Facebook, LinkedIn
- Jabber, IRC
- Audio alerts
- etc...


Basically anything you can do from a command line can be tailored for use as a notification command.
If you're looking for an alternative to using email for sending messages to your pager or cellphone, check out these packages. They could be used in conjunction with Naemon to send out a notification via a modem when a problem
arises.  That way you don't have to rely on email to send notifications out (remember, email may *not* work if
there are network problems).

- [Gnokii](https://www.gnokii.org/) (SMS software for contacting Nokia phones via GSM network)
- QuickPage (alphanumeric pager software)
- [Sendpage](https://sendpage.org/) (paging software)

If you want to try out a non-traditional method of notification, you might want to mess around with audio alerts.  If you want to have audio alerts played on the monitoring server (with synthesized speech), check out [Festival](https://www.cstr.ed.ac.uk/projects/festival/).  If you'd rather leave the monitoring box alone and have audio alerts played on another box, check out the [Network Audio System (NAS)](https://radscan.com/nas.html) and rplay projects.
