import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const getFollowingPostContext = createContext()

export const GetFollowingPostContextProvider = ({children}) => {
    const [dataGetFollowingPost, setDataGetFollowingPost] = useState([])

    const apiKey = import.meta.env.VITE_API_KEY
    const token = localStorage.getItem("token")

    const getDataFollowingPostContextProvider = () => {
        axios
        .get(
            `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/following-post?size=10&page=1`,
            {
              headers: {
                "Content-Type": "application/json",
                apiKey: apiKey,
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setDataGetFollowingPost(res.data.data.posts);
          })
    
          .catch((err) => {
            console.log(err);
          });

        
    }

    useEffect(()=> {
        getDataFollowingPostContextProvider()
    },[])

    return(
        <getFollowingPostContext.Provider value={{dataGetFollowingPost}}>
            {children}
        </getFollowingPostContext.Provider>
    )
}