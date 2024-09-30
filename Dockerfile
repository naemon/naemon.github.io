FROM alpine:3.19

# This is highly inspired from https://github.com/Starefossen/docker-github-pages
# Many thanks
# Also thanks to https://pmarinova.github.io/2023/10/10/running-github-pages-gem-locally-with-docker.html

RUN apk --update add --virtual build_deps \
    build-base ruby-dev libc-dev linux-headers jekyll
RUN gem install --verbose --no-document github-pages bundler

RUN mkdir -p /site

WORKDIR /site

EXPOSE 4000

CMD bundle install && bundle exec jekyll serve --watch --force_polling -H 0.0.0.0 -P 4000
