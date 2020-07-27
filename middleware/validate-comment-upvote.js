module.exports = validateCommentUpvote;

function validateCommentUpvote(req, res, next) {
  const upvoteInfo = req.body;
  console.log("time to validate the upvote info", upvoteInfo);
  if (!upvoteInfo.user_id || !upvoteInfo.comment_id) {
    res
      .status(400)
      .json({ message: "missing one or multiple required fields" });
  } else {
    next();
  }
}
