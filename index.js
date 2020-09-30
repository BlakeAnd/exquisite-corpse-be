const express = require('express'); // import the express package
const helmet = require('helmet');
const drawingsTable = require("./drawings-model");
const countTable = require("./count-model");
const cors = require('cors');
// const bodyParser = require('body-parser')
require("dotenv").config();




const server = express(); // creates the server

// var corsOptions = {
//   origin: 'https://drawexquisitecorpse.netlify.app',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

server.use(cors());
server.use(helmet());
// server.use(bodyParser());
server.use(express.json({limit: '20MB'}));



// server.use(function(req, res, next) {
//   var allowedOrigins = ['http://localhost:3000', 'https://drawexquisitecorpse.netlify.app'];
//   var origin = req.headers.origin;
//   if(allowedOrigins.indexOf(origin) > -1){
//        res.setHeader('Access-Control-Allow-Origin', origin);
//   }

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", null, "null", "file:///C:/Users/Blake/Documents/Git/ExquisiteCorpseProject/ExquisiteCorpse/remotedraw.html", "*");
  // "https://drawexquisitecorpse.netlify.app"  
  next();
});

server.options("*", cors());


setInterval(clear, 7200000); // runs code every 2 hours
//calls db to remove old code
function clear() {
  let current_time = Math.floor(Date.now() / 1000); //timestamp in seconds
  let cutoff = current_time - 86400; // time stamp of 24 hours ago
  // console.log(current_time);
  drawingsTable.clearOldDrawings(cutoff)
    .then(res => {
      // console.log("oldss", res)
    })
    .catch(err => {
      console.log("clearing err:", err)
    })
}




// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.send('Hello from EC BE');
});

