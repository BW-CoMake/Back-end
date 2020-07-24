const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = require("../config/secrets");
const Users = require("../routers/users-model");
const restricted = require("../middleware/restricted");
const validateUserRegistration = require("../middleware/validate-registration");
const validateLoginInfo = require("../middleware/validate-login");
const router = express.Router();

router.post("/register", validateUserRegistration, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  Users.add(user)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/login", validateLoginInfo, (req, res) => {
  let { email, password } = req.body;
  Users.findBy({ email })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username || user.email}!`,
          token,
          id: user.id,
          zipCode: user.zipCode,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

function generateToken(user) {
  console.log("secret.jwtsecret:", secret.jwtSecret);
  const jwtPayload = {
    subject: user.id,
    email: user.email,
  };
  // const jwtSecret = process.env.JWT_SECRET;
  const jwtOptions = {
    expiresIn: "10d",
  };
  return jwt.sign(jwtPayload, secret.jwtSecret, jwtOptions);
}

module.exports = router;
