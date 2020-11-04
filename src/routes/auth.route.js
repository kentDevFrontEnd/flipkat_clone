const express = require("express");
const { requiresignin } = require("../common.middleware");
const { signup, signin } = require("../controller/auth.controller");
const {
  validateSignUpRequest,
  validateSignInRequest,
  isRequestValidated,
} = require("../validator/auth.validator");
const router = express.Router();

router.post("/signin", validateSignInRequest, isRequestValidated, signin);

router.post("/signup", validateSignUpRequest, isRequestValidated, signup);

router.post("/profile", requiresignin, (req, res) => {
  res.status(200).json({ user: "profile" });
});

module.exports = router;
