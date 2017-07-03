---
layout: doctoc
title: Service and Host Freshness Checks
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="passivechecks.html">Passive Checks</a>, <a href="distributed.html">Distributed Monitoring</a>, <a href="redundancy.html">Redundant and Failover Monitoring</a>

### Introduction

Naemon supports a feature that does "freshness" checking on the results of host and service checks.  The purpose of freshness checking is to ensure that host and service checks are being provided passively by external applications on a regular basis.

Freshness checking is useful when you want to ensure that <a href="passivechecks.html">passive checks</a> are being received as frequently as you want.  This can be very useful in <a href="distributed.html">distributed</a> and <a href="redundancy.html">failover</a> monitoring environments.

<img src="images/freshness.png" border="0" style="float: right;" alt="Minty Fresh" title="Minty Fresh">

### How Does Freshness Checking Work?

Naemon periodically checks the freshness of the results for all hosts services that have freshness checking enabled.

<ul>
<li>A freshness threshold is calculated for each host or service.</li>
<li>For each host/service, the age of its last check result is compared with the freshness threshold.</li>
<li>If the age of the last check result is greater than the freshness threshold, the check result is considered "stale".</li>
<li>If the check results is found to be stale, Naemon will force an <a href="activechecks.html">active check</a> of the host or service by executing the command specified by in the host or service definition.</li>
</ul>

{{ site.hint }}An active check is executed even if active checks are disabled on a program-wide or host- or service-specific basis.{{ site.end }}

For example, if you have a freshness threshold of 60 for one of your services, Naemon will consider that service to be stale if its last check result is older than 60 seconds.

### Enabling Freshness Checking

Here's what you need to do to enable freshness checking...

<ul>
<li>Enable freshness checking on a program-wide basis with the <a href="configmain.html#check_service_freshness">check_service_freshness</a> and <a href="configmain.html#check_host_freshness">check_host_freshness</a> directives.</li>
<li>Use <a href="configmain.html#service_freshness_check_interval">service_freshness_check_interval</a> and <a href="configmain.html#host_freshness_check_interval">host_freshness_check_interval</a> options to tell Naemon how often in should check the freshness of service and host results.</li>
<li>Enable freshness checking on a host- and service-specific basis by setting the <i>check_freshness</i> option in your host and service definitions to a value of 1.</li>
<li>Configure freshness thresholds by setting the <i>freshness_threshold</i> option in your host and service definitions.</li>
<li>Configure the <i>check_command</i> option in your host or service definitions to reflect a valid command that should be used to actively check the host or service when it is detected as stale.</li>
<li>The <i>check_period</i> option in your host and service definitions is used when Naemon determines when a host or service can be checked for freshness, so make sure it is set to a valid timeperiod.</li>
</ul>

{{ site.hint }}If you do not specify a host- or service-specific <i>freshness_threshold</i> value (or you set it to zero), Naemon will automatically calculate a threshold automatically, based on a how often you monitor that particular host or service.{{ site.end }}

I would recommended that you explicitly specify a freshness threshold, rather than let Naemon pick one for you.

### Example

An example of a service that might require freshness checking might be one that reports the status of your nightly backup jobs.  Perhaps you have a external script that submit the results of the backup job to Naemon once the backup is completed.  In this case, all of the checks/results for the service are provided by an external application using passive checks.  In order to ensure that the status of the backup job gets reported every day, you may want to enable freshness checking for the service.  If the external script doesn't submit the results of the backup job, you can have Naemon fake a critical result by doing something like this...

Here's what the definition for the service might look like (some required options are omitted)...

<pre>
define service{
	host_name		backup-server
	service_description	ArcServe Backup Job
	active_checks_enabled	0		; active checks are NOT enabled
	passive_checks_enabled	1		; passive checks are enabled (this is how results are reported)
	check_freshness		1
	freshness_threshold	93600		; 26 hour threshold, since backups may not always finish at the same time
	check_command		no-backup-report	; this command is run only if the service results are "stale"
	...other options...
	}
</pre>

Notice that active checks are disabled for the service.  This is because the results for the service are only made by an external application using passive checks.  Freshness checking is enabled and the freshness threshold has been set to 26 hours.  This is a bit longer than 24 hours because backup jobs sometimes run late from day to day (depending on how much data there is to backup, how much network traffic is present, etc.).  The <i>no-backup-report</i> command is executed only if the results of the service are determined to be stale.  The definition of the <i>no-backup-report</i> command might look like this...

<pre>
define command{
	command_name	no-backup-report
	command_line	/usr/lib/naemon/plugins/check_dummy 2 "CRITICAL: Results of backup job were not reported!"
	}
</pre>

If Naemon detects that the service results are stale, it will run the <i>no-backup-report</i> command as an active service check.  This causes the <i>check_dummy</i> plugin to be executed, which returns a critical state to Naemon.  The service will then go into to a critical state (if it isn't already there) and someone will probably get notified of the problem.
