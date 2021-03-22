# Installing dependences
FROM node:12.19 AS sources

COPY package*.json yarn.lock /app/

WORKDIR /app/
RUN yarn --pure-lockfile --mutex file --network-concurrency 1

# Building sources
FROM node:12.19 AS production

COPY --from=sources /app/ /app/
COPY . /app/

WORKDIR /app/

ARG MODE=development
ENV NODE_ENV=$MODE

RUN yarn build

# Nginx
FROM nginx:1.19

COPY ./environment/nginx/config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=production /app/dist/lavka-dostavka /usr/share/nginx/html
