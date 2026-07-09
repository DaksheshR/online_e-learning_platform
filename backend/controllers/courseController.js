const { Course, validate } = require('../models/courseModel');
const { Category } = require('../models/categoriesModel');

async function getAllCourses(req, res, next) {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (err) {
    next(err);
  }
}

async function createCourse(req, res, next) {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send('Invalid category.');

    let course = new Course({
      title: req.body.title,
      category: {
        _id: category._id,
        name: category.name,
      },
      creator: req.body.creator,
      rating: req.body.rating,
    });

    course = await course.save();
    res.send(course);
  } catch (err) {
    next(err);
  }
}

async function updateCourse(req, res, next) {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send('Invalid category.');

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        category: {
          _id: category._id,
          name: category.name,
        },
        creator: req.body.creator,
        rating: req.body.rating,
      },
      { new: true }
    );

    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
  } catch (err) {
    next(err);
  }
}

async function deleteCourse(req, res, next) {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
  } catch (err) {
    next(err);
  }
}

async function getCourseById(req, res, next) {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
};
