const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controller");
const authJwt = require("../middlewares/authJwt.middleware");

//http://localhost:5000/api/v1/user/sign (Path)
router.post("/sign", userControllers.sign);
router.post("/", userControllers.addUser);
router.get("/", userControllers.getAllUsers);
router.get("/role/:email", userControllers.getRoleByEmail);
router.put(
  "/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userControllers.updateUser
);
router.delete(
  "/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userControllers.deleteUser
);
router.patch(
  "/admin/:email",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userControllers.makeAdmin
);
router.patch(
  "/user/:email",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userControllers.makeUser
);
module.exports = router;
