const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const router = express.Router();

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 50},
    isEnrolled: {type: Boolean, default: false},
    phone: {type: String, required: true, minlength: 10, maxlength: 15}
});

const Student = mongoose.model('Student', studentSchema);

router.get('/', async(req,res) => {
    const student = await Student.find();
    res.send(student); 
});

router.post('/', async(req,res) => {
    const {error} = validateCategory(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const student = new Student({
        name: req.body.name,
        isEnrolled: req.body.isEnrolled,
        phone: req.body.phone
    });
    await student.save();
    res.send(student);
});

router.put('/:id',async (req, res) => {
    const {error} = validateCategory(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const student = await Student.findByIdAndUpdate(req.params.id, {name: req.body.name, isEnrolled: req.body.isEnrolled, phone: req.body.phone}, {new: true});
    // const category = categories.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('The student with the given ID was not found.');
    res.send(student);
});

router.delete('/:id', async(req,res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    // const category = categories.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('The student with the given ID was not found.');
    // const index = categories.indexOf(category);
    // categories.splice(index, 1);
    res.send(student);
});

router.get('/:id', async(req,res) => {
    // const category = categories.find(c => c.id === parseInt(req.params.id));
    const student = await Student.findById(req.params.id);
    if(!student) return res.status(404).send('The student with the given ID was not found.');
    res.send(student);
});

function validateCategory(student) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        isEnrolled: Joi.boolean(),
        phone: Joi.string().min(10).max(15).required()
    };
    return Joi.validate(student, schema);
}

module.exports = router;