#!/bin/bash

readonly SCHEDULER_PATH="$1"
readonly NODE_BIN=$(command -v node || which node)
readonly ENV_PATH="${SCHEDULER_PATH%scheduler.js}.env"

readonly DELAY=$((RANDOM % (13 * 60 * 60)))
readonly DELAY_MINUTES=$((DELAY / 60))

date

echo "Run scheduler.js (mongo-verba) with '$DELAY_MINUTES' minutes delay"

echo "'$SCHEDULER_PATH' scheduler path"
echo "'$NODE_BIN' node path"
echo "'$ENV_PATH' .env file path"

sleep "$DELAY" && "$NODE_BIN" --env-file="$ENV_PATH" "$SCHEDULER_PATH"