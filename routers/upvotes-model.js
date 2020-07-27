const db = require("../data/db-config");

module.exports = {
  upvoteIssue,
  upvoteComment,
  findIssueUpvotes,
  findVoteById,
  findCommentUpvotes,
  issueVoteById,
  commentVoteById,
  removeIssueUpvote,
  removeCommentUpvote,
};

function findIssueUpvotes() {
  return db("issueUpvotes");
}

function findCommentUpvotes() {
  return db("commentUpvotes");
}

//Add an upvote to an issue
function upvoteIssue(upvote) {
  return db("issueUpvotes")
    .insert(upvote, "id")
    .then((ids) => {
      const [id] = ids;
      return findVoteById(id);
    });
}

//Add an upvote to an comment
function upvoteComment(upvote) {
  return db("commentUpvotes")
    .insert(upvote, "id")
    .then((ids) => {
      const [id] = ids;
      return commentVoteById(id);
    });
}

function findVoteById(id) {
  return db("issueUpvotes").where({ id }).first();
}

function issueVoteById(id) {
  return db("issueUpvotes").where({ issue_id: id });
}

function commentVoteById(id) {
  return db("commentUpvotes").where({ comment_id: id });
}

function removeIssueUpvote(id) {
  return db("comments").where({ id }).del();
}

function removeCommentUpvote(id) {
  return db("comments").where({ id }).del();
}
