---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - SCHEDULE_FORCED_HOST_CHECK<br>


#### Command Format:

`SCHEDULE_FORCED_HOST_CHECK;host_name;check_time`

#### Description:

Schedules a forced active check of a particular host at 'check_time'. The 'check_time' argument is specified in time_t format (seconds since the UNIX epoch). Forced checks are performed regardless of what time it is (e.g. timeperiod restrictions are ignored) and whether or not active checks are enabled on a host-specific or program-wide basis.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the SCHEDULE_FORCED_HOST_CHECK command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] SCHEDULE_FORCED_HOST_CHECK;host1;1478648441\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



