const Posts = require("../model/post.js");

exports.getAllPosts = (req, res, next) => {
  Posts.find()
    .populate("postedBy", "_id name")
    .select("_id title body created photo")
    .then((posts) => {
      console.log(posts);
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json({
        message: err,
      });
    });
};
