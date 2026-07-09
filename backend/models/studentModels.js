const Joi = require('joi');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 50},
    isEnrolled: {type: Boolean, default: false},
    phone: {type: String, required: true, minlength: 10, maxlength: 15}
});

const Student = mongoose.model('Student', studentSchema);

function validateStudent(student) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        isEnrolled: Joi.boolean(),
        phone: Joi.string().min(10).max(15).required()
    };
    return Joi.validate(student, schema);
}

exports.Student = Student;
exports.validateStudent = validateStudent;