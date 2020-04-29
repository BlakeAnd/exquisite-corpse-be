const express = require('express'); // import the express package
const helmet = require('helmet');
const drawingsTable = require("./drawings-model");
const cors = require('cors');
// const bodyParser = require('body-parser')
require("dotenv").config();




const server = express(); // creates the server

server.use(cors());
server.use(helmet());
// server.use(bodyParser());
server.use(express.json({limit: '20MB'}));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000", "https://drawexquisitecorpse.netlify.com");
  next();
});

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.send('Hello from EC BE');
});

server.post('/drawings', (req, res) => {
  let drawings_obj = {};

  let id = req.body.pair_id;
  let image_data = req.body.img_data;
  let canvas = req.body.selected_canvas;
  let time_sent = Math.floor(Date.now() / 1000);
  let drawing_obj = {
    drawing_id: id,
    sub_canvas_id: canvas,
    image_data: image_data,
    time = time_sent
  }

  // let canvases_arr = [null, null];

  console.log("DATE", Math.floor(Date.now() / 1000));  

  drawingsTable.getDrawing(id)
    .then(res => {
      res.status(200).json(res);
    })
    .catch(error => {
      drawingsTable.addDrawing()
      // res.status(400).json(error);
    })

  // if(drawings_obj.id === undefined){
  //   drawings_obj.id = canvases_arr;
  //   if(canvas === "top"){
  //     drawings_obj.id[0] = image_data;
  //   } else{
  //     drawings_obj.id[1] = image_data;
  //   }
  //   // res.send(drawings_obj.id);
  // }
  // else if (drawings_obj.id[0] === null && canvas === "top"){
  //   drawings_obj.id[0] = image_data;
  //   respond();
  // }
  // else if (drawings_obj.id[1] === null && canvas === "bottom"){
  //   drawings_obj.id[1] = image_data;
  //   responder();
  // }
  // function responder() {
  //   console.log("res func");
  //   let combined_image = drawings_obj.id[0] + drawings_obj.id[1];
  //   res.send(combined_image);
  // }
  // console.log("\n")
  // // console.log("body", req.body); 
  // // console.log("draw obj 0", typeof(drawings_obj.id[0])); 
  // // console.log("draw obj 1", typeof(drawings_obj.id[1])); 
  // console.log("id ", id);
  // // console.log("obj.id", drawings_obj.id);
  // // console.log("img data len", image_data);
  // // console.log("canvas ", canvas);
  // // console.log(`image_data: ${image_data}`);
  // // res.send(req.body);
})



// watch for connections on port 5000
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);