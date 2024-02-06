FROM alpine:3.19

# This is highly inspired from https://github.com/Starefossen/docker-github-pages
# Many thanks

RUN apk --update add --virtual build_deps \
    build-base ruby-dev libc-dev linux-headers jekyll
RUN gem install --verbose --no-document github-pages bundler

RUN mkdir -p /site

WORKDIR /site

EXPOSE 4000

CMD bundle exec jekyll serve --watch --force_polling -H 0.0.0.0 -P 4000

# docker build . -t naemon/docs
# docker run --rm -it -v "$PWD":/site -p "4000:4000" naemon/docs:latest