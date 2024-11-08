import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const followersByUserIdContext = createContext()

export const FollowersByUserIdContextProvider = ({children}) => {
    const userIdFollow = localStorage.getItem("userIdFollow")
    const [dataFollowersByUserId, setDataFollowersByUserId] = useState([])

    const apiKey = import.meta.env.VITE_API_KEY
    const token = localStorage.getItem("token")

    const getFollowersByUserIdContextProvider = () => {
        axios
            .get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/followers/${userIdFollow}?size=10&page=1`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                      },
                }
            )
            .then((res)=> {
                console.log(res.data)
                setDataFollowersByUserId(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(()=> {
        getFollowersByUserIdContextProvider()
    },[userIdFollow])
    
    return (
        <followersByUserIdContext.Provider value={{dataFollowersByUserId}}>
            {children}
        </followersByUserIdContext.Provider>
    )
} 
