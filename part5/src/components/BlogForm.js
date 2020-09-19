import React, {useState} from "react";

const BlogForm = ({createBlog}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <div>
        <h2>Create new blog</h2>
        <form onSubmit={handleSubmit}>
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
      </div>
    </div>
  );
};

export default BlogForm;
