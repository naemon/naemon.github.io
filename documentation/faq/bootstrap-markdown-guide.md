---
layout: affix
title: Bootstrap and Markdown guide
---
This document will help the community to mainstream Naemon usersguide to make it easy to follow with a common look and feel for the best user experiance possible.

### Bootstrap and Markdown syntax
Our website including the documentation are built upon Bootstrap and Markdown syntax at Github. 

#### Markdown and html
It's possible to use both Markdown and html when writing code.

For more information how to use Github's version of Markdown, see this web site: [https://help.github.com/articles/github-flavored-markdown](https://help.github.com/articles/github-flavored-markdown)

<div class="alert alert-warning" style="margin: 10px;"><i class="glyphicon glyphicon-exclamation-sign"></i> It's not possible to use Markdown inside a html block. Don't forget that &lt;table&gt;...&lt;/table&gt; are inside a html block as well</div>

##### Example - Invalid use of Markdown
```
<p>This is **bold** text</p>
```
<p>This is **bold** text</p>

##### Example - Valid use of Markdown
```
This is **bold** text
```
This is **bold** text

##### Bootstrap CSS
Make full use of Boostrap infrastructure, see Bootstrap web page for more info: [http://getbootstrap.com/css/](http://getbootstrap.com/css/)

#### Bootstrap layouts
Eatch Bootstrap webpage starts with a header with the layout definition. There are two different layouts available for documentation:

* doc - doc layout is a one column page without table of content
* doctoc - doctoc layout are the same as doc but with a table of content to the right. The TOC are automaticly generated using headers

##### Example header
```
---
layout: doctoc
title: Example header page
---
```

### Images and glyphs
Bootstrap offers support for Glyphicon Halflings set. It's easy to include glyphs in text, just add the icon class and the individual icon class. See example below

```
This is a thumb up <span class="glyphicon glyphicon-thumbs-up"></span> 
```

This is a thumb up <span class="glyphicon glyphicon-thumbs-up"></span> 

For more glyphs see [http://getbootstrap.com/components/#glyphicons-glyphs](http://getbootstrap.com/components/#glyphicons-glyphs)
