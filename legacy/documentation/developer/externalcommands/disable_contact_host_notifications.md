---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - DISABLE_CONTACT_HOST_NOTIFICATIONS<br>


#### Command Format:

`DISABLE_CONTACT_HOST_NOTIFICATIONS;contact_name`

#### Description:

Disables host notifications for a particular contact.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the DISABLE_CONTACT_HOST_NOTIFICATIONS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] DISABLE_CONTACT_HOST_NOTIFICATIONS;naemonadmin\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



