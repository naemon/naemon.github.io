#!/usr/bin/make -f

SHELL=bash
PWD=$(shell pwd)
DOCKERRUN=docker run \
	--rm -it \
	-p 5173:5173 \
	--name=naemon-docs \
	-v $(PWD):/opt/node_app/app \
	-v /opt/node_app/node_modules/ \
	-v /opt/node_app/app/.vitepress/cache \
	-v /opt/node_app/app/.vitepress/dist \
	-v $(PWD)/package.json:/opt/node_app/package.json \
	naemon/docs:latest

.PHONY: test

build: node_modules
	npm run docs:build

server: node_modules
	npm run docs:dev

node_modules:
	npm install --verbose --include=dev && npm cache clean --force

docker-build:
	docker build -t naemon/docs .
	$(DOCKERRUN) npm run docs:build

docker-server:
	docker build -t naemon/docs .
	$(DOCKERRUN)

clean:
	rm -rf node_modules
	rm -rf .vitepress/dist/
	rm -rf .vitepress/cache/
	rm -rf package-lock.json
	rm -rf src/documentation/developer/externalcommands/commands.c.cache
	rm -rf src/public/news/feed.xml

update_livestatus_json:
	docker run --rm -ti \
		consol/omd-labs-rocky:nightly \
		bash -c "omd start >/dev/null; sudo su - demo -c \"echo -e 'GET columns\nColumns: table name description type\nOutputFormat: json\n' | lq\"" \
	> src/documentation/usersguide/livestatus.columns.json
	fromdos src/documentation/usersguide/livestatus.columns.json

test:
	$(MAKE) build
	npm run test
