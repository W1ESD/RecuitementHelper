FROM node:latest

WORKDIR /app

COPY *.json /app/

RUN npm install --force

COPY . /app/

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]