#!/usr/bin/env sh

set -eux

echo "[setup_container] Starting container setup..."

npm install -g ghost-cli@latest
mkdir -p /home/node/ghost
sudo chown -R node:node /home/node/ghost
cd /home/node/ghost
ghost install local --check-empty false

echo "[setup_container] Done."
