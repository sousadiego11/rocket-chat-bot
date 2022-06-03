FROM node:18-alpine

ENV TZ=America/Sao_Paulo

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5002

RUN yarn build

CMD yarn start
