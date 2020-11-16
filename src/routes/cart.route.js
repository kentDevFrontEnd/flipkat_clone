const express = require("express");

const { requiresignin, userMiddleware } = require("../common.middleware");
const { addItemToCard } = require("../controller/cart.controller");
const router = express.Router();

router.post("/cart/add2cart", requiresignin, userMiddleware, addItemToCard);

module.exports = router;
