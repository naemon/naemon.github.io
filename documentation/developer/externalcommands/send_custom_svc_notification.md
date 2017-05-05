---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - SEND_CUSTOM_SVC_NOTIFICATION<br>


#### Command Format:

`SEND_CUSTOM_SVC_NOTIFICATION;host_name;service_description;options;author;comment`

#### Description:

Allows you to send a custom service notification. Very useful in dire situations, emergencies or to communicate with all admins that are responsible for a particular service. When the service notification is sent out, the $NOTIFICATIONTYPE$ macro will be set to 'CUSTOM'. The &lt;options&gt; field is a logical OR of the following integer values that affect aspects of the notification that are sent out: 0 = No option (default), 1 = Broadcast (send notification to all normal and all escalated contacts for the service), 2 = Forced (notification is sent out regardless of current time, whether or not notifications are enabled, etc.), 4 = Increment current notification # for the service(this is not done by default for custom notifications)

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the SEND_CUSTOM_SVC_NOTIFICATION command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] SEND_CUSTOM_SVC_NOTIFICATION;host1;service1;0;naemonadmin;This is an example comment.\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



