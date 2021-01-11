// module.exports = {
//     HOST: 'localhost',
//     USER: 'cocostraw',
//     PASSWORD: 'cocostraw',
//     DB: 'cocostrawdb',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };

// FOR PRODUCTION
module.exports = {
    HOST: process.env.RDS_HOST,
    USER: process.env.RDS_USER,
    PASSWORD: process.env.RDS_PASSWORD,
    PORT: process.env.RDS_PORT,
    DB: process.env.RDS_DB_NAME,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
