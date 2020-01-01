const { Router } = require("express");
const router = Router();

const {} = require('../data/db');

router
  .use("/")
  .get(async (req, res) => {
    // GET posts
    try {
      const posts = await find()
      res.status(200).json(posts);
    } catch (e) {
      res.status(500).json({ error: "The posts information could not be retrieved." })
    }
  })
  .post(async (req, res) => {
    // POST posts
  });

router
  .use("/:id")
  .get(async ({ params: { id } }, res) => {
    // GET posts/id
  })
  .delete(async ({ params: { id } }, res) => {
    // DELETE posts/id
  })
  .update(async ({ params: { id } }, res) => {
    // UPDATE posts/id
  });

router
  .use("/:id/comments")
  .get(async ({ params: { id } }, res) => {
    // GET comments of posts/id
  })
  .post(async ({ params: { id } }, res) => {
    // post comments to posts/id
  });

  module.exports.router = router;