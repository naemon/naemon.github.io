---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - DISABLE_NOTIFICATIONS<br>


#### Command Format:

`DISABLE_NOTIFICATIONS;`

#### Description:

Disables host and service notifications on a program-wide basis.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the DISABLE_NOTIFICATIONS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] DISABLE_NOTIFICATIONS;\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



