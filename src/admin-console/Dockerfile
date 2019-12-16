FROM node

RUN mkdir /app
RUN mkdir /app/public

WORKDIR /app

COPY ./build ./public
COPY ./server.js .

RUN ls

RUN npm install express

CMD ["node", "server.js"]