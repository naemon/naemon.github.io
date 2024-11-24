---
layout: doctoc
title: Custom CGI Headers and Footers
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="cgis.html">Information on the CGIs</a>

### Introduction

If you're doing custom installs of Naemon for clients, you may want to have a custom header and/or footer displayed
in the output of the <a href="cgis.html">CGIs</a>. This is particularly useful for displaying support contact information, etc. to the end user.

It is important to note that, unless they are executable, custom header and footer files are not pre-processed
in any way before they are displayed. The contents of the header and footer include files are simply read and
displayed in the CGI output. That means they can only contain information a web browser can understand (HTML, JavaScript, etc.).

If the custom header and footer files are executable, then the files are executed and their output returned to
the user, so they should output valid HTML. Using this you can run your own custom designed CGI to insert data
into the naemon display. This has been used to insert graphs from rrdtool using ddraw and command menus into
the naemon display pane. The executable customer header and footer files are run with the same CGI environment
as the main naemon CGI, so your files can parse the query information, authenticated user information, etc. to
produce appropriate output.

### How Does It Work?

You can include custom headers and footers in the output of the CGIs by dropping some appropriately named
HTML files in the *ssi/* subdirectory of the Naemon HTML directory (i.e. */etc/naemon/ssi*).

Custom headers are included immediately after the &lt;BODY&gt; tag in the CGI output, while custom footers
are included immediately before the closing &lt;/BODY&gt; tag.

There are two types of customer headers and footers:

* Global headers/footers.  These files should be named *common-header.ssi* and *common-footer.ssi*, respectively.  If these files exist, they will be included in the output of all CGIs.
* CGI-specific headers/footers.  These files should be named in the format *CGINAME-header.ssi* and *CGINAME-footer.ssi*, where *CGINAME* is the physical name of the CGI without the .cgi extension.  For example, the header and footer files for the <a href="cgis.html#summary_cgi">alert summary CGI</a> (summary.cgi) would be named *summary-header.ssi* and *summary-footer.ssi*, respectively.

You are not required to use any custom headers or footers. You can use only a global header if you wish.
You can use only CGI-specific headers and a global footer if you wish.  Whatever you want. Really.
