FROM node:16

RUN mkdir -p /media

RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "serve" ]