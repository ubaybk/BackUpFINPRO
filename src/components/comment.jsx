import axios from "axios";
import { useContext, useEffect, useState } from "react";
import useTime from "../hooks/useTime";
import { FaAngleDoubleUp } from "react-icons/fa";
import usePhotoDefault from "../hooks/usePhotoDefault";
import { Link } from "react-router-dom";

const Comment = ({ postId, onCommentData }) => {
  const timeAgo = useTime();
  const [comments, setComments] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const defaultPhoto = usePhotoDefault();

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
  console.log("ini komen", comments);

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
        console.log(res);
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
  console.log('DATA POSTKOMEN',comments)

  return (
    <div className="p-3 flex flex-col gap-3">
      <hr />
      <div>
        {comments.length > 0 ? (
          comments.map((item, index) => (
            <div key={index}>
              <Link to={`/detailuser/${item.user.id}`}>
              <div className="flex items-center gap-1">
                <img
                  src={item.user.profilePictureUrl || defaultPhoto} onError={(e) => {e.target.src=defaultPhoto}}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <p>{item.user.username}</p>
              </div>
              </Link>
              <p>{item.comment}</p>
              <p className="text-[10px] text-gray-500">
                {timeAgo(item.user.createdAt)}
              </p>
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
      <div className="flex items-center">
        <img src={photoProfile || defaultPhoto}  onError={(e) => {e.target.src=defaultPhoto}} className="w-10 h-10 rounded-full" alt="" />
        <input
          type="text"
          value={postComment.comment}
          onChange={handleChangeComment}
          name="comment"
          placeholder="add comment"
          className="pl-3 mt-1 block w-full rounded-xl p-2  focus:ring-indigo-500 focus:border-indigo-500 "
        />
        <div className="bg-green-500 p-2 rounded-md">
          <FaAngleDoubleUp onClick={handlePostComment} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
