const express = require("express");
const { requiresignin, adminMiddleware } = require("../common.middleware");
const {
  addCategory,
  getCategories,
} = require("../controller/category.controler");

const router = express.Router();

router.post("/create", requiresignin, adminMiddleware, addCategory);

router.get("/getcategories", getCategories);

module.exports = router;
