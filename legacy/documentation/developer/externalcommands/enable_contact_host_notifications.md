---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_CONTACT_HOST_NOTIFICATIONS<br>


#### Command Format:

`ENABLE_CONTACT_HOST_NOTIFICATIONS;contact_name`

#### Description:

Enables host notifications for a particular contact.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_CONTACT_HOST_NOTIFICATIONS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_CONTACT_HOST_NOTIFICATIONS;naemonadmin\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



