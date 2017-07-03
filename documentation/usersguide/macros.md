---
layout: doctoc
title: Understanding Macros and How They Work
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="macrolist.html">List of Available Macros</a>



### Macros

One of the main features that make Naemon so flexible is the ability to use macros in command
definitions. Macros allow you to reference information from hosts, services, and other sources in your commands.



### Macro Substitution - How Macros Work

Before Naemon executes a command, it will replace any macros it finds in the command definition
with their corresponding values. This macro substitution occurs for all types of commands
that Naemon executes - host and service checks, notifications, event handlers, etc.

Certain macros may themselves contain other macros.
These include the $HOSTNOTES$, $HOSTNOTESURL$, $HOSTACTIONURL$, $SERVICENOTES$, $SERVICENOTESURL$, and $SERVICEACTIONURL$ macros.



### Example 1: Host Address Macro

When you use host and service macros in command definitions, they refer to values for the host or service
for which the command is being run. Let's try an example.
Assuming we are using a host definition and a <i>check_ping</i> command defined like this:

<pre>
define host {
    host_name       linuxbox
    address         <font color="red">192.168.1.2</font>
    check_command   check_ping
    ...
}

define command {
    command_name    check_ping
    command_line    /usr/lib/naemon/plugins/check_ping -H <font color="red">$HOSTADDRESS$</font> -w 100.0,90% -c 200.0,60%
}
</pre>

the expanded/final command line to be executed for the host's check command would look like this:

<pre>
    /usr/lib/naemon/plugins/check_ping -H <font color="red">192.168.1.2</font> -w 100.0,90% -c 200.0,60%
</pre>

Pretty simple, right?
The beauty in this is that you can use a single command definition to check an unlimited
number of hosts. Each host can be checked with the same command definition because each
host's address is automatically substituted in the command line before execution.



### Example 2: Command Argument Macros

You can pass arguments to commands as well, which is quite handy if you'd like to keep
your command definitions rather generic. Arguments are specified in the object
(i.e. host or service) definition, by separating them from the command name with
exclamation points (!) like so:

<pre>
define service {
    host_name           linuxbox
    service_description PING
    check_command       check_ping!<font color="red">200.0,80%</font>!<font color="red">400.0,40%</font>
    ...
}
</pre>

In the example above, the service check command has two arguments (which can be referenced
with <a href="macrolist.html#arg">$ARGn$</a> macros). The $ARG1$ macro will be
"<font color="red">200.0,80%</font>" and $ARG2$ will be "<font color="red">400.0,40%</font>"
(both without quotes). Assuming we are using the host definition given
earlier and a <i>check_ping</i> command defined like this:

<pre>
define command {
    command_name    check_ping
    command_line    /usr/lib/naemon/plugins/check_ping -H <font color="red">$HOSTADDRESS$</font> -w <font color="red">$ARG1$</font> -c <font color="red">$ARG2$</font>
}
</pre>

the expanded/final command line to be executed for the service's check command would look like this:

<pre>
    /usr/lib/naemon/plugins/check_ping -H <font color="red">192.168.1.2</font> -w <font color="red">200.0,80%</font> -c <font color="red">400.0,40%</font>
</pre>

{{ site.hint }}If you need to pass bang (!) characters in your command arguments, you can do so by escaping them with a backslash (\).{{ site.end }}

If you need to include backslashes in your command arguments, they should also be escaped with a backslash.

### On-Demand Macros

Normally when you use host and service macros in command definitions, they refer to values
for the host or service for which the command is being run. For instance, if a host
check command is being executed for a host named "linuxbox", all the <a href="macrolist.html">standard host macros</a> will
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
of service macros found <a href="macrolist.html">here</a>.

Note that the macro name is separated from the host or service identifier by a colon (:).
For on-demand service macros, the service identifier consists of both a host name and a
service description - these are separated by a colon (:) as well.

{{ site.hint }}On-demand service macros can contain an empty host name field.  In this case the name of the host associated with the service will automatically be used.{{ site.end }}

Examples of on-demand host and service macros follow:

