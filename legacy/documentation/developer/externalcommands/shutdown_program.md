---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - SHUTDOWN_PROGRAM<br>


#### Command Format:

`SHUTDOWN_PROGRAM;`

#### Description:

Shuts down the Naemon process.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the SHUTDOWN_PROGRAM command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] SHUTDOWN_PROGRAM;\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



