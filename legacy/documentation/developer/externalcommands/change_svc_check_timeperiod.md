---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - CHANGE_SVC_CHECK_TIMEPERIOD<br>


#### Command Format:

`CHANGE_SVC_CHECK_TIMEPERIOD;host_name;service_description;check_timeperiod`

#### Description:

Changes the check timeperiod for a particular service to what is specified by the 'check_timeperiod' option. The 'check_timeperiod' option should be the short name of the timeperod that is to be used as the service check timeperiod. The timeperiod must have been configured in Naemon before it was last (re)started.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the CHANGE_SVC_CHECK_TIMEPERIOD command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] CHANGE_SVC_CHECK_TIMEPERIOD;host1;service1;24x7\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



