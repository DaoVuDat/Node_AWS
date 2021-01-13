// the file name of this will be called because of the appearance of "main" in package.json
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./model");
const dbConfig = require("./config/db.config");



// force: true is for "In development, you may need to drop existing tables and re-sync database"
// FOR DEVELOPMENT ONLY
// use Migration of Sequelize in PRODUCTION
db.sequelize.sync()
    .then(value => {
        console.log("Drop and re-sync db.");
    });

// app.post("/create", ((req, res) => {
//     const name = req.body.name;
//     const age = req.body.age;
//     const position = req.body.position;
//     const country = req.body.country;
//     const wage = req.body.wage;
//
//     db.query(
//         'INSERT INTO employees (name, age, position, country, wage) VALUES (?, ?, ?, ?, ?)',
//         [name, age, position, country, wage],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log("okay ?");
//                 res.send("Value inserted");
//             }
//         }
//     );
// }));

// app.get(path = "/", (req, res) => {
//     res.json({
//         message: "Hello world",
//     });
// });

// Loading router
require("./route/customer.route")(app);
// require("./route/box_size.route")(app);
// require("./route/straw_size.route")(app);
// require("./route/product.route")(app);
// require("./route/order.route")(app);

const PORT = dbConfig.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
module.exports = app;
