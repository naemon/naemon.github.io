# TCP Wrapper Integration

## Introduction

![TCP Wrappers"](/images/usersguide/svg/tcpwrappers.svg) {.img-bg}


This document explains how to easily generate alerts in Naemon for connection attempts that are rejected by TCP wrappers.  For example, if an unauthorized host attempts to connect to your SSH server, you can receive an alert in Naemon that contains the name of the host that was rejected.

These directions assume:


1. You are already familiar with [passive checks](passivechecks) and how they work.
2. You are already familiar with [volatile services](volatileservices) and how they work.
3. The host which you are generating alerts for (i.e. the host you are using TCP wrappers on) is a remote host (called `firestorm` in this example).  If you want to generate alerts on the same host that Naemon is running you will need to make a few modifications to the examples.
4. You have installed the [NSCA daemon](addons#nsca) on your monitoring server and the NSCA client (`send_nsca`) on the remote machine that you are generating TCP wrapper alerts from.

## Defining A Service

If you haven't done so already, create a [host definition](objectdefinitions#host) for the remote host (`firestorm`).

Next, define a service in one of your [object configuration files](configobject) for the TCP wrapper alerts on host `firestorm`.  The service definition might look something like this:

```
define service{
    host_name                       firestorm
    service_description             TCP Wrappers
    is_volatile                     1
    active_checks_enabled           0
    passive_checks_enabled          1
    max_check_attempts              1
    check_command                   check_none
    ...
}
```

There are some important things to note about the above service definition:


1. The `volatile` option enabled.  We want this option enabled because we want a notification to be generated for every alert that comes in.
2. Active checks of the service as disabled, while passive checks are enabled.  This means that the service will never be actively checked by Naemon - all alert information will have to be received passively from an external source.
3. The `max_check_attempts` value is set to 1.  This guarantees you will get a notification when the first alert is generated.


## Configuring TCP Wrappers

Now you're going to have to modify the `/etc/hosts.deny` file on `firestorm`.  In order to have the TCP wrappers send an alert to the monitoring host whenever a connection attempt is denied, you'll have to add a line similar to the following:

```
ALL: ALL: RFC931: twist (/usr/lib/naemon/plugins/eventhandlers/handle_tcp_wrapper %h %d) &amp;
```

This line assumes that there is a script called `handle_tcp_wrapper` in the `/usr/lib/naemon/plugins/eventhandlers/` directory on `firestorm`.  We'll write that script next.

## Writing The Script

The last thing you need to do is write the `handle_tcp_wrapper` script on `firestorm` that will send the alert back to the Naemon server.  It might look something like this:

```sh
#!/bin/sh

/usr/lib/naemon/plugins/eventhandlers/submit_check_result firestorm "TCP Wrappers" 2 "Denied $2-$1" > /dev/null 2> /dev/null
```

Notice that the `handle_tcp_wrapper` script calls the `submit_check_result` script to actually send the alert back to the monitoring host.  Assuming your Naemon server is called `monitor`, the `submit check_result` script might look like this:

```sh
#!/bin/sh
# Arguments
#   $1 = name of host in service definition
#   $2 = name/description of service in service definition
#   $3 = return code
#   $4 = output

/bin/echo -e "$1\t$2\t$3\t$4\n" | /usr/local/nagios/bin/send_nsca monitor -c /usr/local/nagios/etc/send_nsca.cfg
```

## Finishing Up

You've now configured everything you need to, so all you have to do is restart the `inetd` process on `firestorm` and restart Naemon on your monitoring server.  That's it!  When the TCP wrappers on `firestorm` deny a connection attempt, you should be getting alerts in Naemon.  The plugin output for the alert will look something like the following:

```
Denied sshd2-sdn-ar-002mnminnP321.dialsprint.net
```
