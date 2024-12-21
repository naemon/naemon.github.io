---
sidebar: true
aside: false
pageClass: page-large-content
---

# Standard Macros in Naemon

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="macros.html">How Macros Work</a>

Standard macros that are available in Naemon are listed here. On-demand macros and macros for custom
variables are described <a href="macros.html">here</a>.


## Macro Validity

Although macros can be used in all commands you define, not all macros may be "valid" in
a particular type of command. For example, some macros may only be valid during service
notification commands, whereas other may only be valid during host check commands. There are
ten types of commands that Naemon recognizes and treats differently.
They are as follows:

<ol>
<li>Service checks</li>
<li>Service notifications</li>
<li>Host checks</li>
<li>Host notifications</li>
<li>Service <a href="eventhandlers.html">event handlers</a> and/or a global service event handler</li>
<li>Host <a href="eventhandlers.html">event handlers</a> and/or a global host event handler</li>
<li><a href="configmain.html#ocsp_command">OCSP</a> command</li>
<li><a href="configmain.html#ochp_command">OCHP</a> command</li>
<li>Service <a href="perfdata.html">performance data</a> commands</li>
<li>Host <a href="perfdata.html">performance data</a> commands</li>
</ol>

The tables below list all macros currently available in Naemon, along with a brief description of
each and the types of commands in which they are valid. If a macro is used in a command
in which it is invalid, it is replaced with an empty string. It should be noted that
macros consist of all uppercase characters and are enclosed in <b>$</b> characters.



## Macro Availability Chart

<b>Legend:</b><br>
<table cellspacing="0" cellpadding="5">
<tbody>
<tr><td class="MacroNo">No</td><td>The macro is not available</td></tr>
<tr><td class="MacroYes">Yes</td><td>The macro is available</td></tr>
</tbody>
</table>

