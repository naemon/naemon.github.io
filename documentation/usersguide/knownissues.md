---
layout: doctoc
title: Known Issues
---

{% include review_required.md %}


<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="whatsnew.html">What's New</a>

### Known Issues

<ol>
<li><font color="red"><b>Timeperiods</b></font>:<br>
	<ul>
	<li><b>Exclusions and Host/Service Checks</b> - There is a bug in the service/host check scheduling logic that rears its head when you use timeperiod definitions that use the <i>exclude</i> directive.  The problem occurs when Nagios Core tries to re-schedule the next check.  In this case, the scheduling logic may incorrectly schedule the next check further out in the future than it should.  In essence, it skips over the (missing) logic where it could determine an earlier possible time using the exception times.  Imperfect Solution: Don't use timeperiod definitions that exclude other timeperods for your host/service check periods.  A fix is being worked on, and will hopefully make it into a 3.4.x release.</li>
	</ul>
</li>
