import React, {useState} from "react";

const Blog = ({blog, addUpvote}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = {display: visible ? "none" : ""};
  const showWhenVisible = {display: visible ? "" : "none"};

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const upvote = () => {
    addUpvote(blog.id, {likes: blog.likes + 1});
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} style={showWhenVisible}>
        hide
      </button>
      <button onClick={toggleVisibility} style={hideWhenVisible}>
        view
      </button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div style={{display: "inline"}}> likes {blog.likes}</div>
        <button onClick={upvote}>upvote</button>
      </div>
    </div>
  );
};

export default Blog;
