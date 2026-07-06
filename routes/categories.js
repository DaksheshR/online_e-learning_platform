const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const router = express.Router();

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 50}
});

const Category = mongoose.model('Category', categorySchema);

router.get('/', async(req,res) => {
    const categories = await Category.find();
    res.send(categories); 
});

router.post('/', async(req,res) => {
    const {error} = validateCategory(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const category = new Category({
        name: req.body.name
    });
    await category.save();
    res.send(category);
});

router.put('/:id',async (req, res) => {
    const {error} = validateCategory(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const category = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
    // const category = categories.find(c => c.id === parseInt(req.params.id));
    if(!category) return res.status(404).send('The category with the given ID was not found.');
    res.send(category);
});

router.delete('/:id', async(req,res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    // const category = categories.find(c => c.id === parseInt(req.params.id));
    if(!category) return res.status(404).send('The category with the given ID was not found.');
    // const index = categories.indexOf(category);
    // categories.splice(index, 1);
    res.send(category);
});

router.get('/:id', async(req,res) => {
    // const category = categories.find(c => c.id === parseInt(req.params.id));
    const category = await Category.findById(req.params.id);
    if(!category) return res.status(404).send('The category with the given ID was not found.');
    res.send(category);
});

function validateCategory(category) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(category, schema);
}

module.exports = router;