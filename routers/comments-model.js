const db = require("../data/db-config");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update,
};

function find() {
  return db("comments");
}

function findBy(filter) {
  return db("comments").where(filter);
}

function add(comment) {
  return db("comments")
    .insert(comment, "id")
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("comments").where({ id }).first();
}

function remove(id) {
  return db("comments").where({ id }).del();
}

function update(id, changes) {
  return db("comments")
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
