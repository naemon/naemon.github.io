External Commands

<!--@include: ../../includes/review.md-->



## Introduction

Naemon can process commands from external applications (including the CGIs) and alter various aspects of its monitoring functions based on the commands it receives.  External applications can submit commands by writing to the [command file](configmain#command_file), which is periodically processed by the Naemon daemon.


## Enabling External Commands

In order to have Naemon process external commands, make sure you do the following:


- Enable external command checking with the [check_external_commands](configmain#check_external_commands) option.
- Specify the location of the command file with the [command_file](configmain#command_file) option.
- Setup proper permissions on the directory containing the external command file, as described in the [quickstart guide](quickstart).

![External Commands](/images/usersguide/svg/externalcommands.svg) {.img-bg}

## When Does Naemon Check For External Commands?


- Naemon reads and executes external commands immediately when they are submitted.

## Using External Commands

External commands can be used to accomplish a variety of things while Naemon is running.  Example of what can be done include temporarily disabling notifications for services and hosts, temporarily disabling service checks, forcing immediate service checks, adding comments to hosts and services, etc.

## Command Format

External commands that are written to the [command file](configmain#command_file) have the following format...

```
[<time>] <command_id>;<command_arguments>
```

...where `<time>` is the time (in `time_t` format, a UNIX timestamp) that the external application submitted the external command to the command file.  The values for the `<command_id>` and `<command_arguments>` arguments will depend on what command is being submitted to Naemon.

A full listing of external commands that can be used (along with examples of how to use them) can be found in the
[external commands developer guide](/documentation/developer/externalcommands/).
