import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import Post from "./Components/Post";
import db from "./firebase";
import Login from "./Components/Login";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, []);

  return (
    <div className="app">
      <div className="app_header">
        <Header />
        <Login />
      </div>
      <div className="app_body">
        {posts.map((post) => (
          <Post
            key={post.id}
            username={post.data.username}
            caption={post.data.caption}
            imageUrl={post.data.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
