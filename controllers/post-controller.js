const Post = require("../models/post");
const createPath = require("../helpers/create-path");
const handleError = require("../helpers/handle-error");

const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.render(createPath("post"), { post }))
    .catch((err) => handleError(res, err));
};

const addPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((result) => res.redirect("/posts"))
    .catch((err) => handleError(res, err));
};

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { title, author, text })
    .then((result) => res.redirect(`/posts/${id}`))
    .catch((err) => handleError(res, err));
};

const getEditPostPage = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.render(createPath("edit-post"), { post }))
    .catch((err) => handleError(res, err));
};

const getAddPostPage = (req, res) => {
  res.render(createPath("add-post"));
};

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((post) => res.render(createPath("post"), { post }))
    .catch((err) => handleError(res, err));
};

const getPosts = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.render(createPath("posts"), { posts }))
    .catch((err) => handleError(res, err));
};

module.exports = {
  getPost,
  addPost,
  editPost,
  getEditPostPage,
  getAddPostPage,
  deletePost,
  getPosts,
};
