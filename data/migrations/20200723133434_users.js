exports.up = function (knex) {
  return knex.schema.createTable("users", (users) => {
    users.increments();
    users.string("username", 128);
    users
      .string("email")
      .notNullable()
      .unique()
      .comment("This is the email field");
    users.string("password", 999).notNullable();
    users
      .integer("zipCode")
      .notNullable()
      .comment("This is the location field");
    users.string("picture", 256);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
