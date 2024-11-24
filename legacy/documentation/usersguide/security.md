---
layout: doctoc
title: Security Considerations
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="cgisecurity.html">CGI Security</a>

<a name="intro"></a>

### Introduction

<img src="images/security.png" border="0" style="float: right; clear: both;" alt="Security" title="Security">

This is intended to be a brief overview of some things you should keep in mind when
installing Naemon, so as set it up in a secure manner.

Your monitoring box should be viewed as a backdoor into your other systems.

In many cases, the Naemon server might be allowed access through firewalls in order
to monitor remote servers.

In most all cases, it is allowed to query those remote servers for various information.

Monitoring servers are always given a certain level of trust in order to query remote systems.

This presents a potential attacker with an attractive backdoor to your systems.

An attacker might have an easier time getting into your other systems if they compromise
the monitoring server first.

This is particularly true if you are making use of shared SSH keys in order to monitor remote systems.

If an intruder has the ability to submit check results or external commands to the Naemon
daemon, they have the potential to submit bogus monitoring data, drive you nuts you with
bogus notifications, or cause event handler scripts to be triggered.

If you have event handler scripts that restart services, cycle power, etc. this could be particularly problematic.

Another area of concern is the ability for intruders to sniff monitoring data (status information) as it comes across the wire.

If communication channels are not encrypted, attackers can gain valuable information by watching your monitoring information.

Take as an example the following situation:

An attacker captures monitoring data on the wire over a period of time and analyzes the
typical CPU and disk load usage of your systems, along with the number of users that are
typically logged into them.

The attacker is then able to determine the best time to compromise a system and use its
resources (CPU, etc.) without being noticed.

Here are some tips to help ensure that you keep your systems secure when implementing
a Naemon-based monitoring solution...

<a name="bestpractices"></a>

### Best Practices

<ol>
<li><strong>Use a Dedicated Monitoring Box</strong>.
    It is recommended that you install Naemon on a server that is dedicated to monitoring
    (and possibly other admin tasks). Protect your monitoring server as if it were one
    of the most important servers on your network.
    Keep running services to a minimum and lock down access to it via TCP wrappers, firewalls,
    etc. Since the Naemon server is allowed to talk to your servers and may be able to poke
    through your firewalls, allowing users access to your monitoring server can be a security risk.
    Remember, its always easier to gain root access through a system security hole if you
    have a local account on a box.<br><br><img src="images/security3.png" border="0" style="float: left; clear: both;" alt="Monitoring Box" title="Monitoring Box"><br clear="all"><br></li>
<li><strong>Don't Run Naemon As Root</strong>.
    Naemon doesn't need to run as root, so don't do it.
    You can tell Naemon to drop privileges after startup and run as another user/group by
    using the <a href="configmain.html#naemon_user">naemon_user</a> and
    <a href="configmain.html#naemon_group">naemon_group</a> directives in the main config file.
    If you need to execute event handlers or plugins which require root access, you might
    want to try using <a href="http://www.courtesan.com/sudo/sudo.html">sudo</a>.<br><br></li>
<li><strong>Lock Down The Check Result Directory</strong>.
    Make sure that only the <i>naemon</i> user is able to read/write in the
    <a href="configmain.html#check_result_path">check result path</a>.
    If users other than <i>naemon</i> (or <i>root</i>) are able to write to this directory,
    they could send fake host/service check results to the Naemon daemon.
    This could result in annoyances (bogus notifications) or security problems (event handlers being kicked off).<br><br></li>
<li><strong>Lock Down The External Command File</strong>.
    If you enable <a href="extcommands.html">external commands</a>, make sure you set proper permissions on the
    <i>/usr/local/naemon/var/rw</i> directory.
    You only want the Naemon user (usually <i>naemon</i>) and the web server user (usually <i>nobody</i>, <i>httpd</i>,
    <i>apache2</i>, or <i>www-data</i>) to have permissions to write to the command file.
    If you've installed Naemon on a machine that is dedicated to monitoring and admin tasks and is not used for public
    accounts, that should be fine. If you've installed it on a public or multi-user machine (not recommended),
    allowing the web server user to have write access to the command file can be a security problem.
    After all, you don't want just any user on your system controlling Naemon through the external command file.
    In this case, it is recommended only granting write access on the command file to the <i>naemon</i> user and
    using something like <a href="http://cgiwrap.sourceforge.net/">CGIWrap</a> to run the CGIs as the <i>naemon</i>
    user instead of <i>nobody</i>.<br><br></li>
