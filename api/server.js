const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Welcome to Co-Make!");
});

module.exports = server;
