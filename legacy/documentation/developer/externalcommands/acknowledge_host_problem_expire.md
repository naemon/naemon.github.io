---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ACKNOWLEDGE_HOST_PROBLEM_EXPIRE<br>


#### Command Format:

`ACKNOWLEDGE_HOST_PROBLEM_EXPIRE;host_name;sticky;notify;persistent;end_time;author;comment`

#### Description:

Allows you to acknowledge the current problem for the specified host for a limitied time. By acknowledging the current problem, future notifications (for the same host state) are disabled. The 'end_time' option determines the time after which the acknowledgement is cleared automatically. If the 'sticky' option is set to one (1), the acknowledgement will remain until the host returns to an UP state. Otherwise the acknowledgement will automatically be removed when the host changes state. If the 'notify' option is set to one (1), a notification will be sent out to contacts indicating that the current host problem has been acknowledged. If the 'persistent' option is set to one (1), the comment associated with the acknowledgement will remain once the acknowledgement is removed. If not, the comment will be deleted when the acknowledgement is removed.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ACKNOWLEDGE_HOST_PROBLEM_EXPIRE command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ACKNOWLEDGE_HOST_PROBLEM_EXPIRE;host1;1;1;1;1478638441;naemonadmin;This is an example comment.\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



