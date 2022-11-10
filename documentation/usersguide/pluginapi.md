---
layout: doctoc
title: Plugin API
---
<style>table, td { border: 1px solid; } td { padding: 2px; padding-left: 5px; }</style>
<span class="glyphicon glyphicon-arrow-right"></span> See Also: [Plugin Overview](plugins.html), [Developing Plugins For Use With Embedded Perl](epnplugins.html), [Performance Data](perfdata.html)

### Other Resources

If you're looking at writing your own plugins for Naemon, please make sure to visit these other resources:

* The [monitoring plugin project website](https://monitoring-plugins.org/)
* The [monitoring plugin development guidelines](https://monitoring-plugins.org/doc/guidelines.html)

The above pages are the continuation of:

* The [Nagios plugin project website](https://nagios-plugins.org)
* The [Nagios plugin development guidelines](https://nagios-plugins.org/doc/guidelines.html)

### Plugin Overview

Scripts and executables must do two things (at a minimum) in order to function as Naemon plugins:

* Exit with one of several possible return values
* Return at least one line of text output to STDOUT

The inner workings of your plugin are unimportant to Naemon.  Your plugin could check the status of a TCP port, run a database query, check disk free space, or do whatever else it needs to check something.   The details will depend on what needs to be checked - that's up to you.

### Return Code

Naemon determines the status of a host or service by evaluating the return code from plugins.  The following tables shows a list of valid return codes, along with their corresponding service or host states.

| Plugin Return Code | Service State | Host State                   |
|--------------------|:-------------:|:----------------------------:|
| 0                  | `OK`          | `UP`                         |
| 1                  | `WARNING`     | `UP` or `DOWN`/`UNREACHABLE` |
| 2                  | `CRITICAL`    | `DOWN`/`UNREACHABLE`         |
| 3                  | `UNKNOWN`     | `DOWN`/`UNREACHABLE`         |

{{ site.note }}{{ "If the [use_aggressive_host_checking](configmain.html#use_aggressive_host_checking) option is enabled, return codes of 1 will result in a host state of `DOWN` or `UNREACHABLE`.  Otherwise return codes of 1 will result in a host state of `UP`.  The process by which Naemon determines whether or not a host is `DOWN` or `UNREACHABLE` is discussed [here](networkreachability.html)." | markdownify}}{{ site.end }}

### Plugin Output Spec

At a minimum, plugins should return at least one of text output.  Optionally, plugins may return multiple lines of output.  Plugins may also return optional performance data that can be processed by external applications.  The basic format for plugin output is shown below:

<p><font color="red">TEXT OUTPUT</font> | <font color="#FFA500">OPTIONAL PERFDATA</font><br>
<font color="#00A500">LONG TEXT LINE 1<br>
LONG TEXT LINE 2<br>
...<br>
LONG TEXT LINE N  </font>| <font color="#FFA500">PERFDATA LINE 2</font><br>
<font color="#FFA500">PERFDATA LINE 3<br>
...<br>
PERFDATA LINE N</font>
</p>

The performance data (shown in <font color="#FFA500">orange</font>) is optional.  If a plugin returns performance data in its output, it must separate the performance data from the other text output using a pipe (`|`) symbol.  The basic format is `label=value[unit];[warn];[crit];[min];[max]` where `[]` means optional.  See [official development guidelines](https://monitoring-plugins.org/doc/guidelines.html#AEN201) for details.

Additional lines of long text output (shown in <font color="#00A500">green</font>) are also optional.

### Plugin Output Examples

Let's see some examples of possible plugin output...

**Case 1: One line of output (text only)**

Assume we have a plugin that returns one line of output that looks like this:

<div style="padding: 0 0 0 25px;">
<div style="display: inline; color: red;">DISK OK - free space: / 3326 MB (56%);</div>
</div>

If this plugin was used to perform a service check, the entire line of output will be stored in the [`$SERVICEOUTPUT$`](macrolist.html#serviceoutput) macro.

**Case 2: One line of output (text and perfdata)**

A plugin can return optional performance data for use by external applications.  To do this, the performance data must be separated from the text output with a pipe (`|`) symbol like such:

<div style="padding: 0 0 0 25px;">
<div style="display: inline; color: red;">DISK OK - free space: / 3326 MB (56%);</div><div style="display: inline;">&nbsp;|&nbsp;</div><div style="display: inline; color: orange;">/=2643MB;5948;5958;0;5968</div>
</div>

If this plugin was used to perform a service check, the <font color="red">red</font> portion of output (left of the pipe separator) will be stored in the [`$SERVICEOUTPUT$`](macrolist.html#serviceoutput) macro and the <font color="#FFA500">orange</font> portion of output (right of the pipe separator) will be stored in the [`$SERVICEPERFDATA$`](macrolist.html#serviceperfdata) macro.

**Case 3: Multiple lines of output (text and perfdata)**

A plugin optionally return multiple lines of both text output and perfdata, like such:

<div style="padding: 0 0 0 25px;">
<font color="red">DISK OK - free space: / 3326 MB (56%);</font>&nbsp;|&nbsp;<font color="#FFA500">/=2643MB;5948;5958;0;5968</font><br>
<font color="#00A500">/ 15272 MB (77%);</font><br>
<font color="#00A500">/boot 68 MB (69%);</font><br>
<font color="#00A500">/home 69357 MB (27%);</font><br>
<font color="#00A500">/var/log 819 MB (84%);</font>&nbsp;|&nbsp;<font color="#FFA500">/boot=68MB;88;93;0;98</font><br>
<font color="#FFA500">/home=69357MB;253404;253409;0;253414 </font><br>
<font color="#FFA500">/var/log=818MB;970;975;0;980</font><br>
</div>

If this plugin was used to perform a service check, the <font color="red">red</font> portion of first line of output (left of the pipe separator) will be stored in the [`$SERVICEOUTPUT$`](macrolist.html#serviceoutput) macro.

The <font color="#FFA500">orange</font> portions of the first and subsequent lines are concatenated (with spaces) are stored in the [`$SERVICEPERFDATA$`](macrolist.html#serviceperfdata) macro.  The <font color="#00A500">green</font> portions of the 2nd - 5th lines of output will be concatenated (with escaped newlines) and stored in the [`$LONGSERVICEOUTPUT$`](macrolist.html#longserviceoutput) macro.

The final contents of each macro are listed below:

| Macro | Value |
|-------|-----------------------------------|
| `$SERVICEOUTPUT$`     | <font color="red">DISK OK - free space: / 3326 MB (56%);</font> |
| `$SERVICEPERFDATA$`   | <font color="#FFA500">/=2643MB;5948;5958;0;5968 /boot=68MB;88;93;0;98 /home=69357MB;253404;253409;0;253414 /var/log=818MB;970;975;0;980</font> |
| `$LONGSERVICEOUTPUT$` | <font color="#00A500">/ 15272 MB (77%);\n/boot 68 MB (69%);\n/var/log 819 MB (84%);</font> |

With regards to multiple lines of output, you have the following options for returning performance data:

* You can choose to return no performance data whatsoever
* You can return performance data on the first line only
* You can return performance data only in subsequent lines (after the first)
* You can return performance data in both the first line and subsequent lines (as shown above)

### Plugin Output Length Restrictions

There is no plugin output length restriction in Naemon.

### Examples

If you're looking for some example plugins to study, then you can download Monitoring-Plugins plugins or Nagios-Plugins and look through the code for various C, Perl, and shell script plugins.  Information on obtaining Naemon plugins can be found [here](plugins.html).
