# Adaptive Monitoring

## See Also
- [External Commands](extcommands)
- [List of external commands](/documentation/developer/externalcommands/)

## Introduction

Naemon allows you to change certain commands and host and service check
attributes during runtime.

I'll refer to this feature as "adaptive monitoring".

Please note that the adaptive monitoring features found in Naemon will probably
not be of much use to 99% of users, but they do allow you to do some neat things.

## What Can Be Changed?

The following service check attributes can be changed during runtime:

- Check command (and command arguments)
- Check interval
- Max check attempts
- Check timeperiod
- Event handler command (and command arguments)

The following host check attributes can be changed during runtime:

- Check command (and command arguments)
- Check interval
- Max check attempts
- Check timeperiod
- Event handler command (and command arguments)

The following global attributes can be changed during runtime:

- Global host event handler command (and command arguments)
- Global service event handler command (and command arguments)

## External Commands For Adaptive Monitoring

In order to change global or host- or service-specific attributes during runtime,
you must submit the appropriate [external command](extcommands) to
Naemon via the [external command file](configmain#command_file).

The table below lists the different attributes that may be changed during runtime,
along with the external command to accomplish the job.

A full listing of external commands that can be used for adaptive monitoring
(along with examples of how to use them) can be found in the
[external commands developer guide](/documentation/developer/externalcommands/).


> [!NOTE]
> - When changing check commands, check timeperiods, or event handler commands, it is
>   important to note that the new values for these options must have been defined before Naemon was started.
>   Any request to change a command or timeperiod to one which had not been defined when Naemon was started is ignored.
> - You can specify command arguments along with the actual command name - just separate individual
>   arguments from the command name (and from each other) using bang (`!`) characters.
>   More information on how arguments in command definitions are processed during runtime
>   can be found in the documentation on [macros](macros).

