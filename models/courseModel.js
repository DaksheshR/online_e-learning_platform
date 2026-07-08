const Joi = require('joi');
const mongoose = require('mongoose');
const {categorySchema} = require('../models/categoriesModel');

const Course = mongoose.model('Course', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trin: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: categorySchema,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}));

function validateCourse(course) {
    const schema = {
        title: Joi.string().min(5).max(255).required(),
        categoryId: Joi.string().required(),
        creator: Joi.string().min(5).required(),
        rating: Joi.number().min(0).required()
    };

    return Joi.validate(course, schema);
}

exports.Course = Course;
exports.validate = validateCourse;