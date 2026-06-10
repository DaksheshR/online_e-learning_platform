const express = require('express');
const Joi = require('joi');
const router = express.Router();
const categories = [
    {id:1, name:'Web'},
    {id:2, name:'Mobile'},
    {id:3, name:'Photography'}
]

router.get('/api/category', (req,res) => { res.send(categories); });

router.post('/api/category', (req,res) => {
    const {error} = validateCategory(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const category = {
        id:categories.length + 1,
        name:req.body.name
    };
    categories.push(category);
    res.send(category);
});

router.put('/api/category/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if(!category) return res.status(404).send('The category with the given ID was not found.');
    if(error) return res.status(400).send(error.details[0].message);
    category.name = req.body.name;
    res.send(category);
});

router.delete('/api/category/:id', (req,res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if(!category) return res.status(404).send('The category with the given ID was not found.');
    const index = categories.indexOf(category);
    categories.splice(index, 1);
    res.send(category);
});

router.get('/api/category/:id', (req,res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
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