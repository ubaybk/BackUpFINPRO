import axios from "axios";
import { createContext } from "react";


export const getUserByIdContext = createContext()

export const getUserByIdContextProvider = () => {
    const apiKey = import.meta.env.VITE_API_KEY
    const token = localStorage.getItem("token")
   

    const getDataUserById = () => {
        axios
            .get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/user/${userIdFollow}`)
    }
}