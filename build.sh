#!/usr/bin/env bash

if [[ "$NODE_ENV" ]]; then
  echo "Building Angular app for $NODE_ENV"
  # install angular-cli
  cli_cmd="npm install -g @angular/cli"
  echo "Installing cli : $cli_cmd"
  eval "$cli_cmd"
  build_cmd="ng build --aot --prod --build-optimizer false -c ${NODE_ENV}"
  echo "running \"$build_cmd\""
  eval "$build_cmd"

else
  echo "Building Angular app for DEV"

  build_cmd="ng build"
  echo "running \"$build_cmd\""
  eval "$build_cmd"

fi
