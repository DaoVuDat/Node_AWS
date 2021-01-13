const db = require("../model");
const customerController = require("./customer.controller");

const Orders = db.orders;
const Op = db.SequelizeOp;
const Customer = db.customers;
const Product = db.products;
const includeCustomer_Product = require('./include_join_table/order.include')(Customer, Product);
const orderAttributeSelection = require('./attribute/order.attribute_selection').attributeSelection;

// Checking utils
const existCustomer = async (email) => {
    return await customerController.findCustomerByEmail(email);
}


const createOrder = async (req, res, customerId) => {
    return await Orders.create({
        quantity: req.body.quantity,
        tbCustomerId: customerId,
        tbProductId: req.body.tbProductId,
    });
}


// Create a new Order
module.exports.createOrder = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        })
        return;
    }

    const order = req.body;

    // checking existence of customer
    existCustomer(order.customer["email"])
        .then(customers =>{
            if(customers.length > 0) {
                // Create Order Only
                createOrder(req, res, customers[0]["id"])
                    .then(value => res.status(200).send(value))
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Order."
                        })
                    });
            } else {
                // Create customer and order
                Customer.create(order.customer)
                    .then(createdCustomer => createOrder(req, res, createdCustomer.id))
                    .then(value => res.status(200).send(value))
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Order and Customer."
                        })
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while checking existence of customer."
            })
        });

}

// Find Order by Id
module.exports.findOrderById = (req, res) => {
    const id = req.params["id"];

    Orders.findAll({
        attributes: orderAttributeSelection,
        where: {id: id},
        include: includeCustomer_Product,
        // raw: true
    })
        .then(products => res.status(200).send(products))
        .catch(error => res.status(500).send({
            message: error.message || "Internal error while finding Order by Id."
        }));
}


// Find All Orders
module.exports.findAllOrders = (req, res) => {
    Orders.findAll({
        attributes: orderAttributeSelection,
        include: includeCustomer_Product,
        // raw: true
    })
        .then(value => res.status(200).send(value))
        .catch(error => res.status(500).send({
            message: error.message || "Internal error while finding all Order."
        }));
}

// Update an Order
module.exports.updateOrder = (req, res) => {
    const id = req.params['id'].toString();

    Orders.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            console.log(num);
            if (num[0] === 1) {
                res.send({
                    message: "Order was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Order with id=${id}. Maybe Product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Order with id=" + id
            });
        });
}

// Delete a product by Id
module.exports.deleteOrder = (req, res) => {
    const id = req.params.id;

    Orders.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Order was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Order with id=" + id
            });
        });
}

// Delete All Orders
module.exports.deleteAllOrders = (req, res) => {
    Orders.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Orders were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all orders."
            });
        });
}
