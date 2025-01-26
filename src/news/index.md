---
editLink: false
sidebar: false
prev: false
next: false
---

<script setup>
import { data as posts } from './posts.data.mts'
</script>

# News <span style="float: right; font-size: medium;"><i class="fas fa-rss"></i> [News Feed](./feed.rss)</span>

<div v-for="post of posts" style="list-style-type: none;">

## <a :href="post.url">{{ post.title }}</a>

{{ post.date.string }}

<div v-html="post.html"></div>

</div>
