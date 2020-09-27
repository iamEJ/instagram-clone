import React from "react";
import "./css/Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post({ imageUrl, username, caption }) {
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
    </div>
  );
}

export default Post;
