# Monitoring Linux/Unix Machines

> [!WARNING]
> This page must be reviewed.
> See [Help Extending The Documentation](/documentation/faq/#help-extending-the-documentation) for instructions on how to do that.

## Introduction

This document describes how you can monitor "private" services and attributes of Linux/UNIX servers, such as:

 - CPU load
 - Memory usage
 - Disk usage
 - Logged in users
 - Running processes
 - etc.


Publicly available services that are provided by Linux servers (HTTP, FTP, SSH, SMTP, etc.) can be monitored easily by following the documentation on [monitoring network services](monitoring-networkservices).

> [!NOTE]
> These instructions assume that you've installed Naemon according to the [quickstart guide](quickstart).

The sample configuration entries below reference objects that are defined in the sample config files (`commands.cfg`, `templates.cfg`, etc.) that are installed if you follow the quickstart.

## Overview

> [!NOTE]
> This document has not been completed. It is recommended that you read the documentation on the [NRPE addon](addons#nrpe) for instructions on how to monitor a remote Linux/Unix server.

There are several different ways to monitor attributes or remote Linux/Unix servers.  One is by using shared SSH keys and the `check_by_ssh` plugin to execute plugins on remote servers.  This method will not be covered here, but can result in high load on your monitoring server if you are monitoring hundreds or thousands of services.  The overhead of setting up/destroying SSH connections is the cause of this.

![NRPE image](/images/usersguide/svg/monitoring-windows.svg) {.img-bg}

Another common method of monitoring remote Linux/Unix hosts is to use the [NRPE addon](addons#nrpe).  NRPE  allows you to execute plugins on remote Linux/Unix hosts.  This is useful if you need to monitor local resources/attributes like disk usage, CPU load, memory usage, etc. on a remote host.
