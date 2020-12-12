const User = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });

    const { firstName, lastName, email, password } = req.body;

    const hash_password = await bcrypt.hash(password, 10);
    console.log(hash_password);

    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      userName: Math.random().toString(),
    });

    _user.save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (data) {
        return res.status(201).json({
          message: "You create success",
        });
      }
    });
  });
};

module.exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (err) return res.status(400).json({ err });
    if (user) {
      // console.log(user);
      const isAuthenticate = await user.authenticate(req.body.password);

      if (isAuthenticate) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        const { firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        res.status(400).json({
          message: "Invalid password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  });
};
