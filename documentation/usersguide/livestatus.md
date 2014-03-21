---
layout: doctoc
title: Livestatus API
---

<span class="glyphicon glyphicon-arrow-right"></span> See Also: <a href="addons.html">Addons</a>

### Livestatus
Livestatus is one of the standard APIs for Naemon. It can be used to query live
status and configuration information from the Naemon core.
Detail description is available on <a href="http://mathias-kettner.de/checkmk_livestatus.html">mathias-kettner.de</a>.

In addition, Naemons Livestatus has been improved by the following features:

#### Sort Support

```
Sort: <column name> <asc/desc>
```

Sorts the result set by the specified column in the given direction. Multiple
Sort lines can be added. First sort line takes precedance.

Example:

```
GET services
Sort: host_name asc
Sort: description desc
```


#### Offset

```
Offset: <number of lines>
```

Lines to skip from the beginning of the result set. Useful for pagination in
combination with Limit header.

Example:

```
GET services
Limit: 100
Offset: 300
```


#### OutputFormat: wrapped_json

An extension to the json output format.
The result set is packed in a json object, with a couple of possible fields:

- columns: an array of column names. (optional)
- data: an array of arrays, describing the result set, in the same syntax common
  json output, without embedded column names.
- total_count: The number of lines in the resultsed, except the limitation of
  Limit and Offset headers.


Example:

```
GET services
OutputFormat: wrapped_json
```

