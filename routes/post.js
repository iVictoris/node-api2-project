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

const loadPost = require("../middleware/loadPost");

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
router.all("/:id*", loadPost);
router
  .route("/:id")
  .get(async ({ postData: post }, res) => {
    /* GET posts/id */
    res.status(201).json(post);
    return;
  })
  .delete(async ({ postData: post }, res) => {
    /* DELETE posts/id */
    try {
      await remove(post.id);
      res.status(201).json(post);
    } catch (e) {
      res.status(500).json({
        error: "The post could not be removed"
      });
    }
  })
  .put(async ({ postData: post, body: { title, contents } }, res) => {
    /* UPDATE posts/id */

    /** should turn this into a middleware
     * since it's used 2x -- copy/pasted from above
     * */
    if (!title || !contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
      return;
    }

    try {
      const postFromBody = { ...post, title, contents };
      await update(post.id, postFromBody);
      try {
        const modifiedPost = await findById(post.id);
        res.status(201).json(modifiedPost);
        return;
      } catch (e) {
        res.status(500).json({
          error:
            "Something went wrong with the server in terms of locating the requested post"
        });
      }
    } catch (e) {
      res.status(500).json({
        error: "The post information could not be modified."
      });
    }
  });

router
  .route("/:id/comments")
  .get(async ({ postData: post }, res) => {
    /* GET posts/:id/comments */

    try {
      // get comments with matching post id
      const comments = await findPostComments(post.id);
      res.status(201).json(comments);
    } catch (e) {
      res.status(500).json({
        error: "The comments information could not be retrieved."
      });
    }
  })
  .post(async ({ postData: post, body: { text } }, res) => {
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
