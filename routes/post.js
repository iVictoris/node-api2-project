const { Router } = require("express");
const router = Router();

const {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment
} = require("../data/db");

router
  .route("/")
  .get(async (_, res) => {
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
  .post(async ({ body: { title, contents } }, res) => {
    /* POST posts */
    if (!title || !contents) {
      res
        .status(400)
        .json({
          errorMessage: "Please provide title and contents for the post."
        });
    }

    try {
      const postFromBody = { title, content };

      const { id } = await insert(postFromBody);
      const post = await findById(id);
      res.status(201).json(post);
    } catch (e) {
      res
        .status(500)
        .json({
          error: "There was an error while saving the post to the database"
        });
    }
  });

router
  .route("/:id")
  .get(async ({ params: { id } }, res) => {
    /* GET posts/id */
  })
  .delete(async ({ params: { id } }, res) => {
    /* DELETE posts/id */
  })
  .put(async ({ params: { id } }, res) => {
    /* UPDATE posts/id */
  });

router
  .route("/:id/comments")
  .get(async (req, res) => {
    /* GET posts/:id/comments */
  })
  .post(async (req, res) => {
    /* POST posts/:id/comments */
  });

module.exports.router = router;
