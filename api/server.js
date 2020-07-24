const express = require("express");
const helmet = require("helmet");
const authRouter = require("../auth/auth-router");
const usersRouter = require("../routers/users-router");

const server = express();
const cors = require("cors");

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Welcome to Co-Make!");
});

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

module.exports = server;
