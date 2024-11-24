---
layout: doctoc
title: Configuration Incompatibilities Nagios 3 -> Naemon
---

This page lists configuration incompatibilities between Nagios 3
and Naemon.


### Main Config File Options
Since command file handling has been redone, embedded perl has been
removed and the event execution loop now sits and waits on input from
worker processes rather than spending any time sleeping and logrotation
has been moved to logrotate.d, the following variables have been obsoleted,
will yield a warning when encountered and no longer have any effect
on monitoring:

<ul>
<li>command_check_interval</li>
<li>external_command_buffer_slots</li>
<li>sleep_time</li>
<li>enable_failure_prediction</li>
<li>enable_embedded_perl</li>
<li>use_embedded_perl_implicitly</li>
<li>auth_file</li>
<li>p1_file</li>
<li>log_rotation_method</li>
</ul>

### Nested Group Includes
In Nagios 3, it's possible to have groups include each other
cyclically, like this:

```
define hostgroup{
	hostgroup_name         HG1
	alias                  Hostgroup 1
	hostgroup_members      HG3
}

define hostgroup{
	hostgroup_name         HG2
	alias                  Hostgroup 2
	hostgroup_members      HG1
}

define hostgroup{
	hostgroup_name         HG3
	alias                  Hostgroup 3
	hostgroup_members      HG2
}
```

With Naemon, that will generate an error. The Nagios 3 behaviour
is that the first hostgroup, as determined by alphabetical sorting,
will get the members of its included groups, but the later ones in
the sorting will not get the members of the previous ones. Since
that is an error-prone and illogical way of assigning group members,
we now disallow it.

This will work the same for all grouptypes.

### Group Inheritance
Groups no longer inherit each others exclusions. Consider the
following scenario:

```
define host{
    use                            default-host-template
    host_name                      A
    alias                          linux Server1
    address                        127.0.0.1
    hostgroups                     HG1
    contact_groups                 support-group
}
define hostgroup{
    hostgroup_name                 HG1
    alias                          Hostgroup 1
    hostgroup_members              HG3
}
define hostgroup{
    hostgroup_name                 HG3
    alias                          Hostgroup 3
    members                        E,F,H,!A
    hostgroup_members              HG2
}
```

In Nagios 3, A would *not* be a member of HG1. In Naemon, it will,
because the logic has been fixed so that group inclusion works only
with the actual members, and not the rules concerning how those
members were chosen.
If you want to carry over exclusions, you can instead make a template
and 'use' one hostgroup from another.

The same goes for all group types, and not just hostgroups.

### Object Configuration Changes

#### Deprecations
The "obsess_over_host" (for hosts) and "obsess_over_service" (for
services) configuration variables have been renamed to simply "obsess".
The old values will serve as aliases for the duration of the Naemon
lifetime and will be removed in future Naemon releases. Users should
adjust their configurations accordingly.

#### Additions
Services have two new configurable values:

- parents
- hourly_value

The 'parents' directive can be used to suppress notifications for a
service in much the same way that it can be used for hosts. If all
parents of a particular service are in a non-OK state when the child
service enters a HARD state (and should have notified), notifications
will be suppressed for the child service.

The 'hourly_value' directive can be used to set a service 'value' of
the service in question. It works in tandem with a new directive for
contacts ("minimum_value") in order to suppress notifications, and
UI's are encouraged to take it into account to display the most severe
and valuable errors in a more prominent fashion. Note that it has no
currency attached to it, so whether you interpret it as affected_users,
business_value or whatever is entirely up to you.

Contacts have one new configurable value, namely 'minimum_value', which
sets the minimum notification value for which the contact should get
notified. The notification value is determined by the total value of
all objects affected by the problem.


#### Removals
Services have lost an old and never user configurable option:

 - parallelize_check

'parallelize_check' was never implemented and changing the value had
no effect. It has been removed from Naemon.
