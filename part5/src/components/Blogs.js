import React from "react";
import Blog from "./Blog";

const Blogs = ({blogs, addUpvote}) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} addUpvote={addUpvote} />
      ))}
    </div>
  );
};

export default Blogs;
