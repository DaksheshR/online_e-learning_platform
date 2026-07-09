const { Category, validateCategory } = require('../models/categoriesModel');

async function getAllCategories(req, res, next) {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {
    next(err);
  }
}

async function createCategory(req, res, next) {
  try {
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = new Category({ name: req.body.name });
    await category.save();
    res.send(category);
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    if (!category) return res.status(404).send('The category with the given ID was not found.');
    res.send(category);
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).send('The category with the given ID was not found.');
    res.send(category);
  } catch (err) {
    next(err);
  }
}

async function getCategoryById(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send('The category with the given ID was not found.');
    res.send(category);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
};
