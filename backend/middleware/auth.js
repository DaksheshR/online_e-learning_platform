function requireAuth(req, res, next) {
  const authRequired = process.env.AUTH_REQUIRED === 'true';
  if (!authRequired) return next();

  const token = req.header('Authorization');
  const expectedToken = process.env.API_BEARER_TOKEN;

  if (!token || token !== `Bearer ${expectedToken}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
}

module.exports = requireAuth;
