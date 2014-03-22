---
layout: affix
title: Usersguide guidelines
---
This document will help the community to mainstream Naemon usersguide to make it easy to follow with
a common look and feel for the best user experiance possible.

### Naming

* **Naemon** - The prefered name for Naemon Suite
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
```
mkdir download
cd download
```
</pre>

### Alerts
Alerts are used in the text to highlight something specific. It could be success, informational, warning or danger. See code snippets below

#### Success

<div class="alert alert-success" style="margin: 10px;"><i class="glyphicon glyphicon-thumbs-up"></i> Installation completed</div>

```
<div class="alert alert-success" style="margin: 10px;"><i class="glyphicon glyphicon-thumbs-up"></i> Installation completed</div>
```

#### Information

<div class="alert alert-info" style="margin: 10px;"><i class="glyphicon glyphicon-info-sign"></i> Read below for more information</div>

```
<div class="alert alert-info" style="margin: 10px;"><i class="glyphicon glyphicon-info-sign"></i> Read below for more information</div>
```

#### Warning

<div class="alert alert-warning" style="margin: 10px;"><i class="glyphicon glyphicon-exclamation-sign"></i> It's not possible to use Markdown inside a html block. Don't forget that &lt;table&gt;...&lt;/table&gt; are inside a html block as well</div>

```
<div class="alert alert-warning" style="margin: 10px;"><i class="glyphicon glyphicon-exclamation-sign"></i> It's not possible to use Markdown inside a html block. Don't forget that &lt;table&gt;...&lt;/table&gt; are inside a html block as well</div>
```

#### Danger

<div class="alert alert-danger" style="margin: 10px;"><i class="glyphicon glyphicon-warning-sign"></i> Make a backup before you upgrade</div>

```
<div class="alert alert-danger" style="margin: 10px;"><i class="glyphicon glyphicon-warning-sign"></i> Make a backup before you upgrade</div>
```
