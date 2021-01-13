// Join Table
const customerAttributeSelection = require('../attribute/customer.attribute_selection').attributeSelection;
const productAttributeSelection = require('../attribute/product.attribute_selection').attributeSelection;


module.exports = (Customer, Product) => [
    {
        model: Customer,
        attributes: customerAttributeSelection
    },
    {
        model: Product,
        attributes: productAttributeSelection
    }
];
