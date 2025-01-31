---
editLink: false
prev:
    text: 'External Commands Reference'
    link: 'index.html'
next: false
breadcrumb: true
---

<script setup>
const command = {"args":[{"name":"host_name","type":"host"},{"name":"check_time","type":"timestamp"}],"name":"SCHEDULE_HOST_SVC_CHECKS","description":"Schedules the next active check of all services on a particular host at 'check_time'. The 'check_time' argument is specified in time_t format (seconds since the UNIX epoch). Note that the services may not actually be checked at the time you specify. This could occur for a number of reasons: active checks are disabled on a program-wide or service-specific basis, the services are already scheduled to be checked at an earlier time, etc. If you want to force the service checks to occur at the time you specify, look at the SCHEDULE_FORCED_HOST_SVC_CHECKS command.","classes":["host","service"],"argsStr":";host_name;check_time","exampleArgStr":";host1;1478648441"};
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

printf "[%%lu] {{ command.name }}{{ command.exampleArgStr }}\n" \
    `date +%%s` \
    > /var/lib/naemon/naemon.cmd
```
