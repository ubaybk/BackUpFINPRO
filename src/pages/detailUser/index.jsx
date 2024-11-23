import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonBack from "../../components/buttonback";
import { followingContext } from "../../context/FollowingContextProvider";
import usePhotoDefault from "../../hooks/usePhotoDefault";
import NavbarFollowingFollowers from "../../components/navbarFollowingFollowers";
import Layout from "../../components/layout";



const DetailUser = () => {
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const apiKey = import.meta.env.VITE_API_KEY;
  const [detailUser, setDetailUser] = useState([]);
  const [totalPost, setTotalPost] = useState([]);
  const [postUser, setPostUser] = useState([]);
  const [logOut, setLogOut] = useState(false);
  const [followUser, setFollowUser] = useState("Ikuti");
  const { dataMyfollowing } = useContext(followingContext);
  const defaultPhoto = usePhotoDefault();
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1); // Navigasi ke halaman sebelumnya
  };

  const getDetailUser = () => {
    axios
      .get(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setDetailUser(res.data.data);
        const userIdFollow = userId;
        localStorage.setItem("userIdFollow", userIdFollow);
        localStorage.setItem("usernameById", res.data.data.username);
      });
  };

  const getPostUser = () => {
    axios
      .get(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/users-post/${userId}?size=100&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setTotalPost(res.data.data);
        setPostUser(res.data.data.posts);
      });
  };

  const checkIfUserIsFollowing = () => {
    // Cek apakah userId terdapat di dalam dataMyfollowing?.data?.users
    const isFollowing = dataMyfollowing?.data?.users.some(
      (user) => user.id === userId
    );

    if (isFollowing) {
      setFollowUser("Mengikuti");
    } else {
      setFollowUser("Ikuti");
    }
  };

  const handleFollowUser = () => {
    const userIdFollow = localStorage.getItem("userIdFollow");

    if (followUser === "Ikuti") {
      // Jika belum mengikuti, lakukan follow
      axios
        .post(
          "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/follow",
          { userIdFollow: userIdFollow },
          {
            headers: {
              "Content-Type": "application/json",
              apiKey: apiKey,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setFollowUser("Mengikuti"); // Ganti menjadi "Mengikuti"
          // Tambahkan secara lokal jumlah followers
          setDetailUser((prevState) => ({
            ...prevState,
            totalFollowers: prevState.totalFollowers + 1,
          }));
        })
        .catch((error) => {
          console.error("Gagal mengikuti pengguna:", error);
        });
    } else {
      // Jika sudah mengikuti, lakukan unfollow
      handleUnfollowUser();
    }
  };

  const handleUnfollowUser = () => {
    const userIdFollow = localStorage.getItem("userIdFollow");

    axios
      .delete(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/unfollow/${userIdFollow}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setFollowUser("Ikuti"); // Ganti menjadi "Ikuti"
        // Kurangi secara lokal jumlah followers
        setDetailUser((prevState) => ({
          ...prevState,
          totalFollowers: prevState.totalFollowers - 1,
        }));
      })
      .catch((error) => {
        console.error("Gagal berhenti mengikuti pengguna:", error);
      });
  };

  useEffect(() => {
    getDetailUser();
    getPostUser();
  }, [userId]);

  useEffect(() => {
    checkIfUserIsFollowing(); // Mengecek apakah user sudah mengikuti atau belum
  }, [dataMyfollowing]);

  return (
    <>
      <Layout>
        <div className="flex flex-col md:w-[800px] md:ml-40">
          <div className="p-3">
            {/* <NavbarFollowingFollowers/> */}
            <div className="flex items-center gap-1 mb-2 md:hidden">
              <button onClick={handleBack}>
                <ButtonBack />
              </button>
            
              <Link to={"/dashboard"}>
                <img
                  src="/img/BackUbaypix-logo.png"
                  className="w-[150px] md:w-[300px] "
                  alt=""
                />
              </Link>
            </div>
           
           
            <div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 justify-between text-center">
                  <div>
                    <img
                      src={detailUser.profilePictureUrl || defaultPhoto}
                      onError={(e) => {
                        e.target.src = defaultPhoto;
                      }}
                      className="w-[90px] h-[90px] rounded-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="flex gap-5">
                    <div>
                      <h1>{totalPost.totalItems}</h1>
                      <p>postingan</p>
                    </div>
                    <Link to={`/followersuserid/${userId}`}>
                      <div>
                        <h1>{detailUser.totalFollowers || <p>0</p>}</h1>
                        <p>pengikut</p>
                      </div>
                    </Link>
                    <Link to={`/followinguserid/${userId}`}>
                      <div>
                        <h1>{detailUser.totalFollowing || <p>0</p>}</h1>
                        <p>mengikuti</p>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="">
                  <h1>{detailUser.name}</h1>
                  <p className="text-gray-400">@{detailUser.username}</p>
                  <p>{detailUser.bio}</p>
                  <p>
                    <a
                      href={detailUser.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {detailUser.website}
                    </a>
                  </p>
                  <div className="bg-green-500 text-center text-white rounded-md p-2">
                    <button onClick={handleFollowUser}>{followUser}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-36">
              {postUser.map((item, index) => (
                <div key={index}>
                  <Link to={`/detailpost/${userId}`}>
                    <img
                      className="w-[179px] h-[189px] rounded-lg object-cover"
                      src={item.imageUrl || defaultPhoto}
                      onError={(e) => {
                        e.target.src = defaultPhoto;
                      }}
                      alt=""
                    />
                    {/* <h1>{item.caption}</h1> */}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DetailUser;
