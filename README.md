# Naemon Documentation

This repository contains the documentation and website of the Naemon project.

The naemon website.

Build with [VitePress](https://vitepress.dev/).

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

[a relative link](other_file.md)

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
