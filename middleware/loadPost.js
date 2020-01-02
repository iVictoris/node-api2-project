const { findById } = require("../data/db");

const loadPost = async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    try {
      const post = await findById(id);
      if (!post) {
        res
          .status(404)
          .json({
          message: "The post with the specified ID does not exist."
        });
        return;
      }
      req.postData = post;
    } catch (e) {
      res.status(500).json({
        error:
          "Something went wrong with the server in terms of locating the requested post"
      });
    }
  }
  next();
};

module.exports = loadPost;
