# Custom Object Variables

## See Also
- [Object Definitions](objectdefinitions)
- [Object Inheritance](objectinheritance)
- [How Macros Work](macros)
- [Standard Macros in Naemon](macrolist)

## Introduction

Users often request that new variables be added to host, service, and contact definitions.

These include variables for SNMP community, MAC address, AIM username, Skype number, and street address.

The problem that with doing this is that it makes Naemon less generic and more infrastructure-specific.

Naemon was intended to be flexible, which meant things needed to be designed in a generic manner.

Host definitions in Naemon, for example, have a generic "address" variable that
can contain anything from an IP address to human-readable driving directions - whatever
is appropriate for the user's setup.

Still, there needs to be a method for admins to store information about their
infrastructure components in their Naemon configuration without imposing a set
of specific variables on others.

Naemon attempts to solve this problem by allowing users to define custom variables
in their object definitions.

Custom variables allow users to define additional properties in their host,
service, and contact definitions, and use their values in notifications,
event handlers, and host and service checks.



## Custom Variable Basics

There are a few important things that you should note about custom variables:

- Custom variable names must begin with an underscore (`_`) to prevent name collision with standard variables
- Custom variable names are converted to all uppercase before use
- Custom variables are [inherited](objectinheritance) from object templates like normal variables
- Scripts can reference custom variable values with [macros and environment variables](macros)



## Examples

Here's an example of how custom variables can be defined in different types of object definitions:

```
define host{
    host_name           linuxserver
    _mac_address        00:06:5B:A6:AD:AA       ; <-- Custom MAC_ADDRESS variable
    _rack_number        R32                     ; <-- Custom RACK_NUMBER variable
    ...
}

define service{
    host_name           linuxserver
    description         Memory Usage
    _SNMP_community     public                  ; <-- Custom SNMP_COMMUNITY variable
    _TechContact        Jane Doe                ; <-- Custom TECHCONTACT variable
    ....
}

define contact{
    contact_name        john
    _AIM_username       john16                  ; <-- Custom AIM_USERNAME variable
    _YahooID            john32                  ; <-- Custom YAHOOID variable
    ...
}
```



## Custom Variables As Macros

Custom variable values can be referenced in scripts and executables that Naemon
runs for checks, notifications, etc. by using [macros](macros)
or environment variables.

Custom variable macros are trusted (because you define them) and therefore
not cleaned/sanitized before they are made available to scripts.

In order to prevent name collision among custom variables from different object
types, Naemon prepends `_HOST`, `_SERVICE`, or `_CONTACT` to the beginning of
custom host, service, or contact variables, respectively, in macro and environment variable names.

The table below shows the corresponding macro and environment variable names
for the custom variables that were defined in the example above.

| Object Type |  Variable Name   |        Macro Name          |      Environment Variable       |
|:------------|:-----------------|:---------------------------|:--------------------------------|
| Host        | `MAC_ADDRESS`    | `$_HOSTMAC_ADDRESS$`       | `NAGIOS__HOSTMAC_ADDRESS`       |
| Host        | `RACK_NUMBER`    | `$_HOSTRACK_NUMBER$`       | `NAGIOS__HOSTRACK_NUMBER`       |
| Service     | `SNMP_COMMUNITY` | `$_SERVICESNMP_COMMUNITY$` | `NAGIOS__SERVICESNMP_COMMUNITY` |
| Service     | `TECHCONTACT`    | `$_SERVICETECHCONTACT$`    | `NAGIOS__SERVICETECHCONTACT`    |
| Contact     | `AIM_USERNAME`   | `$_CONTACTAIM_USERNAME$`   | `NAGIOS__CONTACTAIM_USERNAME`   |
| Contact     | `YAHOOID`        | `$_CONTACTYAHOOID$`        | `NAGIOS__CONTACTYAHOOID`        |



## Custom Variables And Inheritance

Custom object variables are [inherited](objectinheritance) just
like standard host, service, or contact variables.
