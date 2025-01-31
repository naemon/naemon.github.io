---
editLink: false
prev:
    text: 'External Commands Reference'
    link: 'index.html'
next: false
breadcrumb: true
---

<script setup>
const command = {"args":[{"name":"host_name","type":"host"},{"name":"varname","type":"str"},{"name":"varvalue","type":"str"}],"name":"CHANGE_CUSTOM_HOST_VAR","description":"Changes the value of a custom host variable.","classes":["host"],"argsStr":";host_name;varname;varvalue","exampleArgStr":";host1;SOMEVAR;some new value"};
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
