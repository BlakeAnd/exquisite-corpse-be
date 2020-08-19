const db = require("./database/dbConfig.js");

module.exports = {
  getCount,
  addCount, 
  updateCount
}

function getCount(){
  return db("count_same")
    .select("count_same.counter")
}

function addCount(new_number) {
  console.log("new_num add", new_number)
  return db("count_same")
    .insert()
}

function updateCount(new_number){
  console.log("new_number", new_number)
  // return db("count_same")
  
  //   .update({counter: new_number})
}