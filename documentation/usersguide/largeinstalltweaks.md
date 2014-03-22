---
layout: doctoc
title: Large Installation Tweaks
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="tuning.html">Performance Tuning</a>, <a href="faststartup.html">Fast Startup Options</a>



### Introduction

Users with large Naemon installations may benefit from the <a href="configmain.html#use_large_installation_tweaks">use_large_installation_tweaks</a>
configuration option.

Enabling this option allows the Naemon daemon to take certain shortcuts which result in lower system load and better performance.



### Effects

When you enable the <a href="configmain.html#use_large_installation_tweaks">use_large_installation_tweaks</a> option in
your main Naemon config file, several changes are made to the way the Naemon daemon operates:

1. <b>No Summary Macros In Environment Variables</b>
   -  The <a href="macrolist.html#summary_macros">summary macros</a> will not be available to you as environment variables.
   Calculating the values of these macros can be quite time-intensive in large configurations,
   so they are not available as environment variables when use this option.
   Summary macros will still be available as regular macros if you pass them to to your scripts as arguments.<br><br>
2. <b>Different Memory Cleanup</b>
   - Normally Naemon will free all allocated memory in child processes before they exit.
   This is probably best practice, but is likely unnecessary in most installations, as most OSes will take care of
   freeing allocated memory when processes exit. The OS tends to free allocated memory faster than can be done
   within Naemon itself, so Naemon won't attempt to free memory in child processes if you enable this option.<br><br>
3. <b>Checks fork() Less</b>
   - Normally Naemon will fork() twice when it executes host and service checks.
   This is done to
   (1) ensure a high level of resistance against plugins that go awry and segfault and
   (2) make the OS deal with cleaning up the grandchild process once it exits.
   The extra fork() is not really necessary, so it is skipped when you enable this option.
   As a result, Naemon will itself clean up child processes that exit (instead of leaving
   that job to the OS).
   This feature should result in significant load savings on your Naemon installation.<br><br>
