const db = require('../model');

const Products = db.products;
const Op = db.SequelizeOp;
const ProductsToBoxSizes = db.ProductsToBoxSizes;
const BoxSizes = db.boxSizes;
const StrawSizes = db.strawSizes;
const includeBoxSize_StrawSize = require('./include_join_table/product.include')(BoxSizes, StrawSizes);
const productAttributeSelection = require('./attribute/product.attribute_selection').attributeSelection;


// Create a new Product
module.exports.createProduct = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        })
        return;
    }

    Products.create({
        name: req.body.name,
        price: req.body.price,
        inStock: req.body.inStock,
        tbBoxSizeId: req.body.tbBoxSizeId,
        tbStrawSizeId: req.body.tbStrawSizeId,
    })
        .then(value => res.status(200).send(value))
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while creating the Product."
            })
        });


}

// Find Product by Id
module.exports.findProductById = (req, res) => {
    const id = req.params["id"];

    Products.findAll({
        attributes: productAttributeSelection,
        where: {id: id},
        include: includeBoxSize_StrawSize,
        // raw: true
    })
        .then(products => res.status(200).send(products))
        .catch(error => res.status(500).send({
            message: error.message || "Internal error while finding Box Size by Id."
        }));
}

// Find Product by Name
module.exports.findProductByName = (req, res) => {
    const name = req.query.name;
    const condition = {name: {[Op.like]: `%${name}%`}};

    Products.findAll({
        attributes: productAttributeSelection,
        where: condition,
        include: includeBoxSize_StrawSize,
        // raw: true
    })
        .then(products => res.status(200).send(products))
        .catch(error => res.status(500).send({
            message: error.message || "Internal error while finding Box Size by Name."
        }));
}


// Find All Product
module.exports.findAllProducts = (req, res) => {
    Products.findAll({
        attributes: productAttributeSelection,
        include: includeBoxSize_StrawSize,
        // raw: true
    })
        .then(value => res.status(200).send(value))
        .catch(error => res.status(500).send({
            message: error.message || "Internal error while finding all Box Size."
        }));
}

// Update a Product
module.exports.updateProduct = (req, res) => {
    const id = req.params['id'].toString();

    Products.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            console.log(num);
            if (num[0] === 1) {
                res.send({
                    message: "Product was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
}

// Delete a product by Id
module.exports.deleteProduct = (req, res) => {
    const id = req.params.id;

    Products.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Product was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
}

// Delete All Product
module.exports.deleteAllProducts = (req, res) => {
    Products.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Customers were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all customers."
            });
        });
}
