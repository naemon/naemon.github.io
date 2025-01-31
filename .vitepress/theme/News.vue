<script setup>
import VPDocFooter from 'vitepress/dist/client/theme-default/components/VPDocFooter.vue'
import { useData } from 'vitepress'
const { page, frontmatter } = useData()

const formatDate = function(raw) {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
}

const date = formatDate(frontmatter.value.date)

</script>

<style scoped>

div.news {
  margin: 20px 0;
  text-align: right;
}

div.main {
  max-width: 800px;
  margin: auto;
}

h3 {
  width: fit-content;
}

</style>

<template>

  <div class="main vp-doc" style="max-width: 700px; margin: 0 60px;">
    <div class="news"><a href="/news/feed.xml"><i class="fas fa-rss"></i> News Feed</a></div>

    <div style="display: flex; flex-direction: row; justify-content: space-between;">
      <h3>{{ frontmatter.title }}</h3>
      <h3>{{ date.string }}</h3>
    </div>
    <hr>
    <Content />
    <VPDocFooter>
    </VPDocFooter>
  </div>
</template>