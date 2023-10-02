import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useLayoutEffect, useRef, useState } from "react";
import { Html, useGLTF, useTexture } from "@react-three/drei";

import { getAllImages, getImageBase64, uploadImageToFireStorage } from '../Utils/helpers/imageProcessing';
import { useAuth } from '../Utils/userStore';

type GLTFResult = GLTF & {
  nodes: {
    stare: THREE.Mesh;
    wall: THREE.Mesh;
    floor: THREE.Mesh;
    Image001: THREE.Mesh;
    Image002: THREE.Mesh;
    Image003: THREE.Mesh;
    Image004: THREE.Mesh;
    Image005: THREE.Mesh;
    Image006: THREE.Mesh;
    Image007: THREE.Mesh;
    Image008: THREE.Mesh;
    Image009: THREE.Mesh;
    Image010: THREE.Mesh;
    Image011: THREE.Mesh;
    Image012: THREE.Mesh;
    Image013: THREE.Mesh;
    Image014: THREE.Mesh;
    Image015: THREE.Mesh;
    Image016: THREE.Mesh;
    Image017: THREE.Mesh;
    Image018: THREE.Mesh;
    Image019: THREE.Mesh;
    Image020: THREE.Mesh;
    Image021: THREE.Mesh;
    Image022: THREE.Mesh;
    Image023: THREE.Mesh;
    Image024: THREE.Mesh;
    Image025: THREE.Mesh;
    Image026: THREE.Mesh;
    Image027: THREE.Mesh;
    Image028: THREE.Mesh;
    Image029: THREE.Mesh;
    Image030: THREE.Mesh;
    Image031: THREE.Mesh;
    Image032: THREE.Mesh;
    Image033: THREE.Mesh;
    Image034: THREE.Mesh;
    Image035: THREE.Mesh;
    Image036: THREE.Mesh;
    Image037: THREE.Mesh;
    Image038: THREE.Mesh;
    Image039: THREE.Mesh;
    Image040: THREE.Mesh;
    Image041: THREE.Mesh;
    Image042: THREE.Mesh;
    Image043: THREE.Mesh;
    Image044: THREE.Mesh;
    image: THREE.Mesh;
  };
};

function Stadium(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("models/stadium.gltf") as GLTFResult;

  const { isLoggedIn } = useAuth();

  const uploadInputRef = useRef<HTMLInputElement>(null);
  const imageGrpRef = useRef<THREE.Group>(null);
  const seletedImage = useRef<number>(-1);

  const [imgTexture, setImgTexture] = useState<THREE.Texture[]>([]);

  const textureLoader = new THREE.TextureLoader();
  const texture = useTexture("textures/render.jpg");
  texture.flipY = false;
  const material = new THREE.MeshStandardMaterial({ map: texture });

  const onSelectImage = (i: number) => {    

    if (
      !isLoggedIn ||
      seletedImage.current === i ||
      !uploadInputRef.current
      ) return;

    seletedImage.current = i;
    uploadInputRef.current.click();
  };

  const onImageUpload = (e: any) => {
    const file = e.target.files[0];
      
    if(!file) return;
    
    getImageBase64(file).then((url)=>{
     

      uploadImageToFireStorage(url.split(',')[1],seletedImage.current);
      

      textureLoader.load(url,(texture)=>{
        texture.flipY = false;
        // @ts-ignore
        imageGrpRef.current.children[seletedImage.current].material.map = texture;
      })
    });

  };

  useLayoutEffect(() => {
    const tempTextures: THREE.Texture[] = [];

    getAllImages.then((urls)=>{

      for (let i = 0; i < 44; i++) {
        const imgTexture = textureLoader.load(
          urls[i+1] || `https://picsum.photos/800/1200?seed=${100 + i}`
        );
        imgTexture.flipY = false;
  
        tempTextures.push(imgTexture);
      }
  
      setImgTexture(tempTextures);

    })


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <group {...props} dispose={null}>
      <Html>
        <input
          type="file"
          onChange={onImageUpload}
          ref={uploadInputRef}
          hidden
        />
      </Html>

      <mesh name="stare" geometry={nodes.stare.geometry} material={material} />
      <mesh name="wall" geometry={nodes.wall.geometry} material={material} />
      <mesh name="floor" geometry={nodes.floor.geometry} material={material} />

      <group ref={imageGrpRef}>
        {imgTexture.map((d, i) => {
          const num = (i + 1).toString().padStart(3, "0");

          return (
            <mesh
              key={i}
              name={`Image${num}`}
              //@ts-ignore
              geometry={nodes[`Image${num}`]["geometry"]}
              onClick={() => onSelectImage(i)}
            >
              <meshStandardMaterial map={d} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

useGLTF.preload("models/stadium.gltf");

export default Stadium;
