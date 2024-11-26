FROM node:18-alpine

EXPOSE 3000

WORKDIR /react-vite-app

COPY package.json .

RUN yarn install

COPY . .

CMD [ "yarn","build"]