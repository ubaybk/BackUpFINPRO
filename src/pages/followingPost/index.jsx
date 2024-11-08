import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import Comment from "../../components/comment";
import useTime from "../../hooks/useTime";
import { getFollowingPostContext } from "../../context/GetFollowingPostContextProvider";
import MyFollowingStory from "../../components/Story/myFollowingStory";

const FollowingPost = () => {
  const { dataGetFollowingPost } = useContext(getFollowingPostContext);
  const timeAgo = useTime();
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]); // State untuk menyimpan like status per post
  const [showComment, setShowComment] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleLike = (postId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("User not authenticated");
      return;
    }

    const apiUrl = likes.includes(postId)
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
        if (likes.includes(postId)) {
          // Jika sudah di-like, hapus dari daftar likes
          const updatedLikes = likes.filter((id) => id !== postId);
          setLikes(updatedLikes);
          localStorage.setItem("likedPosts", JSON.stringify(updatedLikes)); // Simpan ke localStorage
        } else {
          // Jika belum di-like, tambahkan ke daftar likes
          const updatedLikes = [...likes, postId];
          setLikes(updatedLikes);
          localStorage.setItem("likedPosts", JSON.stringify(updatedLikes)); // Simpan ke localStorage
        }

        // Update totalLikes based on the response
        const updatedPosts = posts.map((post) =>
          post.id === postId
            ? { ...post, totalLikes: response.data.totalLikes }
            : post
        );
        setPosts(updatedPosts); // Update state posts
      })
      .catch((error) => {
        console.error("Error liking/unliking post", error);
      });
  };

  const handleShowComment = () => {
    setShowComment(!showComment);
  };

  // Fungsi untuk menerima data dari Comment
  const handleCommentData = (data) => {
    console.log("Data dari Comment:", data);
    // Lakukan apa pun yang Anda inginkan dengan data ini di FollowingPost
  };

  // Memperbarui posts jika dataGetFollowingPost berubah
  useEffect(() => {
    if (dataGetFollowingPost) {
      setPosts(dataGetFollowingPost);
    }

    // Ambil likes dari localStorage saat komponen pertama kali dimuat
    const savedLikes = JSON.parse(localStorage.getItem("likedPosts")) || [];
    setLikes(savedLikes);
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
                  className="rounded-full"
                  src={item.user.profilePictureUrl}
                  alt=""
                />
              </div>
              <Link to={`/detailuser/${item.userId}`}>
                <button>{item.user.username}</button>
              </Link>
            </div>
            <img src={item.imageUrl} className="w-full" alt="" />
            <div className="px-3">
              <div className="text-2xl flex items-center gap-12">
                <div className="flex items-center gap-3">
                  <FaRegHeart
                    className={`cursor-pointer ${
                      likes.includes(item.id) ? "text-red-500" : "text-gray-500"
                    }`} // Ubah warna jika post sudah di-like
                    onClick={() => handleLike(item.id)} // Pass item.id to handleLike
                  />
                  <p>{item.totalLikes}</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaRegComment />
                  <p>{item.caption.length}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <h1 className="font-semibold">{item.user.username}</h1>
                <h1>{item.caption}</h1>
              </div>
              {showComment && (
                <button
                  onClick={handleShowComment}
                  className="text-[12px] text-gray-500"
                >
                  Lihat semua komentar
                </button>
              )}
              <p className="text-[10px] text-gray-500">
                {timeAgo(item.createdAt)}
              </p>
            </div>
            <Comment postId={item.id} onCommentData={handleCommentData} />
          </div>
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
};

export default FollowingPost;
