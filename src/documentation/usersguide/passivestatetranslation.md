# Passive Host State Translation


## Introduction

When Naemon receives passive host checks from remote sources (i.e other Naemon
instances in distributed or failover setups), the host state reported by the
remote source may not accurately reflect the state of the host from Naemon' view.

As distributed and failover monitoring installations are fairly common, it is
important to provide a mechanism for ensuring accurate host states between
different instances of Naemon.



## Different World Views

The image below shows a simplified view of a failover monitoring setup.

 - `Naemon-A` is the primary monitoring server, and is actively monitoring
   all switches and routers.
 - `Naemon-B` and `Naemon-C` are backup monitoring servers, and are
   receiving passive check results from `Naemon-A`
 - Both `Router-C` and `Router-D` have suffered failures and are offline.

![Passive State Translation](/images/usersguide/svg/passivehosttranslation.svg) {.img-bg}

What states are `Router-C` and `Router-D` currently in?

The answer depends on which Naemon instance you ask.

 - `Naemon-A` sees `Router-D` as DOWN and `Router-C` as UNREACHABLE
 - `Naemon-B` should see `Router-C` as DOWN and `Router-D` as UNREACHABLE
 - `Naemon-C` should see both routers as being DOWN.

Each Naemon instance has a different view of the network.

The backup monitoring servers should not blindly accept passive host states from the
primary monitoring server, or they will have incorrect information on the current state of the network.

Without translating passive host check results from the primary monitoring server
(`Naemon-A`), `Naemon-C` would see `Router-D` as UNREACHABLE, when
it is really DOWN based on its viewpoint.

Similarly, the DOWN/UNREACHABLE states (from the viewpoint of `Naemon-A`) for
`Router-C` and `Router-D` should be flipped from the viewpoint of `Naemon-B`.

> [!NOTE]
> There may be some situations where you do not want Naemon to translate DOWN/UNREACHABLE states from remote sources to their "correct" state from the viewpoint of the local Naemon instance.

For example, in distributed monitoring environments you may want the central Naemon
instance to know how distributed instances see their respective portions of the network.



## Enabling State Translation

By default, Naemon will _not_ automatically translate DOWN/UNREACHABLE states
from passive check results.

You will need to enable this feature if you need and want it.

The automatic translation of passive host check states is controlled by the
[translate_passive_host_checks](configmain#translate_passive_host_checks) variable.

Enable it and Naemon will automatically translate DOWN and UNREACHABLE states from
remote sources to their correct state for the local instance of Naemon.
