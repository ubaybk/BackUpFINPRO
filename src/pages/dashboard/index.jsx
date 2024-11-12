import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";
import Logout from "../../components/logout";
import { getLoginUserContext } from "../../context/GetLoginUserContextProvider";





const Dashboard = () => {
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")
  const apiKey = import.meta.env.VITE_API_KEY;

  const {dataUserLogin} = useContext(getLoginUserContext)
  console.log('ini buat dashboar data login',dataUserLogin)

  const [post, setPost] = useState([])
  const [totalPost, setTotalPost] = useState([])

  const [dataUser, setDataUser] = useState([]) 

  const [logOut, setLogOut] = useState (false)

  const handleLogout = () => {
    setLogOut(!logOut)
  }

  const getPost = () => {
    axios
    .get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/users-post/${userId}?size=100&page=1`, 
      {
        headers: {
          "Content-Type": "application/json",
          "apiKey": apiKey,
          "Authorization": `Bearer ${token}`
        }
      }
    )
    .then((res) => {
      setPost(res.data.data.posts)
      setTotalPost(res.data.data)

    })
    .catch((err)=> console.log(err))
  }

  const getUserById = () => {
    axios
      .get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          "apiKey": apiKey,
          "Authorization": `Bearer ${token}`
          }
      }
    )
    .then((res) => {setDataUser(res.data.data)})
  }
  console.log('ini post',post)
  console.log('ini total',totalPost)
  console.log('ini user', dataUser)

  useEffect(()=>{
    getPost()
    getUserById()
  },[])

  return (
    <>
    <div className="flex flex-col">
      <div className="p-3">
        <div className="flex items-center gap-2 mb-3">
         
          <h1 className="text-[20px]">UbayPix</h1>
          <FaAngleDown onClick={handleLogout} className="text-green-500" />
          {logOut && <Logout/>}
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-center">
              <div>
              {dataUserLogin && dataUserLogin.profilePictureUrl && (
  <img src={dataUserLogin.profilePictureUrl} className="w-[70px] h-[70px] object-cover rounded-full" alt="" />
)}
              </div>
              <div className="flex gap-5">
                <div>
                  <h1>{totalPost.totalItems}</h1>
                  <p>postingan</p>
                </div>
                <Link to={'/myfollowers'}>
                <div>
                  <h1>{dataUser.totalFollowers}</h1>
                  <p>pengikut</p>
                </div>
                </Link>
                <Link to={'/myfollowing'}>
                <div>
                  <h1>{dataUser.totalFollowing}</h1>
                  <p>mengikuti</p>
                </div>
                </Link>
              </div>
            </div>
            <div className="">
              <h1>{dataUserLogin.name}</h1>
              <p className="text-gray-400">@{dataUserLogin.username}</p>
              <p>{dataUserLogin.bio}</p>

              <p>
                <a
                  href={dataUserLogin.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {dataUserLogin.website}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-3 mb-36">
        {post.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link to={`/detailpost/${userId}`}>
            <img src={item.imageUrl} className="w-60 h-60 object-cover" alt="" />
            <h1>{item.caption}</h1>
            </Link>
           
          </div>
        ))}
        </div>
        
      </div>
    </div>
    </>
  );
};
export default Dashboard;
