# I choose the bookworm version over the alpine based one
# because the bookworm image came with some essentials such as
# bash which makes debugging WAY easier
FROM node:22-bookworm

RUN mkdir -p /site

WORKDIR /site

COPY package.json /site/package.json

RUN npm install --verbose

EXPOSE 5173

CMD ["npm", "run", "docs:dev"]
