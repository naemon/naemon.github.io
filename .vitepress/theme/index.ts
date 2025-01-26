// .vitepress/theme/index.js
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import '@fortawesome/fontawesome-free/css/all.css'
import './naemon.css'
import News from './News.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {

    // Load global variables from .env file
    // VITE_RELEASE_VERSION will become available as $RELEASE_VERSION in the Markdown files
    app.config.globalProperties.$RELEASE_VERSION = import.meta.env.VITE_RELEASE_VERSION
    app.config.globalProperties.$RELEASE_DATE = import.meta.env.VITE_RELEASE_DATE

    app.component('news', News)
  }
} satisfies Theme