const db = require('../model');

const Customer = db.customers;
const Op = db.SequelizeOp;

// Create and Save a new Tutorial
module.exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const customer = {
        name: req.body.name,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
    }

    Customer.create(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer."
            });
        });
};

// Retrieve all Customers from the database.
module.exports.findAll = (req, res) => {

    Customer.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        });

};

// Retrieve all Customers with name from the database.
module.exports.findAllByName = (req, res) => {
    const name = req.params['name'];
    const condition = name ? {name: {[Op.like]: `%${name}%`}} : null;
    console.log(condition);
    Customer.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        });

};

// Find a single Tutorial with an id
module.exports.findOne = (req, res) => {
    const id = req.params['id'].toString();

    Customer.findByPk(id)
        .then(value => {
            res.send(value);
        })
        .catch(reason => {
            res.status(500).send({
                message: "Error retrieving Customer with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
module.exports.update = (req, res) => {
    const id = req.params['id'].toString();

    Customer.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            console.log(num);
            if (num[0] === 1) {
                res.send({
                    message: "Customer was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
module.exports.delete = (req, res) => {
    const id = req.params.id;

    Customer.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Customer was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
module.exports.deleteAll = (req, res) => {
    Customer.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Customers were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all customers."
            });
        });
};


