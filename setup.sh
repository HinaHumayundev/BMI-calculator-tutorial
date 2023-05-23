#!/bin/bash

# This start script looks for environment variables in build/env-*** where *** is
# the value of NODE_ENV. A env-sample file is included in the repository as a guide,
# but all other build/env-* files will be ignored and only exist locally.

# set -e
echo "Running setup.sh"
export DEBUG_FD=1 # https://github.com/visionmedia/debug/blob/master/src/node.js#L55

if [ -z "$NODE_ENV" ]; then
    export NODE_ENV=development
    echo "NODE_ENV is not set! Defaulting to 'development'."
fi

[ -f "./build/env-$NODE_ENV" ] && source ./build/env-$NODE_ENV;

# Do a quick test to ensure key environment variables exist
for name in HTTP_PORT; do
  eval "[ -z \"\${$name}\" ]" && echo "Error: \$$name not set!" && ERR=1;
done

if [ "$ERR" ]; then
  echo
  echo "Could not find environment variables for $NODE_ENV! Please add them to build/env-$NODE_ENV - use build/env-sample as a guide."
  exit 1;
fi

