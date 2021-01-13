module.exports = (app) => {
    const strawSizes = require('../controller/straw_size.controller');
    const router = require('express').Router();

    router.get("/", strawSizes.findAllStrawSize);

    router.delete("/", strawSizes.deleteAllStrawSize);

    router.post("/", strawSizes.createStrawSize);

    router.get("/query/", strawSizes.findStrawSizeBySize);

    router.get("/:id", strawSizes.findStrawSizeById);

    router.put("/:id", strawSizes.updateStrawSize);

    router.delete("/:id", strawSizes.deleteStrawSizeById);

    // apply express router to express app
    app.use("/api/straw-sizes", router);
}
