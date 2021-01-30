require('dotenv');

module.exports = {
  name: 'default',
  type: 'mongodb',
  host: 'localhost',
  port: process.env.MONGO_PORT,
  useUnifiedTopology: true,
  entities: ['./dist/modules/**/infra/typeorm/schemas/*.ts'],
};
