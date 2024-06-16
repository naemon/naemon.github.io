---
layout: doctoc
title: Check Result Spoolfolder
---

A brief intro to the Naemon checkresult spoolfolder

### Purpose
The purpose of the checkresult spoolfolder as set by the `check_result_path`
configuration option is a fast and scalable option to submit active and
passive host and service results. It is usually an internal API, but
it can be used to submit check results from 3rd party scripts as well.

### When should i use this spoolfolder
There is more than one way to submit check results. The spoolfolder should
be used if one of the following criteria matches:

- Want to submit active check results
- Want to submit many results at once

### Architecure Overview

1. Script runs host/service check and writes result into
   new file below `check_result_path`.
2. When finished writing the file, write a .ok file.
3. Naemon will reap the results and delete the file.

### Spoolfile
The spoolfile must match the pattern `cXXXXXX`. It must start with a literal
`c` and the filename must be 7 bytes long.

The file contains a header block like this:
```
### Active Check Result File ###
file_time=<unix timestamp>
```

Naemon will discard and remove the file if the timestamp is older than `max_check_result_file_age`.

Followed by one or multiple check results:

```
host_name=host
service_description=servicename
check_type=0
check_options=0
scheduled_check=1
latency=0.0
start_time=1617969160.0
finish_time=1617969169.0
early_timeout=0
exited_ok=1
return_code=0
output=...
```

When the file is finished and closed, create an empty file `cXXXXXX.ok` using
the same filename as the actual checkresult and append `.ok`.

#### Checkresult Attributes

`host_name`: Contains the host name.

`service_description`: Contains the service description. (Optional, skip for host results).

`check_type`: Can be either `0` for active check results or `1` for passive check results.

`check_options`: Should be 0.

`scheduled_check`: Should be 1. But does not make any difference otherwise.

`latency`: Latency in seconds (with fractions)..

`start_time`: Unix timestamp (with fractions) when the check started.

`finish_time`: Unix timestamp (with fractions) when the check finished.

`early_timeout`: Should be 0, otherwise Naemon will create a generic timeout result.

`exited_ok`: Should be 1. If 0, Naemon will discard the result and put a error message into the plugin output.

`return_code`: The check plugin return code as 0:OK, 1:WARNING, 2:CRTICIAL and 3:UNKNOWN

`output`: Contains the plugin output (with performance data) in a single line. Newlines must be escaped as `\n`.


### Example

```
host_name=naemon.io
service_description=HTTP
check_type=1
check_options=0
latency=0.0
start_time=1617971364.4
finish_time=1617971364.5
return_code=0
output=HTTP OK: HTTP/1.1 302 Moved Temporarily - 324 bytes in 0.165 second response time |time=0.165422s;;;0.000000;10.000000 size=324B;;;0
```


### Libraries

Here is a incomplete lists of libraries using this API:

- Perl: <a href="https://metacpan.org/pod/Nagios::Passive" target="_blank">https://metacpan.org/pod/Nagios::Passive</a>
