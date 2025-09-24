#!/usr/bin/env sh

set -eux

echo "[setup_development] Configuring development environment..."

cd /home/node/ghost/content/themes/carpeaqua-template
npm install
cd /home/node/ghost
ghost start

echo "[setup_development] Done."
