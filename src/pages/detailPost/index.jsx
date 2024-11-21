import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useTime from "../../hooks/useTime";
import { CiMenuKebab } from "react-icons/ci";
import { MdEdit, MdDelete } from "react-icons/md";
import ButtonBack from "../../components/buttonback";
import useHandleBack from "../../hooks/useHandleBack";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import Comment from "../../components/comment";
import Layout from "../../components/layout";
import usePhotoDefault from "../../hooks/usePhotoDefault";

const DetailPost = () => {
  const { userId } = useParams();
  const [dataPostUserId, setDataPostUserId] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const userLogin = localStorage.getItem("userId");
  const timeAgo = useTime();
  const [menu, setMenu] = useState(null);
  const [showComments, setShowComments] = useState({});
  const [totalComments, setTotalComments] = useState({});
  const handleBack = useHandleBack();
  const defaultPhoto = usePhotoDefault();

  const handleMenu = (index) => {
    setMenu(menu === index ? null : index);
  };

  const getPostUserId = () => {
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
        setDataPostUserId(res?.data?.data?.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const handleLike = async (postId, isLike) => {
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    // Save original state for potential rollback
    const originalPosts = [...dataPostUserId];

    try {
      // Optimistic Update
      setDataPostUserId((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLike: !isLike,
                totalLikes: isLike
                  ? Math.max(0, post.totalLikes - 1)
                  : post.totalLikes + 1,
              }
            : post
        )
      );

      // API call
      const apiUrl = `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/${
        isLike ? "unlike" : "like"
      }`;
      const response = await axios.post(
        apiUrl,
        { postId },
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update with server data
      setDataPostUserId((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLike: !isLike,
                totalLikes: response.data.totalLikes ?? post.totalLikes,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      // Rollback to original state
      setDataPostUserId(originalPosts);
      alert("Gagal memperbarui like. Silakan coba lagi.");
    }
  };

  const toggleShowComment = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentData = (postId, comments) => {
    setTotalComments((prevTotalComments) => ({
      ...prevTotalComments,
      [postId]: comments.length,
    }));
  };

  useEffect(() => {
    getPostUserId();
  }, [userId]);

  return (
    <>
      <Layout>
        <div className="p-3 md:w-[600px] flex flex-col gap-3 pb-20">
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
                    src={item?.user?.profilePictureUrl || defaultPhoto}
                    onError={(e) => {e.target.src=defaultPhoto}}
                    className="w-10 h-10 rounded-full object-cover"
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
                <img 
                  src={item.imageUrl || defaultPhoto} 
                  onError={(e) => {e.target.src=defaultPhoto}} 
                  className="w-full h-[337px] rounded-xl object-cover" 
                  alt="" 
                />
                <div className="px-3 mb-3">
                  <div className="text-2xl flex items-center gap-12">
                    <div className="flex items-center gap-3">
                      <FaRegHeart
                        className={`cursor-pointer ${
                          item.isLike ? "text-red-500" : "text-gray-500"
                        }`}
                        onClick={() => handleLike(item.id, item.isLike)}
                      />
                      <p className="text-[17px]">{item.totalLikes}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaRegComment />
                      <p className="text-[17px]">{totalComments[item.id] || 0}</p>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h1 className="font-semibold">{item.user.username}</h1>
                    <h1>{item.caption}</h1>
                  </div>

                  <button
                    onClick={() => toggleShowComment(item.id)}
                    className="text-[12px] text-gray-500"
                  >
                    {showComments[item.id]
                      ? "Sembunyikan komentar"
                      : "Lihat semua komentar"}
                  </button>
                  <p className="text-[10px] text-gray-500">
                    {timeAgo(item.createdAt)}
                  </p>
                  {showComments[item.id] && (
                    <Comment
                      postId={item.id}
                      onCommentData={(comments) => handleCommentData(item.id, comments)}
                    />
                  )}
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