import axios from "axios";
import { useContext, useEffect, useState } from "react";
import useTime from "../hooks/useTime";
import { FaAngleDoubleUp } from "react-icons/fa";

const Comment = ({ postId, onCommentData  }) => {
    const timeAgo = useTime()
  const [comments, setComments] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");

  

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
        [e.target.name]: e.target.value
    })
  }

  const handlePostComment = () => {
    axios
      .post(
        "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/create-comment",
        postComment,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            "Authorization": `Bearer ${token}`
          },
        }
      )
      .then((res) => {
        console.log(res);
        setPostComment(
            {
                ...postComment, comment: ""
            }
        )
        getPostById()
      });
  };

  useEffect(() => {
    if (postId) {
      getPostById();
    }
  }, [postId]);

  return (
    <div className="p-3 flex flex-col gap-3">
      <hr />
      <div>
       
        {comments.length > 0 ? (
          comments.map((item, index) => (
            <div key={index}>
                 <div className="flex items-center gap-1">
          <img
            src={item.user.profilePictureUrl}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <p>{item.user.username}</p>
        </div>
              <p>{item.comment}</p>
              <p>{timeAgo(item.user.createdAt)}</p>
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
      <div className="flex items-center">
        <img src={photoProfile} className="w-10 h-10 rounded-full" alt="" />
        <input
          type="text"
          value={postComment.comment}
          onChange={handleChangeComment}
          name="comment"
          placeholder="add comment"
          className="pl-3 mt-1 block w-full  focus:ring-indigo-500 focus:border-indigo-500 "
        />
        <div className="bg-green-500 p-2 rounded-md">
        <FaAngleDoubleUp onClick={handlePostComment} />

        </div>
      </div>
    </div>
  );
};

export default Comment;
