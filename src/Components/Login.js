import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { Button, Input, IconButton } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import ImagUpload from "./ImagUpload";
import BackupIcon from "@material-ui/icons/Backup";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import NearMeIcon from "@material-ui/icons/NearMe";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);

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

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };
  const openUploadBotton = () => {
    setOpenUpload(true);
  };

  return (
    <div className="login">
      {user?.displayName ? (
        <>
          <Modal open={openUpload} onClose={() => setOpenUpload(false)}>
            <ImagUpload username={user.displayName} />
          </Modal>

          <div class="header_icons">
            <IconButton>
              <HomeIcon />
            </IconButton>
            <IconButton>
              <NearMeIcon />
            </IconButton>
            <IconButton>
              <ExploreOutlinedIcon />
            </IconButton>
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
          </div>

          <h3 className="user_name">
            Hello, <strong>{user.displayName}</strong> !
          </h3>
          <Button onClick={openUploadBotton}>
            Upload in image <BackupIcon className="upload" />
          </Button>
        </>
      ) : (
        <>
          <h3 className="login_to_upload">Login to upload</h3>
          <BackupIcon className="upload_icon" />
        </>
      )}

      <div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="app_signup">
              <center>
                <img
                  className="modal_image"
                  alt=""
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                />
              </center>
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>
                Sign Up
              </Button>
            </form>
          </div>
        </Modal>
        <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="app_signup">
              <center>
                <img
                  className="modal_image"
                  alt=""
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                />
              </center>
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>
                Sign Up
              </Button>
            </form>
          </div>
        </Modal>
      </div>
      {user ? (
        <>
          <Button onClick={() => auth.signOut()}>Logout</Button>
        </>
      ) : (
        <div className="app_login_container">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
    </div>
  );
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default Login;
