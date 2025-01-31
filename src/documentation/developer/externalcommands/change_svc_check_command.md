---
editLink: false
prev:
    text: 'External Commands Reference'
    link: 'index.html'
next: false
breadcrumb: true
---

<script setup>
const command = {"args":[{"name":"service","type":"service"},{"name":"check_command","type":"str"}],"name":"CHANGE_SVC_CHECK_COMMAND","description":"Changes the check command for a particular service to be that specified by the 'check_command' option. The 'check_command' option specifies the short name of the command that should be used as the new service check command. The command must have been configured in Naemon before it was last (re)started.","classes":["service"],"argsStr":";service;check_command","exampleArgStr":";service1;check_ping"};
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
