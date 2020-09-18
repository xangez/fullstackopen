import React, {useState, useEffect} from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  //get all blogs
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  //login with username and password
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      // setErrorMessage("Wrong credentials");
      // setTimeout(() => {
      //   setErrorMessage(null);
      // }, 5000);
      console.log("Wrong credentials");
    }
    console.log("logging in with, username, password");
  };

  //login jsx
  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
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

  //adding blogs form jsx
  // const blogForm = () => (
  //   <form onSubmit={addBlog}>
  //     <input value={newBlog} onChange={handleBlogChange} />
  //     <button type="submit">save</button>
  //   </form>
  // );

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          blogForm()
        </div>
      )}
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
