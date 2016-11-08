---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - CHANGE_HOST_CHECK_COMMAND<br>


#### Command Format:

`CHANGE_HOST_CHECK_COMMAND;host_name;check_command`

#### Description:

Changes the check command for a particular host to be that specified by the 'check_command' option. The 'check_command' option specifies the short name of the command that should be used as the new host check command. The command must have been configured in Naemon before it was last (re)started.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the CHANGE_HOST_CHECK_COMMAND command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] CHANGE_HOST_CHECK_COMMAND;host1;check_ping\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



