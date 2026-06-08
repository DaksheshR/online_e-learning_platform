const express = require('express');
const app = express();
app.use(express.json());

const categories = [
    {id:1, name:'Web'},
    {id:2, name:'Mobile'},
    {id:3, name:'Photography'}
]

app.get('/api/category', (req,res) => { res.send(categories); });

app.post('/api/category', (req,res) => {
    const category = {
        id:categories.length + 1,
        name:req.body.name
    };
    categories.push(category);
    res.send(category);
});

app.put('/api/category/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if(!category) return res.status(404).send('The category with the given ID was not found.');
    if(error) return res.status(400).send(error.details[0].message);
    category.name = req.body.name;
    res.send(category);
});

app.delete('/api/category/:id', (req,res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if(!category) return res.status(404).send('The category with the given ID was not found.');
    const index = categories.indexOf(category);
    categories.splice(index, 1);
    res.send(category);
});

app.get('/api/category/:id', (req,res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if(!category) return res.status(404).send('The category with the given ID was not found.');
    res.send(category);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
