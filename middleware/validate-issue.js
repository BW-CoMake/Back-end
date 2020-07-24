module.exports = validateIssue;

function validateIssue(req, res, next) {
  const issueInfo = req.body;
  console.log("time to validate the user info", issueInfo);
  if (
    !issueInfo.user_id ||
    !issueInfo.issue_name ||
    !issueInfo.zipCode ||
    !issueInfo.description
  ) {
    res.status(400).json({
      message: "missing one or more of the required fields for an issue",
    });
  } else {
    next();
  }
}
