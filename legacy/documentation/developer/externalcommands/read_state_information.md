---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - READ_STATE_INFORMATION<br>


#### Command Format:

`READ_STATE_INFORMATION;`

#### Description:

Causes Naemon to load all current monitoring status information from the state retention file. Normally, state retention information is loaded when the Naemon process starts up and before it starts monitoring. WARNING: This command will cause Naemon to discard all current monitoring status information and use the information stored in state retention file! Use with care.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the READ_STATE_INFORMATION command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] READ_STATE_INFORMATION;\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



