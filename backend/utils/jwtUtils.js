const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET; // Using environment variable
  const options = {
    expiresIn: '1h', // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

const verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};