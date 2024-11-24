---
layout: default
title: External Command Reference
---

<!--
************************************************
* AUTO GENERATED PAGE - USE ./update SCRIPT
************************************************
-->

<span class="glyphicon glyphicon-arrow-up"></span><a href="index.html"> External Commands Reference</a> - CHANGE_CONTACT_MODHATTR<br>


#### Command Format:

`CHANGE_CONTACT_MODHATTR;contact_name;value`

#### Description:

This command changes the modified host attributes value for the specified contact. Modified attributes values are used by Naemon to determine which object properties should be retained across program restarts. Thus, modifying the value of the attributes can affect data retention. This is an advanced option and should only be used by people who are intimately familiar with the data retention logic in Naemon.

#### Shell Script Usage Example:

```sh
#!/bin/sh
# This is a sample shell script showing how you can submit the CHANGE_CONTACT_MODHATTR command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] CHANGE_CONTACT_MODHATTR;naemonadmin;0\n" `date +%s` > /var/lib/naemon/naemon.cmd
```



