FROM node

RUN mkdir /app
RUN mkidr /app/public

WORKDIR /app

COPY ./build ./public


RUN ls

RUN npm install express

CMD ["node", "index.js"]