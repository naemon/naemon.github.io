---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_SVC_CHECK<br>


#### Command Format:

`ENABLE_SVC_CHECK;host_name;service_description`

#### Description:

This command is used to enable active checks of a service.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_SVC_CHECK command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_SVC_CHECK;host1;service1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



