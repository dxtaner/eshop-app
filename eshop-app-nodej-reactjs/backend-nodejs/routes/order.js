const express = require("express");
const router = express.Router();
const Order = require("../controllers/order/order.js");

router.post("/", Order.Create);
router.get("/", Order.List);
router.get("/my-orders", Order.GetMyOrders);
router.delete("/my-orders/:order_id", Order.DeleteOrder);

module.exports = router;
