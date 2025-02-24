<script setup>
import { useData } from 'vitepress';
import { onMounted } from 'vue';

const { frontmatter } = useData();

onMounted(() => {
  if(frontmatter.value.url) {
    window.location.href = frontmatter.value.url;
  }
});
</script>

<meta http-equiv="refresh" :content=' "0;url="+frontmatter.url'>

# Redirect

Page has moved here: <a :href=$frontmatter.url>{{ $frontmatter.url }}</a>

