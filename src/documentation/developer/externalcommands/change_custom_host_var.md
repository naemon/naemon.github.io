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
const command = {"args":[{"name":"host_name","type":"host"},{"name":"varname","type":"str"},{"name":"varvalue","type":"str"}],"name":"CHANGE_CUSTOM_HOST_VAR","description":"Changes the value of a custom host variable.","classes":["host"],"commandType":4,"argsStr":";host_name;varname;varvalue","exampleArgStr":";host1;SOMEVAR;some new value","additionalInformation":"# This will change value of the custom variable: $_HOSTSOMEVAR$\n"};
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
