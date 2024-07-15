FROM node:lts

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]