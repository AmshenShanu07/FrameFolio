import { useEffect, useLayoutEffect, useState } from "react";
import "./styles/rotateScreen.css";

import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import MusicOffIcon from '@mui/icons-material/MusicOff';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import SwipeInfo from "./SwipeInfo";
import FullScreenToolTip from "./FullScreenToolTip";
import { useGlobalStore } from "../Utils/globalStore";
import { signInWithPopup } from "firebase/auth";
import { auth, authProvider } from "../Utils/helpers/firebase";
import { useAuth } from "../Utils/userStore";
import LoadingScreen from "./LoadingScreen";

const RotateScreen = () => {
  const [show, setShow] = useState<boolean>(true);

  const { isMobile } = useGlobalStore();
  const { logInUser, userDetail, isLoggedIn, decodeToken } = useAuth();

  const checkOriantation = () => {
    if (window.innerHeight > window.innerWidth) setShow(true);
    else setShow(false);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    }
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoggedIn) return;

    signInWithPopup(auth, authProvider)
      .then((data) => {
        //@ts-ignore
        const token: string = data.user.accessToken;
        logInUser(token);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    checkOriantation();

    addEventListener("load", checkOriantation);
    addEventListener("resize", checkOriantation);

    return () => {
      removeEventListener("load", checkOriantation);
      removeEventListener("resize", checkOriantation);
    };
  }, []);

  useLayoutEffect(() => {
    decodeToken();
  }, []);

  return (
    <div className="screen-controler">
      {show ? (
        <div className="rotate-screen-container">
          <p>Please Rotate Your Screen*</p>
        </div>
      ) : (
        <>
          <LoadingScreen/>
          <div className="fullscreen-btn-con">
            <IconButton onClick={toggleFullscreen}>
              <FullscreenIcon sx={{ color: "#fff" }} />
            </IconButton>
          </div>

          <div className="profile_menu" onClick={handleLogin}>
            <Avatar alt="G" color="#3277a8" src={userDetail?.image}>
              G
            </Avatar>
            <div className="profile-name-container">
              <p>{userDetail?.name || "Guest User"}</p>
              <small>{userDetail?.email || "Click To Login"}</small>
            </div>
          </div>

          <FullScreenToolTip />
          {isMobile && <SwipeInfo />}
        </>
      )}

      <Dialog open={false} className="settings_popup">
        <DialogTitle>Welcome to Framefolio,</DialogTitle>
        <DialogContent>
          <Typography>
            Explore the experience of a 3D world with Framefolio, your gateway
            to an immersive image gallery! Navigate seamlessly by sliding across
            the screen or using the joystick controls. To add your personal
            touch, just click on any image to upload your own pictures.
            Remember, you'll need to be logged into your Google account for image
            uploads. Immerse yourself in this interactive environment and make
            Framefolio uniquely yours!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={3} >
            <Grid item xs={6} display={'flex'} justifyContent={'center'} >
              <IconButton>
                <MusicOffIcon/>
              </IconButton>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'center'}  >
              <IconButton>
                <VolumeOffIcon/>
              </IconButton>
            </Grid>
            <Grid item xs={12} >
              <Button fullWidth variant='contained' >Logout</Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default RotateScreen;
