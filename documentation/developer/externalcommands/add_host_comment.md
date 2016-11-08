---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - ADD_HOST_COMMENT<br>


#### Command Format:

`ADD_HOST_COMMENT;host_name;persistent;author;comment`

#### Description:

This command is used to add a comment for the specified host.  If you work with other administrators, you may find it useful to share information about a host that is having problems if more than one of you may be working on it.  If you do not check the 'persistent' option, the comment will be automatically be deleted at the the next program restarted.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the ADD_HOST_COMMENT command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] ADD_HOST_COMMENT;host1;1;naemonadmin;This is an example comment.\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



