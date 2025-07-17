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
const command = {"args":[{"name":"service_description","type":"service"},{"name":"notification_time","type":"timestamp"}],"name":"DELAY_SVC_NOTIFICATION","description":"Delays the next notification for a parciular service until 'notification_time'. The 'notification_time' argument is specified in time_t format (seconds since the UNIX epoch). Note that this will only have an affect if the service stays in the same problem state that it is currently in. If the service changes to another state, a new notification may go out before the time you specify in the 'notification_time' argument.","classes":["service"],"commandType":6,"argsStr":";host_name;service_description;notification_time","exampleArgStr":";host1;service1;1478638441"};
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
