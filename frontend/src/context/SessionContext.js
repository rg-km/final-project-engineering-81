import { createContext, useEffect, useState } from "react";


export const SessionContext = createContext({
    isLoggedIn : null,
    setIsLoggedIn:()=>{},
    message : null,
    setMessage : ()=>{},
})

export const SessionProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState()
    const [message, setMessage] = useState()

    useEffect(() => {
        setIsLoggedIn()
        setMessage()
    }, [])

    return(
        <SessionContext.Provider value={{ 
            isLoggedIn : isLoggedIn,
            setIsLoggedIn : setIsLoggedIn,
            message : message,
            setMessage : setMessage,
         }}>
            {children}
        </SessionContext.Provider>
    )
}