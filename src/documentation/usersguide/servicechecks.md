# Service Checks

## When Are Service Checks Performed?

Services are checked by the Naemon daemon:


- At regular intervals, as defined by the `check_interval` and `retry_interval` options in your [service definitions](objectdefinitions#service).
- On-demand as needed for [predictive service dependency checks](dependencychecks).


On-demand checks are performed as part of the [predictive service dependency check](dependencychecks) logic.  These checks help ensure that the dependency logic is as accurate as possible.  If you don't make use of [service dependencies](objectdefinitions#servicedependency), Naemon won't perform any on-demand service checks.

## Cached Service Checks

The performance of on-demand service checks can be significantly improved by implementing the use of cached checks, which allow Naemon to forgo executing a service check if it determines a relatively recent check result will do instead.  Cached checks will only provide a performance increase if you are making use of [service dependencies](objectdefinitions#servicedependency).  More information on cached checks can be found [here](cachedchecks).

## Dependencies and Checks

You can define [service execution dependencies](objectdefinitions#servicedependency) that prevent Naemon from checking the status of a service depending on the state of one or more other services.  More information on dependencies can be found [here](dependencies).

## Parallelization of Service Checks

Scheduled service checks are run in parallel.  When Naemon needs to run a scheduled service check, it will initiate the service check and then return to doing other work (running host checks, etc).  The service check runs in a child process that was fork()ed from the main Naemon daemon.  When the service check has completed, the child process will inform the main Naemon process (its parent) of the check results.  The main Naemon process then handles the check results and takes appropriate action (running event handlers, sending notifications, etc.).

On-demand service checks are also run in parallel if needed.  As mentioned earlier, Naemon can forgo the actual execution of an on-demand service check if it can use the cached results from a relatively recent service check.

## Service States

Services that are checked can be in one of four different states:


- OK
- WARNING
- UNKNOWN
- CRITICAL

## Service State Determination

Service checks are performed by [plugins](plugins), which can return a state of OK, WARNING, UNKNOWN, or CRITICAL.  These plugin states directly translate to service states.  For example, a plugin which returns a WARNING state will cause a service to have a WARNING state.

## Services State Changes

When Naemon checks the status of services, it will be able to detect when a service changes between OK, WARNING, UNKNOWN, and CRITICAL states and take appropriate action.  These state changes result in different [state types](statetypes) (`HARD` or `SOFT`), which can trigger [event handlers](eventhandlers) to be run and [notifications](notifications) to be sent out.  Service state changes can also trigger on-demand [host checks](hostchecks).  Detecting and dealing with state changes is what Naemon is all about.

When services change state too frequently they are considered to be "flapping".  Naemon can detect when services start flapping, and can suppress notifications until flapping stops and the service's state stabilizes.  More information on the flap detection logic can be found [here](flapping).
