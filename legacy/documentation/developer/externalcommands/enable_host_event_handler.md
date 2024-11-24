---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ENABLE_HOST_EVENT_HANDLER<br>


#### Command Format:

`ENABLE_HOST_EVENT_HANDLER;host_name`

#### Description:

Enables the event handler for the specified host.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ENABLE_HOST_EVENT_HANDLER command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ENABLE_HOST_EVENT_HANDLER;host1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



