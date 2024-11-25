---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - DISABLE_EVENT_HANDLERS<br>


#### Command Format:

`DISABLE_EVENT_HANDLERS;`

#### Description:

Disables host and service event handlers on a program-wide basis.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the DISABLE_EVENT_HANDLERS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] DISABLE_EVENT_HANDLERS;\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



