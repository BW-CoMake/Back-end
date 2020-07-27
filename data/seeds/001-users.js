exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users").then(function () {
    // Inserts seed entries
    return knex("users").insert([
      {
        email: "mosharraf@gmail.com",
        username: "Mosharraf",
        password: "123pass",
        zipCode: 10065,
      },
      {
        email: "Daniel@yahoo.com",
        username: "Daniel",
        password: "123pass",
        zipCode: 10022,
      },
      {
        email: "sam@yahoo.com",
        username: "Sam",
        password: "123pass",
        zipCode: 10022,
      },
      {
        email: "orfali@gmail.com",
        username: "Orfali",
        password: "123pass",
        zipCode: 10065,
      },
      {
        email: "abdus@yahoo.com",
        username: "Abdus",
        password: "123pass",
        zipCode: 10022,
      },
      {
        email: "mostafa@yahoo.com",
        username: "Mostafa",
        password: "123pass",
        zipCode: 10022,
      },
      {
        email: "gladis@yahoo.com",
        username: "Gladis",
        password: "123pass",
        zipCode: 10022,
      },
      {
        email: "zaure@gmail.com",
        username: "Zaure",
        password: "123pass",
        zipCode: 10065,
      },
      {
        email: "steven@gmail.com",
        username: "Steven",
        password: "123pass",
        zipCode: 10065,
      },
    ]);
  });
};
