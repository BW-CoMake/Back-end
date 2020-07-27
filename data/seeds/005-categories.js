exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("categories").then(function () {
    // Inserts seed entries
    return knex("categories").insert([
      { category: "Safety" },
      { category: "Environment" },
      { category: "Community" },
      { category: "Road" },
      { category: "Broken" },
      { category: "Children" },
      { category: "Noise" },
      { category: "Smell" },
      { category: "Visual" },
    ]);
  });
};
