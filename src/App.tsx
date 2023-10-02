import { Suspense, useMemo } from 'react'

import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier';
import { Environment, KeyboardControls, KeyboardControlsEntry } from '@react-three/drei'

import { Joystick } from 'react-joystick-component';

import Experience from './Experience';
import Elements from './Components/Elements';
import { useGlobalStore } from './Utils/globalStore';
import { KeyControl } from './Utils/types';


const App = () => {
  const { setPosition, stopMovement, isMobile } = useGlobalStore();

  const map = useMemo<KeyboardControlsEntry<KeyControl>[]>(() => ([
    { name: KeyControl.FORWARD, keys: ['ArrowUp', 'KeyW'] },
    { name: KeyControl.BACKWARD, keys: ['ArrowDown', 'KeyS'] },
    { name: KeyControl.LEFT, keys: ['ArrowLeft', 'KeyA'] },
    { name: KeyControl.RIGHT, keys: ['ArrowRight', 'KeyD'] },
    { name: KeyControl.JUMP, keys: ['Space'] },
    { name: KeyControl.INIT, keys: ['KeyI'] },
  ]),[])

  return (
    <>
      <Canvas shadows>
        <Environment
          background
          files={[
            'env/px.png', 
            'env/nx.png',
            'env/py.png',
            'env/ny.png',
            'env/pz.png',
            'env/nz.png'
          ]}
        />
        <ambientLight intensity={1.5} />

        <Suspense fallback={null} >
          <Physics gravity={[0, -20, 0]} >
            <KeyboardControls map={map} >
              <Experience/>
            </KeyboardControls>
          </Physics>
          {/* <PositionalAudio autoplay loop url="sounds/forest.mp3" distance={3} /> */}
        </Suspense>

      </Canvas>
      <Elements/>
      <div className="dot" />
      {isMobile &&
        <div className='joystick-con' >
        <Joystick
          move={(e) => setPosition(e)}
          stop={stopMovement}
          baseColor='rgba(103, 103, 103, 0.402)'
          stickColor='rgba(103, 103, 103, 1)'
        />
      </div>}
    </>
  )
}

export default App;