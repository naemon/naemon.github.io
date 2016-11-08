---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_SERVICE_FRESHNESS_CHECKS<br>


#### Command Format:

`ENABLE_SERVICE_FRESHNESS_CHECKS;`

#### Description:

Enables freshness checks of all services on a program-wide basis. Individual services that have freshness checks disabled will not be checked for freshness.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_SERVICE_FRESHNESS_CHECKS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_SERVICE_FRESHNESS_CHECKS;\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



