exports.up = function(knex) { //removed image data from this file to see if it works and therefore image data is the source of failure
  return knex.schema
  .createTable("drawings_test", tbl => {
    tbl.string('drawing_canvas')
      .notNullable();
    tbl.integer('sub_canvas_num')
      .notNullable();
    tbl.integer('upload_time')
      .notNullable();
}); 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("drawings_test");
};
