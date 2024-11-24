---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - CHANGE_CUSTOM_CONTACT_VAR<br>


#### Command Format:

`CHANGE_CUSTOM_CONTACT_VAR;contact_name;varname;varvalue`

#### Description:

Changes the value of a custom contact variable.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the CHANGE_CUSTOM_CONTACT_VAR command
# to Naemon. Adjust variables to fit your environment as necessary.
# This will change value of the custom variable: $_CONTACTSOMEVAR$

printf "[%lu] CHANGE_CUSTOM_CONTACT_VAR;naemonadmin;SOMEVAR;some new value\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



