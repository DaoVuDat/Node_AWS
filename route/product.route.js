module.exports = (app) => {

    const products = require("../controller/product.controller");
    const router = require('express').Router();

    router.get("/", products.findAllProducts);
    //
    router.delete("/", products.deleteAllProducts);
    //
    router.post("/", products.createProduct);
    //
    router.get("/query/", products.findProductByName);
    //
    router.get("/:id", products.findProductById);
    //
    router.put("/:id", products.updateProduct);
    //
    router.delete("/:id", products.deleteProduct);

    app.use("/api/products", router);
}
