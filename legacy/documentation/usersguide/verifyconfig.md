---
layout: doc
title: Verifying Your Naemon Configuration
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="config.html">Configuration Overview</a>, <a href="startstop.html">Starting and Stopping Naemon</a>


### Verifying Your Configuration

Every time you modify your <a href="config.html">configuration files</a>, you
should run a sanity check on them. It is important to do this before you
(re)start Naemon, as Naemon will shut down if your configuration contains
errors.

In order to verify your configuration, run Naemon with the <b>-v</b> command line option like so:

<pre>
/usr/bin/naemon -v /etc/naemon/naemon.cfg
</pre>

If you've forgotten to enter some critical data or misconfigured things, Naemon
will spit out a warning or error message that should point you to the location
of the problem. Error messages generally print out the line in the
configuration file that seems to be the source of the problem. On errors,
Naemon will often exit the pre-flight check and return to the command prompt
after printing only the first error that it has encountered. This is done so
that one error does not cascade into multiple errors as the remainder of the
configuration data is verified. If you get any error messages you'll need to go
and edit your configuration files to remedy the problem. Warning messages can
<i>generally</i> be safely ignored, since they are only recommendations and not
requirements.


Once you've verified your configuration files and fixed any errors you can go
ahead and <a href="startstop.html">(re)start Naemon</a>.
