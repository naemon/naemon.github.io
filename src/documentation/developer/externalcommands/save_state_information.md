---
editLink: false
prev:
    text: 'External Commands Reference'
    link: 'index.html'
next: false
breadcrumb: true
---

<script setup>
const command = {"args":[],"name":"SAVE_STATE_INFORMATION","description":"Causes Naemon to save all current monitoring status information to the state retention file. Normally, state retention information is saved before the Naemon process shuts down and (potentially) at regularly scheduled intervals. This command allows you to force Naemon to save this information to the state retention file immediately. This does not affect the current status information in the Naemon process.","classes":["process"],"argsStr":"","exampleArgStr":""};
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
