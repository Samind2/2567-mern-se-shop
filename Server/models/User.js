const mongoose = require("mongoose");
const { Schema, model } = mongoose;

//วิธีแยก Class พิมพ์ใหญ่ Object พิมพ์เล็ก
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

//สร้างModel
const UserModel = model("User", UserSchema);
module.exports = UserModel;
