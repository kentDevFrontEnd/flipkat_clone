const express = require("express");
const multer = require("multer");
const path = require("path");
const ids = require("short-id");

const { requiresignin, adminMiddleware } = require("../common.middleware");
const {
  addCategory,
  getCategories,
} = require("../controller/category.controler");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "upload")); // create path for folder upload
  },
  filename: function (req, file, cb) {
    cb(null, ids.generate() + "-" + file.originalname); // create filename
  },
});

const upload = multer({ storage });

router.post(
  "/create",
  requiresignin,
  adminMiddleware,
  upload.single("categoryImage"),
  addCategory
);

router.get("/getcategories", getCategories);

module.exports = router;
