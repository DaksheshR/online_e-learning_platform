const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
} = require('../controllers/courseController');

router.get('/', getAllCourses);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.get('/:id', getCourseById);

module.exports = router;