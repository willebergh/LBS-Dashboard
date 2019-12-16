#!/bin/bash

mkdir build

cp -r ./src/backend/config ./build
cp -r ./src/backend/database ./build
cp -r ./src/backend/middleware ./build
cp -r ./src/backend/models ./build
cp -r ./src/backend/routes ./build
cp -r ./src/backend/updater ./build
cp -r ./src/backend/websocket ./build

cp ./src/backend/.env ./build
cp ./src/backend/*.js ./build
cp ./src/backend/package*.json ./build

cd src/app
npm run build

mkdir ../../build/app
cp -r ./build/* ../../build/app