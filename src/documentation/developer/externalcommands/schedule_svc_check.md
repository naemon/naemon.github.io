---
editLink: false
prev:
    text: 'External Commands Reference'
    link: '/documentation/developer/externalcommands/'
next: false
breadcrumb: true
aside: false
---

<script setup>
const command = {"args":[{"name":"service_description","type":"service"},{"name":"check_time","type":"timestamp"}],"name":"SCHEDULE_SVC_CHECK","description":"Schedules the next active check of a specified service at 'check_time'. The 'check_time' argument is specified in time_t format (seconds since the UNIX epoch). Note that the service may not actually be checked at the time you specify. This could occur for a number of reasons: active checks are disabled on a program-wide or service-specific basis, the service is already scheduled to be checked at an earlier time, etc. If you want to force the service check to occur at the time you specify, look at the SCHEDULE_FORCED_SVC_CHECK command.","classes":["service"],"commandType":6,"argsStr":";host_name;service_description;check_time","exampleArgStr":";host1;service1;1478648441"};
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
{{ command?.additionalInformation  }}
printf "[%lu] {{ command.name }}{{ command.exampleArgStr }}\n" \
    `date +%s` > /var/lib/naemon/naemon.cmd
```