<pre>
$HOSTDOWNTIME:myhost$                        <--- On-demand host macro
$SERVICESTATEID:novellserver:DS Database$    <--- On-demand service macro
$SERVICESTATEID::CPU Load$                   <--- On-demand service macro with blank host name field
</pre>

On-demand macros are also available for hostgroup, servicegroup, contact, and contactgroup macros.  For example:

<pre>
$CONTACTEMAIL:john$                          <--- On-demand contact macro
$CONTACTGROUPMEMBERS:linux-admins$           <--- On-demand contactgroup macro
$HOSTGROUPALIAS:linux-servers$               <--- On-demand hostgroup macro
$SERVICEGROUPALIAS:DNS-Cluster$              <--- On-demand servicegroup macro
</pre>



### On-Demand Group Macros

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
the name of one of the standard host, service, or contact macros found <a href="macrolist.html">here</a>.
The delimiter you specify is used to separate macro values for each group member.

For example, the following macro will return a comma-separated list of host state ids for hosts
that are members of the <i>hg1</i> hostgroup:

<pre>
$HOSTSTATEID:hg1:,$
</pre>

This macro definition will return something that looks like this:

<pre>
0,2,1,1,0,0,2
</pre>



### Custom Variable Macros

Any <a href="customobjectvars.html">custom object variables</a> that you define in host,
service, or contact definitions are also available as macros.  Custom variable macros are named as follows:

<ul>
<li>$_HOST<i>varname</i>$</li>
<li>$_SERVICE<i>varname</i>$</li>
<li>$_CONTACT<i>varname</i>$</li>
</ul>

Take the following host definition with a custom variable called `_MACADDRESS`...

<pre>
define host {
    host_name       linuxbox
    address         192.168.1.1
    <font color="red">_MACADDRESS     00:01:02:03:04:05</font>
    ...
}
</pre>

The `_MACADDRESS` custom variable would be available in a macro called <font color="red">`$_HOSTMACADDRESS$`</font>.
More information on custom object variables and how they can be used in macros can be found <a href="customobjectvars.html">here</a>.



### Macro Cleansing

Some macros are stripped of potentially dangerous shell metacharacters before being substituted into commands to be executed.
Which characters are stripped from the macros depends on the setting of
the <a href="configmain.html#illegal_macro_output_chars">`illegal_macro_output_chars`</a> directive.
The following macros are stripped of potentially dangerous characters:

<ol>
<li><a href="macrolist.html#hostoutput">$HOSTOUTPUT$</a></li>
<li><a href="macrolist.html#longhostoutput">$LONGHOSTOUTPUT$</a></li>
<li><a href="macrolist.html#hostperfdata">$HOSTPERFDATA$</a></li>
<li><a href="macrolist.html#hostackauthor">$HOSTACKAUTHOR$</a></li>
<li><a href="macrolist.html#hostackcomment">$HOSTACKCOMMENT$</a></li>
<li><a href="macrolist.html#serviceoutput">$SERVICEOUTPUT$</a></li>
<li><a href="macrolist.html#longserviceoutput">$LONGSERVICEOUTPUT$</a></li>
<li><a href="macrolist.html#serviceperfdata">$SERVICEPERFDATA$</a></li>
<li><a href="macrolist.html#serviceackauthor">$SERVICEACKAUTHOR$</a></li>
<li><a href="macrolist.html#serviceackcomment">$SERVICEACKCOMMENT$</a></li>
</ol>

Additionally, any macros that contain <a href="customobjectvars.html">custom variables</a> are stripped for safety and security.



### Macros as Environment Variables

Since Naemon macros are no longer available in the environment for performance reasons. Its
a huge waste of resources to calculate all macros all the time even if they are not used.

However, if you have plugins or notification scripts which rely on environment macros, you
can edit your command to export specific macros.

Example notification command:

<pre>
define command {
    command_name    my_old_notification_script
    command_line    <font color="red">NAGIOS_HOSTNAME="$HOSTNAME$"</font> /usr/local/bin/notifiy.pl ...
}
</pre>

This way you can define whatever environment macro you need and only those are calculated on runtime.



### Available Macros

A list of all the macros that are available in Naemon, as well as
a chart of when they can be used, can be found <a href="macrolist.html">here</a>.
