---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - DISABLE_HOST_FLAP_DETECTION<br>


#### Command Format:

`DISABLE_HOST_FLAP_DETECTION;host_name`

#### Description:

Disables flap detection for the specified host.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the DISABLE_HOST_FLAP_DETECTION command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] DISABLE_HOST_FLAP_DETECTION;host1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



