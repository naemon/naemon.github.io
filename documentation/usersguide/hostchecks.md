---
layout: doctoc
title: Host Checks
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="networkreachability.html">Network Reachability</a>, <a href="activechecks.html">Active Checks</a>, <a href="servicechecks.html">Service Checks</a>, <a href="checkscheduling.html">Check Scheduling</a>, <a href="dependencychecks.html">Predictive Dependency Checks</a>

### Introduction

The basic workings of host checks are described here.

### When Are Host Checks Performed?

Hosts are checked by the Naemon daemon:

<ul>
<li>At regular intervals, as defined by the <i>check_interval</i> and <i>retry_interval</i> options in your <a href="objectdefinitions.html#host">host definitions</a>.</li>
<li>On-demand when a service associated with the host changes state.</li>
<li>On-demand as needed as part of the <a href="networkreachability.html">host reachability</a> logic.</li>
<li>On-demand as needed for <a href="dependencychecks.html">predictive host dependency checks</a>.</li>
</ul>

Regularly scheduled host checks are optional.

If you set the <i>check_interval</i> option in your host definition to zero (0), Naemon will not perform checks of the hosts on a regular basis.

It will, however, still perform on-demand checks of the host as needed for other parts of the monitoring logic.

On-demand checks are made when a service associated with the host changes state because Naemon needs to know whether the host has also changed state.

Services that change state are often an indicator that the host may have also changed state.

For example, if Naemon detects that the HTTP service associated with a host just changed from a CRITICAL to an OK state, it may indicate that the host just recovered from a reboot and is now back up and running.

On-demand checks of hosts are also made as part of the <a href="networkreachability.html">host reachability</a> logic.

Naemon is designed to detect network outages as quickly as possible, and distinguish between DOWN and UNREACHABLE host states.

These are very different states and can help an admin quickly locate the cause of a network outage.

On-demand checks are also performed as part of the <a href="dependencychecks.html">predictive host dependency check</a> logic.

These checks help ensure that the dependency logic is as accurate as possible.

### Cached Host Checks

The performance of on-demand host checks can be significantly improved by implementing the use of cached checks, which allow Naemon to forgo executing a host check if it determines a relatively recent check result will do instead.

More information on cached checks can be found <a href="cachedchecks.html">here</a>.

### Dependencies and Checks

You can define <a href="objectdefinitions.html#hostdependency">host execution dependencies</a> that prevent Naemon from checking the status of a host depending on the state of one or more other hosts.

More information on dependencies can be found <a href="dependencies.html">here</a>.

### Parallelization of Host Checks

Scheduled host checks are run in parallel.

When Naemon needs to run a scheduled host check, it will initiate the host check and then return to doing other work (running service checks, etc).

The host check runs in a child process that was fork()ed from the main Naemon daemon.

When the host check has completed, the child process will inform the main Naemon process (its parent) of the check results.

The main Naemon process then handles the check results and takes appropriate action (running event handlers, sending notifications, etc.).

On-demand host checks are also run in parallel if needed.

As mentioned earlier, Naemon can forgo the actual execution of an on-demand host check if it can use the cached results from a relatively recent host check.

When Naemon processes the results of scheduled and on-demand host checks, it may initiate (secondary) checks of other hosts.

These checks can be initiated for two reasons: <a href="dependencychecks.html">predictive dependency checks</a> and to determining the status of the host using the <a href="networkreachability.html">network reachability</a> logic.

The secondary checks that are initiated are usually run in parallel.

However, there is one big exception that you should be aware of, as it can have negative effect on performance...

{{ site.note }}Hosts which have their <i>max_check_attempts</i> value set to <b>1</b> can cause serious performance problems.{{ site.end }}

The reason?

If Naemon needs to determine their true state using the <a href="networkreachability.html">network reachability</a> logic (to see if they're DOWN or UNREACHABLE), it will have to launch <b>serial</b> checks of all of the host's immediate parents.

 Just to reiterate, those checks are run <i>serially</i>, rather than in parallel, so it can cause a big performance hit.

For this reason, I would recommend that you always use a value greater than 1 for the <i>max_check_attempts</i> directives in your host definitions.

### Host States

Hosts that are checked can be in one of three different states:

<ul>
<li>UP</li>
<li>DOWN</li>
<li>UNREACHABLE</li>
</ul>

### Host State Determination


Host checks are performed by <a href="plugins.html">plugins</a>, which can return a state of OK, WARNING, UNKNOWN, or CRITICAL.

How does Naemon translate these plugin return codes into host states of UP, DOWN, or UNREACHABLE?

Lets see...

The table below shows how plugin return codes correspond with preliminary host states.

Some post-processing (which is described later) is done which may then alter the final host state.

<table border="1">
<tr><th>Plugin Result</th><th>Preliminary Host State</th></tr>
<tr><td>OK</td><td>UP</td></tr>
<tr><td>WARNING</td><td>UP or DOWN<sup>*</sup></td></tr>
<tr><td>UNKNOWN</td><td>DOWN</td></tr>
<tr><td>CRITICAL</td><td>DOWN</td></tr>
</table>

{{ site.note }}WARNING results usually means the host is UP.{{ site.end }}

However, WARNING results are interpreted to mean the host is DOWN if the <a href="configmain.html#use_aggressive_host_checking">use_aggressive_host_checking</a> option is enabled.

If the preliminary host state is DOWN, Naemon will attempt to see if the host is really DOWN or if it is UNREACHABLE.

The distinction between DOWN and UNREACHABLE host states is important, as it allows admins to determine root cause of network outages faster.

The following table shows how Naemon makes a final state determination based on the state of the hosts parent(s).

A host's parents are defined in the <i>parents</i> directive in host definition.

<table border="1">
<tr><th>Preliminary Host State</th><th>Parent Host State</th><th>Final Host State</th></tr>
<tr><td>DOWN</td><td>At least one parent is UP</td><td>DOWN</td></tr>
<tr><td>DOWN</td><td>All parents are either DOWN or UNREACHABLE</td><td>UNREACHABLE</td></tr>
</table>

More information on how Naemon distinguishes between DOWN and UNREACHABLE states can be found <a href="networkreachability.html">here</a>.

### Host State Changes

As you are probably well aware, hosts don't always stay in one state.

Things break, patches get applied, and servers need to be rebooted.

When Naemon checks the status of hosts, it will be able to detect when a host changes between UP, DOWN, and UNREACHABLE states and take appropriate action.

These state changes result in different <a href="statetypes.html">state types</a> (HARD or SOFT), which can trigger <a href="eventhandlers.html">event handlers</a> to be run and <a href="notifications.html">notifications</a> to be sent out.

Detecting and dealing with state changes is what Naemon is all about.

When hosts change state too frequently they are considered to be "flapping".

A good example of a flapping host would be

server that keeps spontaneously rebooting as soon as the operating system loads.

That's always a fun scenario to have to deal with. Naemon can detect when hosts start flapping, and can suppress notifications until flapping stops and the host's state stabilizes.

More information on the flap detection logic can be found <a href="flapping.html">here</a>.
