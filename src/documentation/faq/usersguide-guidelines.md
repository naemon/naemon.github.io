# Usersguide guidelines


This document will help the community to mainstream Naemon usersguide to make it easy to follow with
a common look and feel for the best user experience possible.

## Naming

- **Naemon** - The preferred name for Naemon Suite
- Naemon Suite - The entire suite, both the Naemon Core and Thruk Monitoring Webinterface
- Naemon Core - The monitoring engine
- Thruk - Monitoring Webinterface used by Naemon (also compatible with Icinga, Shinken and Nagios)

## Syntax

### Code snippets
Use \`\`\`...\`\`\` for all code snippets in the documentation.

<pre>
```bash
mkdir download
cd download
```
</pre>


```bash
mkdir download
cd download
```

> [!INFO]
> The language is optional. Common languages are `bash`, `c` or `perl`.


### Alerts
Alerts are used in the text to highlight something specific. It could be `NOTE`,
`TIP`, `IMPORTANT`, `WARNING` or `CAUTION`
informational, warning or danger. See code snippets below

```md
> [!NOTE]
> Some useful hint.

> [!TIP]
> Some useful tips.

> [!IMPORTANT]
> Informational Alert

> [!WARNING]
> It is not possible to use Markdown inside a html block.

> [!CAUTION]
> Make a backup before you upgrade
```


> [!NOTE]
> Some useful hint.

> [!TIP]
> Some useful tips.

> [!IMPORTANT]
> Informational Alert

> [!WARNING]
> It is not possible to use Markdown inside a html block.

> [!CAUTION]
> Make a backup before you upgrade
