---
layout: doctoc
title: What's New
---


<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="knownissues.html">Known Issues</a>

<span class="glyphicon glyphicon-thumbs-up"></span> Important: Make sure you read through the documentation and the FAQs at <a href="http://support.nagios.com/">support.nagios.com</a> before sending a question to the mailing lists.

<a name="changelog"></a>


### Change Log

The change log for Naemon can be found online at <a href="http://www.nagios.org/development/history">http://www.nagios.org/development/history</a> or in the <b>Changelog</b> file in the root directory of the source code distribution.

### Changes and New Features

<ol>
<li><font color="red"><b>Documentation</b></font>:<br>
	<ul>
	<li><b>Doc updates</b> - I'm slowly making my way through rewriting most all portions of the documentation.  This is going to take a while, as (1) there's a lot of documentation and (2) writing documentation is not my favorite thing in the world.  Expect some portions of the docs to be different than others for a while.  I hope the changes I'm making will make things clearer/easier for new and seasoned Naemon users alike.</li>
	</ul>
</li>
<li><b>Macros</b>:<br>
	<ul>
	<li><b>New macros</b> - New macros have been added, including: $TEMPPATH$, $LONGHOSTOUTPUT$, $LONGSERVICEOUTPUT$, $HOSTNOTIFICATIONID$, $SERVICENOTIFICATIONID$, $HOSTEVENTID$, $SERVICEEVENTID$, $SERVICEISVOLATILE$, $LASTHOSTEVENTID$, $LASTSERVICEEVENTID$, $HOSTDISPLAYNAME$, $SERVICEDISPLAYNAME$, $MAXHOSTATTEMPTS$, $MAXSERVICEATTEMPTS$, $TOTALHOSTSERVICES$, $TOTALHOSTSERVICESOK$, $TOTALHOSTSERVICESWARNING$, $TOTALHOSTSERVICESUNKNOWN$, $TOTALHOSTSERVICESCRITICAL$, $CONTACTGROUPNAME$, $CONTACTGROUPNAMES$, $CONTACTGROUPALIAS$, $CONTACTGROUPMEMBERS$, $NOTIFICATIONRECIPIENTS$, $NOTIFICATIONISESCALATED$, $NOTIFICATIONAUTHOR$, $NOTIFICATIONAUTHORNAME$, $NOTIFICATIONAUTHORALIAS$, $NOTIFICATIONCOMMENT$, $EVENTSTARTTIME$, $HOSTPROBLEMID$, $LASTHOSTPROBLEMID$, $SERVICEPROBLEMID$, $LASTSERVICEPROBLEMID$, $LASTHOSSTATE$, $LASTHOSTSTATEID$, $LASTSERVICESTATE$, $LASTSERVICESTATEID$. Two special on-demand time macros have also been added: $ISVALIDTIME:$ and $NEXTVALIDTIME:$.</li>
	<li><b>Removed macros</b> - The old $NOTIFICATIONNUMBER$ macro has been deprecated in favor of new $HOSTNOTIFICATIONNUMBER$ and $SERVICENOTIFICATIONNUMBER$ macros.</li>
	<li><b>Changes</b> - The $HOSTNOTES$ and $SERVICENOTES$ macros may now contain macros themselves, just like the $HOSTNOTESURL$, $HOSTACTIONURL$, $SERVICENOTESURL$ and $SERVICEACTIONURL$ macros.</li>
	<li>Macros are normally available as environment variables when check, event handler, notification, and other commands are run.  This can be rather CPU intensive in large Naemon installations, so you can disable this behavior with the <a href="configmain.html#enable_environment_macros">enable_environment_macros</a> option.</li>
	<li>Macro information can be found <a href="macros.html">here</a>.</li>
	</ul>
</li>
</ol>
