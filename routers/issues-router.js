const express = require("express");
const bcrypt = require("bcryptjs");
const axios = require("axios");

const Issues = require("./issues-model");
const restricted = require("../middleware/restricted");
const validateIssue = require("../middleware/validate-issue");

const router = express.Router();

//GET request  list of all issues

router.get("/", restricted, (req, res) => {
  console.log("req.jwtToken", req.jwtToken);
  Issues.find()
    .then((issues) => {
      res.json(issues);
    })
    .catch((err) => res.send(err));
});

//GET issue by id

router.get("/:id", restricted, async (req, res) => {
  const id = req.params.id;
  console.log("req.jwtToken", req.jwtToken);
  try {
    const getIssue = await Issues.findById(id);
    if (getIssue) {
      res.status(200).json(getIssue);
    } else {
      res.status(404).json({ message: "wrong user info" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "We ran into an error retrieving the user" });
  }
});

//GET issue by User id

router.get("/:id/user/issues", restricted, async (req, res) => {
  const id = req.params.id;
  console.log("req.jwtToken", req.jwtToken);
  try {
    const getIssues = await Issues.getIssuesByUserId(id);
    if (getIssues) {
      res.status(200).json(getIssues);
    } else {
      res.status(404).json({ message: "wrong user id" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "We ran into an error retrieving the issues" });
  }
});

//GET Comments by issue

router.get("/:id/comments", restricted, async (req, res) => {
  const id = req.params.id;
  console.log("req.jwtToken", req.jwtToken);
  try {
    const getComments = await Issues.getCommentsByIssueId(id);
    if (getComments) {
      res.status(200).json(getComments);
    } else {
      res.status(404).json({ message: "Issue with that ID does not exist" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "We ran into an error retrieving the comments" });
  }
});

//GET issue object with comments array attached

router.get("/:id/withComments", async (req, res) => {
  const id = req.params.id;

  try {
    const findIssue = await Issues.findById(id);
    console.log("is the issue found:", findIssue);
    const issueWithComments = await Issues.getIssueWithComments(id);
    if (findIssue) {
      res.status(200).json(issueWithComments);
    } else {
      res.status(404).json({
        message: "Unable to locate comments from an issue with that id",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to get Issue Object" });
  }
});

//ADD an Issue with model generating category

router.post("/", restricted, validateIssue, async (req, res) => {
  // console.log("req.jwtToken", req.jwtToken);
  const issue = req.body;

  try {
    const issueWithCategory = await axios
      .post(
        "https://comakecategorizer.herokuapp.com/api/",
        (issue.description, issue.issue_name)
      )
      .then((res) =>
        console.log("retrieved category!", (issue.category = res.data))
      )
      .catch((err) => console.log("FAILED CATEGORY", err));
    console.log("With new Category", issue);

    const newIssue = await Issues.add(issue);
    res.status(201).json(newIssue);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//UPDATE an issue

router.put("/:id", restricted, validateIssue, (req, res) => {
  const id = req.params.id;
  console.log(id);

  Issues.update(id, req.body)
    .then((issue) => {
      res.status(200).json(issue);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "We ran into an error updating the issue" });
    });
});

//DELETE an issue

router.delete("/:id", restricted, async (req, res) => {
  const id = req.params.id;
  try {
    const deleteIssue = await Issues.remove(id);
    console.log(deleteIssue);
    if (deleteIssue > 0) {
      res.status(200).json({ message: "The Issue has been deleted" });
    } else {
      res
        .status(404)
        .json({ message: "Unable to delete the Issue with that id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to delete Issue" });
  }
});

module.exports = router;
