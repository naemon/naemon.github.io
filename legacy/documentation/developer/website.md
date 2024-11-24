---
layout: doc
title: Documentation
---

### Run Naemon Website Locally

#### Ubuntu 12.04

For example on Ubuntu 12.04. We don't have a recent bundler here, so just use
gem directly.

```bash
  %> sudo apt-get install ruby1.9.3 ruby1.9.1-dev   # yes, thats not a typo
  %> cd /tmp && git clone https://github.com/naemon/naemon.github.io.git
  %> cd /tmp/naemon.github.io
  %> GEM_HOME=.gem gem1.9.3 install github-pages
```

After the initial installation, start the server with the following command:

```bash
  %> GEM_HOME=.gem ./.gem/bin/jekyll serve --watch
```


#### OSX

On OSX we use <a href="http://brew.sh">brew</a> to install ruby 1.9:

```bash
  %> brew install ruby193
  %> cd /tmp && git clone https://github.com/naemon/naemon.github.io.git
  %> cd /tmp/naemon.github.io
  %> PATH=/usr/local/opt/ruby193/bin:$PATH GEM_HOME=.gem gem install github-pages
```

After the initial installation, start the server with the following command:

```bash
  %> PATH=/usr/local/opt/ruby193/bin:$PATH GEM_HOME=.gem ./.gem/bin/jekyll serve --watch
```
