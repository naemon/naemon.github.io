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
const command = {"args":[{"name":"service_description","type":"service"},{"name":"sticky","type":"int"},{"name":"notify","type":"bool"},{"name":"persistent","type":"bool"},{"name":"end_time","type":"timestamp"},{"name":"author","type":"str"},{"name":"comment","type":"str"}],"name":"ACKNOWLEDGE_SVC_PROBLEM_EXPIRE","description":"Allows you to acknowledge the current problem for the specified service. By acknowledging the current problem, future notifications (for the same servicestate) are disabled. The 'end_time' option determines the time after which the acknowledgement is cleared automatically. If the 'sticky' option is set to one (1), the acknowledgement will remain until the service returns to an OK state. Otherwise the acknowledgement will automatically be removed when the service changes state. If the 'notify' option is set to one (1), a notification will be sent out to contacts indicating that the current service problem has been acknowledged. If the 'persistent' option is set to one (1), the comment associated with the acknowledgement will remain once the acknowledgement is removed. If not, the comment will be deleted when the acknowledgement is removed.","classes":["service","comment"],"commandType":6,"argsStr":";host_name;service_description;sticky;notify;persistent;end_time;author;comment","exampleArgStr":";host1;service1;1;1;1;1478638441;naemonadmin;This is an example comment."};
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
