---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - LOG<br>


#### Command Format:

`LOG;any text`

#### Description:

Adds custom entry to the default log file.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the LOG command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] LOG;SERVICE NOTE: testhost;event handler restarted service successfully\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



