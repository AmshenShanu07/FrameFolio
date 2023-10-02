import { RigidBody } from '@react-three/rapier';
import { Sparkles } from '@react-three/drei';

import Stadium from './Stadium'
import Controls from '../Utils/KeyControls';
import { useLayoutEffect } from 'react';
import { useThree } from '@react-three/fiber';

const FRICTION = 0.7;

const Experience = () => {
  const { camera } = useThree();

  
  useLayoutEffect(()=>{
    camera.rotation.y = Math.PI * 0.5;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <>
      <Controls />

      {/* <Float position={[0,10,0]} rotation-y={Math.PI * 0.5}  >
        <Text fontSize={2}  textAlign='center' >
          {`Plzz Be Aware \n
          The Floor is little Slippery!`}
        </Text>
      </Float> */}

      <RigidBody
        type="fixed"
        name="stares"
        friction={FRICTION}
        position={[0, 0, 0]}
        colliders="trimesh"
      >
        <Stadium scale={[10,10,10]} />
      </RigidBody>
      
      <Sparkles
        position={[1, 2, 1]}
        scale={[250, 250, 250]}
        size={15}
        count={1000}
      />
    </>
  );

}

export default Experience;