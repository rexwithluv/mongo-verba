#!/bin/bash

SCHEDULER_PATH="$1"
NODE_BIN=".nvm/versions/node/v24.14.1/bin/node"

DELAY=$((RANDOM % (13 * 60 * 60)))
DELAY_MINUTES=$((DELAY / 60))

echo "Run scheduler.js (mongo-verba) with '$DELAY_MINUTES' minutes delay | '$SCHEDULER_PATH' scheduler path"

sleep $DELAY && node "$SCHEDULER_PATH"