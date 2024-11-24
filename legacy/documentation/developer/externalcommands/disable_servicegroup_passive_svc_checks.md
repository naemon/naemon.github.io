---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - DISABLE_SERVICEGROUP_PASSIVE_SVC_CHECKS<br>


#### Command Format:

`DISABLE_SERVICEGROUP_PASSIVE_SVC_CHECKS;servicegroup_name`

#### Description:

Disables the acceptance and processing of passive checks for all services in a particular servicegroup.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the DISABLE_SERVICEGROUP_PASSIVE_SVC_CHECKS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] DISABLE_SERVICEGROUP_PASSIVE_SVC_CHECKS;servicegroup1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



