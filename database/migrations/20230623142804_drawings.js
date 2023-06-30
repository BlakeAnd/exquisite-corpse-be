exports.up = function(knex) {
  return knex.schema
  .createTable("unique_drawings_table", tbl => {
    tbl.string('unique_id')
      .notNullable();
    tbl.specificType('image_data', 'jsonb[]')
      .notNullable(); 
    tbl.integer('upload_time')
      .notNullable();
}); 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("unique_drawings_table");
};
