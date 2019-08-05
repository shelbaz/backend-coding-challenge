FROM node:latest

WORKDIR /home/app
RUN mkdir -p /home/app/src/build

COPY package.json ./
COPY package-lock.json ./

RUN npm ci
COPY . /home/app
EXPOSE 3000 5432

CMD npm run build
COPY ./src/build /home/app/src/build
CMD createdb cities
WORKDIR /home/app/src/server
CMD sequelize db:migrate
WORKDIR /home/app
CMD npm run start