const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrderSchema = new Schema(
  {
    email: { type: String, required: true }, // customer email
    customerId: { type: String, required: true }, // customer id from stripe
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        }, // product id from product model
        quantity: { type: Number, required: true, default: 1 }, // quantity of product
      },
    ],
    subtotal: { type: Number, required: true }, // total price of products
    total: { type: Number, required: true, default: 1 }, // total price of products
    shipping: { type: Object, required: true }, // shipping info
    delivery_status: { type: String, required: true, default: "pending" }, // delivery info
    payment_status: { type: String, required: true, default: "unpaid" }, // payment info
  },
  { timestamps: true }
);

const OrderModel = model("Order", OrderSchema);
module.exports = OrderModel;
