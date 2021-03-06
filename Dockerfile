FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN ls
RUN npm install

COPY . .

CMD ["node", "src/index.js" ]