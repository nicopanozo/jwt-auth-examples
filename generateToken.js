// Import required modules
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create a payload (data to be stored in the token)
const userPayload = {
  userId: 12345,
  username: 'john_doe',
  role: 'admin'
};

// Secret key for signing the token (store in .env for production)
const secretKey = process.env.JWT_SECRET || 'your_secure_secret_here';

// Token generation function
function generateAccessToken(payload) {
  // Sign the payload with secret key and set expiration time
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

// Generate the token
const token = generateAccessToken(userPayload);

// Log the generated token
console.log('Generated JWT Token:');
console.log(token);
console.log('\nYou can verify this token at https://jwt.io/');