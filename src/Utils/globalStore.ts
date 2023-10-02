import { create } from 'zustand';

interface MovementStoreI {
  x:number;
  y:number;
  isMobile:boolean;
  mute:boolean;
  // setIsMobile:(val:boolean) => void
  setPosition:(pos:any) => void;
  stopMovement:() => void;
  setMute:(val:boolean) => void;
}

export const useGlobalStore = create<MovementStoreI>((set)=>({
  x:0,
  y:0,
  mute:false,
  isMobile:('ontouchstart' in document.documentElement),
  setMute:(val)=>set(()=>({mute:val})),
  setPosition:(pos:any)=> set(() => ({x:pos.x, y:pos.y}) ),
  stopMovement:()=>set(()=>({x:0,y:0}))
}))