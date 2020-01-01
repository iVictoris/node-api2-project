const { Router } = require("express");
const router = Router();

router
  .use("/")
  .get(async (req, res) => {
    /* GET posts */
    try {
      const posts = await find();
      res.status(200).json(posts);
    } catch (e) {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    }
  })
  .post(async (req, res) => {
    /* POST posts */
  });

router
  .use("/:id")
  .get(async ({ params: { id } }, res) => {
    /* GET posts/id */
  })
  .delete(async ({ params: { id } }, res) => {
    /* DELETE posts/id */
  })
  .update(async ({ params: { id } }, res) => {
    /* UPDATE posts/id */
  });

router
  .use("/:id/comments")
  .get(async (req, res) => {
    /* GET posts/:id/comments */
  })
  .post(async (req, res) => {
    /* POST posts/:id/comments */
  });

module.exports.router = router;
