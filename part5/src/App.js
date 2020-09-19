import React, {useState, useEffect, useRef} from "react";
import Blogs from "./components/Blogs";
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";
import BlogForm from "./components/BlogForm";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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

  //add blog
  const blogFormRef = useRef();

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setSuccessMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const addUpvote = async (id, changes) => {
    try {
      await blogService.update(id, changes);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <ErrorMessage errorMessage={errorMessage} />
          {loginForm()}
        </div>
      ) : (
        <div>
          <h1>Blogging</h1>
          <SuccessMessage successMessage={successMessage} />
          <p>{user.name} logged in</p>
          <button onClick={handleLogout} style={{display: "flex"}}>
            logout
          </button>
          <Toggleable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Toggleable>
          <Blogs blogs={blogs} addUpvote={addUpvote} />
        </div>
      )}
    </div>
  );
};

export default App;
