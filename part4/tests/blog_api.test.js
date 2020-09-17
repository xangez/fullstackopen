const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const User = require("../models/user");

//initialise test collection
beforeEach(async () => {
  await Blog.deleteMany({});
  // await Blog.collection.insert(helper.initialBlogs);
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("when there is initially blogs saved", () => {
  test.skip("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test.skip("there is a specific blog within the returned blogs ", async () => {
    const response = await api.get("/api/blogs");
    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("React patterns");
  });

  test.skip("title of first blog is React patterns", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].title).toBe("React patterns");
  });
});

describe("viewing a specfic blog", () => {
  //getting blog by id
  test.skip("succeeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = await blogsAtStart[0];
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const processedBlogToView = await JSON.parse(JSON.stringify(blogToView));
    expect(resultBlog.body).toEqual(processedBlogToView);
  });
});

test.skip("login with correct username and password succeeds", async () => {
  await api.post("/api/login").send({username: "someone", password: "asdfg"}).expect(200);
});

describe("addition of a new blog", () => {
  test.skip("succeeds with valid data", async () => {
    const newBlog = {
      title: "Something",
      author: "lala",
      url: "blob",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", helper.token)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain("Something");
  });

  test.skip("fails with status code 400 if data invalid", async () => {
    const newBlog = {
      title: "nothing",
    };
    await api.post("/api/blogs").set("Authorization", helper.token).send(newBlog).expect(400);
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test.skip("likes default to 0 if not specified", async () => {
    const newBlog = {
      title: "things",
      author: "asdfasdf",
      url: "https://asdffd.com/",
    };
    const response = await api
      .post("/api/blogs")
      .set("Authorization", helper.token)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });
});

//update a blog
test.skip("succeeds with valid id", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = await blogsAtStart[0];
  blogToUpdate.likes = 10;
  const changes = {
    likes: 10,
  };
  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set("Authorization", helper.token)
    .send(changes)
    .expect(200);
  console.log(response.body);
});

//deleting a blog
test.skip("deleting a blog", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];
  await api.delete(`/api/blogs/${blogToDelete.id}`).set("Authorization", helper.token).expect(204);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
});

//check the id is named id not _id
test.skip("id is correctly named", async () => {
  const response = await api.get("/api/blogs");
  const firstBlog = response.body[0];
  expect(firstBlog.id).toBeDefined;
});

//testing users
//
describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({username: "root", passwordHash});
    await user.save();
  });

  test.skip("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "someone",
      name: "billy bob",
      password: "asdfg",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test.skip("creation fails with proper statuscode and message if username is already taken", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "root",
      name: "Superuser",
      password: "asdfasdf",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
