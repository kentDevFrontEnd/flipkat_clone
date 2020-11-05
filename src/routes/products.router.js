const express = require("express");
const { requiresignin, adminMiddleware } = require("../common.middleware");
const { createProduct } = require("../controller/products.controller");
const ids = require("short-id");
const multer = require("multer"); // you can use npm: file-uploader, formidable
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "upload")); // create path for folder upload
  },
  filename: function (req, file, cb) {
    cb(null, ids.generate() + "-" + file.originalname); // create filename
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post(
  "/create",
  requiresignin,
  adminMiddleware,
  upload.array("productPicture"), // use single for one and array for multiple
  createProduct
);

router.get("/getproducts", (req, res) => {
  res.status(200).json({
    message: "products",
  });
});

module.exports = router;
