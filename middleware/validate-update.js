module.exports = validateUserUpdate;

function validateUserUpdate(req, res, next) {
  const userInfo = req.body;
  console.log("time to validate the user info", userInfo);
  if (
    !userInfo.email ||
    !userInfo.password ||
    !userInfo.zipCode ||
    !userInfo.username
  ) {
    res
      .status(400)
      .json({ message: "missing one or multiple required fields" });
  } else {
    next();
  }
}
