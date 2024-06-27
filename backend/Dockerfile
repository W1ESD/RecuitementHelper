FROM node:latest

RUN apt-get update

WORKDIR /app

COPY *.json /app/

RUN npm install --force

COPY . /app/

ENTRYPOINT ["sh", "script.sh"]