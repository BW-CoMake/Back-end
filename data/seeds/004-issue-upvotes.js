exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("issueUpvotes").then(function () {
    // Inserts seed entries
    return knex("issueUpvotes").insert([
      {
        user_id: 1,
        issue_id: 3,
      },
      {
        user_id: 2,
        issue_id: 3,
      },
      {
        user_id: 3,
        issue_id: 3,
      },
      {
        user_id: 4,
        issue_id: 3,
      },
      {
        user_id: 5,
        issue_id: 3,
      },
      {
        user_id: 1,
        issue_id: 2,
      },
      {
        user_id: 2,
        issue_id: 2,
      },
      {
        user_id: 3,
        issue_id: 2,
      },
      {
        user_id: 4,
        issue_id: 2,
      },
      {
        user_id: 5,
        issue_id: 1,
      },
      {
        user_id: 1,
        issue_id: 4,
      },
      {
        user_id: 2,
        issue_id: 4,
      },
      {
        user_id: 3,
        issue_id: 4,
      },
      {
        user_id: 4,
        issue_id: 6,
      },
      {
        user_id: 5,
        issue_id: 6,
      },
      {
        user_id: 1,
        issue_id: 7,
      },
      {
        user_id: 2,
        issue_id: 7,
      },
      {
        user_id: 3,
        issue_id: 7,
      },
      {
        user_id: 4,
        issue_id: 8,
      },
      {
        user_id: 5,
        issue_id: 8,
      },
      {
        user_id: 6,
        issue_id: 4,
      },
      {
        user_id: 7,
        issue_id: 4,
      },
      {
        user_id: 8,
        issue_id: 4,
      },
      {
        user_id: 6,
        issue_id: 1,
      },
      {
        user_id: 7,
        issue_id: 2,
      },
    ]);
  });
};
