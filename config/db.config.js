// module.exports = {
//     HOST: 'localhost',
//     USER: 'cocostraw',
//     PASSWORD: 'cocostraw',
//     DB: 'cocostrawdb',
//     // PORT: 8080,
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
    HOST: process.env.RDS_HOSTNAME,
    USER: process.env.RDS_USERNAME,
    PASSWORD: process.env.RDS_PASSWORD,
    PORT: process.env.port,
    DB: process.env.RDS_DB_NAME,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
