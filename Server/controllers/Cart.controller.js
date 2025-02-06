const CartModel = require("../models/Cart")



exports.createCart = async (req, res) => {
 /**
    #swagger.tags = ['Cart item']
    #swagger.summary = "Create Cart item'"
    #swagger.description = 'Endpoint to create a new product'
   */
 const { productId, email, quantity, name, price, image } = req.body
 if (!productId || !email || !quantity || !name || !price || !image) {
  res.status(400).json({ message: "Product infomation is missing!" });
  return
 }
 try {
  //Existing item in our cart
  const existingItem = await CartModel.findOne({ email, productId });
  if (existingItem) {
   existingItem.quantity += quantity;
   const data = await existingItem.save();
   return res.json(data)
  }
  //add item to cart for the first time
  const cart = new CartModel({ productId, email, quantity, name, price, image });
  const data = await cart.save();
  res.send(data);
 } catch (error) {
  res.status(500).send({
   message:
    error.message || "Something error occurred while creating new product",
  });
 };
};

exports.getCart = async (req, res) => {
 /**
   #swagger.tags = ['Cart item']
   #swagger.summary = "getCart item'"
   #swagger.description = 'Endpoint to create a new product'
  */
 try {
  const cart = await CartModel.find();
  if (!cart || cart.length === 0) {  // เช็คว่าตะกร้าไม่มีข้อมูล
   return res.status(404).send({
    message: "No items in the cart", // ถ้าไม่พบข้อมูลในตะกร้า
   });
  }
  res.json(cart);  // ส่งข้อมูลของตะกร้ากลับไป
 } catch (error) {
  res.status(404).send({
   message: "No items found in the cart", // ถ้าไม่พบข้อมูลในตะกร้า
  });
 }
}


exports.getByemail = async (req, res) => {
 /**
   #swagger.tags = ['Cart item']
   #swagger.summary = "getByemail Cart item'"
   #swagger.description = 'Endpoint to create a new product'
  */
 const { email } = req.params;
 if (!email) {
  res.status(404).json({
   message: "Email is missing!", // ถ้าไม่พบข้อมูลในตะกร้า
  });
 }
 try {
  // ค้นหาตะกร้าสินค้าจากอีเมล
  const cart = await CartModel.find({ email });
  if (cart.length === 0) {
   return res.status(404).send({ message: "Cart not found" });
  }
  res.json(cart);  // ส่งข้อมูลตะกร้าให้กับผู้ใช้งาน
 } catch (error) {
  console.log(error.message);
  res.status(500).send({ message: "Something went wrong while getting cart details" });
 }
};


// Delete Cart - ลบทีละรายการ
exports.deleteCartItem = async (req, res) => {
 /**
   #swagger.tags = ['Cart item']
   #swagger.summary = "delete Cart Item"
   #swagger.description = 'Endpoint to create a new product'
  */
 const { id } = req.params;
 try {
  const cartItem = await CartModel.findByIdAndDelete(id);  // ค้นหาสินค้าตะกร้าที่ต้องการลบ
  if (!cartItem) {
   return res.status(404).send({
    message: "Cart item not found!",
   });
  }
  await cartItem.deleteOne();  // ลบสินค้าออกจากตะกร้า
  res.json({ message: "Cart Item deleted successfully" });
 } catch (error) {
  res.status(500).send({
   message: error.message || "Something error occurred while deleting the cart item by id",
  });
 }
};

// Delete All Cart Items by Email - ลบสินค้าทั้งหมดตามอีเมล
exports.clearAllItem = async (req, res) => {
 /**
   #swagger.tags = ['Cart item']
   #swagger.summary = "clearAll Cart Item"
   #swagger.description = 'Endpoint to create a new product'
  */
 const { email } = req.params;
 try {
  const cart = await CartModel.deleteMany({ email });  // ลบสินค้าทั้งหมดของอีเมลนั้นๆ
  if (cart.deletedCount > 0) {
   return res.status(404).json({
    message: "Cart Cleared successfully",
   });
  }
  if (!cart) {
   return res.status(404).json({
    message: "Cart item not found",
   });
  }
  res.status(200).json({ message: "Cart is Empty" })
 } catch (error) {
  res.status(500).send({
   message: error.message || "Something error occurred while Clearing shopping cart items",
  });
 }
};


exports.updateCart = async (req, res) => {
 const { id } = req.params;
 try {
  // ค้นหาสินค้าและอัปเดตข้อมูล
  const cartItem = await CartModel.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false });
  // ตรวจสอบว่าพบสินค้าหรือไม่
  if (!cartItem) {
   return res.status(404).send({
    message: "Cart item not found", // ถ้าไม่พบสินค้าที่ต้องการอัปเดต
   });
  }

  // ส่งข้อมูลที่อัปเดตกลับไป
  res.json(cartItem);
 } catch (error) {
  res.status(500).send({
   message: error.message || "Something error occurred while updating cart item", // ถ้ามีข้อผิดพลาดจากการอัปเดต
  });
 }
};
