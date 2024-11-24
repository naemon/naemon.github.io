---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - DEL_DOWNTIME_BY_HOSTGROUP_NAME<br>


#### Command Format:

`DEL_DOWNTIME_BY_HOSTGROUP_NAME;hostgroup_name;hostname;service_description;downtime_start_time;comment`

#### Description:

This command deletes all downtimes matching the specified filters.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the DEL_DOWNTIME_BY_HOSTGROUP_NAME command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] DEL_DOWNTIME_BY_HOSTGROUP_NAME;hostgroup1;host1;service1;1478648441;This is an example comment.\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



