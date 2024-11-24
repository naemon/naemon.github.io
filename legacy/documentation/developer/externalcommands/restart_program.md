---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - RESTART_PROGRAM<br>


#### Command Format:

`RESTART_PROGRAM;`

#### Description:

Restarts the Naemon process.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the RESTART_PROGRAM command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] RESTART_PROGRAM;\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



