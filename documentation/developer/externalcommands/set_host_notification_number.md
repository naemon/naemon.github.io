---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - SET_HOST_NOTIFICATION_NUMBER<br>


#### Command Format:

`SET_HOST_NOTIFICATION_NUMBER;host_name;notification_number`

#### Description:

Sets the current notification number for a particular host. A value of 0 indicates that no notification has yet been sent for the current host problem. Useful for forcing an escalation (based on notification number) or replicating notification information in redundant monitoring environments. Notification numbers greater than zero have no noticeable affect on the notification process if the host is currently in an UP state.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the SET_HOST_NOTIFICATION_NUMBER command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] SET_HOST_NOTIFICATION_NUMBER;host1;0\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



