import { useState } from 'react';
import "./styles/loadingScreen.css";

import { useProgress } from "@react-three/drei";

const LoadingScreen = () => {
  const TOTAL_COUNT = 54
  const { loaded } = useProgress();

  const [hide, setHide] = useState<boolean>(false);

  const onClickExplore = (e:any) => {
    e.stopPropagation();
    const audio = new Audio('sounds/forest.mp3');
    audio.loop = true;
    audio.play();
    setHide(true)
  }

  return (
      <div className={`loader  ${hide && 'hide_loading'}`}  >
        <div className="load-text">
          <div className="loaded-text">F</div>
          <div className="loading-text">rame Folio!</div>
        </div>
        {
        (loaded >= TOTAL_COUNT && !hide) &&
        <button
          onClick={onClickExplore}
          className={`button_exlore ${loaded <= TOTAL_COUNT && 'show_btn'}`}
          >Explore</button>}
      </div>
  );
};

export default LoadingScreen;
