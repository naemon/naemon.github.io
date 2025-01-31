---
editLink: false
breadcrumb: true
head: [
  [ 'script', { src: 'index.js' } ]
]
---

<script setup>
import { data as commands } from './commands.data.mts'
</script>

<h1>External Commands</h1>

<p>
  Find a complete list of available external commands. A description along with
  required arguments is available on the details page of each command.
</p>

Filter by Category:
<select onchange="_update_cmd_filter(this.value)">
    <option value="">All</option>
    <option value="host">Host</option>
    <option value="hostgroup">Hostgroup</option>
    <option value="service">Service</option>
    <option value="servicegroup">Servicegroup</option>
    <option value="contact">Contact</option>
    <option value="contactgroup">Contactgroup</option>
    <option value="comment">Comments</option>
    <option value="downtime">Downtimes</option>
    <option value="notification">Notifications</option>
    <option value="process">Core process</option>
</select>

<template v-for="command in commands">
  <div :class="'js-command '+command.classes.join(' ')">
    <h3 :id="command.name" style="font-size: smaller; margin: 2px;">
      <a :href="command.name.toLowerCase() + '.html'">{{ command.name }}</a>
    </h3>
  </div>
</template>
