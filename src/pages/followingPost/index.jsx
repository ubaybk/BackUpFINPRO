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
import NavbarFollowingFollowers from "../../components/navbarFollowingFollowers";
import Layout from "../../components/layout";
import FollowingPostSide from "../../components/followingPostSide";

const FollowingPost = () => {
  const { dataGetFollowingPost, comments } = useContext(getFollowingPostContext);
  const timeAgo = useTime();
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState({});
  const [totalComments, setTotalComments] = useState({}); // Menyimpan jumlah komentar per post
  const apiKey = import.meta.env.VITE_API_KEY;
  const defaultPhoto = usePhotoDefault();
  

  // Fungsi untuk menangani like/unlike
  const handleLike = async (postId, isLike) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("User not authenticated");
      return;
    }

    // Simpan state awal sebelum update
    const originalPosts = [...posts];

    try {
      // Optimistic Update dengan callback setState
      setPosts((prevPosts) =>
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
            apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update dengan data dari server
      setPosts((prevPosts) =>
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

      // Rollback ke state awal jika terjadi error
      setPosts(originalPosts);

      // Optional: Tampilkan pesan error ke user
      alert("Gagal memperbarui like. Silakan coba lagi.");
    }
  };

  // Fungsi untuk toggle komentar
  const toggleShowComment = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Fungsi untuk menerima data komentar dan update totalComments
  const handleCommentData = (postId, comments) => {
    console.log("Data komentar untuk postId:", postId, comments);
    // Update jumlah komentar pada post tertentu
    setTotalComments((prevTotalComments) => ({
      ...prevTotalComments,
      [postId]: comments.length, // Menggunakan panjang array komentar sebagai jumlah komentar
    }));
  };

  // Mengisi state posts saat dataGetFollowingPost berubah
  useEffect(() => {
    if (dataGetFollowingPost) {
      setPosts(dataGetFollowingPost);
    }
  }, [dataGetFollowingPost]);

  return (
    <Layout>
      <div className="pb-20 md:w-[550px] p-1">
        <NavbarFollowingFollowers />
        <MyFollowingStory />
        {posts?.length > 0 ? (
          posts.map((item) => (
            <div key={item.id}>
              {/* Header post */}
              <div className="flex items-center gap-3 p-3">
                <div className="w-8">
                  <img
                    className="rounded-full h-[36px] w-[36px]"
                    src={item.user.profilePictureUrl || defaultPhoto}
                    onError={(e) => {
                      e.target.src = defaultPhoto;
                    }}
                    alt=""
                  />
                </div>
                <Link to={`/detailuser/${item.userId}`}>
                  <button>{item.user.username}</button>
                </Link>
              </div>

              {/* Konten post */}
              <div className="flex flex-col items-center">
                <img
                  src={item.imageUrl || defaultPhoto}
                  onError={(e) => {
                    e.target.src = defaultPhoto;
                  }}
                  className="w-[500px] h-[329px] rounded-md object-cover"
                  alt=""
                />
              </div>

              {/* Interaksi dan detail post */}
              <div className="px-3 mb-3">
                <div className="text-2xl flex items-center gap-12">
                  {/* Like button */}
                  <div className="flex items-center gap-3">
                    <FaRegHeart
                      className={`cursor-pointer ${
                        item.isLike ? "text-red-500" : "text-gray-500"
                      }`}
                      onClick={() => handleLike(item.id, item.isLike)}
                    />
                    <p className="text-[17px]">{item.totalLikes}</p>
                  </div>

                  {/* Comment button */}
                  <div className="flex items-center gap-3">
                    <FaRegComment />
                    <p className="text-[17px]">{totalComments[item.id] || 0}</p>
                  </div>
                </div>

                {/* Caption */}
                <div className="flex flex-col">
                  <h1 className="font-semibold">{item.user.username}</h1>
                  <h1>{item.caption}</h1>
                </div>

                {/* Toggle comments */}
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
          ))
        ) : (
          <p>Loading posts...</p>
        )}
      </div>
      <FollowingPostSide />
      {}
    </Layout>
  );
};

export default FollowingPost;
