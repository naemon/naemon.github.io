---
layout: doctoc
title: Detection and Handling of State Flapping
---
<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="statetypes.html">State Types</a>

### Introduction

Naemon supports optional detection of hosts and services that are "flapping".  Flapping occurs when a service or host changes state too frequently, resulting in a storm of problem and recovery notifications.  Flapping can be indicative of configuration problems (i.e. thresholds set too low), troublesome services, or real network problems.

### How Flap Detection Works

Before I get into this, let me say that flapping detection has been a little difficult to implement.  How exactly does one determine what "too frequently" means in regards to state changes for a particular host or service?  When I first started thinking about implementing flap detection I tried to find some information on how flapping could/should be detected.  I couldn't find any information about what others were using (where they using any?), so I decided to settle with what seemed to me to be a reasonable solution...

Whenever Naemon checks the status of a host or service, it will check to see if it has started or stopped flapping.  It does this by:

<ul>
<li>Storing the results of the last 21 checks of the host or service</li>
<li>Analyzing the historical check results and determine where state changes/transitions occur</li>
<li>Using the state transitions to determine a percent state change value (a measure of change) for the host or service</li>
<li>Comparing the percent state change value against low and high flapping thresholds</li>
</ul>

A host or service is determined to have <i>started</i> flapping when its percent state change first exceeds a <i>high</i> flapping threshold.

A host or service is determined to have <i>stopped</i> flapping when its percent state goes below a <i>low</i> flapping threshold (assuming that is was previously flapping).

### Example

Let's describe in more detail how flap detection works with services...

The image below shows a chronological history of service states from the most recent 21 service checks.  OK states are shown in green, WARNING states in yellow, CRITICAL states in red, and UNKNOWN states in orange.

<a href="images/statetransitions.png"><img src="images/statetransitions.png" border=0 alt="Service State Transitions"></a>

The historical service check results are examined to determine where state changes/transitions occur.  State changes occur when an archived state is different from the archived state that immediately precedes it chronologically.  Since we keep the results of the last 21 service checks in the array, there is a possibility of having at most 20 state changes.  In this example there are 7 state changes, indicated by blue arrows in the image above.

The flap detection logic uses the state changes to determine an overall percent state change for the service.  This is a measure of volatility/change for the service.  Services that never change state will have a 0% state change value, while services that change state each time they're checked will have 100% state change.  Most services will have a percent state change somewhere in between.

When calculating the percent state change for the service, the flap detection algorithm will give more weight to new state changes compare to older ones.  Specifically, the flap detection routines are currently designed to make the newest possible state change carry 50% more weight than the oldest possible state change.  The image below shows how recent state changes are given more weight than older state changes when calculating the overall or total percent state change for a particular service.

<a href="images/statetransitions2.png"><img src="images/statetransitions2.png" border=0 alt="Weighted Service State Transitions"></a>

Using the images above, lets do a calculation of percent state change for the service.  You will notice that there are a total of 7 state changes (at t<sub>3</sub>, t<sub>4</sub>, t<sub>5</sub>, t<sub>9</sub>, t<sub>12</sub>, t<sub>16</sub>, and t<sub>19</sub>).  Without any weighting of the state changes over time, this would give us a total state change of 35%:

(7 observed state changes / possible 20 state changes) * 100 = 35 %

Since the flap detection logic will give newer state changes a higher rate than older state changes, the actual calculated percent state change will be slightly less than 35% in this example.  Let's say that the weighted percent of state change turned out to be 31%...

The calculated percent state change for the service (31%) will then be compared against flapping thresholds to see what should happen:

<ul>
<li>If the service was <i>not</i> previously flapping and 31% is <i>equal to or greater than</i> the high flap threshold, Naemon considers the service to have just started flapping.</li>
<li>If the service <i>was</i> previously flapping and 31% is <i>less than</i> the low flap threshold, Naemon considers the service to have just stopped flapping.</li>
</ul>

If neither of those two conditions are met, the flap detection logic won't do anything else with the service, since it is either not currently flapping or it is still flapping.

### Flap Detection for Services

Naemon checks to see if a service is flapping whenever the service is checked (either actively or passively).

The flap detection logic for services works as described in the example above.

### Flap Detection for Hosts

