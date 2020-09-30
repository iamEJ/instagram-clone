import React, { useState, useEffect } from "react";
import "./css/Post.css";
import Avatar from "@material-ui/core/Avatar";
import db from "../firebase";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import firebase from "firebase";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";
import { IconButton } from "@material-ui/core";

function Post({ postId, imageUrl, username, caption, user, timestamp }) {
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
          alt=""
          src="https://www.clipartmax.com/middle/m2i8m2A0K9H7N4m2_person-icons-person-icon/"
        />
        <h3>
          {username}
          <p className="post_timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </p>
        </h3>
      </div>
      <img className="post_image" src={imageUrl} alt="" />
      <div className="post_icons">
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton>
          <NearMeOutlinedIcon />
        </IconButton>
      </div>

      <h4 className="post_text">
        <strong>{username}</strong> : {caption}
      </h4>
      <div className="post_comments">
        <p className="comments_list">Comments:</p>
        {comments.map((comment) => (
          <p className="post_comment">
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
            <SendOutlinedIcon />
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
