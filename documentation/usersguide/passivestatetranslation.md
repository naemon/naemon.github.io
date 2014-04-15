---
layout: doctoc
title: Passive Host State Translation
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="hostchecks.html">Host Checks</a>, <a href="networkreachability.html">Network Reachability</a>, <a href="passivechecks.html">Passive Checks</a>, <a href="distributed.html">Distributed Monitoring</a>, <a href="redundancy.html">Redundant/Failover Monitoring</a>



### Introduction

When Naemon receives passive host checks from remote sources (i.e other Naemon
instances in distributed or failover setups), the host state reported by the
remote source may not accurately reflect the state of the host from Naemon' view.

As distributed and failover monitoring installations are fairly common, it is
important to provide a mechanism for ensuring accurate host states between
different instances of Naemon.



### Different World Views

The image below shows a simplified view of a failover monitoring setup.

 - <i>Naemon-A</i> is the primary monitoring server, and is actively monitoring
   all switches and routers.
 - <i>Naemon-B</i> and <i>Naemon-C</i> are backup monitoring servers, and are
   receiving passive check results from <i>Naemon-A</i>
 - Both <i>Router-C</i> and <i>Router-D</i> have suffered failures and are offline.

<img src="images/passivehosttranslation.png" border="0" alt="Passive State Translation" title="Passive State Translation">

What states are <i>Router-C</i> and <i>Router-D</i> currently in?

The answer depends on which Naemon instance you ask.

 - <i>Naemon-A</i> sees <i>Router-D</i> as DOWN and <i>Router-C</i> as UNREACHABLE
 - <i>Naemon-B</i> should see <i>Router-C</i> as DOWN and <i>Router-D</i> as UNREACHABLE
 - <i>Naemon-C</i> should see both routers as being DOWN.

Each Naemon instance has a different view of the network.

The backup monitoring servers should not blindly accept passive host states from the
primary monitoring server, or they will have incorrect information on the current state of the network.

Without translating passive host check results from the primary monitoring server
(<i>Naemon-A</i>), <i>Naemon-C</i> would see <i>Router-D</i> as UNREACHABLE, when
it is really DOWN based on its viewpoint.

Similarly, the DOWN/UNREACHABLE states (from the viewpoint of <i>Naemon-A</i>) for
<i>Router-C</i> and <i>Router-D</i> should be flipped from the viewpoint of <i>Naemon-B</i>.

{{ site.note }}There may be some situations where you do not want Naemon to translate DOWN/UNREACHABLE states from remote sources to their "correct" state from the viewpoint of the local Naemon instance.{{ site.end }}

For example, in distributed monitoring environments you may want the central Naemon
instance to know how distributed instances see their respective portions of the network.



### Enabling State Translation

By default, Naemon will <i>not</i> automatically translate DOWN/UNREACHABLE states
from passive check results.

You will need to enable this feature if you need and want it.

The automatic translation of passive host check states is controlled by the
<a href="configmain.html#translate_passive_host_checks">translate_passive_host_checks</a> variable.

Enable it and Naemon will automatically translate DOWN and UNREACHABLE states from
remote sources to their correct state for the local instance of Naemon.
