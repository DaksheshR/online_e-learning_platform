require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/learningPlatform',
  nodeEnv: process.env.NODE_ENV || 'development',
  authRequired: process.env.AUTH_REQUIRED === 'true',
  apiBearerToken: process.env.API_BEARER_TOKEN || 'super-secret-token',
};
