import React, { useState } from 'react'

const Blog = ({ blog, addUpvote, username, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const upvote = () => {
    addUpvote(blog.id, { likes: blog.likes + 1 })
  }

  const removeBlog = () => {
    const result = window.confirm(`Confirm delete ${blog.title} by ${blog.author}?`)
    if (result) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} style={showWhenVisible}>
        hide
      </button>
      <button className={'viewButton'} onClick={toggleVisibility} style={hideWhenVisible}>
        view
      </button>
      <div style={showWhenVisible} className="toggleableContent">
        <div>{blog.url}</div>
        <div style={{ display: 'inline' }} className="likes">
          likes {blog.likes}
        </div>
        <button onClick={upvote} className="upvoteButton">
          upvote
        </button>
        {blog.user.username === username ? (
          <button onClick={removeBlog} style={{ display: 'block' }}>
            remove
          </button>
        ) : (
          <div>nothing</div>
        )}
      </div>
    </div>
  )
}

export default Blog
