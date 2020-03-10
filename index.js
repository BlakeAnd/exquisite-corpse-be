const express = require('express'); // import the express package
const cors = require('cors');
require("dotenv").config();


const server = express(); // creates the server

server.use(cors());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.send('Hello from EC BE');
});



// watch for connections on port 5000
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);