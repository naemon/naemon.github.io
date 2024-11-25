---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_HOST_SVC_CHECKS<br>


#### Command Format:

`ENABLE_HOST_SVC_CHECKS;host_name`

#### Description:

Enables active checks of all services on the specified host.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_HOST_SVC_CHECKS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_HOST_SVC_CHECKS;host1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



