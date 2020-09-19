import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, addUpvote, username, deleteBlog }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} addUpvote={addUpvote} username={username} deleteBlog={deleteBlog} />
      ))}
    </div>
  )
}

export default Blogs
