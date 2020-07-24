module.exports = validateLoginInfo;

function validateLoginInfo(req, res, next) {
  const userInfo = req.body;
  console.log("time to validate the user info for LOGIN", userInfo);
  if (!userInfo.email || !userInfo.password) {
    res.status(400).json({ message: "missing username or password" });
  } else {
    next();
  }
}
