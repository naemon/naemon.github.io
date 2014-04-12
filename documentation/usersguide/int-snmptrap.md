---
layout: doctoc
title: SNMP Trap Integration
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="integration.html">Integration Overview</a>, <a href="extcommands.html">External Commands</a>, <a href="passivechecks.html">Passive Checks</a>

### Introduction

{{ site.note }}Naemon is not designed to be a replacement for a full-blown SNMP management application like HP OpenView or <a href="http://www.opennms.org/">OpenNMS</a>.{{ site.end }}

However, you can set things up so that SNMP traps received by a host on your network can generate alerts in Naemon.

As if designed to make the Gods of Hypocrisy die of laughter, SNMP is anything but simple.  Translating SNMP traps and getting them into Naemon (as passive check results) can be a bit tedious.  To make this task easier, I suggest you check out Alex Burger's SNMP Trap Translator project located at <a href="http://www.snmptt.org">http://www.snmptt.org</a>. When combined with Net-SNMP, SNMPTT provides an enhanced trap handling system that can be integrated with Naemon.

Yep, that's all.
