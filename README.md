# JWT Authentication Example

A simple Node.js application demonstrating JWT (JSON Web Token) authentication with Express.

## Features

- Token generation with jsonwebtoken
- Protected routes with middleware verification
- Basic user authentication flow
- Test suite using Jest and Supertest

## Installation

```bash
npm install
```

## Usage

Start the server:

```bash
node verifyToken.js
```

The server will run on http://localhost:4000

### Endpoints

#### Generate Token

```bash
curl -X POST http://localhost:4000/login
```

This returns a JWT token for the demo user.

#### Access Protected Route

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:4000/protected
```

Replace `YOUR_TOKEN` with the token received from the login endpoint.

## Testing

Run the test suite:

```bash
npm test
```

## Dependencies

- express
- jsonwebtoken
- dotenv
- jest (dev)
- supertest (dev)
