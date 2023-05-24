import { createContext , useContext, useState} from "react"


const userContext  = createContext();
export const useUserContext = ()=>{
    return useContext(userContext);
}
export  function UserContextProvider({children}){
    const [user, setUser] = useState();
    return (
        <userContext.Provider value = {{user,setUser}}>
        {children}
        </userContext.Provider>
    )
}