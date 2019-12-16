#!/bin/bash

cd ../src/app

npm install

npm run build

sudo docker build -t willebergh/lbs-dashboard-app .

cd ../../scripts