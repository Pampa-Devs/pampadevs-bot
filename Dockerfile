FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN ls
RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "src/index.js" ]