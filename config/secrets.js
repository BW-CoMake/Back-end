require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "follow cdc guideline and stay safe",
};
