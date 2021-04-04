// build your server here and require it from index.js
const express = require("express");
const helmet = require("helmet");
const resourcesRouter = require("./resource/router.js");
const projectsRouter = require("./project/router.js");
const tasksRouter = require("./task/router.js");

const server = express();

server.use(helmet(), express.json());
server.use("/api/resources", resourcesRouter);
server.use("/api/projects", projectsRouter);
server.use("/api/tasks", tasksRouter);

server.get("/", (req, res, next) => {
  res.status(200).json({ message: "I'm working!!!!!" });
});

server.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage =
    error.message || "failure from the server! not your fault!";
  res.status(errorStatus).json({ message: errorMessage, stack: error.stack });
});

module.exports = server;
