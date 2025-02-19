const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controller");
//const authJwt = require("../middlewares/authJwt.middleware")

//http://localhost:5000/api/v1/user/sign (Path)
router.post("/sign", userControllers.sign);
//http://localhost:5000/api/v1/user/addUser (Path)
router.post("/", userControllers.addUser);
//router.post("/login", userControllers.login);

module.exports = router;
