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
const command = {"args":[{"name":"service_description","type":"service"},{"name":"value","type":"ulong"}],"name":"CHANGE_SVC_MODATTR","description":"This command changes the modified attributes value for the specified service. Modified attributes values are used by Naemon to determine which object properties should be retained across program restarts. Thus, modifying the value of the attributes can affect data retention. This is an advanced option and should only be used by people who are intimately familiar with the data retention logic in Naemon.","classes":["service"],"commandType":6,"argsStr":";host_name;service_description;value","exampleArgStr":";host1;service1;0"};
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
