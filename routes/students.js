const express = require('express');
const router = express.Router();
const {Student, validateStudent} = require('../models/studentModels');

router.get('/', async(req,res) => {
    const student = await Student.find();
    res.send(student); 
});

router.post('/', async(req,res) => {
    const {error} = validateStudent(req.body);
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
    const {error} = validateStudent(req.body);
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

module.exports = router;