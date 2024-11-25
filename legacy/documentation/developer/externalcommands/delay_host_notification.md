---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - DELAY_HOST_NOTIFICATION<br>


#### Command Format:

`DELAY_HOST_NOTIFICATION;host_name;notification_time`

#### Description:

Delays the next notification for a parciular service until 'notification_time'. The 'notification_time' argument is specified in time_t format (seconds since the UNIX epoch). Note that this will only have an affect if the service stays in the same problem state that it is currently in. If the service changes to another state, a new notification may go out before the time you specify in the 'notification_time' argument.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the DELAY_HOST_NOTIFICATION command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] DELAY_HOST_NOTIFICATION;host1;1478638441\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



