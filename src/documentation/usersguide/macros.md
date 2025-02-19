# Understanding Macros and How They Work

## See Also
- [Standard Macros in Naemon](macrolist)
- [Custom Object Variables](customobjectvars)


## Macros

One of the main features that make Naemon so flexible is the ability to use macros in command
definitions. Macros allow you to reference information from hosts, services, and other sources in your commands.



## Macro Substitution - How Macros Work

Before Naemon executes a command, it will replace any macros it finds in the command definition
with their corresponding values. This macro substitution occurs for all types of commands
that Naemon executes - host and service checks, notifications, event handlers, etc.

Certain macros may themselves contain other macros.
These include the `$HOSTNOTES$`, `$HOSTNOTESURL$`, `$HOSTACTIONURL$`, `$SERVICENOTES$`, `$SERVICENOTESURL$`, and `$SERVICEACTIONURL$` macros.



## Example 1: Host Address Macro

When you use host and service macros in command definitions, they refer to values for the host or service
for which the command is being run. Let's try an example.
Assuming we are using a host definition and a `check_ping` command defined like this:

<div class="language- vp-adaptive-theme">
<pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0">
<code>
define host {
    host_name       linuxbox
    address         <span class="text-red">192.168.1.2</span>
    check_command   check_ping
    ...
}
</code>

<code>
define command {
    command_name    check_ping
    command_line    /usr/lib/naemon/plugins/check_ping -H <span class="text-red">$HOSTADDRESS$</span> -w 100.0,90% -c 200.0,60%
}
</code>
</pre>
</div>

the expanded/final command line to be executed for the host's check command would look like this:

<div class="language- vp-adaptive-theme">
<pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0">
<code>
/usr/lib/naemon/plugins/check_ping -H <span class="text-red">192.168.1.2</span> -w 100.0,90% -c 200.0,60%
</code>
</pre>
</div>


Pretty simple, right?
The beauty in this is that you can use a single command definition to check an unlimited
number of hosts. Each host can be checked with the same command definition because each
host's address is automatically substituted in the command line before execution.



## Example 2: Command Argument Macros

You can pass arguments to commands as well, which is quite handy if you'd like to keep
your command definitions rather generic. Arguments are specified in the object
(i.e. host or service) definition, by separating them from the command name with
exclamation points (`!`) like so:

<div class="language- vp-adaptive-theme">
<pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0">
<code>
define service {
    host_name           linuxbox
    service_description PING
    check_command       check_ping!<span class="text-red">200.0,80%</span>!<span class="text-red">400.0,40%</span>
    ...
}
</code>
</pre>
</div>


