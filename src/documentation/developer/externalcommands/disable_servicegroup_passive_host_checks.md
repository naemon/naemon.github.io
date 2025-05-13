---
editLink: false
prev:
    text: 'External Commands Reference'
    link: '/documentation/developer/externalcommands/'
next: false
breadcrumb: true
---

<script setup>
const command = {"args":[{"name":"servicegroup_name","type":"servicegroup"}],"name":"DISABLE_SERVICEGROUP_PASSIVE_HOST_CHECKS","description":"Disables the acceptance and processing of passive checks for all hosts that have services that are members of a particular service group.","classes":["host","servicegroup"],"argsStr":";servicegroup_name","exampleArgStr":";servicegroup1"};
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
