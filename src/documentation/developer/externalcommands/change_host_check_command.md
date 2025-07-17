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
const command = {"args":[{"name":"host_name","type":"host"},{"name":"check_command","type":"str"}],"name":"CHANGE_HOST_CHECK_COMMAND","description":"Changes the check command for a particular host to be that specified by the 'check_command' option. The 'check_command' option specifies the short name of the command that should be used as the new host check command. The command must have been configured in Naemon before it was last (re)started.","classes":["host"],"commandType":4,"argsStr":";host_name;check_command","exampleArgStr":";host1;check_ping"};
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
