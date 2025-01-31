---
editLink: false
prev:
    text: 'External Commands Reference'
    link: 'index.html'
next: false
breadcrumb: true
---

<script setup>
const command = {"args":[{"name":"service","type":"service"},{"name":"persistent","type":"bool"},{"name":"author","type":"str"},{"name":"comment","type":"str"}],"name":"ADD_SVC_COMMENT","description":"This command is used to add a comment for the specified service.  If you work with other administrators, you may find it useful to share information about a host or service that is having problems if more than one of you may be working on it.  If you do not check the 'persistent' option, the comment will automatically be deleted at the next program restart.","classes":["service","comment"],"argsStr":";service;persistent;author;comment","exampleArgStr":";service1;1;naemonadmin;This is an example comment."};
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
