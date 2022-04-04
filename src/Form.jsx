import React, { useState } from "react";

const Form = ({ userId, ...props }) => {
  const {
    title,
    setTitle,
    body,
    setBody,
    isEditing,
    setIsEditing,
    editPost,
    isEditingId,
  } = props;

  const handleSubmit = e => {
    e.preventDefault();

    if (isEditing) {
      editPost(isEditingId);
      setIsEditing(false);
      return;
    }

    const data = { userId, title, body };
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      console.log(response);
      alert("Form Submitted");
      return response.json();
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Create Post</h3>
        <div>userId {userId}</div>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Input Title"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <input
            type="text"
            name="body"
            onChange={e => setBody(e.target.value)}
            placeholder="Input Body"
            value={body}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
