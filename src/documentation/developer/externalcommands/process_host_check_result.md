---
editLink: false
prev:
    text: 'External Commands Reference'
    link: 'index.html'
next: false
breadcrumb: true
---

<script setup>
const command = {"args":[{"name":"host_name","type":"host"},{"name":"status_code","type":"int"},{"name":"plugin_output","type":"str"}],"name":"PROCESS_HOST_CHECK_RESULT","description":"This is used to submit a passive check result for a particular host. The 'status_code' indicates the state of the host check and should be one of the following: 0=UP, 1=DOWN, 2=UNREACHABLE. The 'plugin_output' argument contains the text returned from the host check, along with optional performance data.","classes":["host"],"argsStr":";host_name;status_code;plugin_output","exampleArgStr":";host1;0;This is an example plugin output."};
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
