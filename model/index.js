const dbConfig = require('../config/db.config');

const {Sequelize, Op} = require('sequelize');
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
);

const db = {};

db.sequelize = sequelize;
db.SequelizeOp = Op;

db.customers = require('../model/customer.model')(sequelize, Sequelize);

module.exports = db;
