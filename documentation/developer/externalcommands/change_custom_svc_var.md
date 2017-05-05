---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - CHANGE_CUSTOM_SVC_VAR<br>


#### Command Format:

`CHANGE_CUSTOM_SVC_VAR;host_name;service_description;varname;varvalue`

#### Description:

Changes the value of a custom service variable.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the CHANGE_CUSTOM_SVC_VAR command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] CHANGE_CUSTOM_SVC_VAR;host1;service1;_SOMEVAR;some new value\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



