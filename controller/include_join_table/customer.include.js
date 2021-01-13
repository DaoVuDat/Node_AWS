// Join Table
const orderAttributeSelection = require('../attribute/order.attribute_selection').attributeSelection;



module.exports = (Orders) => [
    {
        model: Orders,
        attributes: orderAttributeSelection
    },
];