In the example above, the service check command has two arguments (which can be referenced
with [`$ARGn$`](macrolist#arg) macros). The `$ARG1$` macro will be
"<span class="text-red">200.0,80%</span>" and `$ARG2$` will be "<span class="text-red">400.0,40%</span>"
(both without quotes). Assuming we are using the host definition given
earlier and a `check_ping` command defined like this:

<div class="language- vp-adaptive-theme">
<pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0">
<code>
define command {
    command_name    check_ping
    command_line    /usr/lib/naemon/plugins/check_ping -H <span class="text-red">$HOSTADDRESS$</span> -w <span class="text-red">$ARG1$</span> -c <span class="text-red">$ARG2$</span>
}
</code>
</pre>
</div>


the expanded/final command line to be executed for the service's check command would look like this:

<div class="language- vp-adaptive-theme">
<pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0">
<code>
/usr/lib/naemon/plugins/check_ping -H <span class="text-red">192.168.1.2</span> -w <span class="text-red">200.0,80%</span> -c <span class="text-red">400.0,40%</span>
</code>
</pre>
</div>

> [!TIP]
> If you need to pass bang (`!`) characters in your command arguments, you can do so by escaping them with a backslash (`\`).

If you need to include backslashes in your command arguments, they should also be escaped with a backslash.

## On-Demand Macros

Normally when you use host and service macros in command definitions, they refer to values
for the host or service for which the command is being run. For instance, if a host
check command is being executed for a host named "linuxbox", all the [standard host macros](macrolist) will
refer to values for that host ("linuxbox").

If you would like to reference values for another host or service in a command (for which the command is
not being run), you can use what are called "on-demand" macros. On-demand macros look like normal
macros, except for the fact that they contain an identifier for the host or service from which
they should get their value. Here's the basic format for on-demand macros:

<ul>
<li>$<i>HOSTMACRONAME</i>:<i>host_name</i>$</li>
<li>$<i>SERVICEMACRONAME</i>:<i>host_name</i>:<i>service_description</i>$</li>
</ul>

Replace <i>HOSTMACRONAME</i> and <i>SERVICEMACRONAME</i> with the name of one of the standard host
of service macros found [here](macrolist).

Note that the macro name is separated from the host or service identifier by a colon (:).
For on-demand service macros, the service identifier consists of both a host name and a
service description - these are separated by a colon (:) as well.

> [!TIP]
> On-demand service macros can contain an empty host name field.  In this case the name of the host associated with the service will automatically be used.

Examples of on-demand host and service macros follow:

<div class="language- vp-adaptive-theme">
<pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0">
<code>
$HOSTDOWNTIME:myhost$                        <--- On-demand host macro
$SERVICESTATEID:novellserver:DS Database$    <--- On-demand service macro
$SERVICESTATEID::CPU Load$                   <--- On-demand service macro with blank host name field
</code>
</pre>
</div>

On-demand macros are also available for hostgroup, servicegroup, contact, and contactgroup macros.  For example:

<div class="language- vp-adaptive-theme">
<pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0">
<code>
$CONTACTEMAIL:john$                          <--- On-demand contact macro
$CONTACTGROUPMEMBERS:linux-admins$           <--- On-demand contactgroup macro
$HOSTGROUPALIAS:linux-servers$               <--- On-demand hostgroup macro
$SERVICEGROUPALIAS:DNS-Cluster$              <--- On-demand servicegroup macro
</code>
</pre>
</div>



## On-Demand Group Macros

You can obtain the values of a macro across all contacts, hosts, or services
in a specific group by using a special format for your on-demand macro declaration.
You do this by referencing a specific host group, service group, or contact group name
in an on-demand macro, like so:

<ul>
<li>$<i>HOSTMACRONAME</i>:<i>hostgroup_name</i>:<i>delimiter</i>$</li>
<li>$<i>SERVICEMACRONAME</i>:<i>servicegroup_name</i>:<i>delimiter</i>$</li>
<li>$<i>CONTACTMACRONAME</i>:<i>contactgroup_name</i>:<i>delimiter</i>$</li>
</ul>

Replace <i>HOSTMACRONAME</i>, <i>SERVICEMACRONAME</i>, and <i>CONTACTMACRONAME</i> with
the name of one of the standard host, service, or contact macros found [here](macrolist).
The delimiter you specify is used to separate macro values for each group member.

For example, the following macro will return a comma-separated list of host state ids for hosts
that are members of the <i>hg1</i> hostgroup:

<div class="language- vp-adaptive-theme">
<pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0">
<code>
$HOSTSTATEID:hg1:,$
</code>
</pre>
</div>

This macro definition will return something that looks like this:

<div class="language- vp-adaptive-theme">
<pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0">
<code>
0,2,1,1,0,0,2
</code>
</pre>
</div>



## Custom Variable Macros

Any [custom object variables](customobjectvars) that you define in host,
service, or contact definitions are also available as macros.  Custom variable macros are named as follows:

- `$_HOSTvarname$`
- `$_SERVICEvarname$`
- `$_CONTACTvarname$`


Take the following host definition with a custom variable called `_MACADDRESS`...

<div class="language- vp-adaptive-theme">
<pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0">
<code>
define host {
    host_name       linuxbox
    address         192.168.1.1
    <span class="text-red">_MACADDRESS     00:01:02:03:04:05</span>
    ...
}
</code>
</pre>
</div>

The `_MACADDRESS` custom variable would be available in a macro called <span class="text-red">`$_HOSTMACADDRESS$`</span>.
More information on custom object variables and how they can be used in macros can be found [here](customobjectvars).



## Macro Cleansing

Some macros are stripped of potentially dangerous shell metacharacters before being substituted into commands to be executed.
Which characters are stripped from the macros depends on the setting of
the [`illegal_macro_output_chars`](configmain#illegal_macro_output_chars) directive.
The following macros are stripped of potentially dangerous characters:

1. [`$HOSTOUTPUT$`](macrolist#hostoutput)
2. [`$LONGHOSTOUTPUT$`](macrolist#longhostoutput)
3. [`$HOSTPERFDATA$`](macrolist#hostperfdata)
4. [`$HOSTACKAUTHOR$`](macrolist#hostackauthor)
5. [`$HOSTACKCOMMENT$`](macrolist#hostackcomment)
6. [`$SERVICEOUTPUT$`](macrolist#serviceoutput)
7. [`$LONGSERVICEOUTPUT$`](macrolist#longserviceoutput)
8. [`$SERVICEPERFDATA$`](macrolist#serviceperfdata)
9. [`$SERVICEACKAUTHOR$`](macrolist#serviceackauthor)
10. [`$SERVICEACKCOMMENT$`](macrolist#serviceackcomment)

Additionally, any macros that contain [custom variables](customobjectvars) are stripped for safety and security.



## Macros as Environment Variables

Since Naemon macros are no longer available in the environment for performance reasons. Its
a huge waste of resources to calculate all macros all the time even if they are not used.

However, if you have plugins or notification scripts which rely on environment macros, you
can edit your command to export specific macros.

Example notification command:

<div class="language- vp-adaptive-theme">
<pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0">
<code>
define command {
    command_name    my_old_notification_script
    command_line    <span class="text-red">NAGIOS_HOSTNAME="$HOSTNAME$"</span> /usr/local/bin/notifiy.pl ...
}
</code>
</pre>
</div>

This way you can define whatever environment macro you need and only those are calculated on runtime.



## Available Macros

A list of all the macros that are available in Naemon, as well as
a chart of when they can be used, can be found [here](macrolist).
