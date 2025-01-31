---
editLink: false
prev:
    text: 'External Commands Reference'
    link: 'index.html'
next: false
breadcrumb: true
---

<script setup>
const command = {"args":[{"name":"servicegroup_name","type":"servicegroup"}],"name":"ENABLE_SERVICEGROUP_SVC_NOTIFICATIONS","description":"Enables notifications for all services that are members of a particular servicegroup. In order for notifications to be sent out for these services, notifications must also be enabled on a program-wide basis.","classes":["servicegroup"],"argsStr":";servicegroup_name","exampleArgStr":";servicegroup1"};
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
