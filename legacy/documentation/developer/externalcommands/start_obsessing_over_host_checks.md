---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - START_OBSESSING_OVER_HOST_CHECKS<br>


#### Command Format:

`START_OBSESSING_OVER_HOST_CHECKS;`

#### Description:

Enables processing of host checks via the OCHP command on a program-wide basis.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the START_OBSESSING_OVER_HOST_CHECKS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] START_OBSESSING_OVER_HOST_CHECKS;\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



