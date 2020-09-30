// const { count_table } = require("./database/dbConfig.js");
const db = require("./database/dbConfig.js");

module.exports = {
  getCount,
  addCount, 
  updateCount
}

function getCount(count_type){
  console.log("get count", count_type);
  return db("count_table")
    .select(`count_table.${count_type}`) 
}

function addCount(count_type) {
  console.log("add count", count_type);
  let number = 1;
  console.log("new_num add", number)
  if(count_type === "collision_counter"){
    return db("count_table")
    .insert({collision_counter: number})
  }
  else if (count_type === "visit_start_counter"){
    console.log("start")
    return db("count_table")
    .insert({visit_start_counter: number})
  }
  else if (count_type === "completed_drawing_counter"){
    return db("count_table")
    .insert({completed_drawing_counter: number})
  }   
}

function updateCount(new_number, count_type){
  console.log("update count", count_type);
  console.log("new_number", new_number)
  if(count_type === "collision_counter"){
    return db("count_table") 
    .update({collision_counter: new_number})
  }
  else if (count_type === "visit_start_counter"){
    console.log("update start")
    return db("count_table") 
    .update({visit_start_counter: new_number}, ['visit_start_counter'])
  }
  else if (count_type === "completed_drawing_counter"){
    return db("count_table") 
    .update({completed_drawing_counter: new_number})
  }

}