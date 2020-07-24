exports.up = function (knex) {
  return knex.schema.createTable("commentUpvotes", (upvote) => {
    upvote.increments();

    upvote
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    upvote
      .integer("comment_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("comments")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    upvote.unique(["user_id", "comment_id"]);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("commentUpvotes");
};
