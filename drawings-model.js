const db = require("./database/dbConfig.js");

module.exports = {
  addDrawing,
  getDrawing,
  updateMerge,
  getID
}

function addDrawing(drawing) {
  //  console.log("loggg", drawing.sub_canvas_num, drawing.drawing_canvas, drawing.upload_time)
  // console.log("log", drawing)
  return db("drawings_table")
    .insert(drawing)
}

function getDrawing(drawing_canvas) {
  // console.log("getting")
  return db("drawings_table")
    .where({drawing_canvas: drawing_canvas})
    .select("drawings_table.drawing_canvas", "drawings_table.sub_canvas_num", "drawings_table.image_data", "drawings_table.merge_string");
}

function updateMerge(drawing_canvas, merge_string, image_data){
  // console.log("hit merge", drawing_canvas, merge_string)
  return db("drawings_table")
    .where({drawing_canvas: drawing_canvas})
    .update({
      merge_string: merge_string,
      image_data: image_data
    })
}

function getID (drawing_canvas) {
  console.log("check check", drawing_canvas)
  return db("drawings_table")
    // .where({drawing_canvas: drawing_canvas})
    .select("drawings_table.drawing_canvas")
}

  // function findForUser({id}) {
  //   //let id = {id};
  //   return db("topAnimals")
  //   .innerJoin("animals", "topAnimals.animal_id", "animals.id")
  //   .where({ user_id: id})
  //   .select("animals.animal_name", "topAnimals.id", "user_id")
  // }
  // function edit (user_id, id, animal_id) {

  //   return db("topAnimals")
  //   .where({user_id: user_id, id: id})
  //   .update({animal_id: animal_id})
  // }

  // function remove (user_id, id) {
  //   return db("topAnimals")
  //   .where({user_id: user_id, id: id})
  //   .del()
  // }