// auth.test.js
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('./verifyToken'); // Make sure verifyToken exports the app
require('dotenv').config();

describe('JWT Authentication Test Suite', () => {
  let validToken;

  // Generate test token before all tests
  beforeAll(() => {
    validToken = jwt.sign(
      { userId: 1, username: 'test_user' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  // Test 1: Should return a valid token on login
  test('POST /login returns JWT token', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'john_doe' });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  // Test 2: Should reject requests without token
  test('GET /protected without token returns 403', async () => {
    const response = await request(app)
      .get('/protected');
    
    expect(response.statusCode).toBe(403);
    expect(response.text).toBe('Token is required');
  });

  // Test 3: Should allow access with valid token
  test('GET /protected with valid token returns user data', async () => {
    const response = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${validToken}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.userId).toBe(1);
  });

  // Test 4: Should reject invalid tokens
  test('GET /protected with invalid token returns 401', async () => {
    const response = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalid.token.here');
    
    expect(response.statusCode).toBe(401);
    expect(response.text).toBe('Invalid or expired token');
  });
});