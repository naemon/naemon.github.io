---
editLink: false
prev:
    text: 'External Commands Reference'
    link: '/documentation/developer/externalcommands/'
next: false
breadcrumb: true
---

<script setup>
const command = {"args":[{"name":"service","type":"service"},{"name":"sticky","type":"int"},{"name":"notify","type":"bool"},{"name":"persistent","type":"bool"},{"name":"author","type":"str"},{"name":"comment","type":"str"}],"name":"ACKNOWLEDGE_SVC_PROBLEM","description":"Allows you to acknowledge the current problem for the specified service. By acknowledging the current problem, future notifications (for the same servicestate) are disabled. If the 'sticky' option is set to one (1), the acknowledgement will remain until the service returns to an OK state. Otherwise the acknowledgement will automatically be removed when the service changes state. If the 'notify' option is set to one (1), a notification will be sent out to contacts indicating that the current service problem has been acknowledged. If the 'persistent' option is set to one (1), the comment associated with the acknowledgement will remain once the acknowledgement is removed. If not, the comment will be deleted when the acknowledgement is removed.","classes":["service","comment"],"argsStr":";service;sticky;notify;persistent;author;comment","exampleArgStr":";service1;1;1;1;naemonadmin;This is an example comment."};
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
