# Livestatus API

Livestatus Query Language (LQL) is a lightweight and efficient way to query
monitoring data from Naemon. It is designed for fast data retrieval and
filtering of monitoring objects like hosts and services.

Livestatus is a NEB module and needs to be loaded in the Naemon core using the
`broker_module` configure option.

### Syntax

An LQL query consists of:

* Table Selection - Determines the data source (e.g., hosts, services, contacts).
* Output Format - Specifies if the result should be JSON or CSV.
* Column Selection - Specifies which fields should be returned.
* Filtering Conditions - Filters the data based on conditions.
* Sorting and Limiting - Orders and restricts results.

```txt
GET <table name>
OutputFormat: <output format>
Columns: <column name> <column name> ...
Filter: <column name> <operator> <value>
Limit: <number of lines>
Offset: <number of lines>
Sort: <column name> <asc/desc>
```

Example Query:

```txt
GET services
Columns: host_name description state
Filter: state = 2
Sort: host_name
```

A simple query can make use if the tool `unixcat` which comes along with
livestatus or the `lq` wrapper in OMD.

```shell
echo -e "GET services\nColumns: host_name description\nLimit: 5\n" \
    | unixcat /var/cache/naemon/live
```

#### Table Selection

The query must start with the GET keyword, followed by the table name:

```txt
GET hosts
```

