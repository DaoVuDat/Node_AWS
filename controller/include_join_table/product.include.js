// Join Table
const boxSizeAttributeSelection = require('../attribute/box_size.attribute_selection').attributeSelection;
const strawSizeAttributeSelection = require('../attribute/straw_size.attribute_selection').attributeSelection;


module.exports = (BoxSizes, StrawSizes) => [
    {
        model: BoxSizes,
        attributes: boxSizeAttributeSelection
    },
    {
        model: StrawSizes,
        attributes: strawSizeAttributeSelection
    }
];
