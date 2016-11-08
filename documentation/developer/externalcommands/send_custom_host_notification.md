---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - SEND_CUSTOM_HOST_NOTIFICATION<br>


#### Command Format:

`SEND_CUSTOM_HOST_NOTIFICATION;host_name;options;author;comment`

#### Description:

Allows you to send a custom host notification. Very useful in dire situations, emergencies or to communicate with all admins that are responsible for a particular host. When the host notification is sent out, the $NOTIFICATIONTYPE$ macro will be set to 'CUSTOM'. The &lt;options&gt; field is a logical OR of the following integer values that affect aspects of the notification that are sent out: 0 = No option (default), 1 = Broadcast (send notification to all normal and all escalated contacts for the host), 2 = Forced (notification is sent out regardless of current time, whether or not notifications are enabled, etc.), 4 = Increment current notification # for the host (this is not done by default for custom notifications). The comment field can be used with the $NOTIFICATIONCOMMENT$ macro in notification commands.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the SEND_CUSTOM_HOST_NOTIFICATION command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] SEND_CUSTOM_HOST_NOTIFICATION;host1;0;naemonadmin;This is an example comment.\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



