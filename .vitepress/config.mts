import { defineConfig } from 'vitepress'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: "Naemon - Monitoring Suite",
  description: "Naemon is the new monitoring suite that aims to be fast, stable and innovative while giving you a clear view of the state of your network and applications.",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  srcDir: 'src',

  // Can be removed as soon as the legacy content is removed
  srcExclude: ['**/legacy/**'],

  themeConfig: {

    logo: '/images/svg/naemonlogo.svg',
    siteTitle: false,

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Download', link: '/download' },
      {
        text: 'Documentation',
        activeMatch: `^/documentation/`,
        items: [
          { text: 'Users Guide', link: '/documentation/usersguide/toc' },
          { text: 'Developers', link: '/documentation/developer/toc' },
          { text: 'FAQ', link: '/documentation/faq' },
        ]
      },
      { text: 'Get involved', link: '/community' },
    ],

    // show h2 and h3 in the outline menu (On this page)
    // https://vitepress.dev/reference/default-theme-config#outline
    outline: [2, 3],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Download', link: '/download' },
        ]
      },
      {
        text: 'Documentation',
        link: '/documentation',
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


              { text: 'Verifying configuration', link: '/documentation/usersguide/verifyconfig' },
              { text: 'Restart Naemon', link: '/documentation/usersguide/startstop' },
              { text: 'Configuration Overview', link: '/documentation/usersguide/config' },
              { text: 'Main configuration file options', link: '/documentation/usersguide/configmain' },
              { text: 'Object configuration overview', link: '/documentation/usersguide/configobject' },
              { text: 'Object definitions', link: '/documentation/usersguide/objectdefinitions' },
              { text: 'CGI Configuration File Options', link: '/documentation/usersguide/configcgi' },
              { text: 'Authentication And Authorization CGIs', link: '/documentation/usersguide/cgiauth' },

              { text: 'Naemon Logo', link: '/logo' }
            ]
          },
          {
            text: 'Developers',
            link: '/documentation/developer/toc',
            collapsed: true,
            items: [
              { text: 'Build Naemon From Scratch', link: '/documentation/developer/build' },
              { text: 'Worker Processes', link: '/documentation/developer/workers' },
              { text: 'Naemon Event Broker Modules (NEB)', link: '/documentation/developer/neb_broker' },
              { text: 'API Incompatibilities between Nagios 3', link: '/documentation/developer/api-incompat3to4' },
              { text: 'Query Handlers', link: '/documentation/developer/queryhandlers' },
              { text: 'Check Result Spoolfolder', link: '/documentation/developer/spoolfolder' },
              { text: 'Naemon Website', link: '/documentation/developer/website' }
            ]
          },
          {
            text: 'FAQ',
            link: '/documentation/faq',
            collapsed: true,
            items: [
              { text: 'Usersguide guidelines', link: '/documentation/faq/usersguide-guidelines' },
              { text: 'Markdown guide', link: '/documentation/faq/vitepress-markdown-guide' }
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
  }
})