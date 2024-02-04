import { createContext, useState } from "react";
export const Usercontext=createContext({});
export const UsercontextProvider=({children})=>{
    const [userinfo,setuserinfo]=useState({});
    return <Usercontext.Provider value={{userinfo,setuserinfo}}>
        {children}
    </Usercontext.Provider>
}
