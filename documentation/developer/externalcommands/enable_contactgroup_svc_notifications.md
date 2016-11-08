---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_CONTACTGROUP_SVC_NOTIFICATIONS<br>


#### Command Format:

`ENABLE_CONTACTGROUP_SVC_NOTIFICATIONS;contactgroup_name`

#### Description:

Enables service notifications for all contacts in a particular contactgroup.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_CONTACTGROUP_SVC_NOTIFICATIONS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_CONTACTGROUP_SVC_NOTIFICATIONS;contactgroup1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



