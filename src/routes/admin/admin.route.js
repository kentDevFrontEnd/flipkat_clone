const express = require("express");
const { requiresignin } = require("../../common.middleware");
const {
  signin,
  signup,
  signout,
} = require("../../controller/admin/admin.controller");
const {
  validateSignInRequest,
  isRequestValidated,
  validateSignUpRequest,
} = require("../../validator/auth.validator");
const router = express.Router();

router.post("/signin", validateSignInRequest, isRequestValidated, signin);

router.post("/signup", validateSignUpRequest, isRequestValidated, signup);

router.post("/signout", signout);

router.post("/profile", requiresignin, (req, res) => {
  res.status(200).json({ user: "profile" });
});

module.exports = router;
