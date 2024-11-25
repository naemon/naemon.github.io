FROM node:22-alpine

RUN mkdir -p /site

WORKDIR /site

COPY package.json /site/package.json

RUN npm install --verbose

EXPOSE 5173

CMD npm run docs:dev
