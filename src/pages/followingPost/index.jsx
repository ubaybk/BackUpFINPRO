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
  const [likes, setLikes] = useState([]);
  const [showComments, setShowComments] = useState({});
  const apiKey = import.meta.env.VITE_API_KEY;
  const defaultPhoto = usePhotoDefault();

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
          const updatedLikes = likes.filter((id) => id !== postId);
          setLikes(updatedLikes);
          localStorage.setItem("likedPosts", JSON.stringify(updatedLikes));
        } else {
          const updatedLikes = [...likes, postId];
          setLikes(updatedLikes);
          localStorage.setItem("likedPosts", JSON.stringify(updatedLikes));
        }

        const updatedPosts = posts.map((post) =>
          post.id === postId
            ? { ...post, totalLikes: response.data.totalLikes }
            : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error("Error liking/unliking post", error);
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
            <img src={item.imageUrl || defaultPhoto} onError={(e) => {e.target.src=defaultPhoto}} className="w-full" alt="" />
            <div className="px-3">
              <div className="text-2xl flex items-center gap-12">
                <div className="flex items-center gap-3">
                  <FaRegHeart
                    className={`cursor-pointer ${
                      likes.includes(item.id) ? "text-red-500" : "text-gray-500"
                    }`}
                    onClick={() => handleLike(item.id)}
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
