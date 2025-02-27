const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrderSchema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    payment_method: { type: Number, required: true },
    total_price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "canceled"],
      default: "pending",
      required: true,
    },
    delivery: {
      type: {
        type: String, // วิธีจัดส่ง
        tracking_number: String, // เลขติดตามพัสดุ
        estimated_delivery: Date, // วันที่คาดว่าจะส่งถึง
      },
      default: {},
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const OrderModel = model("Order", OrderSchema);
module.exports = OrderModel;
