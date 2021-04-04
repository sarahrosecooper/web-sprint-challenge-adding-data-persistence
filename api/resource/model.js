// build your `Resource` model here

const db = require("../../data/dbConfig");

function getAllResources() {
  return db("resources");
}

async function getResourceById(resource_id) {
  return await db("resources").first("*").where({ resource_id });
}

async function addNewResource(body) {
  const createId = await db("resources").insert(body);
  return getResourceById(createId[0]);
}

module.exports = {
  getAllResources,
  getResourceById,
  addNewResource,
};
