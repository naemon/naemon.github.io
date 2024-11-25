---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - PROCESS_SERVICE_CHECK_RESULT<br>


#### Command Format:

`PROCESS_SERVICE_CHECK_RESULT;host_name;service_description;status_code;plugin_output`

#### Description:

This is used to submit a passive check result for a particular service. The 'status_code' field should be one of the following: 0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN. The 'plugin_output' field contains text output from the service check, along with optional performance data.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the PROCESS_SERVICE_CHECK_RESULT command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] PROCESS_SERVICE_CHECK_RESULT;host1;service1;0;This is an example plugin output.\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



