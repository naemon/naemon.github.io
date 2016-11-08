---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_SERVICEGROUP_HOST_CHECKS<br>


#### Command Format:

`ENABLE_SERVICEGROUP_HOST_CHECKS;servicegroup_name`

#### Description:

Enables active checks for all hosts that have services that are members of a particular hostgroup.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_SERVICEGROUP_HOST_CHECKS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_SERVICEGROUP_HOST_CHECKS;servicegroup1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



