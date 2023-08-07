const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

// Enable CORS for requests from 'http://localhost:5173'
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Define a sample response body
const sampleResponseBody = {
  isAuthenticated: true,
  message: "Hello, this is a sample API response!",
  user: {
    id: 1,
    name: "John Doe",
    email: "example@gmail.com",
    role: "admin"
  }
};

// Define an endpoint to get the sample response
app.get('/api/sample', (req, res) => {
  res.json(sampleResponseBody);
});

// Start the server
app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});
