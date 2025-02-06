const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/Cart.controller");

router.post("/", cartControllers.createCart);
router.get("/", cartControllers.getCart);
router.get("/:email", cartControllers.getByemail);
router.put("/:id", cartControllers.updateCart);
router.delete("/:id", cartControllers.deleteCartItem);
router.delete("/clear/:email", cartControllers.clearAllItem);


module.exports = router;