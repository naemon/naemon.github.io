---
layout: doctoc
title: Starting and Stopping Naemon
---


<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="verifyconfig.html">Verifying Your Configuration</a>

There's more than one way to start, stop, and restart Naemon.  Here are some of the more common ones...

<span class="glyphicon glyphicon-thumbs-up"></span> Tip: Always make sure you <a href="verifyconfig.html">verify your configuration</a> before you (re)start Naemon.

### Starting Naemon

<ol>
<li><b>Init Script:</b>  The easiest way to start the Naemon daemon is by using the init script like so:
<pre>
/etc/rc.d/init.d/nagios start
</pre>
</li>
<li><b>Manually:</b> You can start the Naemon daemon manually with the <b>-d</b> command line option like so:
<pre>
/usr/local/nagios/bin/nagios -d /usr/local/nagios/etc/nagios.cfg
</pre>
</li>
</ol>

### Restarting Naemon

Restarting/reloading is nececessary when you modify your configuration files and want those changes to take effect.

<ol>
<li><b>Init Script:</b>  The easiest way to restart the Naemon daemon is by using the init script like so:
<pre>
/etc/rc.d/init.d/nagios reload
</pre>
</li>
<li><b>Web Interface:</b> You can restart the Naemon through the web interface by clicking the "Process Info" navigation link and selecting "Restart the Naemon process":<br><br>
<img src="/images/stoprestart.png" border="0" alt="Restart the Naemon process"><br><br>
</li>
<li><b>Manually:</b> You can restart the Naemon process by sending it a SIGHUP signal like so:
<pre>
kill -HUP &lt;nagios_pid&gt;
</pre>
</ol>

### Stopping Naemon

<ol>
<li><b>Init Script:</b>  The easiest way to stop the Naemon daemon is by using the init script like so:
<pre>
/etc/rc.d/init.d/nagios stop
</pre>
</li>
<li><b>Web Interface:</b> You can stop the Naemon through the web interface by clicking the "Process Info" navigation link and selecting "Shutdown the Naemon process":<br><br>
<img src="/images/stoprestart.png" border="0" alt="Shutdown the Naemon process"><br><br>
</li>
<li><b>Manually:</b> You can stop the Naemon process by sending it a SIGTERM signal like so:
<pre>
kill &lt;nagios_pid&gt;
</pre>
</li>
</ol>
