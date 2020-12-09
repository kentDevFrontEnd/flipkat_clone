const Category = require("../../models/category.model");
const Products = require("../../models/products.model");

const createCategories = (categories, parentId = null) => {
  const cateList = [];

  if (parentId == null) {
    category = categories.filter((cate) => cate.parentId == undefined);
    // get all of parent cate
  } else {
    category = categories.filter((cate) => cate.parentId == parentId);
    // get all of child cate has parent id
  }

  for (let cate of category) {
    cateList.push({
      _id: cate._id,
      name: cate.name,
      parentId: cate.parentId, // add parent id
      slug: cate.slug,
      children: createCategories(categories, cate._id),
    });
  }

  return cateList;
};

module.exports.initialData = async (req, res) => {
  const categories = await Category.find({}).exec();

  const products = await Products.find({})
    .select(["name", "picture", "price", "quantity", "description", "category"])
    .exec();

  res.status(200).json({
    categories: createCategories(categories),
    products,
  });
};
