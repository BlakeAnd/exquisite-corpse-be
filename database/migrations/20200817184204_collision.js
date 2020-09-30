exports.up = function(knex) {
  return knex.schema
  .createTable("count_table", tbl => {
    tbl.integer('collision_counter')
      // .notNullable();
    tbl.integer('visit_start_counter')
      // .notNullable();
    tbl.integer('completed_drawing_counter')
      // .notNullable();
}); 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("count_table");
};
