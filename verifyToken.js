const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// Secret key (must match the one used for signing)
const secretKey = process.env.JWT_SECRET || 'your_secure_secret_here';

// Verification middleware
const verifyToken = (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(403).send('Token is required');
  }

  // Verify token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid or expired token');
    }
    // Attach decoded payload to request object
    req.user = decoded;
    next();
  });
};

// Protected route
app.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'Access granted!',
    user: req.user
  });
});

// Login route to get token (for testing)
app.post('/login', (req, res) => {
  // In real application, verify user credentials first
  const payload = {
    userId: 12345,
    username: 'john_doe',
    role: 'admin'
  };
  
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  res.json({ token });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Test protected route with valid token`);
});

// Export app for testing
module.exports = app;