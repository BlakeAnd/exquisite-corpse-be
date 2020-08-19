exports.up = function(knex) {
  return knex.schema
  .createTable("count_same", tbl => {
    tbl.increments('counter')
      .notNullable();
}); 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("count_same");
};
