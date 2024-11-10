import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import ButtonBack from "../../components/buttonback";
import { Link } from "react-router-dom";
import usePhotoDefault from "../../hooks/usePhotoDefault";
import useIntersectionObserver from "../../hooks/useIntersectionObserver"; // Import hook baru

const ExplorePost = () => {
  const [explorePost, setExplorePost] = useState([]); // Menyimpan semua post yang dimuat
  const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman saat ini
  const [loading, setLoading] = useState(false); // Untuk menandakan sedang memuat
  const [hasMore, setHasMore] = useState(true); // Untuk mengecek apakah masih ada data untuk dimuat
  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const defaultPhoto = usePhotoDefault();

  const lastPostRef = useRef(null); // Referensi ke elemen yang terakhir untuk observer

  const getExplorePost = (page) => {
    setLoading(true); // Mulai memuat data
    axios
      .get(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/explore-post?size=20&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // Tambahkan data baru ke list yang sudah ada
        setExplorePost((prevPosts) => [...prevPosts, ...res.data.data.posts]);

        // Periksa apakah halaman berikutnya masih ada
        setHasMore(res.data.data.posts.length > 0);
      })
      .finally(() => {
        setLoading(false); // Selesai memuat data
      });
  };

  useEffect(() => {
    getExplorePost(currentPage); // Muat data halaman pertama
  }, [currentPage]);

  // Fungsi untuk observer
  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading && hasMore) {
      // Jika elemen terakhir terlihat, dan tidak sedang memuat serta masih ada data
      setCurrentPage((prevPage) => prevPage + 1); // Pindah ke halaman berikutnya
    }
  };

  // Menggunakan custom hook
  useIntersectionObserver(handleObserver, { rootMargin: "20px" }, lastPostRef);

  return (
    <>
      <div className="flex items-center py-2 px-2 gap-1 mb-1">
        <ButtonBack />
        <div className="relative flex items-center flex-grow">
          <IoSearch className="absolute left-2 text-gray-600" />
          <input
            placeholder="Search"
            type="text"
            className="w-full text-white h-8 bg-green-300 rounded-md pl-8"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {explorePost.map((item, index) => (
          <div key={index}>
            <Link
              to={`/detailexplore`}
              state={{ postDetail: item }} // Mengirimkan data melalui state
            >
              <div>
                <img
                  src={item.imageUrl || defaultPhoto}
                  onError={(e) => {
                    e.target.src = defaultPhoto;
                  }}
                  className="w-40 h-40 object-cover"
                  alt="Post"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Elemen terakhir yang diamati oleh observer */}
      {hasMore && !loading && (
        <div ref={lastPostRef} className="h-10"></div>
      )}

      {loading && <p>Loading more posts...</p>} {/* Menampilkan indikator loading */}
    </>
  );
};

export default ExplorePost;