<li><strong>Require Authentication In The CGIs</strong>.
    It is strongly recommended to require authentication for accessing the CGIs.
    Once you do that, read the documentation on the default rights that authenticated contacts have, and only
    authorize specific contacts for additional rights as necessary.
    Instructions on setting up authentication and configuring authorization rights can be found <a href="cgiauth.html">here</a>.
    If you disable the CGI authentication features using the <a href="configcgi.html#use_authentication">use_authentication</a>
    directive in the CGI config file, the <a href="cgis.html#cmd_cgi">command CGI</a> will refuse to write any commands to
    the <a href="configmain.html#command_file">external command file</a>.<br><br></li>
<li><strong>Implement Enhanced CGI Security Measures</strong>.
    It is strongly recommended that you implement enhanced security measures for the CGIs as described
    <a href="cgisecurity.html">here</a>.
    These measures can help ensure that the username/password you use to access the Naemon web interface are not
    intercepted by third parties.<br><br></li>
<li><strong>Use Full Paths In Command Definitions</strong>.
    When you define commands, make sure you specify the <i>full path</i> (not a relative one) to any scripts or
    binaries you're executing.<br><br></li>
<li><strong>Hide Sensitive Information With $USERn$ Macros</strong>.
    The CGIs read the <a href="configmain.html">main config file</a> and <a href="configobject.html">object config file(s)</a>,
    so you don't want to keep any sensitive information (usernames, passwords, etc) in there.
    If you need to specify a username and/or password in a command definition use a $USERn$ <a href="macros.html">macro</a> to hide it.
    $USERn$ macros are defined in one or more <a href="configmain.html#resource_file">resource files</a>.
    The CGIs will not attempt to read the contents of resource files, so you can set more restrictive permissions (600 or 660) on them.
    See the sample <i>resource.cfg</i> file in the base of the Naemon distribution for an example of how to define $USERn$ macros.<br><br></li>
<li><strong>Strip Dangerous Characters From Macros</strong>.
    Use the <a href="configmain.html#illegal_macro_output_chars">illegal_macro_output_chars</a> directive to strip
    dangerous characters from the $HOSTOUTPUT$, $SERVICEOUTPUT$, $HOSTPERFDATA$, and $SERVICEPERFDATA$ macros before
    they're used in notifications, etc.
    Dangerous characters can be anything that might be interpreted by the shell, thereby opening a security hole.
    An example of this is the presence of backtick (`) characters in the $HOSTOUTPUT$, $SERVICEOUTPUT$, $HOSTPERFDATA$,
    and/or $SERVICEPERFDATA$ macros, which could allow an attacker to execute an arbitrary command as the naemon user
    (one good reason not to run Naemon as the root user).<br><br></li>
<li><strong>Secure Access to Remote Agents</strong>. Make sure you lock down access to agents (NRPE, NSClient, SNMP, etc.)
    on remote systems using firewalls, access lists, etc.
    You don't want everyone to be able to query your systems for status information.
    This information could be used by an attacker to execute remote event handler scripts or to determine the best
    times to go unnoticed.<br><br><img src="images/security1.png" border="0" style="float: left; clear: both;" alt="Remote Agents" title="Remote Agents"><br clear="all"><br></li>
<li><strong>Secure Communication Channels</strong>. Make sure you encrypt communication channels between different Naemon installations and between your Naemon servers and your monitoring agents whenever possible.
    You don't want someone to be able to sniff status information going across your network.
    This information could be used by an attacker to determine the best times to go unnoticed.<br><br>
    <img src="images/security2.png" border="0" style="float: left; clear: both;" alt="Communication Channels" title="Communication Channels"><br clear="all"><br></li>
</ol>
