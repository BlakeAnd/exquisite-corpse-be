exports.up = function(knex) {
  return knex.schema
  .createTable("drawingss_table", tbl => {
    tbl.string('drawing_canvas')
      .notNullable();
    tbl.integer('sub_canvas_num')
      .notNullable();
    tbl.json('image_data')
      .notNullable(); 
    tbl.integer('upload_time')
      .notNullable();
}); 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(drawings_table);
};
