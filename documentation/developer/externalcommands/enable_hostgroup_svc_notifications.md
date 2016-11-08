---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_HOSTGROUP_SVC_NOTIFICATIONS<br>


#### Command Format:

`ENABLE_HOSTGROUP_SVC_NOTIFICATIONS;hostgroup_name`

#### Description:

Enables notifications for all services that are associated with hosts in a particular hostgroup. This does not enable notifications for the hosts in the hostgroup - see the ENABLE_HOSTGROUP_HOST_NOTIFICATIONS command for that. In order for notifications to be sent out for these services, notifications must be enabled on a program-wide basis as well.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_HOSTGROUP_SVC_NOTIFICATIONS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_HOSTGROUP_SVC_NOTIFICATIONS;hostgroup1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



