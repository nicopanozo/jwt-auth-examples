npm init -y
npm install --save-dev jsonwebtoken dotenv express jest supertest


$ node verifyToken.js
Server running on http://localhost:4000

# In another terminal
$ curl -X POST http://localhost:4000/login
{"token":"eyJhbG...}

$ curl -H "Authorization: Bearer eyJhbG..." http://localhost:4000/protected
{"message":"Access granted!","user":{"userId":12345,"username":"john_doe","role":"admin","iat":...,"exp":...}}

Example

curl -X POST http://localhost:4000/login

curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzQ1LCJ1c2VybmFtZSI6ImpvaG5fZG9lIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ1OTM5MzY5LCJleHAiOjE3NDU5NDI5Njl9.Yd0K0t-_A1k36K6P_-M4tk6saKY8IJLKjy9WJHFhHFY" http://localhost:4000/protected

npm install jest supertest --save-dev

npm install && npm test