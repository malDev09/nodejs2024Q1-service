FROM docker.io/library/node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]

ENV PORT 4000

EXPOSE $PORT