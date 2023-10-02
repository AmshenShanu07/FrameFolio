import { useState } from 'react';
import "./styles/loadingScreen.css";

import { useProgress } from "@react-three/drei";
// import { useGlobalStore } from '../Utils/globalStore';

const LoadingScreen = () => {
  const TOTAL_COUNT = 54
  const { loaded, progress } = useProgress();
  // const { mute } = useGlobalStore()

  const [hide, setHide] = useState<boolean>(false);

  const audio = new Audio('sounds/forest.mp3');

  const onClickExplore = (e:any) => {
    e.stopPropagation();
    audio.loop = true;
    audio.play();
    setHide(true)
  }

  // useLayoutEffect(()=>{
  //   console.log(mute);
    
  //   if(mute)
  //     audio.pause()
  //   else
  //     audio.play()

  // },[audio, mute])

  return (
      <div className={`loader  ${hide && 'hide_loading'}`}  >
        <div className="load-text">
          <div className="loaded-text">F</div>
          <div className="loading-text">rame Folio!</div>
        </div>
        {
        (loaded >= TOTAL_COUNT && !hide)?
        <button
          onClick={onClickExplore}
          className={`button_exlore ${loaded >= TOTAL_COUNT && 'show_btn'}`}
          >Explore</button>:
          <p
            className='loading_txt'
            hidden={loaded >= TOTAL_COUNT}
            >Loading...{Math.round(progress)}% <br />{loaded}/{TOTAL_COUNT}</p>
          }
      </div>
  );
};

export default LoadingScreen;
