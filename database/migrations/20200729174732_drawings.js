exports.up = function(knex) {
  return knex.schema
  .createTable("drawings_table", tbl => {
    tbl.string('drawing_canvas')
      .notNullable();
    tbl.integer('sub_canvas_num')
      .notNullable();
    tbl.specificType('image_data', 'jsonb[]')
      .notNullable(); 
    tbl.string('merge_string')
      .notNullable();
    tbl.integer('upload_time')
      .notNullable();
}); 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("drawings_table");
};

