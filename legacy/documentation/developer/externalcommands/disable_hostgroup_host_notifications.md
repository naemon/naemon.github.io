---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - DISABLE_HOSTGROUP_HOST_NOTIFICATIONS<br>


#### Command Format:

`DISABLE_HOSTGROUP_HOST_NOTIFICATIONS;hostgroup_name`

#### Description:

Disables notifications for all hosts in a particular hostgroup. This does not disable notifications for the services associated with the hosts in the hostgroup - see the DISABLE_HOSTGROUP_SVC_NOTIFICATIONS command for that.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the DISABLE_HOSTGROUP_HOST_NOTIFICATIONS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] DISABLE_HOSTGROUP_HOST_NOTIFICATIONS;hostgroup1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



