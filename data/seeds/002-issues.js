exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("issues").then(function () {
    // Inserts seed entries
    return knex("issues").insert([
      {
        user_id: 1,
        issue_name: "pot hole",
        description: "theres a pot hole between first and second avenue",
        zipCode: 10065,
        category: "street/roadwork",
      },
      {
        user_id: 2,
        issue_name: "garbage on the beach",
        description:
          "the beach needs to be cleaned. There is a bunch of plastic bottles and bags/wrappers that has washed up on shore",
        zipCode: 10022,
        category: "environment",
      },
      {
        user_id: 3,
        issue_name: "Broken fence",
        description:
          "Drunk driver crashed through the fence near the school. 15 feet of it needs to be rebuilt.",
        zipCode: 10022,
        category: "construction",
      },
      {
        user_id: 3,
        issue_name: "Stop sign fell over",
        description:
          "The storm knocked the sign over on the corner of 10th ave and Main street. Will need an hour and 3 volunteers",
        zipCode: 10022,
        category: "roadwork",
        volunteer: true,
      },
      {
        user_id: 5,
        issue_name: "Mural was vandalized",
        description: "Need to paint over the grafiti on the mural.",
        zipCode: 10022,
        category: "repair",
      },
      {
        user_id: 5,
        issue_name: "Security system needed at local shop",
        description:
          "3 break ins this month, need to put together money and time to install new cameras and alarm system",
        zipCode: 10022,
        category: "electric",
      },
      {
        user_id: 4,
        issue_name: "lines in the road have faded away",
        description: "need to repaint the lines in the middle of the road",
        zipCode: 10065,
        category: "roadwork",
      },
      {
        user_id: 4,
        issue_name: "Storm washed rocks into the road",
        description:
          "dozens of large rocks are covering the orad and sidewalk, dangerous to drive through",
        zipCode: 10065,
        category: "environment",
      },
      {
        user_id: 6,
        issue_name: "town common needs landscaping",
        description:
          "park for children is overgrown with weeds and bushes, needs landscaping done",
        zipCode: 10022,
        category: "landscaping",
      },
    ]);
  });
};
