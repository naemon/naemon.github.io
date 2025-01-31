// .vitepress/theme/index.js
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import '@fortawesome/fontawesome-free/css/all.css'
import './naemon.css'
import News from './News.vue'
import Breadcrumb from './components/Breadcrumb.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(Breadcrumb),
    });
  },
  enhanceApp({ app }) {
    // Load global variables from .env file
    // VITE_RELEASE_VERSION will become available as $RELEASE_VERSION in the Markdown files
    app.config.globalProperties.$RELEASE_VERSION = import.meta.env.VITE_RELEASE_VERSION
    app.config.globalProperties.$RELEASE_DATE = import.meta.env.VITE_RELEASE_DATE

    app.component('news', News)
  }
} satisfies Theme
