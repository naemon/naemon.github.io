---
layout: doctoc
title: Scheduled Downtime
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="notifications.html">Notifications</a>

### Introduction

Naemon allows you to schedule periods of planned downtime for hosts and service that you're monitoring.  This is useful in the event that you actually know you're going to be taking a server down for an upgrade, etc.

<img src="images/downtime.png" border="0" style="float: right;" alt="Scheduled Downtime" title="Scheduled Downtime">

### Scheduling Downtime

You can schedule downtime for hosts and service through the <a href="cgis.html#extinfo_cgi">extinfo CGI</a> (either when viewing host or service information).  Click in the "Schedule downtime for this host/service" link to actually schedule the downtime.

Once you schedule downtime for a host or service, Naemon will add a comment to that host/service indicating that it is scheduled for downtime during the period of time you indicated.  When that period of downtime passes, Naemon will automatically delete the comment that it added.

### Fixed vs. Flexible Downtime

When you schedule downtime for a host or service through the web interface you'll be asked if the downtime is fixed or flexible.  Here's an explanation of how "fixed" and "flexible" downtime differs:

"Fixed" downtime starts and stops at the exact start and end times that you specify when you schedule it.

"Flexible" downtime is intended for times when you know that a host or service is going to be down for X minutes (or hours), but you don't know exactly when that'll start.  When you schedule flexible downtime, Naemon will start the scheduled downtime sometime between the start and end times you specified.  The downtime will last for as long as the duration you specified when you scheduled the downtime.  This assumes that the host or service for which you scheduled flexible downtime either goes down (or becomes unreachable) or goes into a non-OK state sometime between the start and end times you specified.  The time at which a host or service transitions to a problem state determines the time at which Naemon actually starts the downtime.  The downtime will then last for the duration you specified, even if the host or service recovers before the downtime expires.  This is done to allow several reboots of servers during maintenance.

### Triggered Downtime

When scheduling host or service downtime you have the option of making it "triggered" downtime.  With triggered downtime the start of the downtime is triggered by the start of some other scheduled host or service downtime.  This is useful if you're scheduling downtime for a large number or hosts or services and the start time of the downtime period depends on the start time of another downtime entry.  For instance, if you schedule flexible downtime for a particular host (because its going down for maintenance), you might want to schedule triggered downtime for all of that hosts's "children".

### How Scheduled Downtime Affects Notifications

When a host or service is in a period of scheduled downtime, Naemon will not allow normal notifications to be sent out for the host or service.  However, a "DOWNTIMESTART" notification will get sent out for the host or service, which will serve to put any admins on notice that they won't receive upcoming problem alerts. Also a notification is sent, even if the object is in a downtime, if an acknowledgement is made with the notify flag set.

When the scheduled downtime is over, Naemon will allow normal notifications to be sent out for the host or service again.  A "DOWNTIMEEND" notification will get sent out notifying admins that the scheduled downtime is over, and they will start receiving normal alerts again.

If the scheduled downtime is canceled prematurely (before it expires), a "DOWNTIMECANCELLED" notification will get sent out to the appropriate admins.

If a notification has already been sent out before the downtime starts, then Naemon will send a recovery notification, even when in downtime.

### Overlapping Scheduled Downtime

Overlapping scheduled downtime allows you to extend a downtime, in case the work required takes longer than originally expected.

Let's take the following scenario:

<ol>
<li>You schedule downtime for host A from 7:30pm-9:30pm on a Monday</li>
<li>You bring the server down about 7:45pm Monday evening to start a hard drive upgrade</li>
<li>Due to unexpected circumstances, it takes more than an hour to get the machine to boot</li>
<li>At 9:15 you realize that one of your partitions doesn't seem to exist anywhere on the drive</li>
<li>As this will take a long time to fix, you go back and schedule additional downtime for host A from 9:20pm Monday evening to 1:30am Tuesday Morning.</li>
</ol>

If you schedule overlapping periods of downtime for a host or service (in this case the periods were 7:40pm-9:30pm and 9:20pm-1:30am), Naemon will wait until the last period of scheduled downtime is over before it allows notifications to be sent out for that host or service.  In this example notifications would be suppressed for host A until 1:30am Tuesday morning.
