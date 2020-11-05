const Products = require("../models/products.model");
const slugify = require("slugify");

module.exports.createProduct = (req, res) => {
  const { files, body } = req;

  // console.log(files);

  let picture;

  if (files.length > 0) {
    picture = files.map((file) => {
      return { img: file.filename };
    });
  }

  const { name, price, description, category, quantity } = body;

  const product = new Products({
    name,
    slug: slugify(name),
    description,
    price,
    picture,
    category,
    quantity,
    createBy: req.user._id,
  });

  product.save((err, product) => {
    if (err)
      return res.status(400).json({
        err,
      });

    if (product) {
      return res.status(200).json({
        product,
      });
    }
  });
};
