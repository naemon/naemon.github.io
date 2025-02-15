# Time-Saving Tricks For Object Definitions

## Introduction

This documentation explains how you can exploit the (somewhat) hidden features of [template-based object definitions](objectdefinitions).  Several types of objects allow you to specify multiple host names and/or hostgroup names in definitions, allowing you to "copy" the object definition to multiple hosts or services.  Each type of object that supports these features will be covered separately.  For starters, the object types which support this time-saving feature are as follows:

- [Services](#service)
- [Service escalations](#serviceescalation)
- [Service dependencies](#servicedependency)
- [Host escalations](#hostescalation)
- [Host dependencies](#hostdependency)
- [Hostgroups](#hostgroup)

Object types that are not listed above (i.e. timeperiods, commands, etc.) do not support the features I'm about to describe.

## Regular Expression Matching

The examples given below use "standard" matching of object names
and **require** [use_regexp_matching](configmain#use_regexp_matching) to be **disabled**.

You can enable regular expression matching for object names by using the [use_regexp_matching](configmain#use_regexp_matching) config option.  By default, regular expression matching will only be used in object names that contain `*`, `?`, `+`, or `.`.  If you want regular expression matching to be used on all object names, enable the [use_true_regexp_matching](configmain#use_true_regexp_matching) config option.  Regular expressions can be used in any of the fields used in the examples below (host names, hostgroup names, service names, and servicegroup names).

> [!NOTE]
> Be careful when enabling regular expression matching - you may have to change your config file, since some directives that you might not want to be interpreted as a regular expression just might be!  Any problems should become evident once you verify your configuration.

## Service Definitions {#service}

### Multiple Hosts

If you want to create identical [services](objectdefinitions#service) that are assigned to multiple hosts, you can specify multiple hosts in the `host_name` directive.  The definition below would create a service called `SOMESERVICE` on hosts `HOST1` through `HOSTN`.  All the instances of the `SOMESERVICE` service would be identical (i.e. have the same check command, max check attempts, notification period, etc.).

```
define service{
    host_name               HOST1,HOST2,HOST3,...,HOSTN // [!code highlight]
    service_description     SOMESERVICE // [!code highlight]
    other service directives...
}
```


### All Hosts In Multiple Hostgroups
If you want to create identical services that are assigned to all hosts in one or more hostgroups, you can do so by creating a single service definition.  How?  The `hostgroup_name` directive allows you to specify the name of one or more hostgroups that the service should be created for.  The definition below would create a service called `SOMESERVICE` on all hosts that are members of hostgroups `HOSTGROUP1` through `HOSTGROUPN`.  All the instances of the `SOMESERVICE` service would be identical (i.e. have the same check command, max check attempts, notification period, etc.).

```
define service{
    hostgroup_name          HOSTGROUP1,HOSTGROUP2,...,HOSTGROUPN // [!code highlight]
    service_description     SOMESERVICE // [!code highlight]
    other service directives...
}
```

### All Hosts

If you want to create identical services that are assigned to all hosts that are defined in your configuration files, you can use a wildcard in the `host_name` directive.  The definition below would create a service called `SOMESERVICE` on **all hosts** that are defined in your configuration files.  All the instances of the `SOMESERVICE` service would be identical (i.e. have the same check command, max check attempts, notification period, etc.).

```
define service{
    host_name               * // [!code highlight]
    service_description     SOMESERVICE // [!code highlight]
    other service directives...
}
```

### Excluding Hosts

If you want to create identical services on numerous hosts or hostgroups, but would like to exclude some hosts from the definition, this can be accomplished by preceding the host or hostgroup with a `!` symbol.

```
define service{
    host_name               HOST1,HOST2,!HOST3,!HOST4,...,HOSTN // [!code highlight]
    hostgroup_name          HOSTGROUP1,HOSTGROUP2,!HOSTGROUP3,!HOSTGROUP4,...,HOSTGROUPN // [!code highlight]
    service_description     SOMESERVICE // [!code highlight]
    other service directives...
}
```

## Service Escalation Definitions {#serviceescalation}

### Multiple Hosts

If you want to create [service escalations](objectdefinitions#serviceescalation) for services of the same name/description that are assigned to multiple hosts, you can specify multiple hosts in the `host_name` directive.  The definition below would create a service escalation for services called `SOMESERVICE` on hosts `HOST1` through `HOSTN`.  All the instances of the service escalation would be identical (i.e. have the same contact groups, notification interval, etc.).

```
define serviceescalation{
    host_name               HOST1,HOST2,HOST3,...,HOSTN // [!code highlight]
    service_description     SOMESERVICE // [!code highlight]
    other escalation directives...
}
```

### All Hosts In Multiple Hostgroups

If you want to create service escalations for services of the same name/description that are assigned to all hosts in in one or more hostgroups, you can do use the `hostgroup_name` directive.  The definition below would create a service escalation for services called `SOMESERVICE` on all hosts that are members of hostgroups `HOSTGROUP1` through `HOSTGROUPN`.  All the instances of the service escalation would be identical (i.e. have the same contact groups, notification interval, etc.).

```
define serviceescalation{
    hostgroup_name          HOSTGROUP1,HOSTGROUP2,...,HOSTGROUPN // [!code highlight]
    service_description     SOMESERVICE // [!code highlight]
    other escalation directives...
}
```

### All Hosts

If you want to create identical service escalations for services of the same name/description that are assigned to all hosts that are defined in your configuration files, you can use a wildcard in the `host_name` directive.  The definition below would create a service escalation for all services called `SOMESERVICE` on **all hosts** that are defined in your configuration files.  All the instances of the service escalation would be identical (i.e. have the same contact groups, notification interval, etc.).

```
define serviceescalation{
    host_name               * // [!code highlight]
    service_description     SOMESERVICE // [!code highlight]
    other escalation directives...
}
```

### Excluding Hosts

If you want to create identical services escalations for services on numerous hosts or hostgroups,
but would like to exclude some hosts from the definition, this can be accomplished by preceding the host or hostgroup with a `!` symbol.


```
define serviceescalation{
    host_name               * // [!code highlight]
    hostgroup_name          HOSTGROUP1,HOSTGROUP2,!HOSTGROUP3,!HOSTGROUP4,...,HOSTGROUPN // [!code highlight]
    service_description     SOMESERVICE // [!code highlight]
    other escalation directives...
}
```


### All Services On Same Host

If you want to create [service escalations](objectdefinitions#serviceescalation) for all services assigned to a particular host, you can use a wildcard in the `service_description` directive.  The definition below would create a service escalation for **all** services on host `HOST1`.  All the instances of the service escalation would be identical (i.e. have the same contact groups, notification interval, etc.).

If you feel like being particularly adventurous, you can specify a wildcard in both the `host_name` and `service_description` directives.  Doing so would create a service escalation for **all services** that you've defined in your configuration files.

```
define serviceescalation{
    host_name               HOST1 // [!code highlight]
    service_description     * // [!code highlight]
    other escalation directives...
}
```

### Multiple Services On Same Host

If you want to create [service escalations](objectdefinitions#serviceescalation) for all multiple services assigned to a particular host, you can use a specify more than one service description in the `service_description` directive.  The definition below would create a service escalation for services `SERVICE1` through `SERVICEN` on host `HOST1`.  All the instances of the service escalation would be identical (i.e. have the same contact groups, notification interval, etc.).

```
define serviceescalation{
    host_name               HOST1 // [!code highlight]
    service_description     SERVICE1,SERVICE2,...,SERVICEN // [!code highlight]
    other escalation directives...
}
```

### All Services In Multiple Servicegroups

If you want to create service escalations for all services that belong in one or more servicegroups, you can do use the `servicegroup_name` directive.  The definition below would create service escalations for all services that are members of servicegroups `SERVICEGROUP1` through `SERVICEGROUPN`.  All the instances of the service escalation would be identical (i.e. have the same contact groups, notification interval, etc.).

```
define serviceescalation{
    servicegroup_name       SERVICEGROUP1,SERVICEGROUP2,...,SERVICEGROUPN // [!code highlight]
    other escalation directives...
}
```


## Service Dependency Definitions {#servicedependency}

### Multiple Hosts

If you want to create [service dependencies](objectdefinitions#servicedependency) for services of the same name/description that are assigned to multiple hosts, you can specify multiple hosts in the `host_name` and or `dependent_host_name` directives.  In the example below, service `SERVICE2` on hosts `HOST3` and `HOST4` would be dependent on service `SERVICE1` on hosts `HOST1` and `HOST2`.  All the instances of the service dependencies would be identical except for the host names (i.e. have the same notification failure criteria, etc.).


```
define servicedependency{
    host_name                       HOST1,HOST2 // [!code highlight]
    service_description             SERVICE1 // [!code highlight]
    dependent_host_name             HOST3,HOST4 // [!code highlight]
    dependent_service_description   SERVICE2 // [!code highlight]
    other dependency directives...
}
```

### All Hosts In Multiple Hostgroups

If you want to create service dependencies for services of the same name/description that are assigned to all hosts in in one or more hostgroups, you can do use the `hostgroup_name` and/or `dependent_hostgroup_name` directives.  In the example below, service `SERVICE2` on all hosts in hostgroups `HOSTGROUP3` and `HOSTGROUP4` would be dependent on service `SERVICE1` on all hosts in hostgroups `HOSTGROUP1` and `HOSTGROUP2`.  Assuming there were five hosts in each of the hostgroups, this definition would be equivalent to creating 100 single service dependency definitions!  All the instances of the service dependency would be identical except for the host names (i.e. have the same notification failure criteria, etc.).

```
define servicedependency{
    hostgroup_name                  HOSTGROUP1,HOSTGROUP2 // [!code highlight]
    service_description             SERVICE1 // [!code highlight]
    dependent_hostgroup_name        HOSTGROUP3,HOSTGROUP4 // [!code highlight]
    dependent_service_description   SERVICE2 // [!code highlight]
    other dependency directives...
}
```

### All Services On A Host

If you want to create service dependencies for all services assigned to a particular host, you can use a wildcard in the `service_description` and/or `dependent_service_description` directives.  In the example below, **all services** on host `HOST2` would be dependent on **all services** on host `HOST1`.  All the instances of the service dependencies would be identical (i.e. have the same notification failure criteria, etc.).

```
define servicedependency{
    host_name                       HOST1 // [!code highlight]
    service_description             * // [!code highlight]
    dependent_host_name             HOST2 // [!code highlight]
    dependent_service_description   * // [!code highlight]
    other dependency directives...
}
```

### Multiple Services On A Host

If you want to create service dependencies for multiple services assigned to a particular host, you can specify more than one service description in the `service_description` and/or `dependent_service_description` directives as follows:

```
define servicedependency{
    host_name                       HOST1 // [!code highlight]
    service_description             SERVICE1,SERVICE2,...,SERVICEN // [!code highlight]
    dependent_host_name             HOST2 // [!code highlight]
    dependent_service_description   SERVICE1,SERVICE2,...,SERVICEN // [!code highlight]
    other dependency directives...
}
```

### All Services In Multiple Servicegroups

If you want to create service dependencies for all services that belong in one or more servicegroups, you can do use the `servicegroup_name` and/or `dependent_servicegroup_name` directive as follows:

```
define servicedependency{
    servicegroup_name                       SERVICEGROUP1,SERVICEGROUP2,...,SERVICEGROUPN // [!code highlight]
    dependent_servicegroup_name             SERVICEGROUP3,SERVICEGROUP4,...SERVICEGROUPN // [!code highlight]
    other dependency directives...
}
```

### Same Host Dependencies: {#same_host_dependency}

If you want to create service dependencies for multiple services that are dependent on services on the same host, leave the `dependent_host_name` and `dependent_hostgroup_name` directives empty.  The example below assumes that hosts `HOST1` and `HOST2` have at least the following four services associated with them: `SERVICE1`, `SERVICE2`, `SERVICE3`, and `SERVICE4`.  In this example, `SERVICE3` and `SERVICE4` on `HOST1` will be dependent on both `SERVICE1` and `SERVICE2` on `HOST1`.  Similarly, `SERVICE3` and `SERVICE4` on `HOST2` will be dependent on both `SERVICE1` and `SERVICE2` on `HOST2`.

```
define servicedependency{
    host_name                               HOST1,HOST2 // [!code highlight]
    service_description                     SERVICE1,SERVICE2 // [!code highlight]
    dependent_service_description           SERVICE3,SERVICE4 // [!code highlight]
    other dependency directives...
}
```

## Host Escalation Definitions {#hostescalation}

### Multiple Hosts

If you want to create [host escalations](objectdefinitions#hostescalation) for  multiple hosts, you can specify multiple hosts in the `host_name` directive.  The definition below would create a host escalation for hosts `HOST1` through `HOSTN`.  All the instances of the host escalation would be identical (i.e. have the same contact groups, notification interval, etc.).

```
define hostescalation{
    host_name                               HOST1,HOST2,HOST3,...,HOSTN // [!code highlight]
    other escalation directives...
}
```

### All Hosts In Multiple Hostgroups

If you want to create host escalations for all hosts in in one or more hostgroups, you can do use the `hostgroup_name` directive.  The definition below would create a host escalation on all hosts that are members of hostgroups `HOSTGROUP1` through `HOSTGROUPN`.  All the instances of the host escalation would be identical (i.e. have the same contact groups, notification interval, etc.).

```
define hostescalation{
    hostgroup_name                          HOSTGROUP1,HOSTGROUP2,...,HOSTGROUPN // [!code highlight]
    other escalation directives...
}
```

### All Hosts

If you want to create identical host escalations for all hosts that are defined in your configuration files, you can use a wildcard in the `host_name` directive.  The definition below would create a hosts escalation for **all hosts** that are defined in your configuration files.  All the instances of the host escalation would be identical (i.e. have the same contact groups, notification interval, etc.).

```
define hostescalation{
    host_name                                * // [!code highlight]
    other escalation directives...
}
```

### Excluding Hosts

If you want to create identical host escalations on numerous hosts or hostgroups, but would like to
exclude some hosts from the definition, this can be accomplished by preceding the host or hostgroup with a `!` symbol.

```
define hostescalation{
    host_name                               HOST1,HOST2,!HOST3,!HOST4,...,HOSTN // [!code highlight]
    hostgroup_name                          HOSTGROUP1,HOSTGROUP2,!HOSTGROUP3,!HOSTGROUP4,...,HOSTGROUPN // [!code highlight]
    other escalation directives...
}
```


## Host Dependency Definitions {#hostdependency}

### Multiple Hosts

If you want to create [host dependencies](objectdefinitions#hostdependency) for  multiple hosts, you can specify multiple hosts in the `host_name` and/or `dependent_host_name` directives. The definition below would be equivalent to creating six separate host dependencies.   In the example above, hosts `HOST3`, `HOST4` and `HOST5` would be dependent upon both `HOST1` and `HOST2`.  All the instances of the host dependencies would be identical except for the host names (i.e. have the same notification failure criteria, etc.).

```
define hostdependency{
    host_name                               HOST1,HOST2 // [!code highlight]
    dependent_host_name                     HOST3,HOST4,HOST5 // [!code highlight]
    other dependency directives...
}
```

### All Hosts In Multiple Hostgroups

If you want to create host escalations for all hosts in in one or more hostgroups, you can do use the `hostgroup_name` and /or `dependent_hostgroup_name` directives.  In the example below, all hosts in hostgroups `HOSTGROUP3` and `HOSTGROUP4` would be dependent on all hosts in hostgroups `HOSTGROUP1` and `HOSTGROUP2`.  All the instances of the host dependencies would be identical except for  host names (i.e. have the same notification failure criteria, etc.).

```
define hostdependency{
    hostgroup_name                          HOSTGROUP1,HOSTGROUP2 // [!code highlight]
    dependent_hostgroup_name                HOSTGROUP3,HOSTGROUP4 // [!code highlight]
    other dependency directives...
}
```


## Hostgroups {#hostgroup}

### All Hosts

If you want to create a hostgroup that has all hosts that are defined in your configuration files as members, you can use a wildcard in the `members` directive.  The definition below would create a hostgroup called `HOSTGROUP1` that has **all hosts** that are defined in your configuration files as members.

```
define hostgroup{
    hostgroup_name                          HOSTGROUP1
    members                                 * // [!code highlight]
    other hostgroup directives...
}
```
