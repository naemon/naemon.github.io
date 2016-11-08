---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - SCHEDULE_SERVICEGROUP_SVC_DOWNTIME<br>


#### Command Format:

`SCHEDULE_SERVICEGROUP_SVC_DOWNTIME;servicegroup_name;start_time;end_time;fixed;trigger_id;duration;author;comment`

#### Description:

Schedules downtime for all services in a specified servicegroup. If the 'fixed' argument is set to one (1), downtime will start and end at the times specified by the 'start' and 'end' arguments. Otherwise, downtime will begin between the 'start' and 'end' times and last for 'duration' seconds. The 'start' and 'end' arguments are specified in time_t format (seconds since the UNIX epoch). The service downtime entries can be triggered by another downtime entry if the 'trigger_id' is set to the ID of another scheduled downtime entry. Set the 'trigger_id' argument to zero (0) if the downtime for the services should not be triggered by another downtime entry.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the SCHEDULE_SERVICEGROUP_SVC_DOWNTIME command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] SCHEDULE_SERVICEGROUP_SVC_DOWNTIME;servicegroup1;1478648441;1478638441;1;0;3600;naemonadmin;This is an example comment.\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



