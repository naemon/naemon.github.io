---
layout: doctoc
title: Predictive Dependency Checks
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="dependencies.html">Dependencies</a>, <a href="servicechecks.html">Service Checks</a>, <a href="hostchecks.html">Host Checks</a>, <a href="cachedchecks.html">Cached Checks</a>

### Introduction

Host and service <a href="dependencies.html">dependencies</a> can be defined to allow you greater control over when checks are executed and when notifications are sent out.  As dependencies are used to control basic aspects of the monitoring process, it is crucial to ensure that status information used in the dependency logic is as up to date as possible.

Naemon allows you to enable predictive dependency checks for hosts and services to ensure that the dependency logic will have the most up-to-date status information when it comes to making decisions about whether to send out notifications or allow active checks of a host or service.

### How Do Predictive Checks Work?

The image below shows a basic diagram of hosts that are being monitored by Naemon, along with their parent/child relationships and dependencies.

The *Switch2* host in this example has just changed state from an UP state to a problem state.  Naemon needs to determine whether the host is DOWN or UNREACHABLE, so it will launch parallel checks of *Switch2*'s immediate parents (*Firewall1*) and children (*Comp1*, *Comp2*, and *Switch3*).  This is a normal function of the <a href="networkreachability.html">host reachability</a> logic.

You will also notice that *Switch2* is depending on *Monitor1* and *File1* for either notifications or check execution (which one is unimportant in this example).  If predictive host dependency checks are enabled, Naemon will launch parallel checks of *Monitor1* and *File1* at the same time it launches checks of *Switch2*'s immediate parents and children.  Naemon does this because it knows that it will have to test the dependency logic in the near future (e.g. for purposes of notification) and it wants to make sure it has the most current status information for the hosts that take part in the dependency.

<img src="images/predictive-dependency-checks.png" border="0" alt="Predictive Dependency Checks" title="Predictive Dependency Checks">

That's how predictive dependency checks work.  Simple, eh?

{{ site.note }}Predictive service dependency checks work in a similar manner to what is described above.  Except, of course, they deal with services instead of hosts.{{ site.end }}

### Enabling Predictive Checks

Predictive dependency checks involve rather little overhead, so I would recommend that you enable them.  In most cases, the benefits of having accurate information for the dependency logic outweighs the extra overhead imposed by these checks.

Enabling predictive dependency checks is easy:

<ul>
<li>Predictive host dependency checks are controlled by the <a href="configmain.html#enable_predictive_host_dependency_checks">enable_predictive_host_dependency_checks</a> option.</li>
<li>Predictive service dependency checks are controlled by the <a href="configmain.html#enable_predictive_service_dependency_checks">enable_predictive_service_dependency_checks</a> option.</li>
</ul>

### Cached Checks

Predictive dependency checks are on-demand checks and are therefore subject to the rules of <a href="cachedchecks.html">cached checks</a>.  Cached checks can provide you with performance improvements by allowing Naemon to forgo running an actual host or service check if it can use a relatively recent check result instead.  More information on cached checks can be found <a href="cachedchecks.html">here</a>.
