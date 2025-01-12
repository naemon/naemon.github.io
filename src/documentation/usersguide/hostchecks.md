# Host Checks

## When Are Host Checks Performed?

Hosts are checked by the Naemon daemon:

- At regular intervals, as defined by the `check_interval` and `retry_interval` options in your [host definitions](objectdefinitions#host).
- On-demand when a service associated with the host changes state.
- On-demand as needed as part of the [host reachability](networkreachability) logic.
- On-demand as needed for [predictive host dependency checks](dependencychecks).


Regularly scheduled host checks are optional.

If you set the `check_interval` option in your host definition to zero (`0`), Naemon will not perform checks of the hosts on a regular basis.

It will, however, still perform on-demand checks of the host as needed for other parts of the monitoring logic.

On-demand checks are made when a service associated with the host changes state because Naemon needs to know whether the host has also changed state. Futhermore on-demand host checks are performed after a service check, if the service is in soft critical. This is a mechanism to ensure that the host reaches hard critical before the assosiated services. This is done in order to avoid notification storms.

Services that change state are often an indicator that the host may have also changed state.

For example, if Naemon detects that the HTTP service associated with a host just changed from a CRITICAL to an OK state, it may indicate that the host just recovered from a reboot and is now back up and running.

On-demand checks of hosts are also made as part of the [host reachability](networkreachability) logic.

Naemon is designed to detect network outages as quickly as possible, and distinguish between DOWN and UNREACHABLE host states.

These are very different states and can help an admin quickly locate the cause of a network outage.

On-demand checks are also performed as part of the [predictive host dependency check](dependencychecks) logic.

These checks help ensure that the dependency logic is as accurate as possible.

## Cached Host Checks

The performance of on-demand host checks can be significantly improved by implementing the use of cached checks, which allow Naemon to forgo executing a host check if it determines a relatively recent check result will do instead.

More information on cached checks can be found [here](cachedchecks).

## Dependencies and Checks

You can define [host execution dependencies](objectdefinitions#hostdependency) that prevent Naemon from checking the status of a host depending on the state of one or more other hosts.

More information on dependencies can be found [here](dependencies).

## Parallelization of Host Checks

Scheduled host checks are run in parallel.

When Naemon needs to run a scheduled host check, it will initiate the host check and then return to doing other work (running service checks, etc).

The host check runs in a child process that was fork()ed from the main Naemon daemon.

When the host check has completed, the child process will inform the main Naemon process (its parent) of the check results.

The main Naemon process then handles the check results and takes appropriate action (running event handlers, sending notifications, etc.).

On-demand host checks are also run in parallel if needed.

As mentioned earlier, Naemon can forgo the actual execution of an on-demand host check if it can use the cached results from a relatively recent host check.

When Naemon processes the results of scheduled and on-demand host checks, it may initiate (secondary) checks of other hosts.

These checks can be initiated for two reasons: [predictive dependency checks](dependencychecks) and to determining the status of the host using the [network reachability](networkreachability) logic.

The secondary checks that are initiated are usually run in parallel.

However, there is one big exception that you should be aware of, as it can have negative effect on performance...

> [!NOTE]
> Hosts which have their `max_check_attempts` value set to `1` can cause serious performance problems.

The reason?

If Naemon needs to determine their true state using the [network reachability](networkreachability) logic (to see if they're DOWN or UNREACHABLE), it will have to launch **serial** checks of all of the host's immediate parents.

 Just to reiterate, those checks are run *serially*, rather than in parallel, so it can cause a big performance hit.

For this reason, it is recommended that you always use a value greater than `1` for the `max_check_attempts` directives in your host definitions.

## Host States

Hosts that are checked can be in one of three different states:

- UP
- DOWN
- UNREACHABLE

## Host State Determination


Host checks are performed by [plugins](plugins), which can return a state of OK, WARNING, UNKNOWN, or CRITICAL.

How does Naemon translate these plugin return codes into host states of UP, DOWN, or UNREACHABLE?

Lets see...

The table below shows how plugin return codes correspond with preliminary host states.

Some post-processing (which is described later) is done which may then alter the final host state.

| Plugin Result | Preliminary Host State |
|:--------------|:-----------------------|
| OK            | UP                     |
| WARNING       | UP or DOWN*            |
| UNKNOWN       | DOWN                   |
| CRITICAL      | DOWN                   |

> [!NOTE]
> WARNING results usually means the host is UP.

However, WARNING results are interpreted to mean the host is DOWN if the [use_aggressive_host_checking](configmain#use_aggressive_host_checking) option is enabled.

If the preliminary host state is DOWN, Naemon will attempt to see if the host is really DOWN or if it is UNREACHABLE.

The distinction between DOWN and UNREACHABLE host states is important, as it allows admins to determine root cause of network outages faster.

The following table shows how Naemon makes a final state determination based on the state of the hosts parent(s).

A host's parents are defined in the `parents` directive in host definition.

| Preliminary Host State | Parent Host State                          | Final Host State |
|------------------------|--------------------------------------------|------------------|
| DOWN                   | At least one parent is UP                  | DOWN             |
| DOWN                   | All parents are either DOWN or UNREACHABLE | UNREACHABLE      |

More information on how Naemon distinguishes between DOWN and UNREACHABLE states can be found [here](networkreachability).

## Host State Changes

As you are probably well aware, hosts don't always stay in one state.

Things break, patches get applied, and servers need to be rebooted.

When Naemon checks the status of hosts, it will be able to detect when a host changes between UP, DOWN, and UNREACHABLE states and take appropriate action.

These state changes result in different [state types](statetypes) (`HARD` or `SOFT`), which can trigger [event handlers](eventhandlers) to be run and [notifications](notifications) to be sent out.

Detecting and dealing with state changes is what Naemon is all about.

When hosts change state too frequently they are considered to be "flapping".

A good example of a flapping host would be

server that keeps spontaneously rebooting as soon as the operating system loads.

That's always a fun scenario to have to deal with. Naemon can detect when hosts start flapping, and can suppress notifications until flapping stops and the host's state stabilizes.

More information on the flap detection logic can be found [here](flapping).
