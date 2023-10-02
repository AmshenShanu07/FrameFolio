import { create } from 'zustand';

interface User {
  id:string;
  name:string;
  email:string;
  image:string;
}

interface UserStore {
  isLoggedIn: boolean;
  userDetail?: User;
  token:string;

  decodeToken: () => void;
  logOutUser:() => void;
  logInUser:(token:string) => void
}

export const useAuth = create<UserStore>((set)=> {

  const decodeToken = () => {
    const token = localStorage.getItem('accessToken')

    if(!token){
      localStorage.clear();

      return set((s)=>({...s,isLoggedIn:false,token:'',userDetail:undefined}));
    }

    const tokenData = JSON.parse(atob(token?.split('.')[1]))

    const data:User = {
      email:tokenData.email,
      id:tokenData.user_id,
      image:tokenData.picture,
      name:tokenData.name
    }

    return set((s)=>({...s,isLoggedIn:true,userDetail:data,token:''}))

  }

  const logInUser = (token:string) => {
    localStorage.setItem('accessToken',token);
    decodeToken();
  }

  const logOutUser = () => {
    localStorage.clear();

    return set((state)=>({ ...state, isLoggedIn:false, token:'', userDetail:undefined}))
  }


  return({
    decodeToken,
    logOutUser,
    logInUser,
    token:'',
    isLoggedIn:false,
  })
})
