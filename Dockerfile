FROM node:latest

WORKDIR /usr/server

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD [ "node", "server/app.js" ]