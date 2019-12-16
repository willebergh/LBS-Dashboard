#!/bin/bash

cd ../src/admin-console

npm install

npm run build

sudo docker build -t willebergh/lbs-dashboard-admin-console .

cd ../../scripts