<div class="table-container">
<table cellspacing="0" cellpadding="5">
<tbody>
<tr class="Macros">
<th class="Macros th-sticky">Macro Name</th>
<th class="Macros th-sticky">Service Checks</th>
<th class="Macros th-sticky">Service Notifications</th>
<th class="Macros th-sticky">Host Checks</th>
<th class="Macros th-sticky">Host Notifications</th>
<th class="Macros th-sticky">Service Event Handlers and <a href="configmain.html#ocsp_command">OCSP</a></th>
<th class="Macros th-sticky">Host Event Handlers and <a href="configmain.html#ochp_command">OCHP</a></th>
<th class="Macros th-sticky">Service Perf Data</th>
<th class="Macros th-sticky">Host Perf Data</th>
</tr>
<tr>
<td colspan='9' class='MacroType'>Host Macros: <a href="#note3"><sup>3</sup></a></td>
</tr>
<tr>
<td class='MacroName'><a href="#hostname">$HOSTNAME$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostdisplayname">$HOSTDISPLAYNAME$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostalias">$HOSTALIAS$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostaddress">$HOSTADDRESS$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hoststate">$HOSTSTATE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note1"><sup>1</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hoststateid">$HOSTSTATEID$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note1"><sup>1</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#lasthoststate">$LASTHOSTSTATE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#lasthoststateid">$LASTHOSTSTATEID$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hoststatetype">$HOSTSTATETYPE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note1"><sup>1</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostattempt">$HOSTATTEMPT$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#maxhostattempts">$MAXHOSTATTEMPTS$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hosteventid">$HOSTEVENTID$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#lasthosteventid">$LASTHOSTEVENTID$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostproblemid">$HOSTPROBLEMID$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#lasthostproblemid">$LASTHOSTPROBLEMID$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostlatency">$HOSTLATENCY$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostexecutiontime">$HOSTEXECUTIONTIME$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note1"><sup>1</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostduration">$HOSTDURATION$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostdurationsec">$HOSTDURATIONSEC$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostdowntime">$HOSTDOWNTIME$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostpercentchange">$HOSTPERCENTCHANGE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostgroupname">$HOSTGROUPNAME$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostgroupnames">$HOSTGROUPNAMES$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#lasthostcheck">$LASTHOSTCHECK$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#lasthoststatechange">$LASTHOSTSTATECHANGE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#lasthostup">$LASTHOSTUP$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#lasthostdown">$LASTHOSTDOWN$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#lasthostunreachable">$LASTHOSTUNREACHABLE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostoutput">$HOSTOUTPUT$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note1"><sup>1</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#longhostoutput">$LONGHOSTOUTPUT$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note1"><sup>1</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostperfdata">$HOSTPERFDATA$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note1"><sup>1</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostcheckcommand">$HOSTCHECKCOMMAND$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostackauthor">$HOSTACKAUTHOR$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostackauthorname">$HOSTACKAUTHORNAME$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostackauthoralias">$HOSTACKAUTHORALIAS$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostackcomment">$HOSTACKCOMMENT$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostactionurl">$HOSTACTIONURL$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostnotesurl">$HOSTNOTESURL$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostnotes">$HOSTNOTES$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalhostservices">$TOTALHOSTSERVICES$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalhostservicesok">$TOTALHOSTSERVICESOK$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalhostserviceswarning">$TOTALHOSTSERVICESWARNING$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalhostservicesunknown">$TOTALHOSTSERVICESUNKNOWN$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalhostservicescritical">$TOTALHOSTSERVICESCRITICAL$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostproblemstart">$HOSTPROBLEMSTART$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostproblemend">$HOSTPROBLEMEND$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostproblemdurationsec">$HOSTPROBLEMDURATIONSEC$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostproblemduration">$HOSTPROBLEMDURATION$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr><td colspan='9'><br></td></tr>
<tr class="Macros">
<th class="Macros">Macro Name</th>
<th class="Macros">Service Checks</th>
<th class="Macros">Service Notifications</th>
<th class="Macros">Host Checks</th>
<th class="Macros">Host Notifications</th>
<th class="Macros">Service Event Handlers and <a href="configmain.html#ocsp_command">OCSP</a></th>
<th class="Macros">Host Event Handlers and <a href="configmain.html#ochp_command">OCHP</a></th>
<th class="Macros">Service Perf Data</th>
<th class="Macros">Host Perf Data</th>
</tr>
<tr>
<td colspan='9' class='MacroType'>Host Group Macros:</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostgroupalias">$HOSTGROUPALIAS$</a> <a href="#note5"><sup>5</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostgroupmembers">$HOSTGROUPMEMBERS$</a> <a href="#note5"><sup>5</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostgroupnotes">$HOSTGROUPNOTES$</a> <a href="#note5"><sup>5</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostgroupnotesurl">$HOSTGROUPNOTESURL$</a> <a href="#note5"><sup>5</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostgroupactionurl">$HOSTGROUPACTIONURL$</a> <a href="#note5"><sup>5</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr><td colspan='9'><br></td></tr>
<tr class="Macros">
<th class="Macros">Macro Name</th>
<th class="Macros">Service Checks</th>
<th class="Macros">Service Notifications</th>
<th class="Macros">Host Checks</th>
<th class="Macros">Host Notifications</th>
<th class="Macros">Service Event Handlers and <a href="configmain.html#ocsp_command">OCSP</a></th>
<th class="Macros">Host Event Handlers and <a href="configmain.html#ochp_command">OCHP</a></th>
<th class="Macros">Service Perf Data</th>
<th class="Macros">Host Perf Data</th>
</tr>
<tr>
<td colspan='9' class='MacroType'>Service Macros:</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicedesc">$SERVICEDESC$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicedisplayname">$SERVICEDISPLAYNAME$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicestate">$SERVICESTATE$</a></td>
<td class="MacroYes">Yes <a href="#note2"><sup>2</sup></a></td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicestateid">$SERVICESTATEID$</a></td>
<td class="MacroYes">Yes <a href="#note2"><sup>2</sup></a></td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#lastservicestate">$LASTSERVICESTATE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#lastservicestateid">$LASTSERVICESTATEID$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicestatetype">$SERVICESTATETYPE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceattempt">$SERVICEATTEMPT$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#maxserviceattempts">$MAXSERVICEATTEMPTS$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceisvolatile">$SERVICEISVOLATILE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceeventid">$SERVICEEVENTID$</a></td>
<td class="MacroYes">Yes </td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#lastserviceeventid">$LASTSERVICEEVENTID$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceproblemid">$SERVICEPROBLEMID$</a></td>
<td class="MacroYes">Yes </td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#lastserviceproblemid">$LASTSERVICEPROBLEMID$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicelatency">$SERVICELATENCY$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceexecutiontime">$SERVICEEXECUTIONTIME$</a></td>
<td class="MacroYes">Yes <a href="#note2"><sup>2</sup></a></td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceduration">$SERVICEDURATION$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicedurationsec">$SERVICEDURATIONSEC$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicedowntime">$SERVICEDOWNTIME$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicepercentchange">$SERVICEPERCENTCHANGE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicegroupname">$SERVICEGROUPNAME$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicegroupnames">$SERVICEGROUPNAMES$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#lastservicecheck">$LASTSERVICECHECK$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#lastservicestatechange">$LASTSERVICESTATECHANGE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#lastserviceok">$LASTSERVICEOK$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#lastservicewarning">$LASTSERVICEWARNING$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#lastserviceunknown">$LASTSERVICEUNKNOWN$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#lastservicecritical">$LASTSERVICECRITICAL$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceoutput">$SERVICEOUTPUT$</a></td>
<td class="MacroYes">Yes <a href="#note2"><sup>2</sup></a></td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#longserviceoutput">$LONGSERVICEOUTPUT$</a></td>
<td class="MacroYes">Yes <a href="#note2"><sup>2</sup></a></td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceperfdata">$SERVICEPERFDATA$</a></td>
<td class="MacroYes">Yes <a href="#note2"><sup>2</sup></a></td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicecheckcommand">$SERVICECHECKCOMMAND$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceackauthor">$SERVICEACKAUTHOR$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceackauthorname">$SERVICEACKAUTHORNAME$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceackauthoralias">$SERVICEACKAUTHORALIAS$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceackcomment">$SERVICEACKCOMMENT$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceactionurl">$SERVICEACTIONURL$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicenotesurl">$SERVICENOTESURL$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicenotes">$SERVICENOTES$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceproblemstart">$SERVICEPROBLEMSTART$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceproblemend">$SERVICEPROBLEMEND$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceproblemdurationsec">$SERVICEPROBLEMDURATIONSEC$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceproblemduration">$SERVICEPROBLEMDURATION$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr><td colspan='9'><br></td></tr>
<tr class="Macros">
<th class="Macros">Macro Name</th>
<th class="Macros">Service Checks</th>
<th class="Macros">Service Notifications</th>
<th class="Macros">Host Checks</th>
<th class="Macros">Host Notifications</th>
<th class="Macros">Service Event Handlers and <a href="configmain.html#ocsp_command">OCSP</a></th>
<th class="Macros">Host Event Handlers and <a href="configmain.html#ochp_command">OCHP</a></th>
<th class="Macros">Service Perf Data</th>
<th class="Macros">Host Perf Data</th>
</tr>
<tr>
<td colspan='9' class='MacroType'>Service Group Macros:</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicegroupalias">$SERVICEGROUPALIAS$</a> <a href="#note6"><sup>6</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicegroupmembers">$SERVICEGROUPMEMBERS$</a> <a href="#note6"><sup>6</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicegroupnotes">$SERVICEGROUPNOTES$</a> <a href="#note6"><sup>6</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicegroupnotesurl">$SERVICEGROUPNOTESURL$</a> <a href="#note6"><sup>6</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicegroupactionurl">$SERVICEGROUPACTIONURL$</a> <a href="#note6"><sup>6</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr><td colspan='9'><br></td></tr>
<tr class="Macros">
<th class="Macros">Macro Name</th>
<th class="Macros">Service Checks</th>
<th class="Macros">Service Notifications</th>
<th class="Macros">Host Checks</th>
<th class="Macros">Host Notifications</th>
<th class="Macros">Service Event Handlers and <a href="configmain.html#ocsp_command">OCSP</a></th>
<th class="Macros">Host Event Handlers and <a href="configmain.html#ochp_command">OCHP</a></th>
<th class="Macros">Service Perf Data</th>
<th class="Macros">Host Perf Data</th>
</tr>
<tr>
<td colspan='9' class='MacroType'>Contact Macros:</td>
</tr>
<tr>
<td class='MacroName'><a href="#contactname">$CONTACTNAME$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#contactalias">$CONTACTALIAS$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#contactemail">$CONTACTEMAIL$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#contactpager">$CONTACTPAGER$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#contactaddress">$CONTACTADDRESSn$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr><td colspan='9'><br></td></tr>
<tr class="Macros">
<th class="Macros">Macro Name</th>
<th class="Macros">Service Checks</th>
<th class="Macros">Service Notifications</th>
<th class="Macros">Host Checks</th>
<th class="Macros">Host Notifications</th>
<th class="Macros">Service Event Handlers and <a href="configmain.html#ocsp_command">OCSP</a></th>
<th class="Macros">Host Event Handlers and <a href="configmain.html#ochp_command">OCHP</a></th>
<th class="Macros">Service Perf Data</th>
<th class="Macros">Host Perf Data</th>
</tr>
<tr>
<td colspan='9' class='MacroType'>Contact Group Macros:</td>
</tr>
<tr>
<td class='MacroName'><a href="#contactgroupalias">$CONTACTGROUPALIAS$</a> <a href="#note7"><sup>7</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#contactgroupmembers">$CONTACTGROUPMEMBERS$</a> <a href="#note7"><sup>7</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr><td colspan='9'><br></td></tr>
<tr class="Macros">
<th class="Macros">Macro Name</th>
<th class="Macros">Service Checks</th>
<th class="Macros">Service Notifications</th>
<th class="Macros">Host Checks</th>
<th class="Macros">Host Notifications</th>
<th class="Macros">Service Event Handlers and <a href="configmain.html#ocsp_command">OCSP</a></th>
<th class="Macros">Host Event Handlers and <a href="configmain.html#ochp_command">OCHP</a></th>
<th class="Macros">Service Perf Data</th>
<th class="Macros">Host Perf Data</th>
</tr>
<tr>
<td colspan='9' class='MacroType'><a id="summary_macros"></a>Summary Macros:</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalhostsup">$TOTALHOSTSUP$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalhostsdown">$TOTALHOSTSDOWN$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalhostsunreachable">$TOTALHOSTSUNREACHABLE$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalhostsdownunhandled">$TOTALHOSTSDOWNUNHANDLED$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalhostsunreachableunhandled">$TOTALHOSTSUNREACHABLEUNHANDLED$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalhostproblems">$TOTALHOSTPROBLEMS$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalhostproblemsunhandled">$TOTALHOSTPROBLEMSUNHANDLED$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalservicesok">$TOTALSERVICESOK$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalserviceswarning">$TOTALSERVICESWARNING$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalservicescritical">$TOTALSERVICESCRITICAL$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalservicesunknown">$TOTALSERVICESUNKNOWN$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalserviceswarningunhandled">$TOTALSERVICESWARNINGUNHANDLED$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalservicescriticalunhandled">$TOTALSERVICESCRITICALUNHANDLED$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalservicesunknownunhandled">$TOTALSERVICESUNKNOWNUNHANDLED$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalserviceproblems">$TOTALSERVICEPROBLEMS$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#totalserviceproblemsunhandled">$TOTALSERVICEPROBLEMSUNHANDLED$</a> <a href="#note10"><sup>10</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes <a href="#note4"><sup>4</sup></a></td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr><td colspan='9'><br></td></tr>
<tr class="Macros">
<th class="Macros">Macro Name</th>
<th class="Macros">Service Checks</th>
<th class="Macros">Service Notifications</th>
<th class="Macros">Host Checks</th>
<th class="Macros">Host Notifications</th>
<th class="Macros">Service Event Handlers and <a href="configmain.html#ocsp_command">OCSP</a></th>
<th class="Macros">Host Event Handlers and <a href="configmain.html#ochp_command">OCHP</a></th>
<th class="Macros">Service Perf Data</th>
<th class="Macros">Host Perf Data</th>
</tr>
<tr>
<td colspan='9' class='MacroType'>Notification Macros:</td>
</tr>
<tr>
<td class='MacroName'><a href="#notificationtype">$NOTIFICATIONTYPE$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#notificationrecipients">$NOTIFICATIONRECIPIENTS$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#notificationisescalated">$NOTIFICATIONISESCALATED$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#notificationauthor">$NOTIFICATIONAUTHOR$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#notificationauthorname">$NOTIFICATIONAUTHORNAME$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#notificationauthoralias">$NOTIFICATIONAUTHORALIAS$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#notificationcomment">$NOTIFICATIONCOMMENT$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostnotificationnumber">$HOSTNOTIFICATIONNUMBER$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostnotificationid">$HOSTNOTIFICATIONID$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicenotificationnumber">$SERVICENOTIFICATIONNUMBER$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr>
<td class='MacroName'><a href="#servicenotificationid">$SERVICENOTIFICATIONID$</a></td>
<td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroYes">Yes</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td><td class="MacroNo">No</td>
</tr>
<tr><td colspan='9'><br></td></tr>
<tr class="Macros">
<th class="Macros">Macro Name</th>
<th class="Macros">Service Checks</th>
<th class="Macros">Service Notifications</th>
<th class="Macros">Host Checks</th>
<th class="Macros">Host Notifications</th>
<th class="Macros">Service Event Handlers and <a href="configmain.html#ocsp_command">OCSP</a></th>
<th class="Macros">Host Event Handlers and <a href="configmain.html#ochp_command">OCHP</a></th>
<th class="Macros">Service Perf Data</th>
<th class="Macros">Host Perf Data</th>
</tr>
<tr>
<td colspan='9' class='MacroType'>Date/Time Macros:</td>
</tr>
<tr>
<td class='MacroName'><a href="#longdatetime">$LONGDATETIME$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#shortdatetime">$SHORTDATETIME$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#date">$DATE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#time">$TIME$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#timet">$TIMET$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#isvalidtime">$ISVALIDTIME:$</a> <a href="#note9"><sup>9</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#nextvalidtime">$NEXTVALIDTIME:$</a> <a href="#note9"><sup>9</sup></a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr><td colspan='9'><br></td></tr>
<tr class="Macros">
<th class="Macros">Macro Name</th>
<th class="Macros">Service Checks</th>
<th class="Macros">Service Notifications</th>
<th class="Macros">Host Checks</th>
<th class="Macros">Host Notifications</th>
<th class="Macros">Service Event Handlers and <a href="configmain.html#ocsp_command">OCSP</a></th>
<th class="Macros">Host Event Handlers and <a href="configmain.html#ochp_command">OCHP</a></th>
<th class="Macros">Service Perf Data</th>
<th class="Macros">Host Perf Data</th>
</tr>
<tr>
<td colspan='9' class='MacroType'>File Macros:</td>
</tr>
<tr>
<td class='MacroName'><a href="#mainconfigfile">$MAINCONFIGFILE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#statusdatafile">$STATUSDATAFILE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#commentdatafile">$COMMENTDATAFILE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes<a href="#note5"><sup>5</sup></a></td>
</tr>
<tr>
<td class='MacroName'><a href="#downtimedatafile">$DOWNTIMEDATAFILE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#retentiondatafile">$RETENTIONDATAFILE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#objectcachefile">$OBJECTCACHEFILE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#tempfile">$TEMPFILE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#temppath">$TEMPPATH$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#logfile">$LOGFILE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#resourcefile">$RESOURCEFILE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#commandfile">$COMMANDFILE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#hostperfdatafile">$HOSTPERFDATAFILE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#serviceperfdatafile">$SERVICEPERFDATAFILE$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr><td colspan='9'><br></td></tr>
<tr class="Macros">
<th class="Macros">Macro Name</th>
<th class="Macros">Service Checks</th>
<th class="Macros">Service Notifications</th>
<th class="Macros">Host Checks</th>
<th class="Macros">Host Notifications</th>
<th class="Macros">Service Event Handlers and <a href="configmain.html#ocsp_command">OCSP</a></th>
<th class="Macros">Host Event Handlers and <a href="configmain.html#ochp_command">OCHP</a></th>
<th class="Macros">Service Perf Data</th>
<th class="Macros">Host Perf Data</th>
</tr>
<tr>
<td colspan='9' class='MacroType'>Misc Macros:</td>
</tr>
<tr>
<td class='MacroName'><a href="#processstarttime">$PROCESSSTARTTIME$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#eventstarttime">$EVENTSTARTTIME$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#adminemail">$ADMINEMAIL$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#adminpager">$ADMINPAGER$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#arg">$ARGn$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
<tr>
<td class='MacroName'><a href="#user">$USERn$</a></td>
<td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td><td class="MacroYes">Yes</td>
</tr>
</tbody>
</table>
</div>



