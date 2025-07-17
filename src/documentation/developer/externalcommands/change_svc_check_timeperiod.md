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
const command = {"args":[{"name":"service_description","type":"service"},{"name":"check_timeperiod","type":"timeperiod"}],"name":"CHANGE_SVC_CHECK_TIMEPERIOD","description":"Changes the check timeperiod for a particular service to what is specified by the 'check_timeperiod' option. The 'check_timeperiod' option should be the short name of the timeperod that is to be used as the service check timeperiod. The timeperiod must have been configured in Naemon before it was last (re)started.","classes":["service"],"commandType":6,"argsStr":";host_name;service_description;check_timeperiod","exampleArgStr":";host1;service1;24x7"};
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
