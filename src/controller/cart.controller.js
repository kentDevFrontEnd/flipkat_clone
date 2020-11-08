const Cart = require("../models/cart.model");

module.exports.addItemToCard = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((err, cart) => {
    if (err) return res.status(400).json({ err });
    if (cart) {
      // if cart exits

      let product = req.body.cartItems.product;
      let item = cart.cartItems.find((item) => item.product == product);

      if (item) {
        // if item in cart dont need create another item
        Cart.findOneAndUpdate(
          {
            user: req.user._id, // check user
            "cartItems.product": product, // check product in cart
          },
          {
            $set: {
              cartItems: {
                ...req.body.cartItems, // ? why need req.body why dont items
                quantity: item.quantity + req.body.cartItems.quantity,
              },
            },
          }
        ).exec((err, _cart) => {
          if (err) return res.status(400).json({ err });
          if (_cart) {
            return res.status(200).json({ cart: _cart });
          }
        });
      } else {
        // if dont have item => need to create another item and push it to list
        Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItems: req.body.cartItems,
            },
          }
        ).exec((err, _cart) => {
          if (err) return res.status(400).json({ err });
          if (_cart) {
            return res.status(200).json({ cart: _cart });
          }
        });
      }
    } else {
      // if cart does not exits
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });

      cart.save((err, cart) => {
        if (err) return res.status(400).json({ err });
        if (cart) {
          return res.status(200).json({ cart });
        }
      });
    }
  });
};
