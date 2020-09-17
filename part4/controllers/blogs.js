const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {username: 1, name: 1});
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({error: "token missing or invalid"});
  }

  const user = await User.findById(decodedToken.id);

  if (!body.title || !body.url) {
    return response.status(400).end();
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  if (!body.likes) {
    blog.likes = 0;
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  }
  return response.status(401).json({error: "token missing or invalid"});
});

blogsRouter.put("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const blog = await Blog.findById(request.params.id);
  const body = request.body;

  if (blog.user.toString() === decodedToken.id.toString()) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {new: true});
    return response.json(updatedBlog);
  }
  return response.status(401).json({error: "token missing or invalid"});
});

module.exports = blogsRouter;
