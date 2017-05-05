---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - DISABLE_SVC_NOTIFICATIONS<br>


#### Command Format:

`DISABLE_SVC_NOTIFICATIONS;host_name;service_description`

#### Description:

Disables notifications for a particular service.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the DISABLE_SVC_NOTIFICATIONS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] DISABLE_SVC_NOTIFICATIONS;host1;service1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



