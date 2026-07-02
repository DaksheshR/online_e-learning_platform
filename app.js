const express = require('express');
const mongoose = require('mongoose');
const categories = require("./routes/categories");
const app = express();
app.use(express.json());
app.use(categories);
mongoose.connect('mongodb://localhost:27017/learningPlatform')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));