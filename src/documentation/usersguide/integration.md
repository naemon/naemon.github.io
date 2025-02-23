## Integration Overview

## See Also
- [External Commands](extcommands)
- [List of external commands](/documentation/developer/externalcommands/)
- [Passive Checks](passivechecks)
- [Event Handlers](eventhandlers)
- [Plugins](plugins)

## Introduction

One of the reasons that Naemon is such a popular monitoring application is the fact that it can be easily integrated in your existing infrastructure.  There are several methods of integrating Naemon with the management software you're already using and you can monitor almost any type of new or custom hardware, service, or application that you might have.

## Integration Points

![Integration Overview](/images/usersguide/svg/integrationoverview.svg) {.img-bg}

To monitor new hardware, services, or applications, check out the docs on:

- [Plugins](plugins)
- [Plugin API](pluginapi)
- [Passive Checks](passivechecks)
- [Event Handlers](eventhandlers)


To get data into Naemon from external applications, check out the docs on:

- [Passive Checks](passivechecks)
- [External Commands](extcommands)

To send status, performance, or notification information from Naemon to external applications, check out the docs on:

- [Event Handlers](eventhandlers)
- [OCSP](configmain#ocsp_command) and [OCHP](configmain#ochp_command) Commands
- [Performance Data](perfdata)
- [Notifications](notifications)

## Integration Examples

I've documented some examples on how to integrate Naemon with external applications:

- [TCP Wrappers](int-tcpwrappers) (security alerts)
- [SNMP Traps](int-snmptrap) (Arcserve backup job status)

