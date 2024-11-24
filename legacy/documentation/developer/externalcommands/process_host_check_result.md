---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - PROCESS_HOST_CHECK_RESULT<br>


#### Command Format:

`PROCESS_HOST_CHECK_RESULT;host_name;status_code;plugin_output`

#### Description:

This is used to submit a passive check result for a particular host. The 'status_code' indicates the state of the host check and should be one of the following: 0=UP, 1=DOWN, 2=UNREACHABLE. The 'plugin_output' argument contains the text returned from the host check, along with optional performance data.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the PROCESS_HOST_CHECK_RESULT command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] PROCESS_HOST_CHECK_RESULT;host1;0;This is an example plugin output.\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



