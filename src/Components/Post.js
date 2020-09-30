import React, { useState, useEffect } from "react";
import "./css/Post.css";
import Avatar from "@material-ui/core/Avatar";
import db from "../firebase";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import firebase from "firebase";

function Post({ postId, imageUrl, username, caption, user }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let unsubscribe;

    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    //post the comment
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt="Happy Owl"
          src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Eastern_Barn_Owl_%28Tyto_javanica_stertens%29%2C_Raigad%2C_Maharashtra.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img className="post_image" src={imageUrl} alt="" />
      <h4 className="post_text">
        <strong>{username}</strong> : {caption}
      </h4>

      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post_form">
          <input
            className="post_input"
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post_button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            <ChevronRightIcon />
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
