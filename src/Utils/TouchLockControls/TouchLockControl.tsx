
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { TouchLockControlsCore } from './TouchController';

interface TouchControllerProps {
  speed?:number;
  minPolarAngle?:number;
  maxPolarAngle?:number;
}

const TouchLockControl = ({ maxPolarAngle, minPolarAngle, speed }:TouchControllerProps) => {
  const { camera, gl } = useThree();

  useEffect(()=>{
    if(camera && gl)
      new TouchLockControlsCore(
          camera,
          gl.domElement,
          speed,
          maxPolarAngle,
          minPolarAngle
    );

  },[camera, gl, maxPolarAngle, minPolarAngle, speed])
  
  return <></>
}

export default TouchLockControl