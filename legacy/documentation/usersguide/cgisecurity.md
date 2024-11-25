---
layout: doctoc
title: Enhanced CGI Security and Authentication
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="security.html">Security Considerations</a>, <a href="config.html">Configuration Overview</a>


### Introduction

<img src="images/security.png" border="0" style="float: right; clear: both;" alt="Security" title="Security">

This is intended to be an introduction for implementation of stronger authentication
and server security focused around the CGI web interface.

There are many ways to enhance the security of your monitoring server and
Naemon environment. This should not be taken as the end all approach to
security. Instead, think of it as an introduction to some of the techniques
you can use to tighten the security of your system. As always, you should do
your research and use the best techniques available. Treat your monitoring
server as it were the most important server in your network and you shall be
rewarded.



### Additional Techniques

* **Stronger Authentication using Digest Authentication**. If you have followed the
  <a href="quickstart.html">quickstart guides</a>, chances are that you are using Apache's
  <a href="http://httpd.apache.org/docs/2.2/mod/mod_auth_basic.html">Basic Authentication</a>.
  Basic Authentication will send your username and password in "clear text" with every
  http request. Consider using a more secure method of authentication such as
  <a href="http://httpd.apache.org/docs/2.2/mod/mod_auth_digest.html">Digest Authentication</a>
  which creates a MD5 Hash of your username and password to send with each request.<br /><br />

* **Forcing TLS/SSL for all Web Communication**. Apache provides
  <a href="http://en.wikipedia.org/wiki/Transport_Layer_Security">TLS/SSL</a> through
  the <a href="http://httpd.apache.org/docs/2.2/mod/mod_ssl.html">mod_ssl</a> module.
  TLS/SSL provides a secure tunnel between the client and server that prevents eavesdropping
  and tampering using strong publickey/privatekey cryptography.<br /><br />

* **Locking Down Apache Using Access Controls**. Consider locking down access to the
  Naemon box to your IP address, IP address range, or IP subnet. If you require access
  outside your network you could use VPN or SSH Tunnels. This is a easy and strong
  to limit access to HTTP/HTTPS on your system.



### Implementing Digest Authentication

The implementation of Digest Authentication is simple. You will have to create the new type of
password file using the <a href="http://httpd.apache.org/docs/2.2/programs/htdigest.html">'htdigest'</a> tool,
then modify the Apache configuration for naemon (typically /etc/httpd/conf.d/thruk.conf).

Create a new passwords file using the <a href="http://httpd.apache.org/docs/2.2/programs/htdigest.html">'htdigest'</a> tool.
The difference that you will notice if you are familiar with <a href="http://httpd.apache.org/docs/2.2/programs/htpasswd.html">'htpasswd'</a>
tools is the requirement to supply a 'realm' argument. Where 'realm' in this case refers to the
value of the 'AuthName' directive in the Apache configuration.


```

htdigest -c /etc/naemon/.digest_pw "Naemon Access" naemonadmin

```

Next, edit the Apache configuration file for Naemon (typically /etc/httpd/conf.d/thruk.conf) using the following example.

```
## BEGIN APACHE CONFIG SNIPPET - NAEMON.CONF
  <Location /naemon/>
    Options ExecCGI FollowSymLinks
    AuthName "Naemon Monitoring"
    AuthType Digest
    AuthDigestFile /etc/naemon/.digest_pw
    Require valid-user
  </Location>
## END APACHE CONFIG SNIPPETS
```

Then, restart the Apache service so the new settings can take effect.

```
/etc/init.d/httpd restart
```


### Implementing Forced TLS/SSL

Make sure you've installed Apache and OpenSSL. By default you should have <a
href="http://httpd.apache.org/docs/2.2/mod/mod_ssl.html">mod_ssl</a> support if
you are still having trouble you may find help reading Apache's <a
href="http://httpd.apache.org/docs/2.0/ssl">TLS/SSL Encryption
Documentation</a>.

Next, verify that TLS/SSL support is working by visiting your Naemon Web
Interface using HTTPS (https://your.domain/naemon). If it is working you can
continue on to the next steps that will force using HTTPS and block all HTTP
requests for the Naemon Web Interface. If you are having trouble visit
Apache's <a href="http://httpd.apache.org/docs/2.0/ssl">TLS/SSL Encryption
Documentation</a> and <a href="http://www.google.com">Google</a> for
troubleshooting your specific Apache installation.

Next, edit the Apache configuration file for Naemon (typically
/etc/httpd/conf.d/thruk.conf) by adding the 'SSLRequireSSL' directive to both
the 'sbin' and 'share' directories.

```

## BEGIN APACHE CONFIG SNIPPET - NAEMON.CONF
<Location /naemon/>
   ...
   SSLRequireSSL
   ...
</Location>
## END APACHE CONFIG SNIPPETS

```

Restart the Apache service so the new settings can take effect.

```
/etc/init.d/httpd restart
```

### Implementing IP subnet lockdown

The following example will show how to lock down Naemon CGIs to a specific IP address, IP address range, or IP subnet using Apache's <a href="http://httpd.apache.org/docs/2.2/howto/access.html">access controls</a>.

Edit the Apache configuration file for Naemon (typically /etc/httpd/conf.d/thruk.conf) by using the 'Allow', 'Deny', and 'Order' directives using the following as an example.

```
## BEGIN APACHE CONFIG SNIPPET - NAEMON.CONF
<Location /naemon/>
   ...
   AllowOverride None
   Order deny,allow
   Deny from all
   Allow from 127.0.0.1 10.0.0.25           # Allow single IP addresses
   Allow from 10.0.0.0/255.255.255.0        # Allow network/netmask pair
   Allow from 10.0.0.0/24                   # Allow network/nnn CIDR spec
   ...
</Location>
## END APACHE CONFIG SNIPPET
```

### Important Notes

* **Digest Authentication sends data in the clear but not your username and password**.<br /><br />
* **Digest Authentication is not as universally supported as Basic Authentication**.<br /><br />
* **TLS/SSL has potential for "<a href="http://en.wikipedia.org/wiki/Man-in-the-middle_attack">man-in-the-middle attacks</a>"**.
  MITM attacks are vulnerable if an attacker is able to insert itself between the server and client such as in a Phishing attack,
  ISP monitoring, or corporate LAN firewall certificate resigning. So read up on certificate verification!  <br /><br />
* **Apache access controls only protect the HTTP/HTTPS protocols**. Look into
  <a href="http://www.netfilter.org/projects/iptables/index.html">IPtables</a> for strong system wide firewall control.<br /><br />
* **Most importantly, Security is a moving target so stay informed and do research**! Perhaps by listening to a Podcast such
  as "<a href="http://www.grc.com/securitynow.htm">Security Now!</a>".<br /><br />
