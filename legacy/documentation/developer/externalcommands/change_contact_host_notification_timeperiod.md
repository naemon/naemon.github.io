---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - CHANGE_CONTACT_HOST_NOTIFICATION_TIMEPERIOD<br>


#### Command Format:

`CHANGE_CONTACT_HOST_NOTIFICATION_TIMEPERIOD;contact_name;notification_timeperiod`

#### Description:

Changes the host notification timeperiod for a particular contact to what is specified by the 'notification_timeperiod' option. The 'notification_timeperiod' option should be the short name of the timeperiod that is to be used as the contact's host notification timeperiod. The timeperiod must have been configured in Naemon before it was last (re)started.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the CHANGE_CONTACT_HOST_NOTIFICATION_TIMEPERIOD command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] CHANGE_CONTACT_HOST_NOTIFICATION_TIMEPERIOD;naemonadmin;24x7\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



