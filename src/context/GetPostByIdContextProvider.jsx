import { createContext, useContext, useEffect, useState } from "react";
import { getFollowingPostContext } from "./GetFollowingPostContextProvider";
import axios from "axios";

export const getPostByIdContext = createContext()

export const GetPostByIdContextProvider = ({children}) => {
    const [comments, setComments] = useState([]);

    const {dataGetFollowingPost} = useContext(getFollowingPostContext)
    const idsOnly = dataGetFollowingPost.map(post => post.id);
    console.log(`Data ID dari following post:`, idsOnly);

    const apiKey = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("token");

   
    const getPostById = () => {
        axios
          .get(
            `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/post/${idsOnly}`,
            {
              headers: {
                "Content-Type": "application/json",
                apiKey: apiKey,
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setComments(res.data.data.comments || []);
            
          })
          .catch((err) => console.log(err));
      };
      console.log("ini komen DARI CONTEXT", comments);

      useEffect(()=>{
        getPostById()
      },[idsOnly])

    return(
        <getPostByIdContext.Provider value={{comments}}>
            {children}
        </getPostByIdContext.Provider>
    )
}