module.exports = validateIssueUpvote;

function validateIssueUpvote(req, res, next) {
  const upvoteInfo = req.body;
  console.log("time to validate the upvote info", upvoteInfo);
  if (!upvoteInfo.user_id || !upvoteInfo.issue_id) {
    res
      .status(400)
      .json({ message: "missing one or multiple required fields" });
  } else {
    next();
  }
}
