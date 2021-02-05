# Base Images
FROM node:14.15.4-slim AS build

WORKDIR /usr/src/app

COPY package.json  ./

RUN npm install && npm install -g @angular/cli

COPY . .
