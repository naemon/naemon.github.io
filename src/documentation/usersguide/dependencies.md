# Host and Service Dependencies

## See Also
- [Active Checks](activechecks)
- [Host Checks](hostchecks)
- [Predictive Dependency Checks](dependencychecks)

## Introduction

Service and host dependencies are an advanced feature of Naemon that allow you to control the behavior of hosts and services based on the status of one or more other hosts or services.  I'll explain how dependencies work, along with the differences between host and service dependencies.

## Service Dependencies Overview

There are a few things you should know about service dependencies:

- A service can be dependent on one or more other services
- A service can be dependent on services which are not associated with the same host
- Service dependencies are not inherited (unless specifically configured to)
- Service dependencies can be used to cause service check execution and service notifications to be suppressed under different circumstances (OK, WARNING, UNKNOWN, and/or CRITICAL states)
- Service dependencies might only be valid during specific [timeperiods](timeperiods)

## Defining Service Dependencies

First, the basics.  You create service dependencies by adding [service dependency definitions](objectdefinitions#servicedependency) in your [object config file(s)](configobject).  In each definition you specify the *dependent* service, the service you are *depending on*, and the criteria (if any) that cause the execution and notification dependencies to fail (these are described later).

You can create several dependencies for a given service, but you must add a separate service dependency definition for each dependency you create.

## Example Service Dependencies

The image below shows an example logical layout of service notification and execution dependencies.   Different services are dependent on other services for notifications and check execution.

![Service Dependencies](/images/usersguide/svg/service-dependencies.svg) {.img-bg}

In this example, the dependency definitions for `Service F` on `Host C` would be defined as follows:

```
define servicedependency{
    host_name                       Host B
    service_description             Service D
    dependent_host_name             Host C
    dependent_service_description   Service F
    execution_failure_criteria      o
    notification_failure_criteria   w,u
}

define servicedependency{
    host_name                       Host B
    service_description             Service E
    dependent_host_name             Host C
    dependent_service_description   Service F
    execution_failure_criteria      n
    notification_failure_criteria   w,u,c
}

define servicedependency{
    host_name                       Host B
    service_description             Service C
    dependent_host_name             Host C
    dependent_service_description   Service F
    execution_failure_criteria      w
    notification_failure_criteria   c
    }
```

The other dependency definitions shown in the image above would be defined as follows:

```
define servicedependency{
    host_name                       Host A
    service_description	            Service A
    dependent_host_name             Host B
    dependent_service_description   Service D
    execution_failure_criteria      u
    notification_failure_criteria   n
}

define servicedependency{
    host_name                       Host A
    service_description             Service B
    dependent_host_name             Host B
    dependent_service_description   Service E
    execution_failure_criteria      w,u
    notification_failure_criteria   c
}

define servicedependency{
    host_name                       Host B
    service_description             Service C
    dependent_host_name             Host B
    dependent_service_description   Service E
    execution_failure_criteria      n
    notification_failure_criteria   w,u,c
}
```
## How Service Dependencies Are Tested

Before Naemon executes a service check or sends notifications out for a service, it will check to see if the service has any dependencies.  If it doesn't have any dependencies, the check is executed or the notification is sent out as it normally would be.  If the service *does* have one or more dependencies, Naemon will check each dependency entry as follows:

- Naemon gets the current status<sup><a href="#hard_dependencies">*</a></sup> of the service that is being *depended upon*.
- Naemon compares the current status of the service that is being *depended upon* against either the execution or notification failure options in the dependency definition (whichever one is relevant at the time).
- If the current status of the service that is being *depended upon* matches one of the failure options, the dependency is said to have failed and Naemon will break out of the dependency check loop.
- If the current state of the service that is being *depended upon* does not match any of the failure options for the dependency entry, the dependency is said to have passed and Naemon will go on and check the next dependency entry.

This cycle continues until either all dependencies for the service have been checked or until one dependency check fails.

<a name="hard_dependencies"></a>

### Hard dependencies {#hard_dependencies}

> [!NOTE]
> <sup>*</sup>One important thing to note is that by default, Naemon will use the most current [hard state](statetypes) of the service(s) that is/are being depended upon when it does the dependency checks.

If you want Naemon to use the most current state of the services (regardless of whether its a soft or hard state), enable the [soft_state_dependencies](configmain#soft_state_dependencies) option.


## Execution Dependencies

Execution dependencies are used to restrict when [active checks](activechecks) of a service can be performed.  [Passive checks](passivechecks) are not restricted by execution dependencies.

If *all* of the execution dependency tests for the service *passed*, Naemon will execute the check of the service as it normally would.  If even just one of the execution dependencies for a service fails, Naemon will temporarily prevent the execution of checks for that (dependent) service.  At some point in the future the execution dependency tests for the service may all pass.  If this happens, Naemon will start checking the service again as it normally would. 

In the example above, `Service E` would have failed execution dependencies if `Service B` is in a WARNING or UNKNOWN state.  If this was the case, the service check would not be performed and the check would be scheduled for (potential) execution at a later time.

## Notification Dependencies

If *all* of the notification dependency tests for the service *passed*, Naemon will send notifications out for the service as it normally would.  If even just one of the notification dependencies for a service fails, Naemon will temporarily repress notifications for that (dependent) service.  At some point in the future the notification dependency tests for the service may all pass.  If this happens, Naemon will start sending out notifications again as it normally would for the service.  More information on the notification logic can be found <a href="notifications.html">here</a>.

In the example above, `Service F` would have failed notification dependencies if `Service C` is in a CRITICAL state, *and/or* `Service D` is in a WARNING or UNKNOWN state, *and/or* if `Service E` is in a WARNING, UNKNOWN, or CRITICAL state.  If this were the case, notifications for the service would not be sent out.

## Dependency Inheritance

As mentioned before, service dependencies are *not* inherited by default.  In the example above you can see that `Service F` is dependent on `Service E`.  However, it does not automatically inherit `Service E's` dependencies on `Service B` and `Service C`.  In order to make `Service F` dependent on `Service C` we had to add another service dependency definition.  There is no dependency definition for `Service B`, so `Service F` is *not* dependent on `Service B`.

If you *do* wish to make service dependencies inheritable, you must use the `inherits_parent` directive in the <a href="objectdefinitions.html#servicedependency">service dependency</a> definition.  When this directive is enabled, it indicates that the dependency inherits dependencies of the service *that is being depended upon* (also referred to as the master service). In other words, if the master service is dependent upon other services and any one of those dependencies fail, this dependency will also fail.

In the example above, imagine that you want to add a new dependency for service F to make it dependent on `Service A`.  You could create a new dependency definition that specified `Service F` as the *dependent* service and `Service A` as being the *master* service (i.e. the service *that is being dependent on*).  You could alternatively modify the dependency definition for `Services D` and `F` to look like this:

```
define servicedependency{
    host_name                       Host B
    service_description             Service D
    dependent_host_name             Host C
    dependent_service_description   Service F
    execution_failure_criteria      o
    notification_failure_criteria   n
    inherits_parent                 1
}
```

Since the `inherits_parent` directive is enabled, the dependency between `Services A` and `D` will be tested when the dependency between `Services F` and `D` are being tested.

Dependencies can have multiple levels of inheritance.  If the dependency definition between `A` and `D` had its `inherits_parent` directive enable and service A was dependent on some other service (let's call it `Service G`), the `Service F` would be dependent on `Services D`, `A`, and `G` (each with potentially different criteria).

## Host Dependencies

As you'd probably expect, host dependencies work in a similar fashion to service dependencies.  The difference is that they're for hosts, not services.

> [!WARNING]
> Do not confuse host dependencies with parent/child host relationships.

You should be using parent/child host relationships (defined with the `parents` directive in [host](objectdefinitions#host) definitions) for most cases, rather than host dependencies.  A description of how parent/child host relationships work can be found in the documentation on <a href="networkreachability.html">network reachability</a>.

Here are the basics about host dependencies:

- A host can be dependent on one or more other host
- Host dependencies are not inherited (unless specifically configured to)
- Host dependencies can be used to cause host check execution and host notifications to be suppressed under different circumstances (UP, DOWN, and/or UNREACHABLE states)
- Host dependencies might only be valid during specific [timeperiods](timeperiods)

## Example Host Dependencies

The image below shows an example of the logical layout of host notification dependencies.  Different hosts are dependent on other hosts for notifications.

![Host Dependencies](/images/usersguide/svg/host-dependencies.svg) {.img-bg}

In the example above, the dependency definitions for *Host C* would be defined as follows:

```
define hostdependency{
    host_name                       Host A
    dependent_host_name             Host C
    notification_failure_criteria   d
}

define hostdependency{
    host_name                       Host B
    dependent_host_name             Host C
    notification_failure_criteria   d,u
}
```

As with service dependencies, host dependencies are not inherited.  In the example image you can see that `Host C` does not inherit the host dependencies
of `Host B`.  In order for `Host C` to be dependent on `Host A`, a new host dependency definition must be defined.

Host notification dependencies work in a similar manner to service notification dependencies.  If *all* of the notification dependency tests for the host *pass*, Naemon will
send notifications out for the host as it normally would.  If even just one of the notification dependencies for a host fails, Naemon will temporarily repress notifications
for that (dependent) host.  At some point in the future the notification dependency tests for the host may all pass. 
If this happens, Naemon will start sending out notifications again as it normally would for the host.  More information on the notification logic can be found [here](notifications).
