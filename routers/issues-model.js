const db = require("../data/db-config");

module.exports = {
  add,
  find,
  findBy,
  findById,
  getCommentsByIssueId,
  getIssueWithComments,
  getIssuesByUserId,
  remove,
  update,
};

function find() {
  return db("issues");
}

function findBy(filter) {
  return db("issues").where(filter);
}

function add(issue) {
  return db("issues")
    .insert(issue, "id")
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("issues").where({ id }).first();
}

function getCommentsByIssueId(id) {
  return db("comments").where({ issue_id: id });
}

function getIssuesByUserId(id) {
  return db("issues").where({ user_id: id });
}

function remove(id) {
  return db("issues").where({ id }).del();
}

function update(id, changes) {
  return db("issues")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        return findById(id);
      } else {
        return null;
      }
    });
}

// get issue with comments attatched
async function getIssueWithComments(id) {
  let issue = await findById(id);
  let comments = await getCommentsByIssueId(id);
  if (issue) {
    return { ...issue, comments };
  } else {
    return null;
  }
}
