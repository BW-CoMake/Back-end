exports.up = function (knex) {
  return knex.schema.createTable("categories", (cat) => {
    cat.increments();

    cat.string("category").notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("categories");
};
