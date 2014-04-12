---
layout: doctoc
title: Using The Naemonstats Utility
---

<span class="glyphicon glyphicon-arrow-up"></span> <a href="toc.html">Contents</a><br>

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="mrtggraphs.html">Graphing Performance Info</a>,
<a href="tuning.html">Performance Tuning</a>



### Introduction

A utility called <b>naemonstats</b> is included in the Naemon distribution.
It is compiled and installed along with the main Naemon daemon.
The naemonstats utility allows you to obtain various information about a running
Naemon process that can be very helpful in <a href="tuning.html">tuning performance</a>.
You can obtain information either in human-readable or MRTG-compatible format.



### Usage Information

You can run the <i>naemonstats</i> utility with the <b>--help</b> option to get usage information.




### Human-Readable Output

To obtain human-readable information on the performance of a running Naemon process,
run the <i>naemonstats</i> utility with the <b>-c</b> command line argument to
specify your main configuration file location like such:

<pre>
[naemon@lanman ~]# /usr/local/naemon/bin/naemonstats -c /usr/local/naemon/etc/naemon.cfg


Naemon Stats 0.8.0
Copyright (c) 2013-present Naemon Development Team (www.naemon.org)
Copyright (c) 2003-2008 Ethan Galstad (www.nagios.org)
Last Modified: 02-13-2014
License: GPL

CURRENT STATUS DATA
------------------------------------------------------
Status File:                            /usr/local/naemon/var/status.dat
Status File Age:                        0d 0h 0m 9s
Status File Version:                    0.8.0

Program Running Time:                   0d 5h 20m 39s
Naemon PID:                             10119
Used/High/Total Command Buffers:        0 / 0 / 64
Used/High/Total Check Result Buffers:   0 / 7 / 512

Total Services:                         95
Services Checked:                       94
Services Scheduled:                     91
Services Actively Checked:              94
Services Passively Checked:             1
Total Service State Change:             0.000 / 78.950 / 1.026 %
Active Service Latency:                 0.000 / 4.272 / 0.561 sec
Active Service Execution Time:          0.000 / 60.007 / 2.066 sec
Active Service State Change:            0.000 / 78.950 / 1.037 %
Active Services Last 1/5/15/60 min:     4 / 68 / 91 / 91
Passive Service State Change:           0.000 / 0.000 / 0.000 %
Passive Services Last 1/5/15/60 min:    0 / 0 / 0 / 0
Services Ok/Warn/Unk/Crit:              58 / 16 / 0 / 21
Services Flapping:                      1
Services In Downtime:                   0

Total Hosts:                            24
Hosts Checked:                          24
Hosts Scheduled:                        24
Hosts Actively Checked:                 24
Host Passively Checked:                 0
Total Host State Change:                0.000 / 9.210 / 0.384 %
Active Host Latency:                    0.000 / 0.446 / 0.219 sec
Active Host Execution Time:             1.019 / 10.034 / 2.764 sec
Active Host State Change:               0.000 / 9.210 / 0.384 %
Active Hosts Last 1/5/15/60 min:        5 / 22 / 24 / 24
Passive Host State Change:              0.000 / 0.000 / 0.000 %
Passive Hosts Last 1/5/15/60 min:       0 / 0 / 0 / 0
Hosts Up/Down/Unreach:                  18 / 4 / 2
Hosts Flapping:                         0
Hosts In Downtime:                      0

Active Host Checks Last 1/5/15 min:     9 / 52 / 164
   Scheduled:                           4 / 23 / 75
   On-demand:                           3 / 23 / 69
   Cached:                              2 / 6 / 20
Passive Host Checks Last 1/5/15 min:    0 / 0 / 0
Active Service Checks Last 1/5/15 min:  9 / 80 / 244
   Scheduled:                           9 / 80 / 244
   On-demand:                           0 / 0 / 0
   Cached:                              0 / 0 / 0
Passive Service Checks Last 1/5/15 min: 0 / 0 / 0

External Commands Last 1/5/15 min:      0 / 0 / 0

[naemon@lanman ~]#
</pre>

As you can see, the utility displays a number of different metrics pertaining to the Naemon
process. Metrics which have multiple values are (unless otherwise specified) min,
max and average values for that particular metric.



### MRTG Integration

You can use the <i>naemonstats</i> utility to display various Naemon metrics using
MRTG (or other compatible program). To do so, run the <i>naemonstats</i> utility using
the <b>--mrtg</b> and <b>--data</b> arguments. The <b>--data</b> argument is used
to specify what statistics should be graphed. Possible values for the <b>--data</b>
argument can be found by running the <i>naemonstats</i> utility with the <b>--help</b> option.

{{ site.note }}Information on using the <i>naemonstats</i> utility to generate MRTG graphs
for Naemon performance statistics can be found <a href="mrtggraphs.html">here</a>.{{ site.end }}
