module.exports = (app) => {
    const customers = require("../controller/customer.controller");
    const router = require('express').Router();

    // Create a new Customer
    router.post("/", customers.create);

    // Retrieve all Customers
    router.get("/", customers.findAll);

    router.get("/query/", customers.findAllByName)

    // Retrieve a single Customer with id
    router.get("/:id", customers.findOne);

    // Update a Customer with id
    router.put("/:id", customers.update);

    // Delete a Customer with id
    router.delete("/:id", customers.delete);

    // Delete all Customers
    router.delete("/", customers.deleteAll);

    app.use('/api/customers', router);
};
