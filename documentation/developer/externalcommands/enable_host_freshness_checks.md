---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_HOST_FRESHNESS_CHECKS<br>


#### Command Format:

`ENABLE_HOST_FRESHNESS_CHECKS;`

#### Description:

Enables freshness checks of all hosts on a program-wide basis. Individual hosts that have freshness checks disabled will not be checked for freshness.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_HOST_FRESHNESS_CHECKS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_HOST_FRESHNESS_CHECKS;\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



