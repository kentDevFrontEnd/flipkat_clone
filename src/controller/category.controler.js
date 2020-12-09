const slugify = require("slugify");
const Category = require("../models/category.model");

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

module.exports.addCategory = (req, res) => {
  // TODO why dont use form-body to set data
  let category;

  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.file) {
    categoryObj.categoryImage =
      process.env.API + "/public/" + req.file.filename;
  }

  if (req.body.parentId) {
    // for child category, no need for parent category
    categoryObj.parentId = req.body.parentId;
  }

  const cate = new Category(categoryObj);
  cate.save((err, category) => {
    if (err) return res.status(400).json({ err });
    if (category) {
      res.status(200).json({ category });
    }
  });
};

module.exports.getCategories = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err) return res.status(400).json({ err });
    if (categories) {
      const categoriesList = createCategories(categories);

      res.status(200).json({ categoriesList });
    }
  });
};
