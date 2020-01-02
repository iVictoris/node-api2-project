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

const loadPost = require('../middleware/loadPost')

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
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
      return;
    }

    try {
      const postFromBody = { title, contents };

      const { id } = await insert(postFromBody);
      const post = await findById(id);
      res.status(201).json(post);
    } catch (e) {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    }
  });
/**
 * loadPost takes care of the 
 * find post by id
 *  send error if post not found
 * save to req.postData
 * move to next middleware
 * 
 * Will send an error if it could not perform task above as a 500 error
 */
router.all('/:id', loadPost)
router
  .route("/:id")
  .get(async ({postData: post}, res) => {
    /* GET posts/id */
    res
      .status(201)
      .json(post);
      return
  })
  .delete(async ({postData: post}, res) => {
    /* DELETE posts/id */
  })
  .put(async ({postData: post}, res) => {
    /* UPDATE posts/id */
  });

router
  .route("/:id/comments")
  .get(async (req, res) => {
    /* GET posts/:id/comments */
  })
  .post(async ({postData: post, body: { text } }, res) => {
    /* POST posts/:id/comments */

    if (!text) {
      res.status(400).json({
        errorMessage: "Please provide text for the comment."
      });
      return;
    }

    const commentFromBody = { text, post_id: post.id };

    try {
      const { id: commentId } = await insertComment(commentFromBody);
      const comment = await findCommentById(commentId);

      res.status(201).json(comment);
    } catch (e) {
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    }
  });

module.exports.router = router;
