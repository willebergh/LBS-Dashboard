FROM node

RUN mkdir /app
RUN mkdir /app/public

WORKDIR /app

COPY ./build ./public
COPY ./server.js .

RUN npm init -y
RUN npm install express

CMD ["node", "server.js"]