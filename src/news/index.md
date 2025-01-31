---
editLink: false
prev: false
next: false
---

<script setup>
import { data as posts } from './posts.data.mts'
</script>

# News <span style="float: right; font-size: medium;"><i class="fas fa-rss"></i> [News Feed](./feed.rss)</span>

<template v-for="post in posts">
  <div>
    <h2 :id="post.title">
      <a :href="post.url">{{ post.title }}</a>
    </h2>
	<div v-html="post.html"></div>
  </div>
</template>
