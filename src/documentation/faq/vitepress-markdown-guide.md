# VitePress and Markdown guide

This document will help the community to mainstream Naemon users guide to make it easy to follow with a common look and feel for the best user experience possible.

## VitePress and Markdown syntax
Our website including the documentation are built upon VitePress and Markdown syntax at Github.

### Markdown and HTML
It's possible to use both Markdown and HTML when writing code.

For more information how to use Github's version of Markdown, see this web site: [https://docs.github.com/de/get-started/writing-on-github](https://docs.github.com/de/get-started/writing-on-github)

Also the [VitePress documentation](https://vitepress.dev/guide/markdown) contains a lot of good Markdown examples if you want to insert code blocs, alerts or Emojis :tada:.

> [!WARNING]
> It's not possible to use Markdown inside a HTML block. Don't forget that &lt;table&gt;...&lt;/table&gt; are inside a HTML block as well

#### Example - Invalid use of Markdown
Markdown:
```
<p>This is **bold** text</p>
```
Result:
<p>This is **bold** text</p>

#### Example - Valid use of Markdown
Markdown:
```
This is **bold** text
```
Result:
This is **bold** text


## Font Awesome
All Font Awesome Free icons are available.

```
This is a thumb up <i class="fa-solid fa-thumbs-up"></i>
```

This is a thumb up <i class="fa-solid fa-thumbs-up"></i>

For more icons see [https://fontawesome.com/icons](https://fontawesome.com/icons)
