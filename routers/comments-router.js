const express = require("express");
const bcrypt = require("bcryptjs");

const Comments = require("./comments-model");
const restricted = require("../middleware/restricted");
const validateComment = require("../middleware/validate-comment");

const router = express.Router();

//ADD a comment
router.post("/", restricted, validateComment, async (req, res) => {
  const commentInfo = req.body;
  try {
    const addComment = await Comments.add(commentInfo);
    res.status(201).json(addComment);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
});

//GET comment by ID

router.get("/:id", restricted, async (req, res) => {
  const id = req.params.id;
  console.log("req.jwtToken", req.jwtToken);
  try {
    const getComment = await Comments.findById(id);
    if (getComment) {
      res.status(200).json(getComment);
    } else {
      res.status(404).json({ message: "comment with that id does not exist" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "We ran into an error retrieving the comment" });
  }
});

//UPDATE a comment

router.put("/:id", restricted, validateComment, (req, res) => {
  const id = req.params.id;
  console.log(id);

  Comments.update(id, req.body)
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "We ran into an error updating the comment" });
    });
});

//DELETE an comment

router.delete("/:id", restricted, async (req, res) => {
  const id = req.params.id;
  try {
    const deleteComment = await Comments.remove(id);
    console.log(deleteComment);
    if (deleteComment > 0) {
      res.status(200).json({ message: "The Comment has been deleted" });
    } else {
      res
        .status(404)
        .json({ message: "Unable to delete the Comment with that id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to delete Comment" });
  }
});
module.exports = router;
