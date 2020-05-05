const db = require("./database/dbConfig.js");

module.exports = {
  addDrawing,
  getDrawing
}

function addDrawing(drawing) {
   console.log("loggg", drawing.sub_canvas_num, drawing.drawing_canvas, drawing.upload_time)
  // console.log("log", drawing)
  return db("drawings_table")
    .insert(drawing)
}

function getDrawing(drawing_canvas) {
  return db("drawings_table")
    .where({drawing_canvas: drawing_canvas})
    .select(drawings_table.drawing_canvas, drawings_table.sub_canvas_id, drawings_table.image_data)
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