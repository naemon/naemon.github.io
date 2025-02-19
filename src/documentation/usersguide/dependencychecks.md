# Predictive Dependency Checks

## See Also
- [Dependencies](dependencies)
- [Host Checks](hostchecks)
- [Service Checks](servicechecks)
- [Cached Checks](cachedchecks)


## Introduction

Host and service [dependencies](dependencies) can be defined to allow you greater control over when checks are executed and when notifications are sent out.  As dependencies are used to control basic aspects of the monitoring process, it is crucial to ensure that status information used in the dependency logic is as up to date as possible.

Naemon allows you to enable predictive dependency checks for hosts and services to ensure that the dependency logic will have the most up-to-date status information when it comes to making decisions about whether to send out notifications or allow active checks of a host or service.

## How Do Predictive Checks Work?

The image below shows a basic diagram of hosts that are being monitored by Naemon, along with their parent/child relationships and dependencies.

The `Switch2` host in this example has just changed state from an UP state to a problem state.  Naemon needs to determine whether the host is DOWN or UNREACHABLE, so it will launch parallel checks of `Switch2's` immediate parents (`Firewall1`) and children (`Comp1`, `Comp2`, and `Switch3`).  This is a normal function of the [host reachability](networkreachability) logic.

You will also notice that `Switch2` is depending on `Monitor1` and `File1` for either notifications or check execution (which one is unimportant in this example).  If predictive host dependency checks are enabled, Naemon will launch parallel checks of `Monitor1` and `File1` at the same time it launches checks of `Switch2's` immediate parents and children.  Naemon does this because it knows that it will have to test the dependency logic in the near future (e.g. for purposes of notification) and it wants to make sure it has the most current status information for the hosts that take part in the dependency.

![Predictive Dependency Checks](/images/usersguide/svg/predictive-dependency-checks.svg) {.img-bg}

That's how predictive dependency checks work.  Simple, eh?

> [!NOTE]
> Predictive service dependency checks work in a similar manner to what is described above.  Except, of course, they deal with services instead of hosts.

## Enabling Predictive Checks

Predictive dependency checks involve rather little overhead, so it is recommended that you enable them.  In most cases, the benefits of having accurate information for the dependency logic outweighs the extra overhead imposed by these checks.

Enabling predictive dependency checks is easy:

- Predictive host dependency checks are controlled by the [enable_predictive_host_dependency_checks](configmain#enable_predictive_host_dependency_checks) option.
- Predictive service dependency checks are controlled by the [enable_predictive_service_dependency_checks](configmain#enable_predictive_service_dependency_checks) option.

## Cached Checks

Predictive dependency checks are on-demand checks and are therefore subject to the rules of [cached checks](cachedchecks).  Cached checks can provide you with performance improvements by allowing Naemon to forgo running an actual host or service check if it can use a relatively recent check result instead.  More information on cached checks can be found [here](cachedchecks).
