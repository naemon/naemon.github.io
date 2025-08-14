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
const command = {"args":[{"name":"hostgroup_name","type":"HOSTGROUP"},{"name":"hostname","type":"STRING"},{"name":"service_description","type":"STRING"},{"name":"downtime_start_time","type":"TIMESTAMP"},{"name":"comment","type":"STRING"}],"name":"DEL_DOWNTIME_BY_HOSTGROUP_NAME","description":"This command deletes all downtimes matching the specified filters.","classes":["hostgroup","downtime"],"commandType":5,"argsStr":";hostgroup_name;hostname;service_description;downtime_start_time;comment","exampleArgStr":";hostgroup1;host1;service1;1478648441;This is an example comment."};
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
