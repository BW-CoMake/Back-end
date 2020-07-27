exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("comments").then(function () {
    // Inserts seed entries
    return knex("comments").insert([
      {
        issue_id: 1,
        user_id: 2,
        comment: "My tire blew out last week because of this!",
      },
      {
        issue_id: 4,
        user_id: 1,
        comment: "I think this should be a priority, its very dangerous.",
      },
      {
        issue_id: 4,
        user_id: 2,
        comment: "I almost got into an accident because this sign was down",
      },
      { issue_id: 4, user_id: 3, comment: "We need this done fast" },
      {
        issue_id: 5,
        user_id: 5,
        comment: "I know a guy who can paint over this",
      },
    ]);
  });
};
