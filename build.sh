#!/bin/bash

rm -r build
mkdir build

cp -r ./src/backend/config ./build
cp -r ./src/backend/database ./build
cp -r ./src/backend/middleware ./build
cp -r ./src/backend/models ./build
cp -r ./src/backend/routes ./build
cp -r ./src/backend/updater ./build
cp -r ./src/backend/websocket ./build

cp ./src/backend/*.js ./build
cp ./src/backend/package*.json ./build

cd src/admin
npm run build

mkdir ../../build/public
mkdir ../../build/public/admin
cp -r ./build/* ../../build/public/admin

cd ../app
npm run build

mkdir ../../build/public/app
cp -r ./build/* ../../build/public/app

cd ../..

docker build -t willebergh/lbs-dashboard .
docker push willebergh/lbs-dashboard