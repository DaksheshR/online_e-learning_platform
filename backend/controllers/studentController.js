const { Student, validateStudent } = require('../models/studentModels');

async function getAllStudents(req, res, next) {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (err) {
    next(err);
  }
}

async function createStudent(req, res, next) {
  try {
    const { error } = validateStudent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const student = new Student({
      name: req.body.name,
      isEnrolled: req.body.isEnrolled,
      phone: req.body.phone,
    });

    await student.save();
    res.send(student);
  } catch (err) {
    next(err);
  }
}

async function updateStudent(req, res, next) {
  try {
    const { error } = validateStudent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        isEnrolled: req.body.isEnrolled,
        phone: req.body.phone,
      },
      { new: true }
    );

    if (!student) return res.status(404).send('The student with the given ID was not found.');
    res.send(student);
  } catch (err) {
    next(err);
  }
}

async function deleteStudent(req, res, next) {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).send('The student with the given ID was not found.');
    res.send(student);
  } catch (err) {
    next(err);
  }
}

async function getStudentById(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send('The student with the given ID was not found.');
    res.send(student);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
};
