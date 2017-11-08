# see: http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html
# FROM node:4.3.2
# FROM node:boron
FROM node:8.8.0

RUN useradd --user-group --create-home --shell /bin/false app-user

ENV HOME=/home/app-user

COPY package.json npm-shrinkwrap.json $HOME/app/
RUN chown -R app-user:app-user $HOME/*

USER app-user
WORKDIR $HOME/app
RUN npm install

CMD ["npm", "start"]
