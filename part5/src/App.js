import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import SuccessMessage from './components/SuccessMessage'
import ErrorMessage from './components/ErrorMessage'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  //notification
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  //get all blogs
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  //check if user info is in local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //login with username and password
  const handleLogin = async (userInput) => {
    try {
      //send login info
      const user = await loginService.login(userInput)
      //save to local storage
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      //set user info
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  //add blog
  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error)
    }
  }

  const addUpvote = async (id, changes) => {
    try {
      await blogService.update(id, changes)
      blogService.getAll().then((blogs) => setBlogs(blogs))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      blogService.getAll().then((blogs) => setBlogs(blogs))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <ErrorMessage errorMessage={errorMessage} />
          <LoginForm handleLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <h1>Blogging</h1>
          <SuccessMessage successMessage={successMessage} />
          <p>{user.name} logged in</p>
          <button onClick={handleLogout} style={{ display: 'flex' }}>
            logout
          </button>
          <Toggleable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Toggleable>
          <Blogs blogs={blogs} addUpvote={addUpvote} username={user.username} deleteBlog={deleteBlog} />
        </div>
      )}
    </div>
  )
}

export default App
