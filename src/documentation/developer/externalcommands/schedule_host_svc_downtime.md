---
editLink: false
prev:
    text: 'External Commands Reference'
    link: 'index.html'
next: false
breadcrumb: true
---

<script setup>
const command = {"args":[{"name":"host_name","type":"host"},{"name":"start_time","type":"timestamp"},{"name":"end_time","type":"timestamp"},{"name":"fixed","type":"bool"},{"name":"trigger_id","type":"ulong"},{"name":"duration","type":"ulong"},{"name":"author","type":"str"},{"name":"comment","type":"str"}],"name":"SCHEDULE_HOST_SVC_DOWNTIME","description":"Schedules downtime for all services associated with a particular host. If the 'fixed' argument is set to one (1), downtime will start and end at the times specified by the 'start' and 'end' arguments. Otherwise, downtime will begin between the 'start' and 'end' times and last for 'duration' seconds. The 'start' and 'end' arguments are specified in time_t format (seconds since the UNIX epoch). The service downtime entries can be triggered by another downtime entry if the 'trigger_id' is set to the ID of another scheduled downtime entry. Set the 'trigger_id' argument to zero (0) if the downtime for the services should not be triggered by another downtime entry.","classes":["host","service","downtime"],"argsStr":";host_name;start_time;end_time;fixed;trigger_id;duration;author;comment","exampleArgStr":";host1;1478648441;1478638441;1;0;3600;naemonadmin;This is an example comment."};
</script>

<h3>{{ command.name }}</h3>

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
