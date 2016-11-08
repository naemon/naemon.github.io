---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_HOST_NOTIFICATIONS<br>


#### Command Format:

`ENABLE_HOST_NOTIFICATIONS;host_name`

#### Description:

Enables notifications for a particular host. Notifications will be sent out for the host only if notifications are enabled on a program-wide basis as well.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_HOST_NOTIFICATIONS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_HOST_NOTIFICATIONS;host1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



