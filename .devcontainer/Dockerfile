# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.234.0/containers/javascript-node/.devcontainer/base.Dockerfile

ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}
LABEL maintainer="Justin Williams <justin@users.noreply.github.com>"

ENV NODE_ENV=development

#Installs basic commands and buildtools for sqlite3
RUN apt-get update
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get install -y --no-install-recommends sudo nano zsh

# create ghost install directory and install ghost cli
RUN mkdir -p /srv/www/ghost
RUN chown node:node /srv/www/ghost
RUN npm install ghost-cli@latest -g

# install ghost as node user
USER node
RUN cd /srv/www/ghost && ghost install local
RUN echo 'echo "command: yarn dev|build"' >> /home/node/.bashrc
