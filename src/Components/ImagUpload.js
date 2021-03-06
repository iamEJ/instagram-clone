import React, { useState } from "react";
import { Button } from "@material-ui/core";
import db, { storage } from "../firebase";
import firebase from "firebase";
import "./css/ImageUpload.css";

function ImagUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image?.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function
        console.log(error);
      },
      () => {
        // Completed function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image to database
            db.collection("posts").add({
              caption: caption,
              imageUrl: url,
              username: username,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="image_upload">
      <h2>Upload an Image</h2>
      <progress className="image_upload_progress" value={progress} max="100" />
      <input
        className="caption_input"
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      />
      <input type="file" onChange={handleChange} className="upload_button" />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImagUpload;