server.post('/drawings', (req, res) => {
  // let drawings_obj = {};
  console.log(req.body.pair_id);
  let sub_canvas_num = null;
  if(req.body.selected_canvas === "top"){
    sub_canvas_num = 0;
  } else if (req.body.selected_canvas === "bottom"){
    sub_canvas_num = 1;
  }
  // console.log("revieved", req.body);
  let drawing_canvas = req.body.pair_id;
  let image_data = req.body.img_data;
  
  let upload_time = Math.floor(Date.now() / 1000);

  let drawing_obj = {
    merge_string: `${sub_canvas_num}`,
    drawing_canvas: drawing_canvas,
    sub_canvas_num: sub_canvas_num,
    image_data: image_data,
    upload_time: upload_time
  }

  // let canvases_arr = [null, null];

  console.log("DATE", Math.floor(Date.now() / 1000));  

  drawingsTable.getDrawing(drawing_canvas)
  .then(got => {
    // console.log("get res", got.drawing_canvas);
    console.log("get 1 res")
    // res.status(200).json("ok");
    
    //if drawing returns length 0 that means there is no drawing stored in the DB, so we add it
    if(got.length === 0){
      drawingsTable.addDrawing(drawing_obj)
      .then(response => {
          // console.log("RES: ", res);
          console.log("no err")
          drawingsTable.getDrawing(drawing_canvas)
            .then(got => {
              // console.log("get res", got.drawing_canvas);
              console.log("get 2 res")
              res.status(200).json(got);
            })
            .catch(error => {
              // drawingsTsable.addDrawing()
              console.log("get 2 err")
              res.status(400).json(error.message);
            })
          // res.status(200).json(response);
        })
      .catch(error => {
        console.log("add og err");
        // console.log(error);
        // console.log(error.message);
        res.status(400).json(error.message);

      })
    }
    else if(drawing_obj.sub_canvas_num != got[0].sub_canvas_num){
      //add logic for combining image data and returning new image
      console.log("diff canvases:", drawing_obj.sub_canvas_num, got[0].sub_canvas_num);
      console.log("got");
      // console.log("got:", got[0].image_data);
      // console.log("drawobj:", drawing_obj.image_data);
      console.log("got length:", got[0].image_data.length);
      let new_arr = [];
      if(got[0].sub_canvas_num === 0){
        new_arr = got[0].image_data.concat(drawing_obj.image_data);
      }
      else if(got[0].sub_canvas_num === 1){
        new_arr = drawing_obj.image_data.concat(got[0].image_data);
      }
      got[0].image_data = new_arr;
      if(got[0].merge_string.length === 1){
        got[0].merge_string += `${sub_canvas_num}`;
      }
      let merge_string = got[0].merge_string;
      console.log("b4 obj", drawing_canvas, merge_string);
      // let merge_obj = {
      //   drawing_canvas: drawing_canvas,
      //   merge_string: merge_string
      // }

      console.log("just before the mrge")
      drawingsTable.updateMerge(drawing_canvas, merge_string, new_arr)
        .then(responso => {
          console.log("update merge:", responso)
          // drawingsTable.getDrawing(drawing_canvas)
          // .then(got => {
          //   // console.log("get res", got.drawing_canvas);
          //   console.log("get 2 res")
          //   res.status(200).json(got);
          // })
          // .catch(error => {
          //   // drawingsTsable.addDrawing()
          //   console.log("get 2 err")
          //   res.status(400).json(error.message);
          // })
        })
        .catch(err =>{
          console.log("update merge err", err)
        })
      console.log("got merged length:", got[0].image_data.length);
      // console.log("got merged:", got[0].image_data);
      res.status(200).json(got);
    }
    else if(got[0].merge_string.length === 2){
      // console.log("same canvases:", drawing_obj.sub_canvas_num, got[0].sub_canvas_num);
      res.status(200).json(got);
    }
    else{
      res.status(400).json(got);
    }
  })
  .catch(error => {
    // drawingsTsable.addDrawing()

    // drawingsTable.addDrawing(drawing_obj)
    // .then(response => {
    //     // console.log("RES: ", res);
    //     //console.log("no err")

    //     // drawingsTable.getDrawing(drawing_canvas)
    //     //   .then(got => {
    //     //     // console.log("get res", got.drawing_canvas);
    //     //     console.log("get 2 res")
    //     //     res.status(200).json(got);
    //     //   })
    //     //   .catch(error => {
    //     //     // drawingsTsable.addDrawing()
    //     //     console.log("get 2 err")
    //     //     res.status(400).json(error.message);
    //     //   })
    //     console.log("okkokokok")
    //     res.status(200).json(response);
    //   })
    // .catch(error => {
    //   console.log("add new err");
    //   console.log(error);
    //   console.log(error.message);
    //   res.status(400).json(error.message);
    // })

    console.log("get 1 err" ) 
    console.log("g1", error) 
    console.log("g1", error.message) 
    res.status(400).json(error);
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


server.get('/drawings/:pair_id', (req, res) => {
  // console.log("params:", req.params.pair_id);
  let search_id = req.params.pair_id;

  drawingsTable.getDrawing(search_id)
  .then(got => {
    console.log("pinged get res", search_id);
    res.status(200).json(got);
  })
  .catch(error => {
    // drawingsTable.addDrawing()
    console.log("pinged get err")
    // console.log("get err", error.message);
    res.status(400).json(error.message);
  })
})

server.get('/every_canvas_ID', (req, res) => {
  drawingsTable.getID()
  .then(got => {
    // console.log("id check res", got);
    res.status(200).json(got);
  })
  .catch(error => {
    // drawingsTable.addDrawing()
    console.log("id check err")
    console.log("err", error.message);
    res.status(400).json(error.message);
  })
})

server.put('/count/:count_type', (req, res) => {
  let count_type = req.params.count_type + "_counter";
  countTable.getCount(count_type)
  .then(got => {
    console.log("count res", got);
    let count = got;
    if(count.length === 0){
      count = 1; 
      countTable.updateCount(count, count_type)
        .then(res => {
          console.log("1st updated count res", res)
          countTable.getCount(count_type)
            .then(got => { 
              console.log("added:", got);
            })
            .catch(error => {
              console.log("get count err 2")
            })
        })
        .catch(err => {
        })
    }
    else{
      count ++;
      console.log("countt", count);
      countTable.updateCount(count, count_type)
      .then(resp => {
        console.log(resp)
        countTable.getCount(count_type)
          .then(got => { 
            console.log("updated:", got);
          })
          .catch(error => {
            console.log("get count err 2")
          })
      })
      .catch(error => {
        console.log("count update error", error);
      })
    }
  })
  .catch(error => {
    console.log("count err", error);
  })
})



// watch for connections on port 5000
const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log('Server running')
);

