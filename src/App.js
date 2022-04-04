import React, { useEffect, useState } from "react";
import Form from "./Form";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(result => {
        setPosts(result);
        setIsLoading(false);
      })
      .catch(error => {
        setHasError(true);
        setIsLoading(false);
        setErrorMessage(error.message);
      });
  };

  const deletePost = (e, id) => {
    e.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    setPosts(posts.filter(post => post.id !== id));
  };

  const editPost = (e, id) => {
    e.preventDefault();

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: 1,
        title: "foo",
        body: "bar",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(response => response.json())
      .then(json => console.log(json));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <h1>Random Users</h1>
      <Form userId={1} posts={posts} setPosts={setPosts} />
      <br />
      <br />
      {hasError ? <p>{errorMessage}</p> : null}
      {!isLoading ? (
        <ul>
          {posts.map(({ id, title, body }) => (
            <>
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button type="button" onClick={e => editPost(e, id)}>
                  Edit
                </button>
                <button type="button" onClick={e => deletePost(e, id)}>
                  Delete
                </button>
              </li>
              <hr />
            </>
          ))}
        </ul>
      ) : (
        <h3>loading...</h3>
      )}
    </div>
  );
}

export default App;
