const db = require("../model/index");

const StrawSize = db.strawSizes;
const Op = db.SequelizeOp;
const attributeSelection = require("./attribute/straw_size.attribute_selection").attributeSelection;

// Add a new Straw Size
module.exports.createStrawSize = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const strawSize = {
        size: req.body.size
    };
    console.log(strawSize);
    StrawSize.create(strawSize)
        .then(value => {
            // response the boxSize which is persisted
            res.status(200).send(value);
        })
        .catch(reason => {
            res.status(500).send({
                message: reason.message || "Some error occurred while creating the Straw Size."
            });
        });
}

// Find All Straw Size
module.exports.findAllStrawSize = (req, res) => {
    StrawSize.findAll({
        attributes: attributeSelection
    })
        .then(allStrawSize => res.status(200).send(allStrawSize))
        .catch(reason => res.status(500).send({
            message: reason.message || "Internal error while finding all Straw Size."
        }));
}

// Find All Straw Size by size
module.exports.findStrawSizeBySize = (req, res) => {
    const size = req.query.size;
    console.log(size);
    const condition = {
        size: {
            [Op.eq]: size
        }
    };

    StrawSize.findAll({
        attributes: attributeSelection,
        where: condition
    })
        .then(value => res.status(200).send(value))
        .catch(reason => res.status(500).send({
            message: reason.message || "Internal error while finding all Straw Size By Size."
        }));
}

// Find Straw Size by Id
module.exports.findStrawSizeById = (req, res) => {
    const id = req.params["id"];
    StrawSize.findByPk(id,{
        attributes: attributeSelection
    })
        .then(value => res.status(200).send(value))
        .catch(reason => res.status(500).send({
            message: reason.message || "Internal error while finding all Straw Size By Id."
        }));
}

// Update Straw Size by Id
module.exports.updateStrawSize = (req, res) => {
    const id = req.params["id"];

    // update method need an object to update and id in condition
    StrawSize.update(
        req.body, {
            where: {id: id}
        })
        .then(value => res.status(200).send({
            message: value[0] === 1 ? `Updated successfully` : `Did not update anything`
        }))
        .catch(reason => res.status(500).send({
            message: reason.message || "Internal error while updating Straw Size."
        }));

    // where: {id: id}
    // equal where: { id: { [Op.eq] : id } }
}

// Delete Straw Size by Id
module.exports.deleteStrawSizeById = (req, res) => {
    const id = req.params["id"];

    StrawSize.destroy({
        where: {id: id}
    })
        .then(value => res.status(200).send({
            message: value === 1 ? `Deleted ${value}` : `Did not delete any Straw Size`
        }))
        .catch(reason => res.status(500).send({
            message: reason.message || `Internal error while deleting Straw Size with id = ${id}.`
        }));
}


// Delete All Straw Size
module.exports.deleteAllStrawSize = (req, res) => {
    StrawSize.destroy({
        where: {},
        truncate: false
    })
        .then(value => res.status(200).send({
            message: `Deleted ${value} Box Sizes`
        }))
        .catch(reason => res.status(500).send({
            message: reason.message || `Internal error while deleting All Straw Size`
        }))
}


