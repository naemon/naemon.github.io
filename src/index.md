---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Naemon"
  text: "Network Application and Event Monitor"
  tagline: Naemon is the new monitoring suite that aims to be fast, stable and innovative while giving you a clear view of the state of your network and applications.
  image:
    light: ./images/pixel/naemon_light.png
    dark: ./images/pixel/naemon_dark.png
    alt: Naemon Logo
  actions:
    - theme: brand
      text: Download
      link: /download
    - theme: alt
      text: Quick Start
      link: /documentation

features:
  - title: The Core
    details: The Naemon core is a network monitoring tool based on the Nagios 4 core, but with many bug fixes, new features, and performance enhancements. If you today use Nagios, you should switch to Naemon to get bugfixes, new features, and performance enhancements.
    link: /documentation/usersguide/whatsnew
    linkText: Changelog

  - title: The Suite
    details: Rather than the Nagios way of putting everything from UI to check scheduler in one package, we like to keep things more modular. The sum of all the modules that we build and ship will give you a good monitoring suite.
    link: /suite
    linkText: Suite Information

  - title: The Project
    details: Naemon is created by the community, for the community, and (soon) owned by the community ourselves. This lets us be governed by our needs, rather than corporate profit motives.
    link: /project
    linkText: Project Information
---

