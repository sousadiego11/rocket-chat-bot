FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5002

RUN yarn build

CMD yarn start
