---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - DEL_SVC_COMMENT<br>


#### Command Format:

`DEL_SVC_COMMENT;comment_id`

#### Description:

This command is used to delete a specific service comment.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the DEL_SVC_COMMENT command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] DEL_SVC_COMMENT;1234\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



