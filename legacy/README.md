naemon.github.io
================

The naemon website.

Written for [Jekyll](http://jekyllrb.com/), and relying on [bootstrap](http://getbootstrap.com/).

Install locally
---------------
Read the online guide from github at:
https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/


Run locally using Docker
---------------

First build the Docker image which will contain Ruby, Jekyll and all the required dependencies
```
docker build . -t naemon/docs
```

Now run the Docker container and navigate to `http://127.0.0.1:4000` in your browser.
The container watches for file changes and will automatically regenerate the website if needed.

```
docker run --rm -it -v "$PWD":/site -p "4000:4000" naemon/docs:latest
```
