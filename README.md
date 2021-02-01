# 🤖️ BlackShift

A Node discord bot created to server management with typescript language.

<br>

### 🚧️ Requirements

- [Node](https://nodejs.org/en/)
- [Docker](https://www.docker.com/get-started)
- [Docker-compose](https://docs.docker.com/compose)

<br>

## 🤔️ How to run the project

- Install all dependencies with yarn `$ yarn` or npm `$ npm i`
- Clone the .env.example to .env `$ cp .env.example .env`
- Create the orm configuration for connect to database `$ cp ormconfig.development.ts ormconfig.ts` or `$ cp ormconfig.production.ts ormconfig.ts`
- Build the docker container into your machine with yarn `$ yarn docker:build` or npm `$ npm docker:build`
- Create the docker container into your machine with yarn `$ yarn docker:up` or npm `$ npm docker:up`
- After all this steps start the project with yarn `$ yarn start` or npm `$ npm start` and done !

<br>

`💭️ Don't forgot to put your discord bot token on .env file 💭️`

<br>

## 🚀️ Technologies

- [x] Typescript
- [x] Node
- [x] MongoDB
- [x] TypeOrm
- [x] Discord.js
- [x] Tsyringe
- [x] Doten
- [x] Docker

<b>Created with ❤️ by <a href="https://www.github.com/martins20">Martins20</a></b>
