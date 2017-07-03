---
layout: doctoc
title: Passive Checks
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="activechecks.html">Active Checks</a>, <a href="servicechecks.html">Service Checks</a>, <a href="hostchecks.html">Host Checks</a>

### Introduction

In most cases you'll use Naemon to monitor your hosts and services using regularly scheduled <a href="activechecks.html">active checks</a>.  Active checks can be used to "poll" a device or service for status information every so often.  Naemon also supports a way to monitor hosts and services passively instead of actively.  They key features of passive checks are as follows:

<ul>
<li>Passive checks are initiated and performed external applications/processes</li>
<li>Passive check results are submitted to Naemon for processing</li>
</ul>

The major difference between active and passive checks is that active checks are initiated and performed by Naemon, while passive checks are performed by external applications.

### Uses For Passive Checks

Passive checks are useful for monitoring services that are:

<ul>
<li>Asynchronous in nature and cannot be monitored effectively by polling their status on a regularly scheduled basis</li>
<li>Located behind a firewall and cannot be checked actively from the monitoring host</li>
</ul>

Examples of asynchronous services that lend themselves to being monitored passively include SNMP traps and security alerts.  You never know how many (if any) traps or alerts you'll receive in a given time frame, so it's not feasible to just monitor their status every few minutes.

Passive checks are also used when configuring <a href="distributed.html">distributed</a> or <a href="redundancy.html">redundant</a> monitoring installations.

### How Passive Checks Work

<img src="images/passivechecks.png" border="0" style="float: right; padding: 0 0 10px 10px;" alt="Passive Checks" title="Passive Checks">

Here's how passive checks work in more detail...

<ol>
<li>An external application checks the status of a host or service.<br><br></li>
<li>The external application writes the results of the check to the <a href="configmain.html#command_file">external command file</a>.<br><br></li>
<li>The next time Naemon reads the external command file it will place the results of all passive checks into a queue for later processing.  The same queue that is used for storing results from active checks is also used to store the results from passive checks.<br><br></li>
<li>Naemon will periodically execute a <a href="configmain.html#check_result_reaper_frequency">check result reaper event</a> and scan the check result queue.  Each service check result that is found in the queue is processed in the same manner - regardless of whether the check was active or passive.  Naemon may send out notifications, log alerts, etc. depending on the check result information.<br><br></li>
</ol>

The processing of active and passive check results is essentially identical.  This allows for seamless integration of status information from external applications with Naemon.

### Enabling Passive Checks

In order to enable passive checks in Naemon, you'll need to do the following:

<ul>
<li>Set <a href="configmain.html#accept_passive_service_checks">accept_passive_service_checks</a> directive to 1.</li>
<li>Set the <i>passive_checks_enabled</i> directive in your host and service definitions to 1.</li>
</ul>

<p>If you want to disable processing of passive checks on a global basis, set the <a href="configmain.html#accept_passive_service_checks">accept_passive_service_checks</a> directive to 0.</p>

<p>If you would like to disable passive checks for just a few hosts or services, use the <i>passive_checks_enabled</i> directive in the host and/or service definitions to do so.</p>

### Submitting Passive Service Check Results

<p>External applications can submit passive service check results to Naemon by writing a PROCESS_SERVICE_CHECK_RESULT <a href="extcommands.html">external command</a> to the external command file.</p>

The format of the command is as follows:

<pre>
[&lt;timestamp&gt;] PROCESS_SERVICE_CHECK_RESULT;&lt;host_name&gt;;&lt;svc_description&gt;;&lt;return_code&gt;;&lt;plugin_output&gt;
</pre>

where...

<ul>
<li><i>timestamp</i> is the time in time_t format (seconds since the UNIX epoch) that the service check was performed (or submitted). Please note the single space after the right bracket.</li>
<li><i>host_name</i> is the short name of the host associated with the service in the service definition</li>
<li><i>svc_description</i> is the description of the service as specified in the service definition</li>
<li><i>return_code</i> is the return code of the check (0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN)</li>
<li><i>plugin_output</i> is the text output of the service check (i.e. the plugin output)</li>
</ul>

{{ site.note }}A service must be defined in Naemon before you can submit passive check results for it!  Naemon will ignore all check results for services that had not been configured before it was last (re)started.{{ site.end }}

{{ site.hint }}An example shell script of how to submit passive service check results to Naemon can be found in the documentation on <a href="volatileservices.html">volatile services</a>.{{ site.end }}



### Submitting Passive Host Check Results

<p>External applications can submit passive host check results to Naemon by writing a PROCESS_HOST_CHECK_RESULT external command to the external command file.</p>

The format of the command is as follows:

<pre>
[&lt;timestamp&gt;]&nbsp;PROCESS_HOST_CHECK_RESULT;&lt;host_name&gt;;&lt;host_status&gt;;&lt;plugin_output&gt;
</pre>

where...

<ul>
<li><i>timestamp</i> is the time in time_t format (seconds since the UNIX epoch) that the host check was performed (or submitted). Please note the single space after the right bracket.</li>
<li><i>host_name</i> is the short name of the host (as defined in the host definition)</li>
<li><i>host_status</i> is the status of the host (0=UP, 1=DOWN, 2=UNREACHABLE)</li>
<li><i>plugin_output</i> is the text output of the host check</li>
</ul>

{{ site.note }}A host must be defined in Naemon before you can submit passive check results for it!  Naemon will ignore all check results for hosts that had not been configured before it was last (re)started.{{ site.end }}



### Passive Checks and Host States

Unlike with active host checks, Naemon does not (by default) attempt to determine whether or host is DOWN or UNREACHABLE with passive checks.  Rather, Naemon takes the passive check result to be the actual state the host is in and doesn't try to determine the host's actual state using the <a href="networkreachability.html">reachability logic</a>.  This can cause problems if you are submitting passive checks from a remote host or you have a <a href="distributed.html">distributed monitoring setup</a> where the parent/child host relationships are different.

<p>You can tell Naemon to translate DOWN/UNREACHABLE passive check result states to their "proper" state by using the <a href="configmain.html#translate_passive_host_checks">translate_passive_host_checks</a> variable.  More information on how this works can be found <a href="passivestatetranslation.html">here</a>.</p>

{{ site.note }}Passive host checks are normally treated as <a href="statetypes.html">HARD states</a>, unless the <a href="configmain.html#passive_host_checks_are_soft">passive_host_checks_are_soft</a> option is enabled.{{ site.end }}

### Submitting Passive Check Results From Remote Hosts

<img src="images/nsca.png" border="0" style="float: right; padding: 0 0 10px 10px;" alt="NSCA Addon" title="NSCA Addon">

If an application that resides on the same host as Naemon is sending passive host or service check results, it can simply write the results directly to the external command file as outlined above.  However, applications on remote hosts can't do this so easily.

In order to allow remote hosts to send passive check results to the monitoring host, I've developed the <a href="addons.html#nsca">NSCA</a> addon.  The NSCA addon consists of a daemon that runs on the Naemon hosts and a client that is executed from remote hosts.  The daemon will listen for connections from remote clients, perform some basic validation on the results being submitted, and then write the check results directly into the external command file (as described above).  More information on the NSCA addon can be found <a href="addons.html#nsca">here</a>.
