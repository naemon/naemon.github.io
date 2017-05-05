---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_HOSTGROUP_PASSIVE_SVC_CHECKS<br>


#### Command Format:

`ENABLE_HOSTGROUP_PASSIVE_SVC_CHECKS;hostgroup_name`

#### Description:

Enables passive checks for all services associated with hosts in a particular hostgroup.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_HOSTGROUP_PASSIVE_SVC_CHECKS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_HOSTGROUP_PASSIVE_SVC_CHECKS;hostgroup1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



