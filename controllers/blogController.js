const Blog = require("../models/blog");

// blog index
const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blogs) => {
      res.render("blogs/index", { title: "All Blogs", blogs });
    })
    .catch((error) => {
      res.json(error.message);
    });
};

// blog details
const blog_details = (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) =>
      res.render("blogs/details", { blog, title: "Blog Details" })
    )
    .catch((err) => res.status(404).render("404", { title: "Blog not found" }));
};

// blog create get
const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a new blog" });
};

// blog create post
const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => res.redirect("blogs"))
    .catch(() => res.json(error.message));
};

// blog delete
const blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((blog) => res.json({ redirect: "/blogs" }))
    .catch((err) => res.render("/404", { title: "Error" }));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
