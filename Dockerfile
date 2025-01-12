# I choose the bookworm version over the alpine based one
# because the bookworm image came with some essentials such as
# bash which makes debugging WAY easier
FROM node:22-bookworm

EXPOSE 5173

RUN npm i npm@latest -g

WORKDIR /opt/node_app

COPY package.json package-lock.json* ./
RUN npm install --verbose --include=dev && npm cache clean --force
ENV PATH /opt/node_app/node_modules/.bin:$PATH

HEALTHCHECK --interval=30s CMD node healthcheck.js

WORKDIR /opt/node_app/app
COPY . .

CMD ["npm", "run", "docs:dev"]
