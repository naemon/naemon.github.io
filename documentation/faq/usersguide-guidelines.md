---
layout: affix
title: Usersguide guidelines
---

This document will help the community to mainstream Naemon usersguide to make it easy to follow with
a common look and feel for the best user experience possible.

### Naming

* **Naemon** - The preferred name for Naemon Suite
* Naemon Suite - The entire suite, both the Naemon Core and Thruk Monitoring Webinterface
* Naemon Core - The monitoring engine
* Thruk - Monitoring Webinterface used by Naemon (also compatible with Icinga, Shinken and Nagios)

### Syntax

#### Code snippets
<p>Use &lt;pre&gt;...&lt;/pre&gt; or ```...``` for all code snippets in the documentation</p>

```
mkdir download
cd download
```
<pre>
```bash
mkdir download
cd download
```
</pre>

{{ site.info }}The language is optional. Common languages are 'bash', 'c' or 'perl'.{{ site.end }}


### Alerts
Alerts are used in the text to highlight something specific. It could be success,
informational, warning or danger. See code snippets below


#### Success or Hints

{{ site.hint }}Some useful hint.{{ site.end }}

<pre>
&#123;&#123; site.hint &#125;&#125;Some useful hint.&#123;&#123; site.end &#125;&#125;
</pre>


#### Information

{{ site.info }}Informational Alert{{ site.end }}

<pre>
&#123;&#123; site.info &#125;&#125;Informational Alert&#123;&#123; site.end &#125;&#125;
</pre>


#### Warning

{{ site.warn }}It's not possible to use Markdown inside a html block. Don't forget that &lt;table&gt;...&lt;/table&gt; are inside a html block as well{{ site.end }}

<pre>
&#123;&#123; site.warn &#125;&#125;It's not possible to use Markdown inside a html block...&#123;&#123; site.end &#125;&#125;
</pre>


#### Danger

{{ site.danger }}Make a backup before you upgrade{{ site.end }}

<pre>
&#123;&#123; site.danger &#125;&#125;Make a backup before you upgrade&#123;&#123; site.end &#125;&#125;
</pre>
