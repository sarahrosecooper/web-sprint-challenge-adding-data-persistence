// build your `/api/resources` router here
const router = require("express").Router();
const Resources = require("./model.js");

// [POST] /api/resources

// Example of response body: {"resource_id":1,"resource_name":"foo","resource_description":null}

router.post("/", async (req, res, next) => {
  const post = req.body;
  try {
    const newPost = await Resources.addNewResource(post);
    if (!newPost.resource_name) {
      const err = new Error();
      err.status = 400;
      err.message = "no resource_name found!";
      next(err);
    } else {
      res.status(201).json(newPost);
    }
  } catch (err) {
    next(err);
  }
});
//  [GET] /api/resources

// Example of response body: [{"resource_id":1,"resource_name":"foo","resource_description":null}]

router.get("/", async (req, res, next) => {
  try {
    const data = await Resources.getAllResources();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
