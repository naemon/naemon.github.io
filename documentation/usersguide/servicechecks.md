---
layout: doctoc
title: Service Checks
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="activechecks.html">Active Checks</a>, <a href="hostchecks.html">Host Checks</a>, <a href="checkscheduling.html">Check Scheduling</a>, <a href="dependencychecks.html">Predictive Dependency Checks</a>

### Introduction

The basic workings of service checks are described here.

### When Are Service Checks Performed?

Services are checked by the Naemon daemon:

<ul>
<li>At regular intervals, as defined by the <i>check_interval</i> and <i>retry_interval</i> options in your <a href="objectdefinitions.html#service">service definitions</a>.</li>
<li>On-demand as needed for <a href="dependencychecks.html">predictive service dependency checks</a>.</li>
</ul>

On-demand checks are performed as part of the <a href="dependencychecks.html">predictive service dependency check</a> logic.  These checks help ensure that the dependency logic is as accurate as possible.  If you don't make use of <a href="objectdefinitions.html#servicedependency">service dependencies</a>, Naemon won't perform any on-demand service checks.

### Cached Service Checks

The performance of on-demand service checks can be significantly improved by implementing the use of cached checks, which allow Naemon to forgo executing a service check if it determines a relatively recent check result will do instead.  Cached checks will only provide a performance increase if you are making use of <a href="objectdefinitions.html#servicedependency">service dependencies</a>.  More information on cached checks can be found <a href="cachedchecks.html">here</a>.

### Dependencies and Checks

You can define <a href="objectdefinitions.html#servicedependency">service execution dependencies</a> that prevent Naemon from checking the status of a service depending on the state of one or more other services.  More information on dependencies can be found <a href="dependencies.html">here</a>.

### Parallelization of Service Checks

Scheduled service checks are run in parallel.  When Naemon needs to run a scheduled service check, it will initiate the service check and then return to doing other work (running host checks, etc).  The service check runs in a child process that was fork()ed from the main Naemon daemon.  When the service check has completed, the child process will inform the main Naemon process (its parent) of the check results.  The main Naemon process then handles the check results and takes appropriate action (running event handlers, sending notifications, etc.).

On-demand service checks are also run in parallel if needed.  As mentioned earlier, Naemon can forgo the actual execution of an on-demand service check if it can use the cached results from a relatively recent service check.

### Service States

Services that are checked can be in one of four different states:

<ul>
<li>OK</li>
<li>WARNING</li>
<li>UNKNOWN</li>
<li>CRITICAL</li>
</ul>

### Service State Determination

Service checks are performed by <a href="plugins.html">plugins</a>, which can return a state of OK, WARNING, UNKNOWN, or CRITICAL.  These plugin states directly translate to service states.  For example, a plugin which returns a WARNING state will cause a service to have a WARNING state.

### Services State Changes

When Naemon checks the status of services, it will be able to detect when a service changes between OK, WARNING, UNKNOWN, and CRITICAL states and take appropriate action.  These state changes result in different <a href="statetypes.html">state types</a> (HARD or SOFT), which can trigger <a href="eventhandlers.html">event handlers</a> to be run and <a href="notifications.html">notifications</a> to be sent out.  Service state changes can also trigger on-demand <a href="hostchecks.html">host checks</a>.  Detecting and dealing with state changes is what Naemon is all about.

When services change state too frequently they are considered to be "flapping".  Naemon can detect when services start flapping, and can suppress notifications until flapping stops and the service's state stabilizes.  More information on the flap detection logic can be found <a href="flapping.html">here</a>.
