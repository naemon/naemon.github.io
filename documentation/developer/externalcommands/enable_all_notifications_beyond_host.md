---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_ALL_NOTIFICATIONS_BEYOND_HOST<br>


#### Command Format:

`ENABLE_ALL_NOTIFICATIONS_BEYOND_HOST;host_name`

#### Description:

Enables notifications for all hosts and services 'beyond' (e.g. on all child hosts of) the specified host. The current notification setting for the specified host is not affected. Notifications will only be sent out for these hosts and services if notifications are also enabled on a program-wide basis.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_ALL_NOTIFICATIONS_BEYOND_HOST command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_ALL_NOTIFICATIONS_BEYOND_HOST;host1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



