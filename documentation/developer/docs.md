---
layout: doc
title: Naemon Documentation
---

#### Run Naemon Website Locally

For example on Ubuntu 12.04. We don't have a recent bundler here, so just use
gem directly.

```bash
  %> sudo apt-get install ruby1.9.3 ruby1.9.1-dev   # yes, thats not a typo
  %> cd /tmp && git clone https://github.com/naemon/naemon.github.io.git
  %> cd /tmp/naemon.github.io
  %> GEM_HOME=.gem gem1.9.3 install github-pages
  %> GEM_HOME=.gem ./.gem/bin/jekyll serve --watch
```

After the initial install, only the last step is required to start the server.
