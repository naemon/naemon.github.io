---
layout: doctoc
title: Plugin API
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="plugins.html">Plugin Overview</a>, <a href="epnplugins.html">Developing Plugins For Use With Embedded Perl</a>, <a href="perfdata.html">Performance Data</a>

### Other Resources

If you're looking at writing your own plugins for Naemon, please make sure to visit these other resources:

<ul>
<li>The official <a href="http://sourceforge.net/projects/nagiosplug/">Nagios plugin project website</a></li>
<li>The official <a href="http://nagiosplug.sourceforge.net/developer-guidelines.html">Nagios plugin development guidelines</a></li>
</ul>

### Plugin Overview

Scripts and executables must do two things (at a minimum) in order to function as Naemon plugins:

<ul>
<li>Exit with one of several possible return values</li>
<li>Return at least one line of text output to STDOUT</li>
</ul>

The inner workings of your plugin are unimportant to Naemon.  Your plugin could check the status of a TCP port, run a database query, check disk free space, or do whatever else it needs to check something.   The details will depend on what needs to be checked - that's up to you.

### Return Code

Naemon determines the status of a host or service by evaluating the return code from plugins.  The following tables shows a list of valid return codes, along with their corresponding service or host states.

<table border="1">
<tr><th>Plugin Return Code</th><th>Service State</th><th>Host State</th></tr>
<tr><td>0</td><td>OK</td><td>UP</td></tr>
<tr><td>1</td><td>WARNING</td><td>UP or DOWN/UNREACHABLE*</td></tr>
<tr><td>2</td><td>CRITICAL</td><td>DOWN/UNREACHABLE</td></tr>
<tr><td>3</td><td>UNKNOWN</td><td>DOWN/UNREACHABLE</td></tr>
</table>

{{ site.note }}If the <a href="configmain.html#use_aggressive_host_checking">use_aggressive_host_checking</a> option is enabled, return codes of 1 will result in a host state of DOWN or UNREACHABLE.  Otherwise return codes of 1 will result in a host state of UP.  The process by which Naemon determines whether or not a host is DOWN or UNREACHABLE is discussed <a href="networkreachability.html">here</a>.{{ site.end }}

### Plugin Output Spec

At a minimum, plugins should return at least one of text output.  Optionally, plugins may return multiple lines of output.  Plugins may also return optional performance data that can be processed by external applications.  The basic format for plugin output is shown below:

<p><font color="red">TEXT OUTPUT</font> | <font color="#FFA500">OPTIONAL PERFDATA</font><br>
<font color="blue">LONG TEXT LINE 1<br>
LONG TEXT LINE 2<br>
...<br>
LONG TEXT LINE N  </font>| <font color="#FFA500">PERFDATA LINE 2</font><br>
<font color="#FFA500">PERFDATA LINE 3<br>
...<br>
PERFDATA LINE N</font>
</p>

The performance data (shown in <font color="#FFA500">orange</font>) is optional.  If a plugin returns performance data in its output, it must separate the performance data from the other text output using a pipe (|) symbol.  Additional lines of long text output (shown in <font color="blue">blue</font>) are also optional.

### Plugin Output Examples

Let's see some examples of possible plugin output...

<strong>Case 1: One line of output (text only)</strong><br>
Assume we have a plugin that returns one line of output that looks like this:

<div style="padding: 0 0 0 25px;">
<div style="display: inline; color: red;">DISK OK - free space: / 3326 MB (56%);</div>
</div>

If this plugin was used to perform a service check, the entire line of output will be stored in the <a href="macrolist.html#serviceoutput">$SERVICEOUTPUT$</a> macro.

<strong>Case 2: One line of output (text and perfdata)</strong><br>
A plugin can return optional performance data for use by external applications.  To do this, the performance data must be separated from the text output with a pipe (|) symbol like such:

<div style="padding: 0 0 0 25px;">
<div style="display: inline; color: red;">DISK OK - free space: / 3326 MB (56%);</div><div style="display: inline;">&nbsp;|&nbsp;</div><div style="display: inline; color: orange;">/=2643MB;5948;5958;0;5968</div>
</div>

