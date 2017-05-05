---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ADD_SVC_COMMENT<br>


#### Command Format:

`ADD_SVC_COMMENT;host_name;service_description;persistent;author;comment`

#### Description:

This command is used to add a comment for the specified service.  If you work with other administrators, you may find it useful to share information about a host or service that is having problems if more than one of you may be working on it.  If you do not check the 'persistent' option, the comment will automatically be deleted at the next program restart.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ADD_SVC_COMMENT command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ADD_SVC_COMMENT;host1;service1;1;naemonadmin;This is an example comment.\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



