FROM node:18-alpine

ENV TZ=America/Sao_Paulo

RUN apk update
RUN apk add tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5002

RUN yarn build

CMD yarn start
