const { Router } = require("express");

const { verifyAccessToken } = require("../helpers/jwt.js");

const auth = require("./auth.js");
const product = require("./product.js");
const order = require("./order.js");

const router = Router();

router.get("/", (req, res) => {
  res.end("Order-Product-Auth");
});

router.use("/auth", auth);
router.use("/product", product);
router.use("/order", verifyAccessToken, order);

module.exports = router;
