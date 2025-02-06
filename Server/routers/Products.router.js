const express = require("express");
const router = express.Router();
const productController = require("../controllers/Product.controller")
const { upload, uploadToFirebase } = require("../middlewares/file.middlewares");
//const authJwt = require("../middlewares/authJwt.middleware")

//http://localhost:5000/api/v1/Product
router.post("", upload, uploadToFirebase, productController.createProduct);
//http:// localhost: 5000/api/v1/Product
router.get("", productController.getProduct);
//http://localhost:5000/api/v1/Product/id
router.get("/:id", productController.getById)
//http://localhost:5000/api/v1/Product/id
router.delete("/:id", productController.deleteProduct);
//http://localhost:5000/api/v1/Product/id
router.put("/:id", upload, uploadToFirebase, productController.updateProduct);


module.exports = router;