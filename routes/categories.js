const express = require('express');
const router = express.Router();
const {Category, validateCategory} = require('../models/categoriesModel');

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

module.exports = router;