import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import usePhotoDefault from "../../hooks/usePhotoDefault";
import useTime from "../../hooks/useTime";
import ButtonBack from "../../components/buttonback";
import Layout from "../../components/layout";
import Comment from "../../components/comment";

const DetailExplore = () => {
  const location = useLocation();
  const { postDetail } = location.state || {};
  const defaultPhoto = usePhotoDefault();
  const timeAgo = useTime();
  const apiKey = import.meta.env.VITE_API_KEY;

  // State untuk like dan komentar
  const [post, setPost] = useState(postDetail);
  const [showComments, setShowComments] = useState(false);
  const [totalComments, setTotalComments] = useState(0);

  // Fungsi untuk menangani like/unlike
  const handleLike = async (postId, isLike) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Pengguna tidak terautentikasi");
      return;
    }

    const originalPost = { ...post };

    try {
      // Optimistic Update
      setPost((prevPost) => ({
        ...prevPost,
        isLike: !isLike,
        totalLikes: isLike 
          ? Math.max(0, prevPost.totalLikes - 1)
          : prevPost.totalLikes + 1
      }));

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
      setPost((prevPost) => ({
        ...prevPost,
        isLike: !isLike,
        totalLikes: response.data.totalLikes ?? prevPost.totalLikes,
      }));

    } catch (error) {
      console.error("Kesalahan saat like/unlike:", error);
      setPost(originalPost);
      alert("Gagal memperbarui like. Silakan coba lagi.");
    }
  };

  // Fungsi untuk toggle komentar
  const toggleShowComment = () => {
    setShowComments(!showComments);
  };

  // Fungsi untuk menerima data komentar
  const handleCommentData = (comments) => {
    setTotalComments(comments.length);
  };

  if (!post) {
    return (
      <Layout>
        <p>Data tidak tersedia</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-3">
        <Link to={"/explorepost"}>
          <div className="flex items-center gap-5 mb-3">
            <ButtonBack />
            <h1>Explore</h1>
          </div>
        </Link>

        <div className="flex flex-col gap-5">
          {/* Header post */}
          <div>
            <Link
              className="flex items-center gap-2"
              to={`/detailuser/${post.userId}`}
            >
              <img
                src={post?.user?.profilePictureUrl || defaultPhoto}
                onError={(e) => {
                  e.target.src = defaultPhoto;
                }}
                className="w-10 h-10 rounded-full"
                alt=""
              />
              <p>{post?.user?.username || "unknown"}</p>
            </Link>
          </div>

          {/* Gambar Post */}
          <img 
            src={post.imageUrl || defaultPhoto} 
            onError={(e) => {
              e.target.src = defaultPhoto;
            }}
            className="md:w-[600px] md:h-[300px] md:object-cover" 
            alt="" 
          />

          {/* Interaksi dan Detail Post */}
          <div className="px-3">
            <div className="text-2xl flex items-center gap-12 mb-3">
              {/* Tombol Like */}
              <div className="flex items-center gap-3">
                <FaRegHeart
                  className={`cursor-pointer ${
                    post.isLike ? "text-red-500" : "text-gray-500"
                  }`}
                  onClick={() => handleLike(post.id, post.isLike)}
                />
                <p className="text-[17px]">{post.totalLikes}</p>
              </div>

              {/* Tombol Komentar */}
              <div className="flex items-center gap-3">
                <FaRegComment 
                  className="cursor-pointer"
                  onClick={toggleShowComment} 
                />
                <p className="text-[17px]">{totalComments}</p>
              </div>
            </div>

            {/* Caption */}
            <div className="flex flex-col mb-3">
              <h1 className="font-semibold">{post.user.username}</h1>
              <h1>{post.caption}</h1>
            </div>

            {/* Waktu Post */}
            <p className="text-[10px] text-gray-500 mb-3">
              {timeAgo(post.createdAt)}
            </p>

            {/* Komentar */}
            {showComments && (
              <Comment
                postId={post.id}
                onCommentData={handleCommentData}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailExplore;