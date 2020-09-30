import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import Post from "./Components/Post";
import db, { auth } from "./firebase";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //login
        console.log(authUser);
        setUser(authUser);
      } else {
        //logout
        setUser(null);
      }
    });
    return () => {
      //perform some clean up
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  return (
    <div className="app">
      <div className="app_header">
        <Header />
      </div>
      <div className="app_body">
        {posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            user={user}
            timestamp={post.data.timestamp}
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
