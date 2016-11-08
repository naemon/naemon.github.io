---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - STOP_OBSESSING_OVER_SVC_CHECKS<br>


#### Command Format:

`STOP_OBSESSING_OVER_SVC_CHECKS;`

#### Description:

Disables processing of service checks via the OCSP command on a program-wide basis.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the STOP_OBSESSING_OVER_SVC_CHECKS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] STOP_OBSESSING_OVER_SVC_CHECKS;\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