Host flap detection works in a similar manner to service flap detection, with one important difference: Naemon will attempt to check to see if a host is flapping whenever:

<ul>
<li>The host is checked (actively or passively)</li>
<li>Sometimes when a service associated with that host is checked.  More specifically, when at least <i>x</i> amount of time has passed since the flap detection was last performed, where <i>x</i> is equal to the average check interval of all services associated with the host.</li>
</ul>

Why is this done?  With services we know that the minimum amount of time between consecutive flap detection routines is going to be equal to the service check interval.  However, you might not be monitoring hosts on a regular basis, so there might not be a host check interval that can be used in the flap detection logic.  Also, it makes sense that checking a service should count towards the detection of host flapping.  Services are attributes of or things associated with host after all...  At any rate, that's the best method I could come up with for determining how often flap detection could be performed on a host, so there you have it.

### Flap Detection Thresholds

Naemon uses several variables to determine the percent state change thresholds is uses for flap detection.  For both hosts and services, there are <i>global</i> high and low thresholds and <i>host-</i> or <i>service-specific</i> thresholds that you can configure.  Naemon will use the global thresholds for flap detection if you to not specify host- or service- specific thresholds.

The table below shows the global and host- or service-specific variables that control the various thresholds used in flap detection.

<table border="1">
<tr><th>Object Type</th><th>Global Variables</th><th>Object-Specific Variables</th></tr>
<tr>
<td>Host</td>
<td>
<a href="configmain.html#low_host_flap_threshold">low_host_flap_threshold</a><br>
<a href="configmain.html#high_host_flap_threshold">high_host_flap_threshold</a>
</td>
<td>
<a href="objectdefinitions.html#host">low_flap_threshold</a><br>
<a href="objectdefinitions.html#host">high_flap_threshold</a><br>
</td>
</tr>
<tr>
<td>Service</td>
<td>
<a href="configmain.html#low_service_flap_threshold">low_service_flap_threshold</a><br>
<a href="configmain.html#high_service_flap_threshold">high_service_flap_threshold</a>
</td>
<td>
<a href="objectdefinitions.html#service">low_flap_threshold</a><br>
<a href="objectdefinitions.html#service">high_flap_threshold</a><br>
</td>
</tr>
</table>

### States Used For Flap Detection

Normally Naemon will track the results of the last 21 checks of a host or service, regardless of the check result (host/service state), for use in the flap detection logic.

{{ site.hint }}You can exclude certain host or service states from use in flap detection logic by using the <i>flap_detection_options</i> directive in your host or service definitions.{{ site.end }}

This directive allows you to specify what host or service states (i.e. "UP, "DOWN", "OK, "CRITICAL") you want to use for flap detection.  If you don't use this directive, all host or service states are used in flap detection.

### Flap Handling

When a service or host is first detected as flapping, Naemon will:

<ol>
<li>Log a message indicating that the service or host is flapping.</li>
<li>Add a non-persistent comment to the host or service indicating that it is flapping.</li>
<li>Send a "flapping start" notification for the host or service to appropriate contacts.</li>
<li>Suppress other notifications for the service or host (this is one of the filters in the <a href="notifications.html">notification logic</a>).</li>
</ol>

When a service or host stops flapping, Naemon will:

<ol>
<li>Log a message indicating that the service or host has stopped flapping.</li>
<li>Delete the comment that was originally added to the service or host when it started flapping.</li>
<li>Send a "flapping stop" notification for the host or service to appropriate contacts.</li>
<li>Remove the block on notifications for the service or host (notifications will still be bound to the normal <a href="notifications.html">notification logic</a>).</li>
</ol>

### Enabling Flap Detection

In order to enable the flap detection features in Naemon, you'll need to:

<ul>
<li>Set <a href="configmain.html#enable_flap_detection">enable_flap_detection</a> directive is set to 1.</li>
<li>Set the <i>flap_detection_enabled</i> directive in your host and service definitions is set to 1.</li>
</ul>

If you want to disable flap detection on a global basis, set the <a href="configmain.html#enable_flap_detection">enable_flap_detection</a> directive to 0.

If you would like to disable flap detection for just a few hosts or services, use the <i>flap_detection_enabled</i> directive in the host and/or service definitions to do so.
