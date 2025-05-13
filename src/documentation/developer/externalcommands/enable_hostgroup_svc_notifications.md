---
editLink: false
prev:
    text: 'External Commands Reference'
    link: '/documentation/developer/externalcommands/'
next: false
breadcrumb: true
---

<script setup>
const command = {"args":[{"name":"hostgroup_name","type":"hostgroup"}],"name":"ENABLE_HOSTGROUP_SVC_NOTIFICATIONS","description":"Enables notifications for all services that are associated with hosts in a particular hostgroup. This does not enable notifications for the hosts in the hostgroup - see the ENABLE_HOSTGROUP_HOST_NOTIFICATIONS command for that. In order for notifications to be sent out for these services, notifications must be enabled on a program-wide basis as well.","classes":["hostgroup","service"],"argsStr":";hostgroup_name","exampleArgStr":";hostgroup1"};
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
