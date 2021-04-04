// build your `/api/tasks` router here
const router = require("express").Router();
const Tasks = require("./model.js");

// [POST] /api/tasks

// Even though task_completed is stored as an integer, the API uses booleans when interacting with the client
// Example of response body: {"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_id:1}

router.post("/", async (req, res, next) => {
  const task = req.body;
  if (!task.task_description || !task.project_id) {
    const err = new Error();
    err.status = 400;
    err.message = "task description and project id required";
    next(err);
  } else {
    try {
      const createTask = await Tasks.addTask(task);
      res.status(200).json(createTask);
    } catch (err) {
      next(err);
    }
  }
});
//  [GET] /api/tasks

// Even though task_completed is stored as an integer, the API uses booleans when interacting with the client
// Each task must include project_name and project_description
// Example of response body: [{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_name:"bar","project_description":null}]

router.get("/", async (req, res, next) => {
  try {
    const data = await Tasks.getTask();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
