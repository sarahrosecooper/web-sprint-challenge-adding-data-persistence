// build your `/api/projects` router here

const router = require("express").Router();
const Projects = require("./model.js");

// [POST] /api/projects

// Even though project_completed is stored as an integer, the API uses booleans when interacting with the client
// Example of response body: {"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}

router.post("/", async (req, res, next) => {
  const project = req.body;

  if (!project.project_name) {
    const err = new Error();
    err.status = 400;
    err.message = "no project name found!";
    next(err);
  } else {
    try {
      const newProject = await Projects.addProject(project);
      res.status(200).json(newProject);
    } catch (err) {
      next(err);
    }
  }
});
//  [GET] /api/projects

// Even though project_completed is stored as an integer, the API uses booleans when interacting with the client
// Example of response body: [{"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}]

router.get("/", async (req, res, next) => {
  try {
    const data = await Projects.getProject();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
