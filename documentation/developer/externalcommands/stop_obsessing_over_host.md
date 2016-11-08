---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - STOP_OBSESSING_OVER_HOST<br>


#### Command Format:

`STOP_OBSESSING_OVER_HOST;host_name`

#### Description:

Disables processing of host checks via the OCHP command for the specified host.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the STOP_OBSESSING_OVER_HOST command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] STOP_OBSESSING_OVER_HOST;host1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



