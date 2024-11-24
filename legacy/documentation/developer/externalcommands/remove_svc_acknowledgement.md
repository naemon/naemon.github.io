---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - REMOVE_SVC_ACKNOWLEDGEMENT<br>


#### Command Format:

`REMOVE_SVC_ACKNOWLEDGEMENT;host_name;service_description`

#### Description:

This removes the problem acknowledgement for a particular service. Once the acknowledgement has been removed, notifications can once again be sent out for the given service.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the REMOVE_SVC_ACKNOWLEDGEMENT command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] REMOVE_SVC_ACKNOWLEDGEMENT;host1;service1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



