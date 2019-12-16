FROM node

RUN mkdir /app
RUN mkdir /app/public

WORKDIR /app

COPY ./build /app/public
COPY ./server.js /app

RUN ls

RUN npm install express

CMD ["node", "server.js"]