
module.exports = {
  addDrawing
}

function addDrawing(drawing) {
  return db("drawingsTable")
    .insert(drawing)
}

function getDrawing(drawing_id, sub_canvas_id) {
  return db("drawingsTable")
    .where({drawing_canvas: drawing_id, sub_canvas_num: sub_canvas_id})
    .select("drawingsTable.drawing_canvas", "drawingsTable.sub_canvas_id", "drawingsTable.image_data")
    
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