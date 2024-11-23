import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const getLoginUserContext = createContext()

export const GetLoginUserContextProvider = ({children}) => {
    
    const apiKey = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("token");
    const [dataUserLogin, setDataUserLogin] = useState({})

    const handleGetLoginUser = () => {
        axios
            .get('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/user',
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res)=> {
                setDataUserLogin(res?.data?.data)
            })
            .catch((err)=> {
                console.log(err)
            })
    }

    const resetUserLogin = () => {
        setDataUserLogin({});
      };

    useEffect(()=> {
        handleGetLoginUser()
    },[token])

    return(
        <getLoginUserContext.Provider value={{dataUserLogin, handleGetLoginUser, resetUserLogin}}>
            {children}
        </getLoginUserContext.Provider>
    )

}