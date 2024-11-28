const { Sequelize } = require('sequelize');

// supabase (postgres database)
const HOST = 'aws-0-ap-south-1.pooler.supabase.com'
const DB_NAME = 'postgres'
const DB_PORT = 6543
const DB_USERNAME = 'postgres.krbvaswyetvzhhxvacfh'
const DB_PASSWORD = 'type_orm_curd_project'

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: HOST,
  dialect: "postgres"
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


const db = {}
db.users = require('./users.models')(sequelize, Sequelize)

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