See the [tables reference](#tables) section for a list of available columns.

#### Output Format

The output format can be specified using the `OutputFormat` header. The default
is `json`, but `csv` or `wrapped_json` is also supported.

```txt
OutputFormat: wrapped_json
```

#### Column Selection

The columns to be returned can be specified using a space separated list.
See the [tables reference](#tables) section for a list of available columns.

```txt
Columns: name state last_check
```

#### Filtering Conditions

Use `Filter:` to include only matching rows:

```txt
Filter: state = 0  # Only return OK services
```

Multiple filters use logical `AND` by default. Use `Or:` for OR conditions:

```txt
Filter: state = 2
Filter: state = 1
Or: 2
```

This returns services that are either WARNING (1) or CRITICAL (2).

#### Statistics Queries

Aggregate functions like counting:

```txt
GET hosts
Stats: state = 0
Stats: state = 1
Stats: state = 2
Stats: state = 3
```

Counts hosts bei their state.

### Extended Functionality

In addition, Naemon's Livestatus has been improved by the following features:

#### Sort Support

```txt
Sort: <column name> <asc/desc>
```

Sorts the result set by the specified column in the given direction. Multiple
Sort lines can be added. First sort line takes precedence.

Example:

```txt
GET services
Sort: host_name asc
Sort: description desc
```

#### Offset

```txt
Offset: <number of lines>
```

Lines to skip from the beginning of the result set. Useful for pagination in
combination with Limit header.

Example:

```txt
GET services
Limit: 100
Offset: 300
```

#### OutputFormat: wrapped_json

An extension to the json output format.
The result set is packed in a json object, with a couple of possible fields:

* columns: an array of column names. (optional)
* data: an array of arrays, describing the result set, in the same syntax common
  json output, without embedded column names.
* total_count: The number of lines in the result set, except the limitation of
  Limit and Offset headers.

Example:

```txt
GET services
OutputFormat: wrapped_json
```

#### TCP support

*New in version  1.2.0.*

Support querying Livestatus over TCP instead of the default UNIX socket. This is
enabled through a `broker_module` configure option.

Example configuring Livestatus to listen on TCP port 11621 on all available IPv4
interfaces:

```txt
broker_module=/usr/lib64/livestatus.so inet_addr=0.0.0.0:11621
```

### Module Options

The livestatus module is usually loaded from the `/etc/naemon/module-conf.d/livestatus.cfg` file:

```txt
broker_module=/usr/lib64/naemon/naemon-livestatus/livestatus.so debug=0 /var/cache/naemon/live
event_broker_options=-1
```

The module accepts a number of options:

#### data_encoding

Changes encoding style.

Possible values:

* `utf8` *(Default)*
* `latin1`
* `mixed`

ex.:

```txt
broker_module=.../livestatus.so data_encoding=utf8 ...
```

#### debug

Enable/disable debug logging.

Possible values:

* `0` debug logging off *(Default)*
* `1` debug logging on

ex.:

```txt
broker_module=.../livestatus.so debug=1 ...
```

#### group_authorization

Sets group authorization mode.

If GroupAuthorization is strict (default), a user must be a contact on all
hosts in the hostgroup in able to see the hostgroup. If GroupAuthorization is
loose it is sufficient for the user to be a contact on one of the hosts in the
hostgroup.

This is only used for queries using the AuthUser header.

Possible values:

* `strict` *(Default)*
* `loose`

ex.:

```txt
broker_module=.../livestatus.so group_authorization=strict ...
```

#### hidden_custom_var_prefix

Set prefix to hide custom variables by prefix.

Possible values: any string value.

ex.:

```txt
broker_module=.../livestatus.so hidden_custom_var_prefix=SECRET ...
```

#### idle_timeout

Timeout value for keepalive connections in milliseconds. Defaults to 300000 (300sec).

Possible values: any positive integer value.

ex.:

```txt
broker_module=.../livestatus.so idle_timeout=300 ...
```

#### inet_addr

Make livestatus listen on tcp address.

Possible values: any socket description.

ex.:

```txt
broker_module=.../livestatus.so inet_addr=0.0.0.0:6666 ...
```

#### log_file

Change path to logfile.

Possible values: valid file location

ex.:

```txt
broker_module=.../livestatus.so log_file=/var/log/livestatus.log ...
```

#### max_backlog

Set maximum number of backlog connections. Defaults to 3.

Possible values: any positive integer value.

ex.:

```txt
broker_module=.../livestatus.so max_backlog=3 ...
```

#### max_cached_messages

Set maximum number of cached log messages. Defaults to 500000.

Possible values: any positive integer value.

ex.:

```txt
broker_module=.../livestatus.so max_cached_messages=1000000 ...
```

#### max_lines_per_logfile

Set maximum number of lines read from each logfile. Defaults to 1000000.

Possible values: any positive integer value.

ex.:

```txt
broker_module=.../livestatus.so max_lines_per_logfile=2000000 ...
```

#### max_response_size

Sets maximum final response size in bytes. Defaults to 524288000 (500MiB).

Possible values: any positive integer value.

ex.:

```txt
broker_module=.../livestatus.so max_response_size=1048576000 ...
```

#### num_client_threads

**deprecated:** There is no limit of concurrent threads anymore.

#### pnp_path

Sets path to pnp rrd files. This is used to fill the `pnpgraph_present` columns.

Possible values: any valid directory location.

ex.:

```txt
broker_module=.../livestatus.so pnp_path=/var/lib/pnp4nagios/perfdata ...
```

#### query_timeout

Sets read timeout for queries in milliseconds. Defaults to 10000 (10sec).

Possible values: any positive integer value.

ex.:

```txt
broker_module=.../livestatus.so query_timeout=30000 ...
```

#### service_authorization

Sets service authorization mode.

Naemon automatically regards a contact for a host also as a contact for all
services of that host. We call this method loose. By setting it to strict, one
must be an explicitly contact of a service in order to see it when using the
AuthUser setting. Please note that Naemon makes all services that do not have
any contact at all inherit all contacts of the host - regardless whether this
option is set to strict or loose. The default option is loose.

This is only used for queries using the AuthUser header.

Possible values:

* `strict` *(Default)*
* `loose`

ex.:

```txt
broker_module=.../livestatus.so service_authorization=strict ...
```

#### thread_stack_size

Sets threads stack size in bytes. Defaults to 65536.
Read more in `man 3 pthread_attr_setstacksize`. There is usually no
reason to change this.

Possible values: any positive integer value.

ex.:

```txt
broker_module=.../livestatus.so thread_stack_size=65536 ...
```

## Tables

The following tables are available for livestatus queries:

<script setup>
import { data as columns } from './livestatus.data.mts'
</script>

<template v-for="table in columns">
  <div>
    <h3 :id="table.name">{{ table.name }}</h3>
    <table class="livestatus">
    <thead>
      <tr>
        <th>Column</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="col in table.columns">
        <td class="name">{{ col.name }}</td>
        <td class="type">{{ col.type }}</td>
        <td class="descr" v-html="col.description"></td>
      </tr>
    </tbody>
    </table>
  </div>
</template>
