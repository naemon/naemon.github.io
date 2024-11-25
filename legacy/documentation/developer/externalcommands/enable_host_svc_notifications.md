---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_HOST_SVC_NOTIFICATIONS<br>


#### Command Format:

`ENABLE_HOST_SVC_NOTIFICATIONS;host_name`

#### Description:

Enables notifications for all services on the specified host. Note that notifications will not be sent out if notifications are disabled on a program-wide basis.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_HOST_SVC_NOTIFICATIONS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_HOST_SVC_NOTIFICATIONS;host1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



