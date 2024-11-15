import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useTime from "../../hooks/useTime";
import { CiMenuKebab } from "react-icons/ci";
import { MdEdit, MdDelete } from "react-icons/md";
import ButtonBack from "../../components/buttonback";
import useHandleBack from "../../hooks/useHandleBack";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import Comment from "../../components/comment"; // Pastikan ini adalah komponen komentar yang kamu gunakan
import Layout from "../../components/layout";

const DetailPost = () => {
  const { userId } = useParams();
  const [dataPostUserId, setDataPostUserId] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const userLogin = localStorage.getItem("userId");
  const timeAgo = useTime();
  const [menu, setMenu] = useState(null);
  const [showComments, setShowComments] = useState({});
  const handleBack = useHandleBack();

  const handleMenu = (index) => {
    setMenu(menu === index ? null : index);
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

  console.log('ini data buat edit',dataPostUserId)

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete postingan ini?");
    if (confirmDelete) {
      axios
        .delete(
          `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/delete-post/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              apiKey: apiKey,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          alert("Post deleted successfully");
          setMenu(null);
          getPostUserId();
        })
        .catch((err) => {
          console.log("Error deleting post:", err);
        });
    }
  };

  const handleLike = (postId, isLike, index) => {
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    // Optimistic Update
    const updatedPosts = [...dataPostUserId];
    updatedPosts[index] = {
      ...updatedPosts[index],
      isLike: !isLike,
      totalLikes: isLike
        ? updatedPosts[index].totalLikes - 1
        : updatedPosts[index].totalLikes + 1,
    };
    setDataPostUserId(updatedPosts);

    // URL untuk like/unlike
    const apiUrl = isLike
      ? "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/unlike"
      : "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/like";

    axios
      .post(
        apiUrl,
        { postId: postId },
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const confirmedPosts = [...dataPostUserId];
        confirmedPosts[index].totalLikes =
          response.data.totalLikes || confirmedPosts[index].totalLikes;
        setDataPostUserId(confirmedPosts);
      })
      .catch((error) => {
        console.error("Error liking/unliking post", error);
        setDataPostUserId(dataPostUserId);
      });
  };

  const toggleShowComment = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  useEffect(() => {
    getPostUserId();
  }, [userId]);

  return (
    <>
      <Layout>
        <div className="p-3 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <button onClick={handleBack}>
              <ButtonBack />
            </button>
            <h1>Postingan</h1>
          </div>
          {dataPostUserId.map((item, index) => (
            <div key={index} className="mb-5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
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
                      onClick={() => handleMenu(index)}
                      className="text-[23px] mr-4"
                    />
                    {menu === index && (
                      <div className="bg-slate-600 rounded-lg p-5 fixed bottom-0 z-50 left-0 right-0 animate-slide-up">
                        <Link to={`/editpost/${item.id}`}>
                        <div className="flex items-center gap-3 text-white text-[36px]">
                          <MdEdit />
                          <p>Edit</p>
                        </div>
                        </Link>
                        <div
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center gap-3 text-[36px] text-red-500"
                        >
                          <MdDelete />
                          <p>Delete</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <img src={item.imageUrl} className="w-full h-[337px] rounded-xl object-cover" alt="" />
                <div className="text-2xl flex items-center gap-12">
                  <div className="flex items-center gap-3">
                    <FaRegHeart
                      className={`cursor-pointer ${
                        item.isLike ? "text-red-500" : "text-gray-500"
                      }`}
                      onClick={() => handleLike(item.id, item.isLike, index)}
                    />
                    <p className="text-[17px]">{item.totalLikes}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaRegComment />
                    <button
                      onClick={() => toggleShowComment(item.id)}
                      className="text-[12px] text-gray-500"
                    >
                      {showComments[item.id]
                        ? "Sembunyikan komentar"
                        : "Lihat semua komentar"}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p>{item?.user?.username}</p>
                  <p>{item?.caption}</p>
                  <p className="text-[10px] text-gray-500">
                    {timeAgo(item?.updatedAt)}
                  </p>
                  {showComments[item.id] && <Comment postId={item.id} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default DetailPost;
