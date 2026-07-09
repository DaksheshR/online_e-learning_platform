const mongoose = require('mongoose');
const { mongoUri } = require('./env');

async function connectDB() {
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });
    console.log('Connected to MongoDB...');
    return true;
  } catch (err) {
    console.warn(`MongoDB unavailable: ${err.message}`);
    return false;
  }
}

function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

module.exports = { connectDB, isDbConnected };
