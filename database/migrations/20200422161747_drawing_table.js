
exports.up = function(knex) {
  return knex.schema
  .createTable("drawingsTable", tbl => {
    tbl.string('drawing_canvas')
      .notNullable();
    tbl.int('sub_canvas_num')
      .notNullable();
    tbl.json('image_data')
      .notNullable(); 
    tbl.datetime('upload_time', { precision: 4 })
      .notNullable();
}); 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("drawingsTable");
};
