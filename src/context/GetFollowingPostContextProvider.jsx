import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const getFollowingPostContext = createContext();

export const GetFollowingPostContextProvider = ({ children }) => {
  const [dataGetFollowingPost, setDataGetFollowingPost] = useState([]);
  const [comments, setComments] = useState({}); // Untuk menyimpan komentar berdasarkan postId

  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");

  const getDataFollowingPostContextProvider = async () => {
    try {
      // Request pertama: mendapatkan semua post
      const postsResponse = await axios.get(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/following-post?size=100&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const posts = postsResponse.data.data.posts;
      setDataGetFollowingPost(posts);

      // Request kedua: ambil komentar untuk setiap postId
      const commentsRequests = posts.map((post) =>
        axios.get(
          `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/post/${post.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              apiKey: apiKey,
              Authorization: `Bearer ${token}`,
            },
          }
        )
      );

      const commentsResponses = await Promise.all(commentsRequests);

      // Format hasil komentar ke dalam objek { postId: comments }
      const commentsData = commentsResponses.reduce((acc, response, index) => {
        const postId = posts[index].id; // Menggunakan post.id, bukan post.postId
        acc[postId] = response.data.data?.comments || []; // Tambahkan fallback jika tidak ada komentar
        return acc;
      }, {});

      setComments(commentsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDataFollowingPostContextProvider();
  }, []);

  return (
    <getFollowingPostContext.Provider
      value={{ dataGetFollowingPost, comments }}
    >
      {children}
    </getFollowingPostContext.Provider>
  );
};
