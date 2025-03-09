const OrderModel = require("../models/Order");
const ProductModel = require("../models/Product"); // Import Product Model

// ดึง Order ทั้งหมด พร้อมข้อมูลสินค้า
exports.getOrder = async (req, res) => {
  /**
     #swagger.tags = ['Order']
     #swagger.summary = "Get all Orders"
     #swagger.description = 'Endpoint to get all orders with product details'
  */
  try {
    const orders = await OrderModel.find().populate("products.productId"); // ใช้ populate
    res.json(orders);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving orders" });
  }
};

// ดึง Order ตาม ID พร้อมข้อมูลสินค้า
exports.getById = async (req, res) => {
  /**
     #swagger.tags = ['Order']
     #swagger.summary = "Get Order by ID"
     #swagger.description = 'Retrieve a single order with product details'
  */
  const { id } = req.params;
  try {
    const order = await OrderModel.findById(id).populate("products.productId"); // ใช้ populate
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving order details" });
  }
};

// ลบ Order
exports.deleteOrder = async (req, res) => {
  /**
     #swagger.tags = ['Order']
     #swagger.summary = "Delete Order"
     #swagger.description = 'Delete an order by ID'
  */
  const { id } = req.params;
  try {
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).send({ message: "Order not found!" });
    }
    await order.deleteOne();
    res.json({ message: "Order deleted successfully", order });
  } catch (error) {
    res.status(500).send({ message: "Error deleting order" });
  }
};

// แก้ไข Order (เฉพาะ delivery_status)
exports.updateOrder = async (req, res) => {
  /**
     #swagger.tags = ['Order']
     #swagger.summary = "Update Order"
     #swagger.description = 'Update the delivery status of an order'
  */
  const { id } = req.params;
  const { delivery_status } = req.body;
  try {
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (!delivery_status) {
      return res.status(400).json({ message: "delivery_status is required" });
    }
    order.delivery_status = delivery_status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).send({ message: "Error updating order status" });
  }
};
