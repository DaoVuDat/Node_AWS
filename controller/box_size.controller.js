const db = require('../model');

const BoxSize = db.boxSizes;
const Op = db.SequelizeOp;
const attributeSelection = require('./attribute/box_size.attribute_selection').attributeSelection;

// Add a new Box Size
module.exports.createBoxSize = (req, res) => {
    console.log("dsa" + req.body);
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const boxSize = {
        size: req.body.size
    };
    BoxSize.create(boxSize)
        .then(value => {
            // response the boxSize which is persisted
            res.status(200).send(value);
        })
        .catch(reason => {
            res.status(500).send({
                message: reason.message || "Some error occurred while creating the Box Size."
            });
        });
}

// Find All Box Size
module.exports.findAllBoxSize = (req, res) => {
    BoxSize.findAll({
        attributes: attributeSelection
    })
        .then(allBoxSize => res.status(200).send(allBoxSize))
        .catch(reason => res.status(500).send({
            message: reason.message || "Internal error while finding all Box Size."
        }));
}

// Find All Box Size by size
module.exports.findBoxSizeBySize = (req, res) => {
    const size = req.query.size;
    console.log(size);
    const condition = {
        size: {
            [Op.eq]: size
        }
    };

    BoxSize.findAll({
        attributes: attributeSelection,
        where: condition
    })
        .then(value => res.status(200).send(value))
        .catch(reason => res.status(500).send({
            message: reason.message || "Internal error while finding all Box Size By Size."
        }));
}

// Find Box Size by Id
module.exports.findBoxSizeById = (req, res) => {
    const id = req.params["id"];
    BoxSize.findByPk(id, {
        attributes: attributeSelection
    })
        .then(value => res.status(200).send(value))
        .catch(reason => res.status(500).send({
            message: reason.message || "Internal error while finding all Box Size By Id."
        }));
}

// Update Box Size by Id
module.exports.updateBoxSize = (req, res) => {
    const id = req.params["id"];

    // update method need an object to update and id in condition
    BoxSize.update(
        req.body, {
            where: {id: id}
        })
        .then(value => res.status(200).send({
            message: value[0] === 1 ? `Updated successfully` : `Did not update anything`
        }))
        .catch(reason => res.status(500).send({
            message: reason.message || "Internal error while updating Box Size."
        }));

    // where: {id: id}
    // equal where: { id: { [Op.eq] : id } }
}

// Delete Box Size by Id
module.exports.deleteBoxSizeById = (req, res) => {
    const id = req.params["id"];

    BoxSize.destroy({
        where: {id: id}
    })
        .then(value => res.status(200).send({
            message: value === 1 ? `Deleted ${value}` : `Did not delete any Box Size`
        }))
        .catch(reason => res.status(500).send({
            message: reason.message || `Internal error while deleting Box Size with id = ${id}.`
        }));
}


// Delete All Box Size
module.exports.deleteAllBoxSize = (req, res) => {
    BoxSize.destroy({
        where: {},
        truncate: false
    })
        .then(value => res.status(200).send({
            message: `Deleted ${value} Box Sizes`
        }))
        .catch(reason => res.status(500).send({
            message: reason.message || `Internal error while deleting All Box Size`
        }))
}

