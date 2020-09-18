import React, {useState, useEffect} from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  //add blog
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  //notification
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //get all blogs
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  //check if user info is in local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  //login with username and password
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      //send login info
      const user = await loginService.login({
        username,
        password,
      });
      //save to local storage
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      //set user info
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      console.log("Wrong username or password");
    }
  };

  //login jsx
  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input value={username} onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input value={password} onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  //logout
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  //adding blogs
  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({title: title, author: author, url: url});
      setTitle("");
      setAuthor("");
      setUrl("");
      await blogService.getAll().then((blogs) => setBlogs(blogs));
      setSuccessMessage(`A new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  // adding blogs form jsx
  const blogForm = () => (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input value={title} onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          Author:
          <input value={author} onChange={({target}) => setAuthor(target.value)} />
        </div>
        <div>
          Url:
          <input value={url} onChange={({target}) => setUrl(target.value)} />
        </div>
        <button type="submit">save</button>
      </form>
    </>
  );

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <p>{errorMessage}</p>
          {loginForm()}
        </div>
      ) : (
        <div>
          <h1>Blogging</h1>
          <p>{successMessage}</p>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
