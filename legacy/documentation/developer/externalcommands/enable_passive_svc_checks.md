---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_PASSIVE_SVC_CHECKS<br>


#### Command Format:

`ENABLE_PASSIVE_SVC_CHECKS;host_name;service_description`

#### Description:

Enables passive checks for the specified service.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_PASSIVE_SVC_CHECKS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_PASSIVE_SVC_CHECKS;host1;service1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



