import "./styles/rotateScreen.css";
import { useEffect, useLayoutEffect, useState } from "react";

import {
  Avatar,
  IconButton,
} from "@mui/material";

import { signInWithPopup } from "firebase/auth";
import HelpIcon from '@mui/icons-material/Help';
import FullscreenIcon from "@mui/icons-material/Fullscreen";

import Info from './Info';
import SwipeInfo from "./SwipeInfo";
import { useAuth } from "../Utils/userStore";
import LoadingScreen from "./LoadingScreen";
import FullScreenToolTip from "./FullScreenToolTip";
import { useGlobalStore } from "../Utils/globalStore";
import { auth, authProvider } from "../Utils/helpers/firebase";

const RotateScreen = () => {
  const [show, setShow] = useState<boolean>(true);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);

  const { isMobile } = useGlobalStore();
  const { logInUser, userDetail, isLoggedIn, decodeToken } = useAuth();

  const checkOriantation = () => {
    if (window.innerHeight > window.innerWidth) setShow(true);
    else setShow(false);
  };

  const toggleFullscreen = (e:any) => {
    e.preventDefault();
    e.stopPropagation();

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

    if (isLoggedIn) {
      setInfoOpen(true);
      return;
    }

    signInWithPopup(auth, authProvider)
      .then((data) => {
        //@ts-ignore
        const token: string = data.user.accessToken;
        logInUser(token);
      })
      .catch((e) => console.log(e));
  };

  const handleHelpClick = (e:any) => {
    e.preventDefault();
    e.stopPropagation();

    setInfoOpen(true);
  }

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="screen-controler">
      {show ? (
        <div className="rotate-screen-container">
          <p>Please Rotate Your Screen*</p>
        </div>
      ) : <></>}
        <>
          <LoadingScreen/>
          <div className="fullscreen-btn-con">
            <IconButton onClick={toggleFullscreen}>
              <FullscreenIcon sx={{ color: "#fff" }} />
            </IconButton>
          </div>
          <div className="info-btn-con">
            <IconButton onClick={handleHelpClick}>
              <HelpIcon sx={{ color: "#fff" }} />
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

      <Info open={infoOpen} setOpen={setInfoOpen} />
    </div>
  );
};

export default RotateScreen;
