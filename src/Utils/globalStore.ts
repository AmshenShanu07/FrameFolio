import { create } from 'zustand';

interface MovementStoreI {
  x:number;
  y:number;
  isMobile:boolean;
  // setIsMobile:(val:boolean) => void
  setPosition:(pos:any) => void;
  stopMovement:() => void;

}

export const useGlobalStore = create<MovementStoreI>((set)=>({
  x:0,
  y:0,
  isMobile:('ontouchstart' in document.documentElement),
  setPosition:(pos:any)=> set(() => ({x:pos.x, y:pos.y}) ),
  stopMovement:()=>set(()=>({x:0,y:0}))
}))