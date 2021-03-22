#!/usr/bin/env bash

if [[ "$NODE_ENV" ]]; then
  echo "Building Angular app for $NODE_ENV"

  build_cmd="ng build --aot --prod -c ${NODE_ENV}"
  echo "running \"$build_cmd\""
  eval "$build_cmd"

else
  echo "Building Angular app for DEV"

  build_cmd="ng build"
  echo "running \"$build_cmd\""
  eval "$build_cmd"

fi
