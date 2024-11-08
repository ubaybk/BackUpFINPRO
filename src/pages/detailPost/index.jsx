import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const DetailPost = () => {
    const {userId} = useParams()
    const [dataPostUserId, setDataPostUserId] = useState([])
    const apiKey = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("token");

    const getPostUserId = () => {
        axios
            .get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/users-post/${userId}?size=10&page=1`,
                {
                    headers: {
                      "Content-Type": "application/json",
                      apiKey: apiKey,
                      Authorization: `Bearer ${token}`,
                    },
                  }
            )
            .then((res)=> {
                setDataPostUserId(res?.data?.data?.posts)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getPostUserId()
    },[userId])

    console.log('idusercooy',userId)
    console.log('data buat post ID USER',dataPostUserId)
    return(
        <>
        <div>
            {dataPostUserId.map((item, index) => (
                <div key={index}>
                    <div className="mb-5">
                        <div className="flex items-center gap-3">
                            <img src={item?.user?.profilePictureUrl} className="w-10 h-10 rounded-full" alt="" /> 
                            <p>{item?.user?.username}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                        <img src={item.imageUrl} className="w-full" alt="" />
                        <div className="flex flex-col">
                        <p>{item?.user?.username}</p>
                        <p>{item?.caption}</p>
                        </div>

                        </div>
                    </div>
                </div>
            ))}

        </div>
       
        </>
    )
}
export default DetailPost