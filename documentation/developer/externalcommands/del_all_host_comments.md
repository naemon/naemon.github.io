---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - DEL_ALL_HOST_COMMENTS<br>


#### Command Format:

`DEL_ALL_HOST_COMMENTS;host_name`

#### Description:

Deletes all comments associated with a particular host.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the DEL_ALL_HOST_COMMENTS command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] DEL_ALL_HOST_COMMENTS;host1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



