---
editLink: false
prev:
    text: 'External Commands Reference'
    link: 'index.html'
next: false
breadcrumb: true
---

<script setup>
const command = {"args":[{"name":"host_name","type":"host"},{"name":"sticky","type":"int"},{"name":"notify","type":"bool"},{"name":"persistent","type":"bool"},{"name":"end_time","type":"timestamp"},{"name":"author","type":"str"},{"name":"comment","type":"str"}],"name":"ACKNOWLEDGE_HOST_PROBLEM_EXPIRE","description":"Allows you to acknowledge the current problem for the specified host for a limitied time. By acknowledging the current problem, future notifications (for the same host state) are disabled. The 'end_time' option determines the time after which the acknowledgement is cleared automatically. If the 'sticky' option is set to one (1), the acknowledgement will remain until the host returns to an UP state. Otherwise the acknowledgement will automatically be removed when the host changes state. If the 'notify' option is set to one (1), a notification will be sent out to contacts indicating that the current host problem has been acknowledged. If the 'persistent' option is set to one (1), the comment associated with the acknowledgement will remain once the acknowledgement is removed. If not, the comment will be deleted when the acknowledgement is removed.","classes":["host","comment"],"argsStr":";host_name;sticky;notify;persistent;end_time;author;comment","exampleArgStr":";host1;1;1;1;1478638441;naemonadmin;This is an example comment."};
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
