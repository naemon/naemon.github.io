---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_HOST_AND_CHILD_NOTIFICATIONS<br>


#### Command Format:

`ENABLE_HOST_AND_CHILD_NOTIFICATIONS;host_name`

#### Description:

Enables notifications for the specified host, as well as all hosts 'beyond' (e.g. on all child hosts of) the specified host. Notifications will only be sent out for these hosts if notifications are also enabled on a program-wide basis.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_HOST_AND_CHILD_NOTIFICATIONS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_HOST_AND_CHILD_NOTIFICATIONS;host1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



