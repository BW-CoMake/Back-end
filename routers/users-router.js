const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("./users-model");
const restricted = require("../middleware/restricted");
const validateUserUpdate = require("../middleware/validate-update");

const router = express.Router();

//GET all users for Co-Make

router.get("/", restricted, (req, res) => {
  // console.log("req.jwtToken", req.jwtToken);

  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.send(err));
});

//GET request users profile

router.get("/:id", restricted, async (req, res) => {
  // console.log("req.jwtToken", req.jwtToken);
  const { id } = req.params;
  try {
    const getUser = await Users.findById(id);
    if (getUser) {
      res.status(200).json(getUser);
    } else {
      res.status(404).json({ message: "wrong user info" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "We ran into an error retrieving the user" });
  }
});

//UPDATE user

router.put("/:id", restricted, validateUserUpdate, (req, res) => {
  const id = req.params.id;
  // console.log(id);

  Users.update(id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "We ran into an error updating the user" });
    });
});

//DELETE a user

router.delete("/:id", restricted, async (req, res) => {
  const id = req.params.id;
  try {
    const deleteUser = await Users.remove(id);
    console.log(deleteUser);
    if (deleteUser > 0) {
      res.status(200).json({ message: "The User has been deleted" });
    } else {
      res
        .status(404)
        .json({ message: "Unable to delete the User with that id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to delete User" });
  }
});

module.exports = router;
