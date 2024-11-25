---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - DISABLE_HOSTGROUP_PASSIVE_HOST_CHECKS<br>


#### Command Format:

`DISABLE_HOSTGROUP_PASSIVE_HOST_CHECKS;hostgroup_name`

#### Description:

Disables passive checks for all hosts in a particular hostgroup.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the DISABLE_HOSTGROUP_PASSIVE_HOST_CHECKS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] DISABLE_HOSTGROUP_PASSIVE_HOST_CHECKS;hostgroup1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



