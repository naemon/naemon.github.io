---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - CHANGE_GLOBAL_HOST_EVENT_HANDLER<br>


#### Command Format:

`CHANGE_GLOBAL_HOST_EVENT_HANDLER;event_handler_command`

#### Description:

Changes the global host event handler command to be that specified by the 'event_handler_command' option. The 'event_handler_command' option specifies the short name of the command that should be used as the new host event handler. The command must have been configured in Naemon before it was last (re)started.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the CHANGE_GLOBAL_HOST_EVENT_HANDLER command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] CHANGE_GLOBAL_HOST_EVENT_HANDLER;restart_service\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



