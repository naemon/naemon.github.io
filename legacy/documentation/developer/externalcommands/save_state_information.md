---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - SAVE_STATE_INFORMATION<br>


#### Command Format:

`SAVE_STATE_INFORMATION;`

#### Description:

Causes Naemon to save all current monitoring status information to the state retention file. Normally, state retention information is saved before the Naemon process shuts down and (potentially) at regularly scheduled intervals. This command allows you to force Naemon to save this information to the state retention file immediately. This does not affect the current status information in the Naemon process.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the SAVE_STATE_INFORMATION command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] SAVE_STATE_INFORMATION;\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



