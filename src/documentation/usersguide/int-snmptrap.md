# SNMP Trap Integration

## Introduction

> [!NOTE]
> Naemon is not designed to be a replacement for a full-blown SNMP management application like HP OpenView or [OpenNMS](https://www.opennms.com/).

However, you can set things up so that SNMP traps received by a host on your network can generate alerts in Naemon.

Translating SNMP traps and getting them into Naemon (as passive check results) can be a bit tedious.  To make this task easier, take a look at Alex Burger's SNMP Trap Translator project located at [https://www.snmptt.org/](https://www.snmptt.org/). When combined with Net-SNMP, SNMPTT provides an enhanced trap handling system that can be integrated with Naemon.
