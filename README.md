# Naemon Documentation

This repository contains the documentation and website of the Naemon project.

The naemon website.

## Contributing

This site is built with [VitePress](https://vitepress.dev/). The site content is written in Markdown located in the `src` folder. For simple edits, you can directly edit the file on GitHub and generate a Pull Request.

## Work in process

We are currently migrating the website from [Jekyll](http://jekyllrb.com/) to [VitePress](https://vitepress.dev/).
To do so, all old files got moved into the `legacy` folder using `git mv`. This will prevent to git history.

To migrate a page from Jekyll to VitePress, you have to use the `git mv` command, to move the file from the `legacy` folder into the
new VitePress project located in `src`.

```sh
git mv legacy/documentation/usersguide/config-incompat3to4.md src/documentation/usersguide/
```

In the next step, edit the file, apply all the required changes and command your work.

## Run development server

Please see the documentation of how to setup a local copy of the Naemon website.

[Run Naemon Website Locally](./documentation/developer/website.md)

### In a nutshell

```sh
git clone https://github.com/naemon/naemon.github.io.git
cd naemon.github.io/

npm install
npm run docs:dev
```

### Using Docker

In case you do not want to install Nodejs to your system, you can also use Docker

First build the Docker image which will contain N Nodejs - thats all this documentation has no dependencies

```sh
docker build . -t naemon/docs
```

or simply run:

```sh
make docker-build
```

Now run the Docker container and navigate to `http://127.0.0.1:5173` in your browser.
The container watches for file changes and will automatically regenerate the website if needed.

```sh
docker run \
  --rm -it \
  -p 5173:5173 \
  --name=naemon-docs \
  -v $PWD:/opt/node_app/app \
  -v /opt/node_app/node_modules/ \
  -v /opt/node_app/app/.vitepress/cache \
  -v /opt/node_app/app/.vitepress/dist \
  -v $PWD/package.json:/opt/node_app/package.json \
  naemon/docs:latest
```

or simply run:

```sh
make docker-server
```

### Important for the Migration

1. Remove all HTML from the Markdown files. Probably in 99% it's not required and can be done using Markdown.
2. All headlines have to get reduced by one ( remove one hashtag `###` gets to `##`)
3. You can modify HTML anchors like so: `## What Is Naemon? {#whatis}`
4. Add code blocks `like this` for code instead of quotes 'like so'.

### Goals and Motivation

1. Get a dependency free documentation, (only Nodejs and VitePress) but no GitHub Pages, Jekyll and Ruby anymore.
2. Modern Design with Light and Dark mode
3. Search
4. All images should be replaced with SVGs
5. All HTML should be replaced with Markdown. This ensures that the documentation can be modified more easily.
6. Be compatible to old URLs whenever possible.
