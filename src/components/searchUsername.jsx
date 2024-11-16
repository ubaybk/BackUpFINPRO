import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ButtonBack from "./buttonback";
import useHandleBack from "../hooks/useHandleBack";

const SearchUsername = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Tambahkan state isSearching
  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const handleBack = useHandleBack()

  // Fungsi debounce untuk mencari secara otomatis setelah user berhenti mengetik
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
    } else {
      setResults([]); // Kosongkan hasil saat searchQuery kosong
    }
  }, [debouncedQuery]);

  const fetchPosts = async (query) => {
    setIsSearching(true); // Set isSearching menjadi true saat pencarian dimulai
    const loadingToastId = toast.loading("Mencari..."); // Munculkan loading toast
    try {
      let page = 1;
      const size = 10; // ukuran halaman tetap untuk setiap request
      let allResults = [];
      let uniqueUsernames = new Set(); // Set untuk menyimpan username unik
      let hasMoreData = true;

      while (hasMoreData) {
        const response = await axios.get(
          `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/explore-post`,
          {
            params: {
              size: size,
              page: page,
            },
            headers: {
              "Content-Type": "application/json",
              apiKey: apiKey,
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const posts = response.data.data.posts;

        // Filter hasil berdasarkan `username` dan pastikan `username` unik
        const filteredResults = posts.filter((post) => {
          const username = post.user?.username;
          const isMatch = username?.toLowerCase().includes(query.toLowerCase());

          // Tambahkan hasil yang sesuai hanya jika `username` belum ada
          if (isMatch && !uniqueUsernames.has(username)) {
            uniqueUsernames.add(username); // Tandai username sebagai telah digunakan
            return true;
          }
          return false;
        });

        // Tambahkan hasil yang sesuai ke `allResults`
        allResults = [...allResults, ...filteredResults];

        // Menghentikan loop jika data pada halaman ini kosong
        if (posts.length < size) {
          hasMoreData = false;
        } else {
          page += 1; // lanjutkan ke halaman berikutnya
        }
      }

      setResults(allResults); // Simpan semua hasil yang ditemukan
      toast.update(loadingToastId, { render: "Pencarian selesai!", type: "success", isLoading: false, autoClose: 2000 });
    } catch (error) {
      toast.update(loadingToastId, { render: "Terjadi kesalahan saat mencari.", type: "error", isLoading: false, autoClose: 3000 });
      console.error("Error fetching posts:", error);
    } finally {
      setIsSearching(false); // Set isSearching menjadi false saat pencarian selesai
    }
  };

  return (
    <>
      <ToastContainer />
      
      <div className="w-full ">
        <div className="flex items-center gap-2">
          <button onClick={handleBack}>
          <ButtonBack/>

          </button>
        <input
          type="text"
          placeholder="Cari username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-green-300 rounded-xl p-2 w-full"
        />

        </div>
        <ul className="mt-4">
          {results.length > 0 ? (
            results.map((post) => (
              <li key={post.id}>
                <Link className="flex items-center gap-3" to={`/detailuser/${post.userId}`}>
                  <img src={post.user.profilePictureUrl} className="w-10 h-10 rounded-full" alt="" />
                  <p>{post.user ? post.user.username : "Unknown User"}</p>
                </Link>
              </li>
            ))
          ) : (
            !isSearching && searchQuery && <p className="text-gray-500">Tidak ada hasil</p> // Tampilkan "Tidak ada hasil" jika tidak sedang mencari dan ada query
          )}
        </ul>
      </div>
    </>
  );
};

export default SearchUsername;
