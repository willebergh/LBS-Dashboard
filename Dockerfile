FROM node

RUN mkdir /app
WORKDIR /app

COPY ./build .

RUN npm install
RUN npm audit fix

CMD ["node", "index.js"]