---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ACKNOWLEDGE_SVC_PROBLEM_EXPIRE<br>


#### Command Format:

`ACKNOWLEDGE_SVC_PROBLEM_EXPIRE;host_name;service_description;sticky;notify;persistent;end_time;author;comment`

#### Description:

Allows you to acknowledge the current problem for the specified service. By acknowledging the current problem, future notifications (for the same servicestate) are disabled. The 'end_time' option determines the time after which the acknowledgement is cleared automatically. If the 'sticky' option is set to one (1), the acknowledgement will remain until the service returns to an OK state. Otherwise the acknowledgement will automatically be removed when the service changes state. If the 'notify' option is set to one (1), a notification will be sent out to contacts indicating that the current service problem has been acknowledged. If the 'persistent' option is set to one (1), the comment associated with the acknowledgement will remain once the acknowledgement is removed. If not, the comment will be deleted when the acknowledgement is removed.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ACKNOWLEDGE_SVC_PROBLEM_EXPIRE command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ACKNOWLEDGE_SVC_PROBLEM_EXPIRE;host1;service1;1;1;1;1478638441;naemonadmin;This is an example comment.\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



