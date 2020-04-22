
exports.up = function(knex) {
  return knex.schema
  .createTable("drawingsTable", tbl => {
    tbl.string('drawing_canvas')
      .notNullable();
    tbl.int('sub_canvas_num')
      .notNullable();



  // tbl.increments();
  // tbl.integer('artist_id')
  // .unsigned()
  // .notNullable()
  // .references('id')
  // .inTable('musicians');
  // tbl.integer('user_id')
  // .unsigned()
  // .notNullable()
  // .references('id')
  // .inTable('users');  
}); 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("favoriteMusicians");
  
};
