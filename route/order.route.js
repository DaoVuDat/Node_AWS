module.exports = (app) => {
    const orders = require("../controller/order.controller");
    const router = require('express').Router();

    // Create a new Order
    router.post("/", orders.createOrder);

    // Retrieve all Orders
    router.get("/", orders.findAllOrders);

    // Retrieve a single Order with id
    router.get("/:id", orders.findOrderById);

    // Update a Order with id
    router.put("/:id", orders.updateOrder);

    // Delete a Order with id
    router.delete("/:id", orders.deleteOrder);

    // Delete all Orders
    router.delete("/", orders.deleteAllOrders);

    app.use('/api/orders', router);
};
