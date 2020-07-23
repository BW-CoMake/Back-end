module.exports = validateUserRegistration;

function validateUserRegistration(req, res, next) {
  const userInfo = req.body;
  console.log("time to validate the user info", userInfo);
  if (!userInfo.email || !userInfo.password || !userInfo.zipCode) {
    res
      .status(400)
      .json({ message: "missing username or password or zipcode" });
  } else {
    next();
  }
}
