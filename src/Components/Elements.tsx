import { useEffect, useLayoutEffect, useState } from "react";
import "./styles/rotateScreen.css";

import { Avatar, IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";


import SwipeInfo from './SwipeInfo';
import FullScreenToolTip from './FullScreenToolTip';
import { useGlobalStore } from '../Utils/globalStore';
import { signInWithPopup } from 'firebase/auth';
import { auth, authProvider } from '../Utils/helpers/firebase';
import { useAuth } from '../Utils/userStore';
import LoadingScreen from './LoadingScreen';

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

  const handleLogin = (e:any) => {
    e.preventDefault();
    signInWithPopup(auth,authProvider).then((data)=>{

      //@ts-ignore
      const token:string = data.user.accessToken;
      logInUser(token);
    }).catch((e)=>console.log(e))
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

  useLayoutEffect(()=>{
    decodeToken();
  },[])

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

        <div className='profile_menu' >
          <Avatar alt='G' color='#3277a8' src={userDetail?.image} >G</Avatar>
          <div className='profile-name-container'>
            <p>{userDetail?.name || 'Guest User'}</p>
            {isLoggedIn?
            <small>{userDetail?.email}</small>:
            <button onClick={handleLogin} >login</button>}
            
          </div>
        </div>

          <FullScreenToolTip/>
          {isMobile && <SwipeInfo/>}
        </>
      )}
    </div>
  );
};
export default RotateScreen;
