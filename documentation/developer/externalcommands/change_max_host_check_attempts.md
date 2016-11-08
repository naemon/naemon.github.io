---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - CHANGE_MAX_HOST_CHECK_ATTEMPTS<br>


#### Command Format:

`CHANGE_MAX_HOST_CHECK_ATTEMPTS;host_name;check_attempts`

#### Description:

Changes the maximum number of check attempts (retries) for a particular host.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the CHANGE_MAX_HOST_CHECK_ATTEMPTS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] CHANGE_MAX_HOST_CHECK_ATTEMPTS;host1;10\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



