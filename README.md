# Naemon Documentation

This repository contains the documentation and website of the Naemon project.

The naemon website.

## Contributing

This site is built with [VitePress](https://vitepress.dev/). The site content is written in Markdown located in the `src` folder. For simple edits, you can directly edit the file on GitHub and generate a Pull Request.

## Work in process

We are currently migrating the website from [Jekyll](http://jekyllrb.com/) to [VitePress](https://vitepress.dev/).
To do so, all old files got moved into the `legacy` folder using `git mv`. This will prevent to git history.

To migrate a page from Jekyll to VitePress, you have to use the `git mv` command, to move the file from the `legacy` folder into the
new VitePress project.

```
git mv legacy/README.md README.md
```

In the next step, edit the file, apply all the required changes and command your work.


## Run development server

Please see the documentation of how to setup a local copy of the Naemon website.

[Run Naemon Website Locally ](./documentation/developer/website.md)

### In a nutshell
```
git clone https://github.com/naemon/naemon.github.io.git
cd naemon.github.io.git/

npm install
npm run docs:dev
```

### Using Docker
In case you do not want to install Nodejs to your system, you can also use Docker

First build the Docker image which will contain N Nodejs - thats all this documentation has no dependencies
```
docker build . -t naemon/docs
```

Now run the Docker container and navigate to `http://127.0.0.1:5173` in your browser.
The container watches for file changes and will automatically regenerate the website if needed.

```
docker run --rm -it -v "$PWD":/site -p "5173:5173" naemon/docs:latest
```

### Important for the Migration

1. Remove all HTML from the Markdown files. Probably in 99% it's not required and can be done using Markdown.
2. All headlines have to get reduced by one ( remove one hashtag `###` gets to `##`)
3. You can modify HTML anchors like so: `## What Is Naemon? {#whatis}`
4. Add code blocks `like this` for code instead of quotes 'like so'.