<div style="float: left;">If this plugin was used to perform a service check, the</div>
<div style="display: inline; color: red;">&nbsp;red&nbsp;</div>
<div style="display: inline;">portion of output (left of the pipe separator) will be stored in the <a href="macrolist.html#serviceoutput">$SERVICEOUTPUT$</a> macro and the</div>
<div style="color: orange; display: inline;">&nbsp;orange&nbsp;</div>
<div style="display: inline;">portion of output (right of the pipe separator) will be stored in the <a href="macrolist.html#serviceperfdata">$SERVICEPERFDATA$</a> macro.</div>

<strong>Case 3: Multiple lines of output (text and perfdata)</strong><br>
A plugin optionally return multiple lines of both text output and perfdata, like such:

<div style="padding: 0 0 0 25px;">
<font color="red">DISK OK - free space: / 3326 MB (56%);</font>&nbsp;|&nbsp;<font color="#FFA500">/=2643MB;5948;5958;0;5968</font><br>
<font color="blue">/ 15272 MB (77%);</font><br>
<font color="blue">/boot 68 MB (69%);</font><br>
<font color="blue">/home 69357 MB (27%);</font><br>
<font color="blue">/var/log 819 MB (84%);</font>&nbsp;|&nbsp;<font color="#FFA500">/boot=68MB;88;93;0;98</font><br>
<font color="#FFA500">/home=69357MB;253404;253409;0;253414 </font><br>
<font color="#FFA500">/var/log=818MB;970;975;0;980</font><br>
</div>

If this plugin was used to perform a service check, the <font color="red">red</font> portion of first line of output (left of the pipe separator) will be stored in the <a href="macrolist.html#serviceoutput">$SERVICEOUTPUT$</a> macro.

The <font color="#FFA500">orange</font> portions of the first and subsequent lines are concatenated (with spaces) are stored in the <a href="macrolist.html#serviceperfdata">$SERVICEPERFDATA$</a> macro.  The <font color="blue">blue</font> portions of the 2nd - 5th lines of output will be concatenated (with escaped newlines) and stored in <a href="macrolist.html#longserviceoutput">$LONGSERVICEOUTPUT$</a> the macro.

The final contents of each macro are listed below:

<table>
<tr><td align="left"><b>Macro</b></td><td align="left"><b>Value</b></td></tr>
<tr><td>$SERVICEOUTPUT$</td><td><font color="red">DISK OK - free space: / 3326 MB (56%);</font></td></tr>
<tr><td>$SERVICEPERFDATA$</td><td><font color="#FFA500">/=2643MB;5948;5958;0;5968 /boot=68MB;88;93;0;98 /home=69357MB;253404;253409;0;253414 /var/log=818MB;970;975;0;980</font></td></tr>
<tr><td>$LONGSERVICEOUTPUT$</td><td><font color="blue">/ 15272 MB (77%);\n/boot 68 MB (69%);\n/var/log 819 MB (84%);</font></td></tr>
</table>

With regards to multiple lines of output, you have the following options for returning performance data:

<ul>
<li>You can choose to return no performance data whatsoever</li>
<li>You can return performance data on the first line only</li>
<li>You can return performance data only in subsequent lines (after the first)</li>
<li>You can return performance data in both the first line and subsequent lines (as shown above)</li>
</ul>

### Plugin Output Length Restrictions

Naemon will only read the first 8 KB of data that a plugin returns. This is done in order to prevent runaway plugins from dumping megs or gigs of data back to Naemon. This 8 KB output limit is fairly easy to change if you need.  Simply edit the value of the MAX_PLUGIN_OUTPUT_LENGTH definition in the <i>naemon.h</i> file of the source code and the same for MAX_EXTERNAL_COMMAND_LENGTH in common.h and recompile Naemon.  There's nothing else you need to change!

### Examples

If you're looking for some example plugins to study, I would recommend that you download Monitoring-Plugins plugins or Nagios-Plugins and look through the code for various C, Perl, and shell script plugins.  Information on obtaining Naemon plugins can be found <a href="plugins.html">here</a>.
