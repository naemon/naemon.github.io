---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - SCHEDULE_SVC_CHECK<br>


#### Command Format:

`SCHEDULE_SVC_CHECK;host_name;service_description;check_time`

#### Description:

Schedules the next active check of a specified service at 'check_time'. The 'check_time' argument is specified in time_t format (seconds since the UNIX epoch). Note that the service may not actually be checked at the time you specify. This could occur for a number of reasons: active checks are disabled on a program-wide or service-specific basis, the service is already scheduled to be checked at an earlier time, etc. If you want to force the service check to occur at the time you specify, look at the SCHEDULE_FORCED_SVC_CHECK command.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the SCHEDULE_SVC_CHECK command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] SCHEDULE_SVC_CHECK;host1;service1;1478648441\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



