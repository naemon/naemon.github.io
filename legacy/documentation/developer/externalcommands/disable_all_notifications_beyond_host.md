---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - DISABLE_ALL_NOTIFICATIONS_BEYOND_HOST<br>


#### Command Format:

`DISABLE_ALL_NOTIFICATIONS_BEYOND_HOST;host_name`

#### Description:

Disables notifications for all hosts and services 'beyond' (e.g. on all child hosts of) the specified host. The current notification setting for the specified host is not affected.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the DISABLE_ALL_NOTIFICATIONS_BEYOND_HOST command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] DISABLE_ALL_NOTIFICATIONS_BEYOND_HOST;host1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



