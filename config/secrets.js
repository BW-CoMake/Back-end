require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "Bacically there is no secret",
};
