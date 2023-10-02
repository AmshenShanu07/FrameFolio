import {
  KeyboardControls,
  KeyboardControlsEntry,
  PointerLockControls,
} from "@react-three/drei";
import { useMemo } from "react";
import Player from "./Player";
import TouchLockControl from "./TouchLockControls/TouchLockControl";
import { KeyControl } from './types';
import { useGlobalStore } from './globalStore';


const Controls = () => {
  const { isMobile } = useGlobalStore();

  const map = useMemo<KeyboardControlsEntry<KeyControl>[]>(
    () => [
      { name: KeyControl.FORWARD, keys: ["ArrowUp", "KeyW"] },
      { name: KeyControl.BACKWARD, keys: ["ArrowDown", "KeyS"] },
      { name: KeyControl.LEFT, keys: ["ArrowLeft", "KeyA"] },
      { name: KeyControl.RIGHT, keys: ["ArrowRight", "KeyD"] },
      { name: KeyControl.JUMP, keys: ["Space"] },
      { name: KeyControl.INIT, keys: ["KeyI"] },
    ],
    []
  );



  return (
    <KeyboardControls map={map}>
      <Player />
      {
        isMobile?
        <TouchLockControl speed={0.003} />:
        <PointerLockControls />
      }
    </KeyboardControls>
  );
};

export default Controls;

