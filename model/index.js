const dbConfig = require('../config/db.config');

const {Sequelize, Op, DataTypes} = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.dialect,
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

// add models(tables/entities)
db.customers = require('../model/customer.model')(sequelize, DataTypes);
db.boxSizes = require('../model/boxsize.model')(sequelize, DataTypes);
db.strawSizes = require('../model/strawsize.model')(sequelize, DataTypes);
db.orders = require('../model/order.model')(sequelize, DataTypes);
db.products = require('../model/product.model')(sequelize, DataTypes);

// create relationship
db.BoxSizesToProducts = db.boxSizes.hasMany(db.products);
db.ProductsToBoxSizes = db.products.belongsTo(db.boxSizes);

db.StrawSizesToProducts = db.strawSizes.hasMany(db.products);
db.ProductsToStrawSizes = db.products.belongsTo(db.strawSizes);

db.CustomerToOrders = db.customers.hasMany(db.orders);
db.OrdersToCustomer = db.orders.belongsTo(db.customers);

db.products.hasMany(db.orders);
db.orders.belongsTo(db.products);


module.exports = db;
