#!/usr/bin/make -f

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

docker-build:
	docker build -t naemon/docs .
	$(DOCKERRUN) npm run docs:build

docker-server:
	docker build -t naemon/docs .
	$(DOCKERRUN)
