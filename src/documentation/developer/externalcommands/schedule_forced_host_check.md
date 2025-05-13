---
editLink: false
prev:
    text: 'External Commands Reference'
    link: '/documentation/developer/externalcommands/'
next: false
breadcrumb: true
---

<script setup>
const command = {"args":[{"name":"host_name","type":"host"},{"name":"check_time","type":"timestamp"}],"name":"SCHEDULE_FORCED_HOST_CHECK","description":"Schedules a forced active check of a particular host at 'check_time'. The 'check_time' argument is specified in time_t format (seconds since the UNIX epoch). Forced checks are performed regardless of what time it is (e.g. timeperiod restrictions are ignored) and whether or not active checks are enabled on a host-specific or program-wide basis.","classes":["host"],"argsStr":";host_name;check_time","exampleArgStr":";host1;1478648441"};
</script>

<h3>{{ command.name.replace(/_/g, " ") }}</h3>

#### Command Format

`{{ command.name }}{{ command.argsStr }}`

#### Description

{{ command.description }}

#### Shell Script Usage Example

```sh-vue
#!/bin/sh
# This is a shell script showing how to submit the {{ command.name }} command
# to Naemon. Adjust variables to fit your environment as necessary.

printf "[%lu] {{ command.name }}{{ command.exampleArgStr }}\n" `date +%s` > /var/lib/naemon/naemon.cmd
```
