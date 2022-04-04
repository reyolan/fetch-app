import React, { useEffect, useState } from "react";
import Form from "./Form";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingId, setIsEditingId] = useState(0);

  useEffect(() => {
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

    fetchPosts();
  }, []);

  const resetInputs = () => {
    setBody("");
    setTitle("");
  };

  const deletePost = (e, id) => {
    e.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    setPosts(posts.filter(post => post.id !== id));
  };

  const editPost = id => {
    const selectedPost = posts.find(post => post.id === id);
    selectedPost.body = body;
    selectedPost.title = title;

    const data = { id, title, body, userId: 1 };

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(response => response.json())
      .then(json => console.log(json));

    const updatedPosts = posts.map(post =>
      post.id === id ? { ...selectedPost } : post
    );

    setPosts(updatedPosts);
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    setIsEditingId(id);
    setIsEditing(true);
    const selectedPost = posts.find(post => post.id === id);
    setTitle(selectedPost.title);
    setBody(selectedPost.body);
  };

  return (
    <div className="App">
      <h1>Random Users</h1>
      <Form
        userId={1}
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editPost={editPost}
        isEditingId={isEditingId}
        resetInputs={resetInputs}
      />
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
                <button type="button" onClick={e => handleEdit(e, id)}>
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
