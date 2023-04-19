const express = require("express");
const router = express.Router();
const {
  getPost,
  addPost,
  editPost,
  getEditPostPage,
  getAddPostPage,
  deletePost,
  getPosts,
} = require("../controllers/post-controller");

router.get("/posts/:id", getPost);
router.post("/add-post", addPost);
router.put("/edit/:id", editPost);
router.get("/edit/:id", getEditPostPage);
router.get("/add-post", getAddPostPage);
router.delete("/posts/:id", deletePost);
router.get("/posts", getPosts);

module.exports = router;
