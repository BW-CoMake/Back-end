const express = require("express");

const Upvotes = require("./upvotes-model");
const restricted = require("../middleware/restricted");
const validateIssueUpvote = require("../middleware/validate-issue-upvote");
const validateCommentUpvote = require("../middleware/validate-comment-upvote");

const router = express.Router();

router.get("/issues", restricted, (req, res) => {
  const id = req.params.id;
  console.log("req.jwtToken", req.jwtToken);
  Upvotes.findIssueUpvotes()
    .then((votes) => {
      res.json(votes);
    })
    .catch((err) => res.send(err));
});
//GET upvotes list for issues

router.get("/issue/:id", restricted, (req, res) => {
  const id = req.params.id;
  console.log("req.jwtToken", req.jwtToken);
  Upvotes.issueVoteById(id)
    .then((votes) => {
      res.json({ votes, upvotes: votes.length });
    })
    .catch((err) => res.send(err));
});

//GET upvotes list for comments

router.get("/comment/:id", restricted, (req, res) => {
  const id = req.params.id;
  console.log("req.jwtToken", req.jwtToken);
  Upvotes.commentVoteById(id)
    .then((votes) => {
      res.json(votes.length);
    })
    .catch((err) => res.send(err));
});
//Post and upvote to an Issue

router.post("/issue", restricted, validateIssueUpvote, async (req, res) => {
  console.log("req.jwtToken", req.jwtToken);
  const vote = req.body;
  try {
    const upvote = await Upvotes.upvoteIssue(vote);
    console.log("upvote=", upvote);
    res.status(201).json(upvote);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Post and upvote to a comment
router.post("/comment", restricted, validateCommentUpvote, async (req, res) => {
  console.log("req.jwtToken", req.jwtToken);
  const vote = req.body;
  try {
    const upvote = await Upvotes.upvoteComment(vote);
    console.log("upvote=", upvote);

    res.status(201).json(upvote);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//DELETE upvote on issue

router.delete("/:id/issue", restricted, async (req, res) => {
  const id = req.params.id;
  try {
    const deleteUpvote = await Upvotes.removeIssueUpvote(id);
    console.log(deleteUpvote);
    if (deleteUpvote > 0) {
      res.status(200).json({ message: "The Upvote has been deleted" });
    } else {
      res
        .status(404)
        .json({ message: "Unable to delete the Upvote with that id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to delete Upvote" });
  }
});

//DELETE upvote on comment

router.delete("/:id/comment", restricted, async (req, res) => {
  const id = req.params.id;
  try {
    const deleteUpvote = await Upvotes.removeCommentUpvote(id);
    console.log(deleteUpvote);
    if (deleteUpvote > 0) {
      res.status(200).json({ message: "The Upvote has been deleted" });
    } else {
      res
        .status(404)
        .json({ message: "Unable to delete the Upvote with that id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to delete Upvote" });
  }
});

module.exports = router;
