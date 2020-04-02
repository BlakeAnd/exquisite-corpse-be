const express = require('express'); // import the express package
const cors = require('cors');
// const bodyParser = require('body-parser')
require("dotenv").config();


const server = express(); // creates the server

server.use(cors());
// server.use(bodyParser());
server.use(express.json());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000", "https://drawexquisitecorpse.netlify.com");
  next();
});

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.send('Hello from EC BE');
});

server.post('/drawings', (req, res) => {
  let id = req.body;
  let image_data = req.body.data;
  let canvas = req.body.canvas;
  console.log("id ", id);
  console.log("img data ", image_data);
  console.log("canvas ", canvas);
  // console.log(`image_data: ${image_data}`);
  res.send(req.body.data);
})



// watch for connections on port 5000
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);