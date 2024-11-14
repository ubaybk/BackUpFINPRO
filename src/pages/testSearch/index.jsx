import axios from "axios";
import { useEffect, useState } from "react";

const TestSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [results, setResults] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");

  // Fungsi debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500 ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetch data dari API saat debouncedQuery berubah
  useEffect(() => {
    if (debouncedQuery) {
      fetchPosts(debouncedQuery);
    }
  }, [debouncedQuery]);

  const fetchPosts = async (query) => {
    try {
      const response = await axios.get(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/explore-post`,
        {
          params: {
            size: 200,
            page: 1,
          },
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Filter hasil hanya berdasarkan `username` di sisi client
      const filteredResults = response.data.data.posts.filter((post) =>
        post.user?.username.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <>
      <h1>Ini Test Search</h1>
      <div>
        <input
          type="text"
          placeholder="Cari username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul>
          {results.map((post) => (
            <li key={post.id}>
                <img src={post.user.profilePictureUrl} alt="" />
              <p>{post.user ? post.user.username : "Unknown User"}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TestSearch;
