import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const getAllExportPostContext = createContext()

export const GetAllExportPostContextProvider = ({children}) => {
    const [dataAllExportPost, setDataAllExportPost] = useState([])
    const apiKey = import.meta.env.VITE_API_KEY
    const token = localStorage.getItem("token")

    const getDataAllExportPost = () => {
        axios
            .get('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/explore-post?size=5&page=1',
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                      },
                }
            )
            .then((res)=> {
                setDataAllExportPost(res?.data?.data?.posts)
            })
            .catch((err) => {
                console.log(err);
              });
    }

    useEffect(()=> {
        getDataAllExportPost()
    },[])

    return(
        <getAllExportPostContext.Provider value={{dataAllExportPost}}>
            {children}
        </getAllExportPostContext.Provider>
    )

}