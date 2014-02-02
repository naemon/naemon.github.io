naemon.github.io
================

The naemon website.

Written for [Jekyll](http://jekyllrb.com/), and relying on [bootstrap](http://getbootstrap.com/).

To get jekyll and all requirements in place, install bundler (`rubygems-bundler` on fedora, `bundler` on debian, `ruby-bundler` on ubuntu), and run `bundle install`. Then you should be able to should be serve the page up locally using `jekyll serve --watch`.


Install locally
---------------
For example on Ubuntu 12.04. We don't have a recent bundler here, so just use
gem directly.

  * #> apt-get install ruby1.9.3 ruby1.9.1-dev   # yes, thats not a typo
  * %> cd /tmp && git clone https://github.com/naemon/naemon.github.io.git
  * %> cd /tmp/naemon.github.io
  * %> GEM_HOME=.gem gem1.9.3 install github-pages
  * %> GEM_HOME=.gem ./.gem/bin/jekyll serve --watch

After the initial install, only the last step is required to start the server.


Troubleshooting
---------------

### extconf.rb:1:in `require': no such file to load -- mkmf (LoadError)

>         /usr/bin/ruby1.9.1 extconf.rb
> extconf.rb:1:in `require': no such file to load -- mkmf (LoadError)
>         from extconf.rb:1

This can be fixed by installing `ruby1.9.1-dev`, or the according dev package for your ruby version.
