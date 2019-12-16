#!/bin/bash


cd ../src/backend

mkdir build

cp -r ./config ./build
cp -r ./database ./build
cp -r ./middleware ./build
cp -r ./models ./build
cp -r ./routes ./build
cp -r ./updater ./build
cp -r ./websocket ./build

cp -r ./.env ./build
cp ./*.js ./build
cp -r ./package*.json ./build


