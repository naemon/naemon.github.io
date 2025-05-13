---
editLink: false
prev:
    text: 'External Commands Reference'
    link: '/documentation/developer/externalcommands/'
next: false
breadcrumb: true
---

<script setup>
const command = {"args":[{"name":"service","type":"service"},{"name":"event_handler_command","type":"str"}],"name":"CHANGE_SVC_EVENT_HANDLER","description":"Changes the event handler command for a particular service to be that specified by the 'event_handler_command' option. The 'event_handler_command' option specifies the short name of the command that should be used as the new service event handler. The command must have been configured in Naemon before it was last (re)started.","classes":["service"],"argsStr":";service;event_handler_command","exampleArgStr":";service1;restart_service"};
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