## Macro Descriptions
<div class="table-container">
<table cellspacing="0" cellpadding="5">
<tbody>
<tr>
<th colspan='2' class='MacroType th-sticky'>Host Macros: <a href="#note3"><sup>3</sup></a></th>
</tr>
<tr>
<td class="MacroName"><a id="hostname">$HOSTNAME$</a></td>
<td class="MacroDescription">Short name for the host (i.e. "biglinuxbox").  This value is taken from the <i>host_name</i> directive in the <a href="objectdefinitions.html#host">host definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostdisplayname">$HOSTDISPLAYNAME$</a></td>
<td class="MacroDescription">An alternate display name for the host.  This value is taken from the <i>display_name</i> directive in the <a href="objectdefinitions.html#host">host definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostalias">$HOSTALIAS$</a></td>
<td class="MacroDescription">Long name/description for the host.  This value is taken from the <i>alias</i> directive in the <a href="objectdefinitions.html#host">host definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostaddress">$HOSTADDRESS$</a></td>
<td class="MacroDescription">Address of the host.  This value is taken from the <i>address</i> directive in the <a href="objectdefinitions.html#host">host definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="hoststate">$HOSTSTATE$</a></td>
<td class="MacroDescription">A string indicating the current state of the host ("UP", "DOWN", or "UNREACHABLE").</td>
</tr>
<tr>
<td class="MacroName"><a id="hoststateid">$HOSTSTATEID$</a></td>
<td class="MacroDescription">A number that corresponds to the current state of the host: 0=UP, 1=DOWN, 2=UNREACHABLE.</td>
</tr>
<tr>
<td class="MacroName"><a id="lasthoststate">$LASTHOSTSTATE$</a></td>
<td class="MacroDescription">A string indicating the last state of the host ("UP", "DOWN", or "UNREACHABLE").</td>
</tr>
<tr>
<td class="MacroName"><a id="lasthoststateid">$LASTHOSTSTATEID$</a></td>
<td class="MacroDescription">A number that corresponds to the last state of the host: 0=UP, 1=DOWN, 2=UNREACHABLE.</td>
</tr>
<tr>
<td class="MacroName"><a id="hoststatetype">$HOSTSTATETYPE$</a></td>
<td class="MacroDescription">A string indicating the <a href="statetypes.html">state type</a> for the current host check ("HARD" or "SOFT"). Soft states occur when host checks return a non-OK (non-UP) state and are in the process of being retried. Hard states result when host checks have been checked a specified maximum number of times.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostattempt">$HOSTATTEMPT$</a></td>
<td class="MacroDescription">The number of the current host check retry. For instance, if this is the second time that the host is being rechecked, this will be the number two.  Current attempt number is really only useful when writing host event handlers for "soft" states that take a specific action based on the host retry number.</td>
</tr>
<tr>
<td class="MacroName"><a id="maxhostattempts">$MAXHOSTATTEMPTS$</a></td>
<td class="MacroDescription">The max check attempts as defined for the current host. Useful when writing host event handlers for "soft" states that take a specific action based on the host retry number.</td>
</tr>
<tr>
<td class="MacroName"><a id="hosteventid">$HOSTEVENTID$</a></td>
<td class="MacroDescription">A globally unique number associated with the host's current state.  Every time a host (or service) experiences a state change, a global event ID number is incremented by one (1).  If a host has experienced no state changes, this macro will be set to zero (0).</td>
</tr>
<tr>
<td class="MacroName"><a id="lasthosteventid">$LASTHOSTEVENTID$</a></td>
<td class="MacroDescription">The previous (globally unique) event number that was given to the host.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostproblemid">$HOSTPROBLEMID$</a></td>
<td class="MacroDescription">A globally unique UUIDv4 (e.g. 29304481-91eb-4a2f-8b6d-8858b4548741) associated with the host's current problem state.  Every time a host (or service) transitions from an UP or OK state to a problem state, a global problem UUID is generated.  This macro will be a UUID string if the host is currently a non-UP state.  State transitions between non-UP states (e.g. DOWN to UNREACHABLE) do not cause this problem id to change.  If the host is currently in an UP state, this macro will be set to an empty string.  Combined with event handlers, this macro could be used to automatically open trouble tickets when hosts first enter a problem state.</td>
</tr>
<tr>
<td class="MacroName"><a id="lasthostproblemid">$LASTHOSTPROBLEMID$</a></td>
<td class="MacroDescription">The previous (globally unique) problem UUID that was given to the host.  Combined with event handlers, this macro could be used for automatically closing trouble tickets, etc. when a host recovers to an UP state.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostlatency">$HOSTLATENCY$</a></td>
<td class="MacroDescription">A (floating point) number indicating the number of seconds that a <i>scheduled</i> host check lagged behind its scheduled check time. For instance, if a check was scheduled for 03:14:15 and it didn't get executed until 03:14:17, there would be a check latency of 2.0 seconds.  On-demand host checks have a latency of zero seconds.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostexecutiontime">$HOSTEXECUTIONTIME$</a></td>
<td class="MacroDescription">A (floating point) number indicating the number of seconds that the host check took to execute (i.e. the amount of time the check was executing).</td>
</tr>
<tr>
<td class="MacroName"><a id="hostduration">$HOSTDURATION$</a></td>
<td class="MacroDescription">A string indicating the amount of time that the host has spent in its current state.  Format is "XXh YYm ZZs", indicating hours, minutes and seconds.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostdurationsec">$HOSTDURATIONSEC$</a></td>
<td class="MacroDescription">A number indicating the number of seconds that the host has spent in its current state.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostdowntime">$HOSTDOWNTIME$</a></td>
<td class="MacroDescription">A number indicating the current "downtime depth" for the host.  If this host is currently in a period of <a href="downtime.html">scheduled downtime</a>, the value will be greater than zero.  If the host is not currently in a period of downtime, this value will be zero.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostpercentchange">$HOSTPERCENTCHANGE$</a></td>
<td class="MacroDescription">A (floating point) number indicating the percent state change the host has undergone.  Percent state change is used by the <a href="flapping.html">flap detection</a> algorithm.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostgroupname">$HOSTGROUPNAME$</a></td>
<td class="MacroDescription">The short name of the hostgroup that this host belongs to.  This value is taken from the <i>hostgroup_name</i> directive in the <a href="objectdefinitions.html#hostgroup">hostgroup definition</a>.  If the host belongs to more than one hostgroup this macro will contain the name of just one of them.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostgroupnames">$HOSTGROUPNAMES$</a></td>
<td class="MacroDescription">A comma separated list of the short names of all the hostgroups that this host belongs to.</td>
</tr>
<tr>
<td class="MacroName"><a id="lasthostcheck">$LASTHOSTCHECK$</a></td>
<td class="MacroDescription">This is a timestamp in time_t format (seconds since the UNIX epoch) indicating the time at which a check of the host was last performed.</td>
</tr>
<tr>
<td class="MacroName"><a id="lasthoststatechange">$LASTHOSTSTATECHANGE$</a></td>
<td class="MacroDescription">This is a timestamp in time_t format (seconds since the UNIX epoch) indicating the time the host last changed state.</td>
</tr>
<tr>
<td class="MacroName"><a id="lasthostup">$LASTHOSTUP$</a></td>
<td class="MacroDescription">This is a timestamp in time_t format (seconds since the UNIX epoch) indicating the time at which the host was last detected as being in an UP state.</td>
</tr>
<tr>
<td class="MacroName"><a id="lasthostdown">$LASTHOSTDOWN$</a></td>
<td class="MacroDescription">This is a timestamp in time_t format (seconds since the UNIX epoch) indicating the time at which the host was last detected as being in a DOWN state.</td>
</tr>
<tr>
<td class="MacroName"><a id="lasthostunreachable">$LASTHOSTUNREACHABLE$</a></td>
<td class="MacroDescription">This is a timestamp in time_t format (seconds since the UNIX epoch) indicating the time at which the host was last detected as being in an UNREACHABLE state.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostoutput">$HOSTOUTPUT$</a></td>
<td class="MacroDescription">The first line of text output from the last host check (i.e. "Ping OK").</td>
</tr>
<tr>
<td class="MacroName"><a id="longhostoutput">$LONGHOSTOUTPUT$</a></td>
<td class="MacroDescription">The full text output (aside from the first line) from the last host check.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostperfdata">$HOSTPERFDATA$</a></td>
<td class="MacroDescription">This macro contains any <a href="perfdata.html">performance data</a> that may have been returned by the last host check.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostcheckcommand">$HOSTCHECKCOMMAND$</a></td>
<td class="MacroDescription">This macro contains the name of the command (along with any arguments passed to it) used to perform the host check.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostackauthor">$HOSTACKAUTHOR$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroDescription">A string containing the name of the user who acknowledged the host problem.  This macro is only valid in notifications where the $NOTIFICATIONTYPE$ macro is set to "ACKNOWLEDGEMENT".</td>
</tr>
<tr>
<td class="MacroName"><a id="hostackauthorname">$HOSTACKAUTHORNAME$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroDescription">A string containing the short name of the contact (if applicable) who acknowledged the host problem.  This macro is only valid in notifications where the $NOTIFICATIONTYPE$ macro is set to "ACKNOWLEDGEMENT".</td>
</tr>
<tr>
<td class="MacroName"><a id="hostackauthoralias">$HOSTACKAUTHORALIAS$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroDescription">A string containing the alias of the contact (if applicable) who acknowledged the host problem.  This macro is only valid in notifications where the $NOTIFICATIONTYPE$ macro is set to "ACKNOWLEDGEMENT".</td>
</tr>
<tr>
<td class="MacroName"><a id="hostackcomment">$HOSTACKCOMMENT$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroDescription">A string containing the acknowledgement comment that was entered by the user who acknowledged the host problem.  This macro is only valid in notifications where the $NOTIFICATIONTYPE$ macro is set to "ACKNOWLEDGEMENT".</td>
</tr>
<tr>
<td class="MacroName"><a id="hostactionurl">$HOSTACTIONURL$</a></td>
<td class="MacroDescription">Action URL for the host.  This macro may contain other macros (e.g. $HOSTNAME$), which can be useful when you want to pass the host name to a web page.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostnotesurl">$HOSTNOTESURL$</a></td>
<td class="MacroDescription">Notes URL for the host.  This macro may contain other macros (e.g. $HOSTNAME$), which can be useful when you want to pass the host name to a web page.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostnotes">$HOSTNOTES$</a></td>
<td class="MacroDescription">Notes for the host.  This macro may contain other macros (e.g. $HOSTNAME$), which can be useful when you want to host-specific status information, etc. in the description.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalhostservices">$TOTALHOSTSERVICES$</a></td>
<td class="MacroDescription">The total number of services associated with the host.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalhostservicesok">$TOTALHOSTSERVICESOK$</a></td>
<td class="MacroDescription">The total number of services associated with the host that are in an OK state.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalhostserviceswarning">$TOTALHOSTSERVICESWARNING$</a></td>
<td class="MacroDescription">The total number of services associated with the host that are in a WARNING state.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalhostservicesunknown">$TOTALHOSTSERVICESUNKNOWN$</a></td>
<td class="MacroDescription">The total number of services associated with the host that are in an UNKNOWN state.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalhostservicescritical">$TOTALHOSTSERVICESCRITICAL$</a></td>
<td class="MacroDescription">The total number of services associated with the host that are in a CRITICAL state.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostproblemstart">$HOSTPROBLEMSTART$</a></td>
<td class="MacroDescription">This is a timestamp in time_t format (seconds since the UNIX epoch) indicating the time at which the host state changed into a non-Up state.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostproblemend">$HOSTPROBLEMEND$</a></td>
<td class="MacroDescription">This is a timestamp in time_t format (seconds since the UNIX epoch) indicating the time at which the host state changed changed back into Up state.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostproblemdurationsec">$HOSTPROBLEMDURATIONSEC$</a></td>
<td class="MacroDescription">The duration in seconds between $HOSTPROBLEMSTART$ and $HOSTPROBLEMEND$.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostproblemduration">$HOSTPROBLEMDURATION$</a></td>
<td class="MacroDescription">The duration between $HOSTPROBLEMSTART$ and $HOSTPROBLEMEND$ in a human readable format e.g.: 1d 10h 8m 35s</td>
</tr>
<tr><td colspan='2'><br></td></tr>
<tr>
<th colspan='2' class='MacroType th-sticky'>Host Group Macros: <a href="#note5"><sup>5</sup></a></th>
</tr>
<tr>
<td class="MacroName"><a id="hostgroupalias">$HOSTGROUPALIAS$</a> <a href="#note5"><sup>5</sup></a></td>
<td class="MacroDescription">The long name / alias of either 1) the hostgroup name passed as an on-demand macro argument or 2) the primary hostgroup associated with the current host (if not used in the context of an on-demand macro). This value is taken from the <i>alias</i> directive in the <a href="objectdefinitions.html#hostgroup">hostgroup definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostgroupmembers">$HOSTGROUPMEMBERS$</a> <a href="#note5"><sup>5</sup></a></td>
<td class="MacroDescription">A comma-separated list of all hosts that belong to either 1) the hostgroup name passed as an on-demand macro argument or 2) the primary hostgroup associated with the current host (if not used in the context of an on-demand macro).</td>
</tr>
<tr>
<td class="MacroName"><a id="hostgroupnotes">$HOSTGROUPNOTES$</a> <a href="#note5"><sup>5</sup></a></td>
<td class="MacroDescription">The notes associated with either 1) the hostgroup name passed as an on-demand macro argument or 2) the primary hostgroup associated with the current host (if not used in the context of an on-demand macro). This value is taken from the <i>notes</i> directive in the <a href="objectdefinitions.html#hostgroup">hostgroup definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostgroupnotesurl">$HOSTGROUPNOTESURL$</a> <a href="#note5"><sup>5</sup></a></td>
<td class="MacroDescription">The notes URL associated with either 1) the hostgroup name passed as an on-demand macro argument or 2) the primary hostgroup associated with the current host (if not used in the context of an on-demand macro). This value is taken from the <i>notes_url</i> directive in the <a href="objectdefinitions.html#hostgroup">hostgroup definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostgroupactionurl">$HOSTGROUPACTIONURL$</a> <a href="#note5"><sup>5</sup></a></td>
<td class="MacroDescription">The action URL associated with either 1) the hostgroup name passed as an on-demand macro argument or 2) the primary hostgroup associated with the current host (if not used in the context of an on-demand macro). This value is taken from the <i>action_url</i> directive in the <a href="objectdefinitions.html#hostgroup">hostgroup definition</a>.</td>
</tr>
<tr><td colspan='2'><br></td></tr>
<tr>
<th colspan='2' class='MacroType th-sticky'>Service Macros:</th>
</tr>
<tr>
<td class="MacroName"><a id="servicedesc">$SERVICEDESC$</a></td>
<td class="MacroDescription">The long name/description of the service (i.e. "Main Website").  This value is taken from the <i>service_description</i> directive of the <a href="objectdefinitions.html#service">service definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicedisplayname">$SERVICEDISPLAYNAME$</a></td>
<td class="MacroDescription">An alternate display name for the service.  This value is taken from the <i>display_name</i> directive in the <a href="objectdefinitions.html#service">service definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicestate">$SERVICESTATE$</a></td>
<td class="MacroDescription">A string indicating the current state of the service ("OK", "WARNING", "UNKNOWN", or "CRITICAL").</td>
</tr>
<tr>
<td class="MacroName"><a id="servicestateid">$SERVICESTATEID$</a></td>
<td class="MacroDescription">A number that corresponds to the current state of the service: 0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN.</td>
</tr>
<tr>
<td class="MacroName"><a id="lastservicestate">$LASTSERVICESTATE$</a></td>
<td class="MacroDescription">A string indicating the last state of the service ("OK", "WARNING", "UNKNOWN", or "CRITICAL").</td>
</tr>
<tr>
<td class="MacroName"><a id="lastservicestateid">$LASTSERVICESTATEID$</a></td>
<td class="MacroDescription">A number that corresponds to the last state of the service: 0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicestatetype">$SERVICESTATETYPE$</a></td>
<td class="MacroDescription">A string indicating the <a href="statetypes.html">state type</a> for the current service check ("HARD" or "SOFT"). Soft states occur when service checks return a non-OK state and are in the process of being retried. Hard states result when service checks have been checked a specified maximum number of times.</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceattempt">$SERVICEATTEMPT$</a></td>
<td class="MacroDescription">The number of the current service check retry. For instance, if this is the second time that the service is being rechecked, this will be the number two. Current attempt number is really only useful when writing service event handlers for "soft" states that take a specific action based on the service retry number.</td>
</tr>
<tr>
<td class="MacroName"><a id="maxserviceattempts">$MAXSERVICEATTEMPTS$</a></td>
<td class="MacroDescription">The max check attempts as defined for the current service. Useful when writing host event handlers for "soft" states that take a specific action based on the service retry number.</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceisvolatile">$SERVICEISVOLATILE$</a></td>
<td class="MacroDescription">Indicates whether the service is marked as being volatile or not: 0 = not volatile, 1 = volatile.</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceeventid">$SERVICEEVENTID$</a></td>
<td class="MacroDescription">A globally unique number associated with the service's current state.  Every time a a service (or host) experiences a state change, a global event ID number is incremented by one (1).  If a service has experienced no state changes, this macro will be set to zero (0).</td>
</tr>
<tr>
<td class="MacroName"><a id="lastserviceeventid">$LASTSERVICEEVENTID$</a></td>
<td class="MacroDescription">The previous (globally unique) event number that given to the service.</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceproblemid">$SERVICEPROBLEMID$</a></td>
<td class="MacroDescription">A globally unique UUIDv4 (e.g. 39dbb346-f483-49fe-8211-feec8edf90ea) associated with the service's current problem state.  Every time a service (or host) transitions from an OK or UP state to a problem state, a global problem UUID is generated.  This macro will be a UUID if the service is currently a non-OK state.  State transitions between non-OK states (e.g. WARNING to CRITICAL) do not cause this problem id to change.  If the service is currently in an OK state, this macro will be set to an empty string.  Combined with event handlers, this macro could be used to automatically open trouble tickets when services first enter a problem state.</td>
</tr>
<tr>
<td class="MacroName"><a id="lastserviceproblemid">$LASTSERVICEPROBLEMID$</a></td>
<td class="MacroDescription">The previous (globally unique) problem UUID that was given to the service.  Combined with event handlers, this macro could be used for automatically closing trouble tickets, etc. when a service recovers to an OK state.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicelatency">$SERVICELATENCY$</a></td>
<td class="MacroDescription">A (floating point) number indicating the number of seconds that a scheduled service check lagged behind its scheduled check time. For instance, if a check was scheduled for 03:14:15 and it didn't get executed until 03:14:17, there would be a check latency of 2.0 seconds.</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceexecutiontime">$SERVICEEXECUTIONTIME$</a></td>
<td class="MacroDescription">A (floating point) number indicating the number of seconds that the service check took to execute (i.e. the amount of time the check was executing).</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceduration">$SERVICEDURATION$</a></td>
<td class="MacroDescription">A string indicating the amount of time that the service has spent in its current state. Format is "XXh YYm ZZs", indicating hours, minutes and seconds.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicedurationsec">$SERVICEDURATIONSEC$</a></td>
<td class="MacroDescription">A number indicating the number of seconds that the service has spent in its current state.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicedowntime">$SERVICEDOWNTIME$</a></td>
<td class="MacroDescription">A number indicating the current "downtime depth" for the service. If this service is currently in a period of <a href="downtime.html">scheduled downtime</a>, the value will be greater than zero. If the service is not currently in a period of downtime, this value will be zero.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicepercentchange">$SERVICEPERCENTCHANGE$</a></td>
<td class="MacroDescription">A (floating point) number indicating the percent state change the service has undergone. Percent state change is used by the <a href="flapping.html">flap detection</a> algorithm.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicegroupname">$SERVICEGROUPNAME$</a></td>
<td class="MacroDescription">The short name of the servicegroup that this service belongs to. This value is taken from the <i>servicegroup_name</i> directive in the <a href="objectdefinitions.html#servicegroup">servicegroup</a> definition. If the service belongs to more than one servicegroup this macro will contain the name of just one of them.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicegroupnames">$SERVICEGROUPNAMES$</a></td>
<td class="MacroDescription">A comma separated list of the short names of all the servicegroups that this service belongs to.</td>
</tr>
<tr>
<td class="MacroName"><a id="lastservicecheck">$LASTSERVICECHECK$</a></td>
<td class="MacroDescription">This is a timestamp in time_t format (seconds since the UNIX epoch) indicating the time at which a check of the service was last performed.</td>
</tr>
<tr>
<td class="MacroName"><a id="lastservicestatechange">$LASTSERVICESTATECHANGE$</a></td>
<td class="MacroDescription">This is a timestamp in time_t format (seconds since the UNIX epoch) indicating the time the service last changed state.</td>
</tr>
<tr>
<td class="MacroName"><a id="lastserviceok">$LASTSERVICEOK$</a></td>
<td class="MacroDescription">This is a timestamp in time_t format (seconds since the UNIX epoch) indicating the time at which the service was last detected as being in an OK state.</td>
</tr>
<tr>
<td class="MacroName"><a id="lastservicewarning">$LASTSERVICEWARNING$</a></td>
<td class="MacroDescription">This is a timestamp in time_t format (seconds since the UNIX epoch) indicating the time at which the service was last detected as being in a WARNING state.</td>
</tr>
<tr>
<td class="MacroName"><a id="lastserviceunknown">$LASTSERVICEUNKNOWN$</a></td>
<td class="MacroDescription">This is a timestamp in time_t format (seconds since the UNIX epoch) indicating the time at which the service was last detected as being in an UNKNOWN state.</td>
</tr>
<tr>
<td class="MacroName"><a id="lastservicecritical">$LASTSERVICECRITICAL$</a></td>
<td class="MacroDescription">This is a timestamp in time_t format (seconds since the UNIX epoch) indicating the time at which the service was last detected as being in a CRITICAL state.</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceoutput">$SERVICEOUTPUT$</a></td>
<td class="MacroDescription">The first line of text output from the last service check (i.e. "Ping OK").</td>
</tr>
<tr>
<td class="MacroName"><a id="longserviceoutput">$LONGSERVICEOUTPUT$</a></td>
<td class="MacroDescription">The full text output (aside from the first line) from the last service check.</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceperfdata">$SERVICEPERFDATA$</a></td>
<td class="MacroDescription">This macro contains any <a href="perfdata.html">performance data</a> that may have been returned by the last service check.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicecheckcommand">$SERVICECHECKCOMMAND$</a></td>
<td class="MacroDescription">This macro contains the name of the command (along with any arguments passed to it) used to perform the service check.</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceackauthor">$SERVICEACKAUTHOR$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroDescription">A string containing the name of the user who acknowledged the service problem. This macro is only valid in notifications where the $NOTIFICATIONTYPE$ macro is set to "ACKNOWLEDGEMENT".</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceackauthorname">$SERVICEACKAUTHORNAME$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroDescription">A string containing the short name of the contact (if applicable) who acknowledged the service problem. This macro is only valid in notifications where the $NOTIFICATIONTYPE$ macro is set to "ACKNOWLEDGEMENT".</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceackauthoralias">$SERVICEACKAUTHORALIAS$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroDescription">A string containing the alias of the contact (if applicable) who acknowledged the service problem. This macro is only valid in notifications where the $NOTIFICATIONTYPE$ macro is set to "ACKNOWLEDGEMENT".</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceackcomment">$SERVICEACKCOMMENT$</a> <a href="#note8"><sup>8</sup></a></td>
<td class="MacroDescription">A string containing the acknowledgement comment that was entered by the user who acknowledged the service problem. This macro is only valid in notifications where the $NOTIFICATIONTYPE$ macro is set to "ACKNOWLEDGEMENT".</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceactionurl">$SERVICEACTIONURL$</a></td>
<td class="MacroDescription">Action URL for the service.  This macro may contain other macros (e.g. $HOSTNAME$ or $SERVICEDESC$), which can be useful when you want to pass the service name to a web page.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicenotesurl">$SERVICENOTESURL$</a></td>
<td class="MacroDescription">Notes URL for the service.  This macro may contain other macros (e.g. $HOSTNAME$ or $SERVICEDESC$), which can be useful when you want to pass the service name to a web page.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicenotes">$SERVICENOTES$</a></td>
<td class="MacroDescription">Notes for the service.  This macro may contain other macros (e.g. $HOSTNAME$ or $SERVICESTATE$), which can be useful when you want to service-specific status information, etc. in the description</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceproblemstart">$SERVICEPROBLEMSTART$</a></td>
<td class="MacroDescription">This is a timestamp in time_t format (seconds since the UNIX epoch) indicating the time at which the service state changed into a non-Ok state.</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceproblemend">$SERVICEPROBLEMEND$</a></td>
<td class="MacroDescription">This is a timestamp in time_t format (seconds since the UNIX epoch) indicating the time at which the service state changed changed back into Ok state.</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceproblemdurationsec">$SERVICEPROBLEMDURATIONSEC$</a></td>
<td class="MacroDescription">The duration in seconds between $SERVICEPROBLEMSTART$ and $SERVICEPROBLEMEND$.</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceproblemduration">$SERVICEPROBLEMDURATION$</a></td>
<td class="MacroDescription">The duration between $SERVICEPROBLEMSTART$ and $SERVICEPROBLEMEND$ in a human readable format e.g.: 1d 10h 8m 35s</td>
</tr>
<tr><td colspan='2'><br></td></tr>
<tr>
<th colspan='2' class='MacroType th-sticky'>Service Group Macros: <a href="#note6"><sup>6</sup></a></th>
</tr>
<tr>
<td class="MacroName"><a id="servicegroupalias">$SERVICEGROUPALIAS$</a> <a href="#note6"><sup>6</sup></a></td>
<td class="MacroDescription">The long name / alias of either 1) the servicegroup name passed as an on-demand macro argument or 2) the primary servicegroup associated with the current service (if not used in the context of an on-demand macro). This value is taken from the <i>alias</i> directive in the <a href="objectdefinitions.html#servicegroup">servicegroup definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicegroupmembers">$SERVICEGROUPMEMBERS$</a> <a href="#note6"><sup>6</sup></a></td>
<td class="MacroDescription">A comma-separated list of all services that belong to either 1) the servicegroup name passed as an on-demand macro argument or 2) the primary servicegroup associated with the current service (if not used in the context of an on-demand macro).</td>
</tr>
<tr>
<td class="MacroName"><a id="servicegroupnotes">$SERVICEGROUPNOTES$</a> <a href="#note6"><sup>6</sup></a></td>
<td class="MacroDescription">The notes associated with either 1) the servicegroup name passed as an on-demand macro argument or 2) the primary servicegroup associated with the current service (if not used in the context of an on-demand macro). This value is taken from the <i>notes</i> directive in the <a href="objectdefinitions.html#servicegroup">servicegroup definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicegroupnotesurl">$SERVICEGROUPNOTESURL$</a> <a href="#note6"><sup>6</sup></a></td>
<td class="MacroDescription">The notes URL associated with either 1) the servicegroup name passed as an on-demand macro argument or 2) the primary servicegroup associated with the current service (if not used in the context of an on-demand macro). This value is taken from the <i>notes_url</i> directive in the <a href="objectdefinitions.html#servicegroup">servicegroup definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicegroupactionurl">$SERVICEGROUPNOTES$</a> <a href="#note6"><sup>6</sup></a></td>
<td class="MacroDescription">The action URL associated with either 1) the servicegroup name passed as an on-demand macro argument or 2) the primary servicegroup associated with the current service (if not used in the context of an on-demand macro). This value is taken from the <i>action_url</i> directive in the <a href="objectdefinitions.html#servicegroup">servicegroup definition</a>.</td>
</tr>
<tr><td colspan='2'><br></td></tr>
<tr>
<th colspan='2' class='MacroType th-sticky'>Contact Macros:</th>
</tr>
<tr>
<td class="MacroName"><a id="contactname">$CONTACTNAME$</a></td>
<td class="MacroDescription">Short name for the contact (i.e. "jdoe") that is being notified of a host or service problem.  This value is taken from the <i>contact_name</i> directive in the <a href="objectdefinitions.html#contact">contact definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="contactalias">$CONTACTALIAS$</a></td>
<td class="MacroDescription">Long name/description for the contact (i.e. "John Doe") being notified.  This value is taken from the <i>alias</i> directive in the <a href="objectdefinitions.html#contact">contact definition</a>.</td></tr>
<tr>
<td class="MacroName"><a id="contactemail">$CONTACTEMAIL$</a></td>
<td class="MacroDescription">Email address of the contact being notified.  This value is taken from the <i>email</i> directive in the <a href="objectdefinitions.html#contact">contact definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="contactpager">$CONTACTPAGER$</a></td>
<td class="MacroDescription">Pager number/address of the contact being notified.  This value is taken from the <i>pager</i> directive in the <a href="objectdefinitions.html#contact">contact definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="contactaddress">$CONTACTADDRESSn$</a></td>
<td class="MacroDescription">Address of the contact being notified.  Each contact can have six different addresses (in addition to email address and pager number).  The macros for these addresses are $CONTACTADDRESS1$ - $CONTACTADDRESS6$.  This value is taken from the <i>addressx</i> directive in the <a href="objectdefinitions.html#contact">contact definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="contactgroupname">$CONTACTGROUPNAME$</a></td>
<td class="MacroDescription">The short name of the contactgroup that this contact is a member of. This value is taken from the <i>contactgroup_name</i> directive in the <a href="objectdefinitions.html#contactgroup">contactgroup</a> definition. If the contact belongs to more than one contactgroup this macro will contain the name of just one of them.</td>
</tr>
<tr>
<td class="MacroName"><a id="contactgroupnames">$CONTACTGROUPNAMES$</a></td>
<td class="MacroDescription">A comma separated list of the short names of all the contactgroups that this contact is a member of.</td>
</tr>
<tr><td colspan='2'><br></td></tr>
<tr>
<th colspan='2' class='MacroType th-sticky'>Contact Group Macros: <a href="#note5"><sup>5</sup></a></th>
</tr>
<tr>
<td class="MacroName"><a id="contactgroupalias">$CONTACTGROUPALIAS$</a> <a href="#note7"><sup>7</sup></a></td>
<td class="MacroDescription">The long name / alias of either 1) the contactgroup name passed as an on-demand macro argument or 2) the primary contactgroup associated with the current contact (if not used in the context of an on-demand macro). This value is taken from the <i>alias</i> directive in the <a href="objectdefinitions.html#contactgroup">contactgroup definition</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="contactgroupmembers">$CONTACTGROUPMEMBERS$</a> <a href="#note7"><sup>7</sup></a></td>
<td class="MacroDescription">A comma-separated list of all contacts that belong to either 1) the contactgroup name passed as an on-demand macro argument or 2) the primary contactgroup associated with the current contact (if not used in the context of an on-demand macro).</td>
</tr>
<tr><td colspan='2'><br></td></tr>
<tr>
<th colspan='2' class='MacroType th-sticky'>SUMMARY Macros:</th>
</tr>
<tr>
<td class="MacroName"><a id="totalhostsup">$TOTALHOSTSUP$</a></td>
<td class="MacroDescription">This macro reflects the total number of hosts that are currently in an UP state.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalhostsdown">$TOTALHOSTSDOWN$</a></td>
<td class="MacroDescription">This macro reflects the total number of hosts that are currently in a DOWN state.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalhostsunreachable">$TOTALHOSTSUNREACHABLE$</a></td>
<td class="MacroDescription">This macro reflects the total number of hosts that are currently in an UNREACHABLE state.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalhostsdownunhandled">$TOTALHOSTSDOWNUNHANDLED$</a></td>
<td class="MacroDescription">This macro reflects the total number of hosts that are currently in a DOWN state that are not currently being "handled".  Unhandled host problems are those that are not acknowledged, are not currently in scheduled downtime, and for which checks are currently enabled.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalhostsunreachableunhandled">$TOTALHOSTSUNREACHABLEUNHANDLED$</a></td>
<td class="MacroDescription">This macro reflects the total number of hosts that are currently in an UNREACHABLE state that are not currently being "handled".  Unhandled host problems are those that are not acknowledged, are not currently in scheduled downtime, and for which checks are currently enabled.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalhostproblems">$TOTALHOSTPROBLEMS$</a></td>
<td class="MacroDescription">This macro reflects the total number of hosts that are currently either in a DOWN or an UNREACHABLE state.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalhostproblemsunhandled">$TOTALHOSTPROBLEMSUNHANDLED$</a></td>
<td class="MacroDescription">This macro reflects the total number of hosts that are currently either in a DOWN or an UNREACHABLE state that are not currently being "handled".  Unhandled host problems are those that are not acknowledged, are not currently in scheduled downtime, and for which checks are currently enabled.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalservicesok">$TOTALSERVICESOK$</a></td>
<td class="MacroDescription">This macro reflects the total number of services that are currently in an OK state.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalserviceswarning">$TOTALSERVICESWARNING$</a></td>
<td class="MacroDescription">This macro reflects the total number of services that are currently in a WARNING state.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalservicescritical">$TOTALSERVICESCRITICAL$</a></td>
<td class="MacroDescription">This macro reflects the total number of services that are currently in a CRITICAL state.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalservicesunknown">$TOTALSERVICESUNKNOWN$</a></td>
<td class="MacroDescription">This macro reflects the total number of services that are currently in an UNKNOWN state.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalserviceswarningunhandled">$TOTALSERVICESWARNINGUNHANDLED$</a></td>
<td class="MacroDescription">This macro reflects the total number of services that are currently in a WARNING state that are not currently being "handled".  Unhandled services problems are those that are not acknowledged, are not currently in scheduled downtime, and for which checks are currently enabled.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalservicescriticalunhandled">$TOTALSERVICESCRITICALUNHANDLED$</a></td>
<td class="MacroDescription">This macro reflects the total number of services that are currently in a CRITICAL state that are not currently being "handled".  Unhandled services problems are those that are not acknowledged, are not currently in scheduled downtime, and for which checks are currently enabled.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalservicesunknownunhandled">$TOTALSERVICESUNKNOWNUNHANDLED$</a></td>
<td class="MacroDescription">This macro reflects the total number of services that are currently in an UNKNOWN state that are not currently being "handled".  Unhandled services problems are those that are not acknowledged, are not currently in scheduled downtime, and for which checks are currently enabled.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalserviceproblems">$TOTALSERVICEPROBLEMS$</a></td>
<td class="MacroDescription">This macro reflects the total number of services that are currently either in a WARNING, CRITICAL, or UNKNOWN state.</td>
</tr>
<tr>
<td class="MacroName"><a id="totalserviceproblemsunhandled">$TOTALSERVICEPROBLEMSUNHANDLED$</a></td>
<td class="MacroDescription">This macro reflects the total number of services that are currently either in a WARNING, CRITICAL, or UNKNOWN state that are not currently being "handled".  Unhandled services problems are those that are not acknowledged, are not currently in scheduled downtime, and for which checks are currently enabled.</td>
</tr>
<tr><td colspan='2'><br></td></tr>
<tr>
<th colspan='2' class='MacroType th-sticky'>Notification Macros:</th>
</tr>
<tr>
<td class="MacroName"><a id="notificationtype">$NOTIFICATIONTYPE$</a></td>
<td class="MacroDescription">A string identifying the type of notification that is being sent ("PROBLEM", "RECOVERY", "ACKNOWLEDGEMENT", "FLAPPINGSTART", "FLAPPINGSTOP", "FLAPPINGDISABLED", "DOWNTIMESTART", "DOWNTIMEEND", or "DOWNTIMECANCELLED").</td>
</tr>
<tr>
<td class="MacroName"><a id="notificationrecipients">$NOTIFICATIONRECIPIENTS$</a></td>
<td class="MacroDescription">A comma-separated list of the short names of all contacts that are being notified about the host or service.</td>
</tr>
<tr>
<td class="MacroName"><a id="notificationisescalated">$NOTIFICATIONISESCALATED$</a></td>
<td class="MacroDescription">An integer indicating whether this was sent to normal contacts for the host or service or if it was escalated. 0 = Normal (non-escalated) notification , 1 = Escalated notification.</td>
</tr>
<tr>
<td class="MacroName"><a id="notificationauthor">$NOTIFICATIONAUTHOR$</a></td>
<td class="MacroDescription">A string containing the name of the user who authored the notification.  If the $NOTIFICATIONTYPE$ macro is set to "DOWNTIMESTART" or "DOWNTIMEEND", this will be the name of the user who scheduled downtime for the host or service.  If the $NOTIFICATIONTYPE$ macro is "ACKNOWLEDGEMENT", this will be the name of the user who acknowledged the host or service problem.  If the $NOTIFICATIONTYPE$ macro is "CUSTOM", this will be name of the user who initiated the custom host or service notification.
</td>
</tr>
<tr>
<td class="MacroName"><a id="notificationauthorname">$NOTIFICATIONAUTHORNAME$</a></td>
<td class="MacroDescription">A string containing the short name of the contact (if applicable) specified in the $NOTIFICATIONAUTHOR$ macro.</td>
</tr>
<tr>
<td class="MacroName"><a id="notificationauthoralias">$NOTIFICATIONAUTHORALIAS$</a></td>
<td class="MacroDescription">A string containing the alias of the contact (if applicable) specified in the $NOTIFICATIONAUTHOR$ macro.</td>
</tr>
<tr>
<td class="MacroName"><a id="notificationcomment">$NOTIFICATIONCOMMENT$</a></td>
<td class="MacroDescription">A string containing the comment that was entered by the notification author.    If the $NOTIFICATIONTYPE$ macro is set to "DOWNTIMESTART" or "DOWNTIMEEND", this will be the comment entered by the user who scheduled downtime for the host or service.  If the $NOTIFICATIONTYPE$ macro is "ACKNOWLEDGEMENT", this will be the comment entered by the user who acknowledged the host or service problem.  If the $NOTIFICATIONTYPE$ macro is "CUSTOM", this will be comment entered by the user who initiated the custom host or service notification.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostnotificationnumber">$HOSTNOTIFICATIONNUMBER$</a></td>
<td class="MacroDescription">The current notification number for the host.  The notification number increases by one (1) each time a new notification is sent out for the host (except for acknowledgements).  The notification number is reset to 0 when the host recovers (<i>after</i> the recovery notification has gone out).  acknowledgements do not cause the notification number to increase, nor do notifications dealing with flap detection or scheduled downtime.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostnotificationid">$HOSTNOTIFICATIONID$</a></td>
<td class="MacroDescription">A unique UUIDv4 (e.g. 3a07d4f2-575e-413b-8166-9ccdd22d418a) identifying a host notification.  Notification UUID strings are unique across both hosts and service notifications, so you could potentially use this unique string as a primary key in a notification database.  Notification UUIDs should remain unique across restarts of the Naemon process, so long as you have state retention enabled.  The notification UUID is generated each time a new host notification is sent out, and the same regardless of how many contacts are notified.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicenotificationnumber">$SERVICENOTIFICATIONNUMBER$</a></td>
<td class="MacroDescription">The current notification number for the service.  The notification number increases by one (1) each time a new notification is sent out for the service (except for acknowledgements).  The notification number is reset to 0 when the service recovers (<i>after</i> the recovery notification has gone out).  acknowledgements do not cause the notification number to increase, nor do notifications dealing with flap detection or scheduled downtime.</td>
</tr>
<tr>
<td class="MacroName"><a id="servicenotificationid">$SERVICENOTIFICATIONID$</a></td>
<td class="MacroDescription">A unique UUIDv4 (e.g. cebd5487-538f-4f5b-87cc-8e18b4e2170c) identifying a service notification.  Notification UUID strings are unique across both hosts and service notifications, so you could potentially use this unique string as a primary key in a notification database.  Notification UUIDs should remain unique across restarts of the Naemon process, so long as you have state retention enabled.  The notification UUID is generated each time a new service notification is sent out, and the same regardless of how many contacts are notified.</td>
</tr>
<tr><td colspan='2'><br></td></tr>
<tr>
<th colspan='2' class='MacroType th-sticky'>Date/Time Macros:</th>
</tr>
<tr>
<td class="MacroName"><a id="longdatetime">$LONGDATETIME$</a></td>
<td class="MacroDescription">Current date/time stamp (i.e. <i>Fri Oct 13 00:30:28 CDT 2000</i>).  Format of date is determined by <a href="configmain.html#date_format">date_format</a> directive.</td>
</tr>
<tr>
<td class="MacroName"><a id="shortdatetime">$SHORTDATETIME$</a></td>
<td class="MacroDescription">Current date/time stamp (i.e. <i>10-13-2000 00:30:28</i>).  Format of date is determined by <a href="configmain.html#date_format">date_format</a> directive.</td>
</tr>
<tr>
<td class="MacroName"><a id="date">$DATE$</a></td>
<td class="MacroDescription">Date stamp (i.e. <i>10-13-2000</i>).  Format of date is determined by <a href="configmain.html#date_format">date_format</a> directive.</td>
</tr>
<tr>
<td class="MacroName"><a id="time">$TIME$</a></td>
<td class="MacroDescription">Current time stamp (i.e. <i>00:30:28</i>).</td>
</tr>
<tr>
<td class="MacroName"><a id="timet">$TIMET$</a></td>
<td class="MacroDescription">Current time stamp in time_t format (seconds since the UNIX epoch).</td>
</tr>
<tr>
<td class="MacroName"><a id="isvalidtime">$ISVALIDTIME:$</a> <a href="#note9"><sup>9</sup></a></td>
<td class="MacroDescription">
<p>
This is a special on-demand macro that returns a 1 or 0 depending on whether or not a particular time is valid within a specified timeperiod.  There are two ways of using this macro:
</p>
<ol>
<li><strong>$ISVALIDTIME:24x7$</strong> will be set to "1" if the current time is valid within the "24x7" timeperiod.  If not, it will be set to "0".</li>
<li><strong>$ISVALIDTIME:24x7:<i>timestamp</i>$</strong> will be set to "1" if the time specified by the "timestamp" argument (which must be in time_t format) is valid within the "24x7" timeperiod.  If not, it will be set to "0".</li>
</ol>
</td>
</tr>
<tr>
<td class="MacroName"><a id="nextvalidtime">$NEXTVALIDTIME:$</a> <a href="#note9"><sup>9</sup></a></td>
<td class="MacroDescription">
<p>
This is a special on-demand macro that returns the next valid time (in time_t format) for a specified timeperiod.  There are two ways of using this macro:
</p>
<ol>
<li><strong>$NEXTVALIDTIME:24x7$</strong> will return the next valid time - from and including the current time - in the "24x7" timeperiod.</li>
<li><strong>$NEXTVALIDTIME:24x7:<i>timestamp</i>$</strong> will return the next valid time - from and including the time specified by the "timestamp" argument (which must be specified in time_t format) - in the "24x7" timeperiod.</li>
</ol>
<p>
If a next valid time cannot be found in the specified timeperiod, the macro will be set to "0".
</p>
</td>
</tr>
<tr><td colspan='2'><br></td></tr>
<tr>
<th colspan='2' class='MacroType th-sticky'>File Macros:</th>
</tr>
<tr>
<td class="MacroName"><a id="mainconfigfile">$MAINCONFIGFILE$</a></td>
<td class="MacroDescription">The location of the <a href="configmain.html">main config file</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="statusdatafile">$STATUSDATAFILE$</a></td>
<td class="MacroDescription">The location of the <a href="configmain.html#status_file">status data file</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="commentdatafile">$COMMENTDATAFILE$</a></td>
<td class="MacroDescription">The location of the comment data file.</td>
</tr>
<tr>
<td class="MacroName"><a id="downtimedatafile">$DOWNTIMEDATAFILE$</a></td>
<td class="MacroDescription">The location of the downtime data file.</td>
</tr>
<tr>
<td class="MacroName"><a id="retentiondatafile">$RETENTIONDATAFILE$</a></td>
<td class="MacroDescription">The location of the <a href="configmain.html#state_retention_file">retention data file</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="objectcachefile">$OBJECTCACHEFILE$</a></td>
<td class="MacroDescription">The location of the <a href="configmain.html#object_cache_file">object cache file</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="tempfile">$TEMPFILE$</a></td>
<td class="MacroDescription">The location of the <a href="configmain.html#temp_file">temp file</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="temppath">$TEMPPATH$</a></td>
<td class="MacroDescription">The directory specified by the <a href="configmain.html#temp_path">temp path</a> variable.</td>
</tr>
<tr>
<td class="MacroName"><a id="logfile">$LOGFILE$</a></td>
<td class="MacroDescription">The location of the <a href="configmain.html#log_file">log file</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="resourcefile">$RESOURCEFILE$</a></td>
<td class="MacroDescription">The location of the <a href="configmain.html#resource_file">resource file</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="commandfile">$COMMANDFILE$</a></td>
<td class="MacroDescription">The location of the <a href="configmain.html#command_file">command file</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="hostperfdatafile">$HOSTPERFDATAFILE$</a></td>
<td class="MacroDescription">The location of the host performance data file (if defined).</td>
</tr>
<tr>
<td class="MacroName"><a id="serviceperfdatafile">$SERVICEPERFDATAFILE$</a></td>
<td class="MacroDescription">The location of the service performance data file (if defined).</td>
</tr>
<tr><td colspan='2'><br></td></tr>
<tr>
<th colspan='2' class='MacroType th-sticky'>Misc Macros:</th>
</tr>
<tr>
<td class="MacroName"><a id="processstarttime">$PROCESSSTARTTIME$</a></td>
<td class="MacroDescription">Time stamp in time_t format (seconds since the UNIX epoch) indicating when the Naemon process was last (re)started.  You can determine the number of seconds that Naemon has been running (since it was last restarted) by subtracting $PROCESSSTARTTIME$ from <a href="#timet">$TIMET$</a>.</td>
</tr>
<tr>
<td class="MacroName"><a id="eventstarttime">$EVENTSTARTTIME$</a></td>
<td class="MacroDescription">Time stamp in time_t format (seconds since the UNIX epoch) indicating when the Naemon process starting process events (checks, etc.).  You can determine the number of seconds that it took for Naemon to startup by subtracting $PROCESSSTARTTIME$ from $EVENTSTARTTIME$.</td>
</tr>
<tr>
<td class="MacroName"><a id="adminemail">$ADMINEMAIL$</a></td>
<td class="MacroDescription">Global administrative email address.  This value is taken from the <a href="configmain.html#admin_email">admin_email</a> directive.</td>
</tr>
<tr>
<td class="MacroName"><a id="adminpager">$ADMINPAGER$</a></td>
<td class="MacroDescription">Global administrative pager number/address.  This value is taken from the <a href="configmain.html#admin_pager">admin_pager</a> directive.</td>
</tr>
<tr>
<td class="MacroName"><a id="arg">$ARGn$</a></td>
<td class="MacroDescription">The <i>n</i>th argument passed to the command (notification, event handler, service check, etc.). Naemon supports up to 32 argument macros ($ARG1$ through $ARG32$).</td>
</tr>
<tr>
<td class="MacroName"><a id="user">$USERn$</a></td>
<td class="MacroDescription">The <i>n</i>th user-definable macro. User macros can be defined in one or more <a href="configmain.html#resource_file">resource files</a>. Naemon supports up to 256 user macros ($USER1$ through $USER256$).</td>
</tr>
</tbody>
</table>
</div>


