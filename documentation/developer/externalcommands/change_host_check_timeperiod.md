---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - CHANGE_HOST_CHECK_TIMEPERIOD<br>


#### Command Format:

`CHANGE_HOST_CHECK_TIMEPERIOD;host_name;timeperiod`

#### Description:

Changes the valid check period for the specified host.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the CHANGE_HOST_CHECK_TIMEPERIOD command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] CHANGE_HOST_CHECK_TIMEPERIOD;host1;24x7\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



