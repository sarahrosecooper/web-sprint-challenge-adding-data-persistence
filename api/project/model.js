// build your `Project` model here

const db = require("../../data/dbConfig");

async function getProject() {
  const projects = await db("projects");
  return projects.map((item) => {
    return {
      ...item,
      project_completed: item.project_completed === 0 ? false : true,
    };
  });
}

async function getProjectById(id) {
  const [project] = await db("projects").where({ project_id: id });
  return {
    ...project,
    project_completed: project.project_completed == 0 ? false : true,
  };
}

async function addProject(body) {
  const createId = await db("projects").insert(body);
  return getProjectById(createId[0]);
}

module.exports = {
  getProject,
  getProjectById,
  addProject,
};
