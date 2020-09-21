const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'happy',
    author: 'meee',
    url: 'blah',
    likes: 0,
    user: '5f61b9f4186b7b112e7a9461',
  },
]

const token =
  'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvbWVvbmUiLCJpZCI6IjVmNjFiOWY0MTg2YjdiMTEyZTdhOTQ2MSIsImlhdCI6MTYwMDMyNTc4Mn0.9qhQWL9sITPllvpxd3urZFLE7t3i9X7yipIt8WPmseU'

const nonExistingId = async () => {
  const newBlog = {
    title: 'willremovethisoon',
    author: 'blah',
    url: 'http://blog.cleancoder.com/blah',
    likes: 2,
  }
  const blog = new Blog(newBlog)
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  token,
}
