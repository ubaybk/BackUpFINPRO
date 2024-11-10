import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTime from "../../hooks/useTime";
import { CiMenuKebab } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const DetailPost = () => {
  const { userId } = useParams();
  const [dataPostUserId, setDataPostUserId] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const userLogin = localStorage.getItem("userId");
  const timeAgo = useTime();
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  const getPostUserId = () => {
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
        setDataPostUserId(res?.data?.data?.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPostUserId();
  }, [userId]);

  console.log("idusercooy", userId);
  console.log("data buat post ID USER", dataPostUserId);

  return (
    <>
      <div>
        {dataPostUserId.map((item, index) => (
          <div key={index}>
            <div className="mb-5">
              <div className=" flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item?.user?.profilePictureUrl}
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                  <p>{item?.user?.username}</p>
                </div>
                {userId === userLogin && (
                  <div>
                    <CiMenuKebab
                      onClick={handleMenu}
                      className="text-[23px] mr-4"
                    />
                    {menu && (
                      <div className="bg-slate-600 rounded-lg p-5 fixed bottom-0 z-50 left-0 right-0 animate-slide-up">
                        <div className=" flex items-center gap-3 text-white text-[36px]">
                          <MdEdit />
                          <p>Edit</p>
                        </div>
                        <div className=" flex items-center gap-3 text-[36px] text-red-500">
                          <MdDelete />
                          <p>Delete</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <img src={item.imageUrl} className="w-full" alt="" />
                <div className="flex flex-col">
                  <p>{item?.user?.username}</p>
                  <p>{item?.caption}</p>

                  <p className="text-[10px] text-gray-500">
                    {timeAgo(item?.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default DetailPost;
