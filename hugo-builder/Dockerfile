# see: http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html

# TODO: adding user screws up permissions right now
# NB: Remember this is not a Debian environs
FROM mhart/alpine-node:latest

# RUN useradd --user-group --create-home --shell /bin/false app-user

ENV HOME=/home/app-user

COPY package.json $HOME/app/
# RUN chown -R app-user:app-user $HOME/*

# USER app-user
WORKDIR $HOME/app
# RUN npm install
RUN yarn
# RUN npm install gulp-cli -g

CMD ["yarn", "serve"]
