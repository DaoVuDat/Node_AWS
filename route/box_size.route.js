module.exports = (app) => {
    const boxSize = require("../controller/box_size.controller");

    const router = require('express').Router();


    router.get("/", boxSize.findAllBoxSize);

    router.delete("/", boxSize.deleteAllBoxSize);

    router.post("/", boxSize.createBoxSize);

    router.get("/query/", boxSize.findBoxSizeBySize);

    router.get("/:id", boxSize.findBoxSizeById);

    router.put("/:id", boxSize.updateBoxSize);

    router.delete("/:id", boxSize.deleteBoxSizeById);

    // apply express router to express app
    app.use("/api/box-sizes", router);
};
