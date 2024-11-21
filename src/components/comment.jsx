import axios from "axios";
import { useContext, useEffect, useState } from "react";
import useTime from "../hooks/useTime";
import { FaAngleDoubleUp } from "react-icons/fa";
import usePhotoDefault from "../hooks/usePhotoDefault";
import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";

const Comment = ({ postId, onCommentData }) => {
  const timeAgo = useTime();
  const [comments, setComments] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const defaultPhoto = usePhotoDefault();
  const userId = localStorage.getItem("userId");

  const photoProfile = localStorage.getItem("photo");
  const username = localStorage.getItem("username");

  const getPostById = () => {
    axios
      .get(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/post/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setComments(res.data.data.comments || []);
        if (onCommentData) {
          onCommentData(res.data.data.comments);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteComment = (commentId) => {
    axios
      .delete(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/delete-comment/${commentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getPostById();
      })
      .catch((err) => console.log(err));
  };

  const [postComment, setPostComment] = useState({
    postId: postId,
    comment: "",
  });

  const handleChangeComment = (e) => {
    setPostComment({
      ...postComment,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostComment = () => {
    axios
      .post(
        "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/create-comment",
        postComment,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setPostComment({
          ...postComment,
          comment: "",
        });
        getPostById();
      });
  };

  useEffect(() => {
    if (postId) {
      getPostById();
    }
  }, [postId]);

  console.log('ini komen NEW', comments)

  return (
    <div className="p-3 flex flex-col gap-3">
      <hr />
      <div>
        {comments.length > 0 ? (
          comments.map((item) => (
            <div key={item.id} className="mb-4 relative">
              <Link to={`/detailuser/${item.user.id}`}>
                <div className=" flex items-center gap-2 mb-2">
                  <img
                    src={item.user.profilePictureUrl || defaultPhoto}
                    onError={(e) => {
                      e.target.src = defaultPhoto;
                    }}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="font-semibold">{item.user.username}</p>
                </div>
              </Link>
                <p>{item.comment}</p>
              <div className="  flex items-center justify-between">
                {item.user.id === userId && (
                  <button
                    onClick={() => handleDeleteComment(item.id)}
                    className="absolute top-5 right-0 text-[25px] text-red-500"
                  >
                    <TiDelete />
                  </button>
                )}
              </div>
              <p className="text-[10px] text-gray-500">{timeAgo(item.user.createdAt)}</p>
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
      <div className="flex items-center mt-4">
        <img
          src={photoProfile || defaultPhoto}
          onError={(e) => {
            e.target.src = defaultPhoto;
          }}
          className="w-10 h-10 rounded-full"
          alt="profile"
        />
        <input
          type="text"
          value={postComment.comment}
          onChange={handleChangeComment}
          name="comment"
          placeholder="Add a comment"
          className="pl-3 mt-1 block w-full rounded-xl p-2 focus:ring-indigo-500 dark:text-black focus:border-indigo-500 ml-2"
        />
        <div
          onClick={handlePostComment}
          className="bg-green-500 p-2 rounded-md ml-2 cursor-pointer"
        >
          <FaAngleDoubleUp className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Comment;
