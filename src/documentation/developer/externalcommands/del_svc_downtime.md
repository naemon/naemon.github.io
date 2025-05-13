---
editLink: false
prev:
    text: 'External Commands Reference'
    link: '/documentation/developer/externalcommands/'
next: false
breadcrumb: true
---

<script setup>
const command = {"args":[{"name":"downtime_id","type":"ulong"}],"name":"DEL_SVC_DOWNTIME","description":"Deletes the service downtime entry that has an ID number matching the 'downtime_id' argument. If the downtime is currently in effect, the service will come out of scheduled downtime (as long as there are no other overlapping active downtime entries).","classes":["service","downtime"],"argsStr":";downtime_id","exampleArgStr":";1234"};
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
