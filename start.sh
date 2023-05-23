#!/bin/bash

source setup.sh

# now run the app
if [ "$NODE_ENV" = "development" ]; then
  nodemon
else
  npm run build
  node --harmony dist/server/app.js
fi
