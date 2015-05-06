---
layout: doctoc
title: Time Periods
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="oncallrotation.html">On-Call Rotations</a>, <a href="hostchecks.html">Host Checks</a>, <a href="servicechecks.html">Service Checks</a>, <a href="notifications.html">Notifications</a>, <a href="escalations.html">Notification Escalations</a>, <a href="dependencies.html">Dependencies</a>



### Introduction

<img src="images/objects-timeperiods.png" border="0" style="float: right;" alt="Timeperiods" title="Timeperiods">

<a href="objectdefinitions.html#timeperiod">Timeperiod</a> definitions allow you
to control when various aspects of the monitoring and alerting logic can operate.

For instance, you can restrict:

 - When regularly scheduled host and service checks can be performed
 - When notifications can be sent out
 - When notification escalations can be used
 - When dependencies are valid



### Precedence in Time Periods

Timeperiod <a href="objectdefinitions.html#timeperiod">definitions</a> may contain
multiple types of directives, including weekdays, days of the month, and calendar dates.

Different types of directives have different precedence levels and may override
other directives in your timeperiod definitions.

The order of precedence for different types of directives (in descending order) is as follows:

 - Calendar date (2008-01-01)
 - Specific month date (January 1st)
 - Generic month date (Day 15)
 - Offset weekday of specific month (2nd Tuesday in December)
 - Offset weekday (3rd Monday)
 - Normal weekday (Tuesday)

Examples of different timeperiod directives can be found <a href="objectdefinitions.html#timeperiod">here</a>.



### How Time Periods Work With Host and Service Checks

Host and service definitions have an optional <i>check_period</i> directive that
allows you to specify a timeperiod that should be used to restrict when regularly
scheduled, active checks of the host or service can be made.

If you do not use the <i>check_period</i> directive to specify a timeperiod,
Naemon will be able to schedule active checks of the host or service anytime it needs to.

This is essentially a 24x7 monitoring scenario.

Specifying a timeperiod in the <i>check_period</i> directive allows you to restrict
the time that Naemon perform regularly scheduled, active checks of the host or service.

When Naemon attempts to reschedule a host or service check, it will make
sure that the next check falls within a valid time range within the defined timeperiod.

If it doesn't, Naemon will adjust the next check time to coincide
with the next "valid" time in the specified timeperiod.

This means that the host or service may not get checked again for
another hour, day, or week, etc.

{{ site.note }}On-demand checks and passive checks are not restricted by the timeperiod you specify in the <i>check_period</i> directive.{{ site.end }}

Only regularly scheduled active checks are restricted.

Unless you have a good reason not to do so, I would recommend that you monitor all
your hosts and services using timeperiods that cover a 24x7 time range.

If you don't do this, you can run into some problems during "blackout" times (times that are not valid in the timeperiod definition):

1. The status of the host or service will appear unchanged during the blackout time.
2. Contacts will mostly likely not get re-notified of problems with a host or service during blackout times.
3. If a host or service recovers during a blackout time, contacts will not be immediately notified of the recovery.



### How Time Periods Work With Contact Notifications

By specifying a timeperiod in the <i>notification_period</i> directive of a host
or service definition, you can control when Naemon is allowed to send notifications
out regarding problems or recoveries for that host or service.

When a host notification is about to get sent out, Naemon will make sure that
the current time is within a valid range in the <i>notification_period</i> timeperiod.

If it is a valid time, then Naemon will attempt to notify each contact of the
problem or recovery.

You can also use timeperiods to control when notifications can be sent out to individual contacts.

By using the <i>service_notification_period</i> and <i>host_notification_period</i>
directives in <a href="objectdefinitions.html#contact">contact definitions</a>, you're able to essentially define an "on call" period for each contact.

Contacts will only receive host and service notifications during the
times you specify in the notification period directives.

Examples of how to create timeperiod definitions for use for on-call
rotations can be found <a href="oncallrotation.html">here</a>.



### How Time Periods Work With Notification Escalations

Service and host <a href="escalations.html">notification escalations</a> have
an optional <i>escalation_period</i> directive that allows you to specify
a timeperiod when the escalation is valid and can be used.

If you do not use the <i>escalation_period</i> directive in an escalation
definition, the escalation is considered valid at all times.

If you specify a timeperiod in the <i>escalation_period</i> directive,
Naemon will only use the escalation definition during times that are valid
in the timeperiod definition.



### How Time Periods Work With Dependencies

Service and host <a href="dependencies.html">dependencies</a> have an optional
<i>dependency_period</i> directive that allows you to specify a timeperiod
when the dependencies are valid and can be used.

If you do not use the <i>dependency_period</i> directive in a dependency
definition, the dependency can be used at any time.

If you specify a timeperiod in the <i>dependency_period</i> directive, Naemon
will only use the dependency definition during times that are valid in the timeperiod definition.
