import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const getMyFollowingStoriesContext = createContext();

export const GetMyFollowingStoriesContextProvider = ({children}) => {
  const [dataMyFollowingStory, setDataMyFollowingStory] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");

  const handleGetFollowingStory = () => {
    axios.get(
      "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/following-story?size=10&page=1",
      {
        headers: {
          "Content-Type": "application/json",
          apiKey: apiKey,
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res)=> {
        setDataMyFollowingStory(res.data)
    })
    .catch((err) => {
        console.log(err);
    })
  };

  useEffect(()=> {
    handleGetFollowingStory()
  },[])

  return(
    <getMyFollowingStoriesContext.Provider value={{dataMyFollowingStory}}>
        {children}
    </getMyFollowingStoriesContext.Provider>
  )
};
