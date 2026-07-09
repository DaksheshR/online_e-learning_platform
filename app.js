const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const categories = require("./routes/categories");
const students = require('./routes/students');
const courses = require('./routes/courses');

const app = express();

// Enable CORS for development (React dev server on different port)
app.use(cors());

app.use(express.json());
app.use('/api/category', categories);
app.use('/api/students', students);
app.use('/api/courses', courses);

// Serve React production build
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// SPA fallback: serve index.html for all non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

mongoose.connect('mongodb://localhost:27017/learningPlatform')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));