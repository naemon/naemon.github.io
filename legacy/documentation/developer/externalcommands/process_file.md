---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - PROCESS_FILE<br>


#### Command Format:

`PROCESS_FILE;file_name;delete`

#### Description:

Directs Naemon to process all external commands that are found in the file specified by the &lt;file_name&gt; argument. If the &lt;delete&gt; option is non-zero, the file will be deleted once it has been processes. If the &lt;delete&gt; option is set to zero, the file is left untouched.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the PROCESS_FILE command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] PROCESS_FILE;/tmp/even_mode_commands.txt;1\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



