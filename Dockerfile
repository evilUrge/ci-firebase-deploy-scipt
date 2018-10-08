FROM node:8-alpine

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

COPY . /app
WORKDIR /app

RUN apk add make python && \
    npm install --production
CMD node deploy.js
