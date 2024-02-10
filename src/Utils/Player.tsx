import { useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, quat } from '@react-three/rapier';
import { Box, useKeyboardControls } from '@react-three/drei'


import { KeyControl } from './types';
import { useGlobalStore } from './globalStore';

const Player = () => {
  const direction = new Vector3();
  const frontVec = new Vector3();
  const sideVec = new Vector3();
  const speed = new Vector3();
  const SPEED = 0.3;

  const bodyRef = useRef<Mesh>(null);
  const bodyPhyRef = useRef<RapierRigidBody>(null);
  const velocity = useRef([0,0,0]);

  const [,get] = useKeyboardControls<KeyControl>();
  const { x, y, isMobile } = useGlobalStore();

  const footStepsAudio = new Audio('sounds/footstep.mp3');

  useFrame(({camera}) => {
    if(!bodyRef.current || !bodyPhyRef.current)
      return;

    const { left, right, forward, backward } = get()

    if( left || right || forward || backward ) {
      if(footStepsAudio.paused) {
        footStepsAudio.play();
     }
    } else {
      footStepsAudio.pause();
    }

    bodyRef.current.getWorldPosition(camera.position);
    bodyRef.current.rotation.set(0,0,0);
    bodyPhyRef.current.setRotation(quat({x:0,y:0,z:0,w:0}),true);
    camera.position.y += 5;



    if(isMobile){
      frontVec.set(0, 0, y * -1);
      sideVec.set(x * -1, 0, 0);
    } else {
      frontVec.set(0, 0, Number(backward) - Number(forward));
      sideVec.set(Number(left) - Number(right), 0, 0);
    }

    direction.subVectors(frontVec, sideVec).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);
    speed.fromArray(velocity.current);    

    bodyPhyRef.current.applyImpulse({
      x:direction.x, y:velocity.current[1], z:direction.z
    },true);
    
  })


  return (
    <>
      <RigidBody
        type="dynamic"
        name="player"
        colliders="cuboid"
        ref={bodyPhyRef}
      >
        <Box position={[40, 2, 0]} ref={bodyRef} args={[1, 1, 1]}>
          <meshPhongMaterial color="#fff" opacity={0} transparent />
        </Box>
      </RigidBody>
    </>
  );
  
}

export default Player;