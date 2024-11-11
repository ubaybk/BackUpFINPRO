import axios from "axios";
import { createContext, useState } from "react";


export const uploadImageContext = createContext()

export const UploadImageContextProvider = ({children}) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("token");
    const [linkImage, setLinkImage] = useState([])

    const handleUploadImage = (imageFile) => {
        const formData = new FormData()
        formData.append("image", imageFile)
        axios
            .post('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/upload-image',
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            .then((res)=> {
                setLinkImage(res.data)
            })
            .catch((err)=> {
                console.log(err)
            })
    }
    return(
        <uploadImageContext.Provider value = {{handleUploadImage, linkImage}}>
            {children}
        </uploadImageContext.Provider>
    )

}
