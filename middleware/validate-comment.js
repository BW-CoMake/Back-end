module.exports = validateComment;

function validateComment(req, res, next) {
  const commentInfo = req.body;
  console.log("time to validate the comment info", commentInfo);
  if (!commentInfo.user_id || !commentInfo.issue_id || !commentInfo.comment) {
    res.status(400).json({
      message:
        "Make sure you fill out all 3 fields (user id, issue id, comment)",
    });
  } else {
    next();
  }
}
