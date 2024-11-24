---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - CHANGE_RETRY_HOST_CHECK_INTERVAL<br>


#### Command Format:

`CHANGE_RETRY_HOST_CHECK_INTERVAL;host_name;check_interval`

#### Description:

Changes the retry check interval for a particular host.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the CHANGE_RETRY_HOST_CHECK_INTERVAL command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] CHANGE_RETRY_HOST_CHECK_INTERVAL;host1;10\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



