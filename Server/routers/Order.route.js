const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/Order.controller");

router.get("", orderControllers.getOrder);
router.get("/:id", orderControllers.getById);
router.delete("/:id", orderControllers.deleteOrder); 
router.put("/:id", orderControllers.updateOrder); 

module.exports = router;