## Notes

<a id="note1"></a>
<p>
<sup><b>1</b></sup>  These macros are not valid for the host they are associated with when that host is being checked (i.e. they make no sense, as they haven't been determined yet).
</p>
<a id="note2"></a>
<p>
<sup><b>2</b></sup>  These macros are not valid for the service they are associated with when that service is being checked (i.e. they make no sense, as they haven't been determined yet).
</p>
<a id="note3"></a>
<p>
<sup><b>3</b></sup>  When host macros are used in service-related commands (i.e. service notifications, event handlers, etc) they refer to they host that they service is associated with.
</p>
<a id="note4"></a>
<p>
<sup><b>4</b></sup>  When host and service summary macros are used in notification commands, the totals are filtered to reflect only those hosts and services for which the contact is authorized (i.e. hosts and services they are configured to receive notifications for).
</p>
<a id="note5"></a>
<p>
<sup><b>5</b></sup>  These macros are normally associated with the first/primary hostgroup associated with the current host.  They could therefore be considered host macros in many cases.  However, these macros are not available as on-demand host macros.  Instead, they can be used as on-demand hostgroup macros when you pass the name of a hostgroup to the macro.  For example: $HOSTGROUPMEMBERS:hg1$ would return a comma-delimited list of all (host) members of the hostgroup <i>hg1</i>.
</p>
<a id="note6"></a>
<p>
<sup><b>6</b></sup>  These macros are normally associated with the first/primary servicegroup associated with the current service.  They could therefore be considered service macros in many cases.  However, these macros are not available as on-demand service macros.  Instead, they can be used as on-demand servicegroup macros when you pass the name of a servicegroup to the macro.  For example: $SERVICEGROUPMEMBERS:sg1$ would return a comma-delimited list of all (service) members of the servicegroup <i>sg1</i>.
</p>
<a id="note7"></a>
<p>
<sup><b>7</b></sup>  These macros are normally associated with the first/primary contactgroup associated with the current contact.  They could therefore be considered contact macros in many cases.  However, these macros are not available as on-demand contact macros.  Instead, they can be used as on-demand contactgroup macros when you pass the name of a contactgroup to the macro.  For example: $CONTACTGROUPMEMBERS:cg1$ would return a comma-delimited list of all (contact) members of the contactgroup <i>cg1</i>.
</p>
<a id="note8"></a>
<p>
<sup><b>8</b></sup>  These acknowledgement macros are deprecated. Use the more generic $NOTIFICATIONAUTHOR$, $NOTIFICATIONAUTHORNAME$, $NOTIFICATIONAUTHORALIAS$ or $NOTIFICATIONAUTHORCOMMENT$ macros instead.
</p>
<a id="note9"></a>
<p>
<sup><b>9</b></sup>  These macro are only available as on-demand macros - e.g. you must supply an additional argument with them in order to use them. These macros are not available as environment variables.
</p>
<a id="note10"></a>
<p>
<sup><b>10</b></sup>  Summary macros are quite CPU-intensive to calculate.
</p>
