import axios from "axios";
import { createContext, useState, useEffect } from "react";


export const followingContext = createContext()

export const FollowingContextProvider = ({children}) => {
    const [dataMyfollowing, setDataMyFollowing] = useState ([])
    
    const apiKey = import.meta.env.VITE_API_KEY
    const token = localStorage.getItem("token")

    const getMyfollowing = () => {
        axios
            .get('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/my-following?size=10&page=1',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "apiKey": apiKey,
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            .then((res)=> {
                setDataMyFollowing(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    



    useEffect(()=> {
        getMyfollowing()
    },[])

    return(
        <followingContext.Provider value={{dataMyfollowing}}>
            {children}
        </followingContext.Provider>
    )
}