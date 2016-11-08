---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_PERFORMANCE_DATA<br>


#### Command Format:

`ENABLE_PERFORMANCE_DATA;`

#### Description:

Enables the processing of host and service performance data on a program-wide basis.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_PERFORMANCE_DATA command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_PERFORMANCE_DATA;\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



