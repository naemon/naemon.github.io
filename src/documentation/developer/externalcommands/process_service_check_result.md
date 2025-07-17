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
const command = {"args":[{"name":"service_description","type":"service"},{"name":"status_code","type":"int"},{"name":"plugin_output","type":"str"}],"name":"PROCESS_SERVICE_CHECK_RESULT","description":"This is used to submit a passive check result for a particular service. The 'status_code' field should be one of the following: 0=OK, 1=WARNING, 2=CRITICAL, 3=UNKNOWN. The 'plugin_output' field contains text output from the service check, along with optional performance data.","classes":["service"],"commandType":6,"argsStr":";host_name;service_description;status_code;plugin_output","exampleArgStr":";host1;service1;0;This is an example plugin output."};
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
