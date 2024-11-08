import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import Footer from "../../components/footer";
import ButtonBack from "../../components/buttonback";


const DetailUser = () => {
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const apiKey = import.meta.env.VITE_API_KEY;
  const [detailUser, setDetailUser] = useState([]);
  const [totalPost, setTotalPost] = useState([]);
  const [postUser, setPostUser] = useState([]);
  const [logOut, setLogOut] = useState(false);
  const [followUser, setFollowUser] = useState("Ikuti");

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
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/users-post/${userId}?size=10&page=1`,
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
    axios
      .get(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/following/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.data.isFollowing) {
          setFollowUser("Mengikuti");
        } else {
          setFollowUser("Ikuti");
        }
      })
      .catch((error) => {
        console.error("Gagal memeriksa status follow:", error);
      });
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
          setFollowUser("Mengikuti"); // Ganti menjadi "Mengikuti" setelah sukses follow
        })
        .catch((error) => {
          console.error("Gagal mengikuti pengguna:", error);
        });
    } else {
      // Jika sudah mengikuti, lakukan unfollow
      handleUnfollowUser(); // Panggil fungsi unfollow
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
        // Jika unfollow berhasil, update status follow menjadi "Ikuti"
        setFollowUser("Ikuti");
      })
      .catch((error) => {
        console.error("Gagal berhenti mengikuti pengguna:", error);
      });
  };

  useEffect(() => {
    getPostUser();
  }, []);

  useEffect(() => {
    getDetailUser();
    checkIfUserIsFollowing(); // Mengecek apakah user sudah mengikuti atau belum
  }, [userId]);

  return (
    <>
      <div className="flex flex-col">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-3">
            <Link to={"/followingpost"}>
              <ButtonBack />
            </Link>
            <h1 className="text-[20px]">UbayPix</h1>
            <FaAngleDown onClick={() => setLogOut(!logOut)} className="text-green-500" />
            <div>{logOut && <h1 className="text-red-500 mt-2">Logout</h1>}</div>
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-center">
                <div>
                  <img src={detailUser.profilePictureUrl} className="w-[70px] rounded-full" alt="" />
                </div>
                <div className="flex gap-5">
                  <div>
                    <h1>{totalPost.totalItems}</h1>
                    <p>postingan</p>
                  </div>
                  <Link to={`/followersuserid/${userId}`}>
                    <div>
                      <h1>{detailUser.totalFollowers}</h1>
                      <p>pengikut</p>
                    </div>
                  </Link>
                  <Link to={`/followinguserid/${userId}`}>
                    <div>
                      <h1>{detailUser.totalFollowing}</h1>
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
        <div>
          <div className="grid grid-cols-3">
            {postUser.map((item, index) => (
              <div key={index}>
                <img className="w-[200px] h-[200px]" src={item.imageUrl} alt="" />
                <h1>{item.caption}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailUser;
