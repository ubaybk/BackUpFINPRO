import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import Comment from "../../components/comment";
import useTime from "../../hooks/useTime";
import { getFollowingPostContext } from "../../context/GetFollowingPostContextProvider";
import MyFollowingStory from "../../components/Story/myFollowingStory";
import usePhotoDefault from "../../hooks/usePhotoDefault";


const FollowingPost = () => {
  const { dataGetFollowingPost } = useContext(getFollowingPostContext);
  const timeAgo = useTime();
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState({});
  const apiKey = import.meta.env.VITE_API_KEY;
  const defaultPhoto = usePhotoDefault();

  const handleLike = (postId, isLike) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("User not authenticated");
      return;
    }
  
    // Optimistic Update: Update totalLikes secara langsung
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            isLike: !isLike,
            totalLikes: isLike
              ? (post.totalLikes > 0 ? post.totalLikes - 1 : 0) // Mengurangi totalLikes jika sebelumnya sudah like
              : post.totalLikes + 1, // Menambah totalLikes jika sebelumnya belum like
          }
        : post
    );
  
    // Set posts dengan perubahan sementara
    setPosts(updatedPosts);
  
    // Menentukan URL untuk like/unlike
    const apiUrl = isLike
      ? "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/unlike"
      : "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/like";
  
    // Mengirim request ke API
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
        // Setelah respons dari server, update totalLikes sesuai data dari API
        const confirmedPosts = posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLike: !isLike,
                totalLikes: response.data.totalLikes || post.totalLikes, // Menggunakan data yang benar dari server
              }
            : post
        );
  
        // Update state dengan nilai yang sesuai dari server
        setPosts(confirmedPosts);
      })
      .catch((error) => {
        console.error("Error liking/unliking post", error);
        // Jika ada error, tidak ada update dari server
        // Anda bisa menambahkan penanganan untuk error di sini jika diperlukan
        // Misalnya, mengembalikan state ke kondisi semula (sebelum klik)
        setPosts(posts);
      });
  };
  

  const toggleShowComment = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentData = (data) => {
    console.log("Data dari Comment:", data);
  };

  useEffect(() => {
    if (dataGetFollowingPost) {
      setPosts(dataGetFollowingPost);
    }
  }, [dataGetFollowingPost]);

  return (
    <div className="pb-20 p-1">
      <MyFollowingStory />
      {posts?.length > 0 ? (
        posts.map((item, index) => (
          <div key={index}>
            <div className="flex items-center gap-3 p-3">
              <div className="w-8">
                <img
                  className="rounded-full h-[36px] w-[36px]"
                  src={item.user.profilePictureUrl}
                  alt=""
                />
              </div>
              <Link to={`/detailuser/${item.userId}`}>
                <button>{item.user.username}</button>
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <img src={item.imageUrl || defaultPhoto} onError={(e) => {e.target.src=defaultPhoto}} className="w-[358px] h-[329px] rounded-md object-cover" alt="" />
            </div>
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
                <div className="flex items-center gap-3 ">
                  <FaRegComment />
                  <p className="text-[17px]">{item.caption.length}</p>
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
                {showComments[item.id] ? "Sembunyikan komentar" : "Lihat semua komentar"}
              </button>
              <p className="text-[10px] text-gray-500">
                {timeAgo(item.createdAt)}
              </p>
              {showComments[item.id] && (
                <Comment postId={item.id} onCommentData={handleCommentData} />
              )}
            </div>
          </div>
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
};

export default FollowingPost;
