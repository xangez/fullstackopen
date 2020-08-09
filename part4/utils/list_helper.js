const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => {
    return blog.likes + likes;
  }, 0);
};

const favouriteBlog = (blogs) => {
  return blogs.reduce((favBlog, currentBlog) => {
    if (currentBlog.likes > favBlog.likes) {
      return currentBlog;
    } else {
      return favBlog;
    }
  }, blogs[0]);
};

const mostBlogs = (blogs) => {
  const authorBlogObj = blogs.reduce((allAuthors, currentBlog) => {
    if (currentBlog.author in allAuthors) {
      allAuthors[currentBlog.author]++;
    } else {
      allAuthors[currentBlog.author] = 1;
    }
    return allAuthors;
  }, {});
  const author = Object.keys(authorBlogObj).reduce((author, currentAuthor) => {
    return authorBlogObj[currentAuthor] > authorBlogObj[author] ? currentAuthor : author;
  });
  return {author: author, blogs: authorBlogObj[author]};
};

const mostLikes = (blogs) => {
  const favBlog = blogs.reduce((favBlog, currentBlog) => {
    if (currentBlog.likes > favBlog.likes) {
      return currentBlog;
    } else {
      return favBlog;
    }
  }, blogs[0]);
  return _.pick(favBlog, ["author", "likes"]);
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
