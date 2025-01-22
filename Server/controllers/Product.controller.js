const ProductModel = require("../models/Product")
require("dotenv").config()

//ค่าคงที่หรือคลลาสพิมพ์ใหญ่
// 
// สร้างสินค้าใหม่
exports.createProduct = async (req, res) => {
  /**
     #swagger.tags = ['Product']
     #swagger.summary = "Create a new product"
     #swagger.description = 'Endpoint to create a new product'
     #swagger.consumes = ['multipart/form-data']
     #swagger.parameters['file'] = {
        in:'formData',
        type:'file',
        required:true,
        description:'Image to upload to Firebase Storage and get its url'
     }
     #swagger.requestBody = {
        required:true,
        content:{
          "multipart/form-data":{
            schema:{
              $ref:"#components/schemas/NewProduct"
            }
          }
        }
     }
     #swagger.response[200] = {
        schema:{ "$ref": "#components/schemas/ProductResponse"},
        description: "Product created successfully"
     }
    */

  //File upload
  // console.log(req.file);
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }
  const firebaseUrl = req.file.firebaseUrl;
  // console.log(firebaseUrl);


  const { name, description, category, price } = req.body;
  if (!name || !description || !category || !price) {
    return res.status(400).json({ message: "All Fields is required" });
  }
  try {
    const productDoc = await ProductModel.create({
      name,
      description,
      category,
      price,
      image: firebaseUrl,
    });
    if (!productDoc) {
      res.status(404).send({
        message: "Cannot create new product!",
      });
      return;
    }
    res.json(productDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while creating new product",
    });
  }
};




exports.getProduct = async (req, res) => {
  const product = await ProductModel.find()
  res.json(product);
}

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const productDoc = await ProductModel.findById(id)
    if (!productDoc) {
      res.status(404).send({ message: "Product not found" });
      return;
    }
    res.json(productDoc)
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "something error occurred while getting product details" })
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productDoc = await ProductModel.findById(id);
    if (!productDoc) {
      res.status(404).send({
        message: "Product not found!",
      });
      return;
    }
    await productDoc.deleteOne();
    res.json(productDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while deleting a product",
    });
  }
};



// Update Product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(404).json({ message: "Product id is not provided" });

  try {
    const productDoc = await ProductModel.findById(id);
    if (!productDoc) {
      res.status(404).send({
        message: "Product not found!",
      });
      return;
    }
    const { name, category, description, price } = req.body;
    if (!name || !description || !category || !price) {
      return res.status(400).json({ message: "All Fields is required" });
    }
    productDoc.name = name;
    productDoc.category = category;
    productDoc.description = description;
    productDoc.price = price;
    if (req.file) {
      const path = req.file.firebaseUrl;
      productDoc.image = path;
    }
    await productDoc.save();
    res.json(productDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message:
        error.message || "Something error occurred while updating a product",
    });
  }
};
