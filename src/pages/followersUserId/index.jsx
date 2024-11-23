import { useEffect, useState } from "react";
import NavbarFollowById from "../../components/navbarFollowById";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/layout";
import usePhotoDefault from "../../hooks/usePhotoDefault";
import axios from "axios";

const FollowersUserId = () => {
  // const {dataFollowersByUserId , getFollowersByUserIdContextProvider} = useContext(followersByUserIdContext);
  const defaultPhoto = usePhotoDefault();
  // console.log("followers by user id", dataFollowersByUserId
  // );
  // useEffect(()=> {
  //   getFollowersByUserIdContextProvider();
  // },[])

  const [dataFollowersByUserId, setDataFollowersByUserId] = useState();
  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const { userId } = useParams();

  // console.log('ini userId', userId)

  const getFollowersByUserIdContextProvider = () => {
    axios
      .get(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/followers/${userId}?size=300&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setDataFollowersByUserId(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getFollowersByUserIdContextProvider();
  }, []);

  

  return (
    <>
      <Layout>
        <div className="px-2">
          <NavbarFollowById />
          {/* <h1>{userId}</h1> */}
          <div className="mb-32 mt-5 flex flex-col gap-4">
            {dataFollowersByUserId?.users
              ?.filter((item) => item !== null) // Hanya elemen yang bukan null
              .map((item, index) => (
                <div key={index}>
                  <Link to={`/detailuser/${item.id}`}>
                    <div className="flex items-center gap-3">
                      <img
                        src={item.profilePictureUrl || defaultPhoto}
                        onError={(e) => {
                          e.target.src = defaultPhoto;
                        }}
                        alt={item.username || "Unknown"}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p>{item.username || "Unknown User"}</p>
                        <p className="text-[12px] text-slate-500">
                          {item.email || "No email available"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default FollowersUserId;
