const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // เพิ่มการใช้งาน jwt
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;
require("dotenv").config();

exports.sign = async (req, res) => {
  const { email } = req.body;
  // ตรวจสอบว่า email มีอยู่ในฐานข้อมูลไหม
  if (!email) {
    return res.status(400).json({ messgge: "Email is requierd" });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ messgge: "Email is not found" });
  }
  // sign JWT token
  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_SECRET, // ใช้ secret key ที่เก็บใน .env
    { expiresIn: "1h" } // กำหนดระยะเวลาให้หมดอายุภายใน 1 วัน
  );
  const userInfo = {
    token: token,
    email: user.email,
    role: user.role,
  };
  res.status(200).json(userInfo);
};

exports.addUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is requierd" });
  }
  try {
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      return res.status(404).json({ message: "Email is not found" });
    }
    const user = new UserModel({ email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Somting error occurred while adding a new user",
    });
  }
};
