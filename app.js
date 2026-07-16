const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { port } = require('./backend/config/env');
const { connectDB, isDbConnected } = require('./backend/config/db');
const errorHandler = require('./backend/middleware/errorHandler');
const requireAuth = require('./backend/middleware/auth');
const categories = require('./backend/routes/categories');
const students = require('./backend/routes/students');
const courses = require('./backend/routes/courses');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    database: isDbConnected() ? 'connected' : 'disconnected',
  });
});

app.use(requireAuth);

app.use((req, res, next) => {
  if (req.path.startsWith('/api') && !isDbConnected()) {
    return res.status(503).json({ message: 'Database unavailable. Start MongoDB to use the API.' });
  }
  next();
});

app.use('/api/category', categories);
app.use('/api/students', students);
app.use('/api/courses', courses);

const frontendDistPath = path.join(__dirname, 'frontend', 'dist');
const hasFrontendBuild = fs.existsSync(path.join(frontendDistPath, 'index.html'));

if (hasFrontendBuild) {
  app.use(express.static(frontendDistPath));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

app.use(errorHandler);

connectDB();

app.listen(port, () => console.log(`Listening on port ${port}`));
