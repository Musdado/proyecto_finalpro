const jwtUtils = require('../utils/jwtUtils');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // No token, unauthorized
  }

  try {
    const user = jwtUtils.verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(403); // Invalid token, forbidden
  }
};

module.exports = authenticateToken;