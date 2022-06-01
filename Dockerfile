FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install & yarn build & yarn start

COPY . .

EXPOSE 5002

CMD yarn start
