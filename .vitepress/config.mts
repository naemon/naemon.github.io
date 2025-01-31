import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { defineConfig, createContentLoader, type SiteConfig } from 'vitepress'

const hostname: string = 'https://www.naemon.io'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: "Naemon - Monitoring Suite",
  description: "Naemon is the new monitoring suite that aims to be fast, stable and innovative while giving you a clear view of the state of your network and applications.",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  markdown: {
    math: true
  },

  srcDir: 'src',

  // Can be removed as soon as the legacy content is removed
  srcExclude: ['**/legacy/**'],

  vite: {
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..', '../..'],
      },
    }
  },

  // https://vitepress.dev/guide/routing#generating-clean-url
  cleanUrls: true,

  themeConfig: {

    logo: '/images/svg/naemonlogo.svg',
    siteTitle: false,

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Download', link: '/download/' },
      {
        text: 'Documentation',
        activeMatch: `^/documentation/`,
        items: [
          { text: 'Users Guide', link: '/documentation/usersguide/toc' },
          { text: 'Developers', link: '/documentation/developer/toc' },
          { text: 'FAQ', link: '/documentation/faq' },
        ]
      },
      { text: 'News', link: '/news' },
      { text: 'Get involved', link: '/community' },
    ],

    // show h2 and h3 in the outline menu (On this page)
    // https://vitepress.dev/reference/default-theme-config#outline
    outline: [2, 3],

    sidebar: [
      { text: 'News', link: '/news/' },
      { text: 'Download', link: '/download/' },
      {
        text: 'Documentation',
        link: '/documentation/',
        collapsed: false,
        items: [
          {
            text: 'Users Guide',
            link: '/documentation/usersguide/toc',
            collapsed: true,
            items: [
              { text: 'What is Naemon', link: '/documentation/usersguide/about' },
              { text: 'What\'s New', link: '/documentation/usersguide/whatsnew' },
              { text: 'Configuration Incompatibilities Nagios 3 -> Naemon', link: '/documentation/usersguide/config-incompat3to4' },
              { text: 'Support', link: '/documentation/usersguide/support' },
              { text: 'Advice for Beginners', link: '/documentation/usersguide/beginners' },
              {
                text: 'Quickstart Installation Guides', link: '/documentation/usersguide/quickstart', items: [
                  { text: 'Ubuntu', link: '/documentation/usersguide/quickstart-ubuntu' },
                  { text: 'Debian', link: '/documentation/usersguide/quickstart-debian' },
                  { text: 'Red Hat', link: '/documentation/usersguide/quickstart-redhat' },
                  { text: 'CentOS', link: '/documentation/usersguide/quickstart-centos' },
                  { text: 'SLES', link: '/documentation/usersguide/quickstart-sles' },
                  { text: 'Addon PNP4Nagios', link: '/documentation/usersguide/addon-pnp-quickstart' }
                ]
              },
              { text: 'Upgrading Naemon', link: '/documentation/usersguide/upgrading' },
              {
                text: 'How to monitor', items: [
                  { text: 'Windows', link: '/documentation/usersguide/monitoring-windows' },
                  { text: 'Linux / Unix', link: '/documentation/usersguide/monitoring-linux' },
                  { text: 'Network Printer', link: '/documentation/usersguide/monitoring-printers' },
                  { text: 'Routers / Switches', link: '/documentation/usersguide/monitoring-routers' },
                  { text: 'Network Services', link: '/documentation/usersguide/monitoring-networkservices' },
                ]
              },


              { text: 'Verifying configuration', link: '/documentation/usersguide/verifyconfig/' },
              { text: 'Restart Naemon', link: '/documentation/usersguide/startstop/' },
              { text: 'Configuration Overview', link: '/documentation/usersguide/config/' },
              { text: 'Main configuration file options', link: '/documentation/usersguide/configmain/' },
              { text: 'Object configuration overview', link: '/documentation/usersguide/configobject/' },
              { text: 'Object definitions', link: '/documentation/usersguide/objectdefinitions/' },
              { text: 'CGI Configuration File Options', link: '/documentation/usersguide/configcgi/' },
              { text: 'Authentication And Authorization CGIs', link: '/documentation/usersguide/cgiauth/' },
              { text: 'Plugins', link: '/documentation/usersguide/plugins/' },
              { text: 'Macros', link: '/documentation/usersguide/macros/' },
              { text: 'Standard Macros in Naemon', link: '/documentation/usersguide/macrolist/' },
              { text: 'Host Checks', link: '/documentation/usersguide/hostchecks/' },
              { text: 'Service Checks', link: '/documentation/usersguide/servicechecks/' },
              { text: 'Active Checks', link: '/documentation/usersguide/activechecks/' },
              { text: 'Passive Checks', link: '/documentation/usersguide/passivechecks/' },
              { text: 'State Types', link: '/documentation/usersguide/statetypes/' },
              { text: 'Time Periods', link: '/documentation/usersguide/timeperiods/' },
              { text: 'Network Reachability', link: '/documentation/usersguide/networkreachability/' },
              { text: 'Notifications', link: '/documentation/usersguide/notifications/' },
              { text: 'Information on the CGIs', link: '/documentation/usersguide/cgis/' },
              { text: 'Event handlers', link: '/documentation/usersguide/eventhandlers/' },
              { text: 'Volatile services', link: '/documentation/usersguide/volatileservices/' },
              { text: 'Freshness Checks'  , link: '/documentation/usersguide/freshness/' },
              { text: 'Distributed monitoring' , link: '/documentation/usersguide/distributed/' },
              { text: 'Redundancy monitoring', link: '/documentation/usersguide/redundancy/' },
              { text: 'Flap Detection', link: '/documentation/usersguide/flapping/' },
              { text: 'Notification escalations', link: '/documentation/usersguide/escalations/' },
              { text: 'On-call rotations', link: '/documentation/usersguide/oncallrotation/' },
              { text: 'Monitoring Clusters', link: '/documentation/usersguide/clusters/' },

              { text: 'Naemon Logo', link: '/logo' }
            ]
          },
          {
            text: 'Developers',
            link: '/documentation/developer/toc',
            collapsed: true,
            items: [
              { text: 'External Commands', link: '/documentation/developer/externalcommands/' },
              { text: 'Query Handlers', link: '/documentation/developer/queryhandlers/' },
              { text: 'Livestatus', link: '/documentation/developer/livestatus/' },
              { text: 'Naemon Event Broker Modules (NEB)', link: '/documentation/developer/neb_broker/' },
              { text: 'API Incompatibilities between Nagios 3', link: '/documentation/developer/api-incompat3to4/' },
              { text: 'Check Result Spoolfolder', link: '/documentation/developer/spoolfolder/' },
              { text: 'Worker Processes', link: '/documentation/developer/workers/' },
              { text: 'Build Naemon From Scratch', link: '/documentation/developer/build/' },
              { text: 'Naemon Website', link: '/documentation/developer/website/' }
            ]
          },
          {
            text: 'FAQ',
            link: '/documentation/faq',
            collapsed: true,
            items: [
              { text: 'Usersguide guidelines', link: '/documentation/faq/usersguide-guidelines/' },
              { text: 'Markdown guide', link: '/documentation/faq/vitepress-markdown-guide/' }
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/naemon' },
      { icon: 'x', link: 'https://x.com/naemoncore' }
    ],

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/naemon/naemon.github.io/edit/main/:path'
    }
  },

  // rewrite urls from existing news
  // https://vitepress.dev/reference/site-config#routing
  rewrites: {
    'news/:year(\\d+)-:mon(\\d+)-:day(\\d+)-:slug(.*\\.md)': 'project/:year/:mon/:day/:slug'
  },

  // write news feed from news folder
  buildEnd: async (config: SiteConfig) => {
    const feed = new Feed({
      title: 'Naemon',
      description: 'Naemon news blog',
      id: hostname,
      link: hostname,
      language: 'en',
      image: `${hostname}/public/images/logo/logo_small.png`,
      favicon: `${hostname}/public/favicon.ico`,
      copyright:
        'Copyright (c) 2025-present, Naemon Team'
    })

    const posts = await createContentLoader('news/*.md', {
      excerpt: true,
      render: true
    }).load()

    posts.sort(
      (a, b) =>
        +new Date(b.frontmatter.date as string) -
        +new Date(a.frontmatter.date as string)
    )

    for (const { url, excerpt, frontmatter, html } of posts) {
      feed.addItem({
        title: frontmatter.title,
        id: `${hostname}${url}`,
        link: `${hostname}${url}`,
        description: excerpt,
        content: html,
        author: [
          {
            name: 'Naemon Team',
            email: 'team@naemon.io',
            link: hostname
          }
        ],
        date: frontmatter.date
      })
    }

    writeFileSync(path.join(config.outDir, 'news/feed'), feed.rss2())
    writeFileSync(path.join(config.outDir, 'news/feed.rss'), feed.rss2())
  }
})
