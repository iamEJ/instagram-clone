import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Post from "./Components/Post";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "Happy Owl",
      caption: "I am on instagram",
      imageUrl:
        "https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&rect=37%2C29%2C4955%2C3293&q=45&auto=format&w=926&fit=clip",
    },
    {
      username: "Snow Owl",
      caption: "This is a good day.",
      imageUrl:
        "https://www.ulh.nhs.uk/content/uploads/2017/10/Mindfulness-happy.jpg",
    },
  ]);

  return (
    <div className="app">
      <div className="app_header">
        <Header />
      </div>
      <div className="app_body">
        {posts.map((post) => (
          <Post
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
