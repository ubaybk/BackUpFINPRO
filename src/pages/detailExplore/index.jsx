import { Link, useLocation } from "react-router-dom";

const DetailExplore = () => {
  const location = useLocation();  // Mendapatkan data yang dikirim
  const { postDetail } = location.state || {};  // Mengambil data post
console.log('ini postdetail new', postDetail)
  return (
    <div>
      <h1>Detail Explore</h1>
      {postDetail ? (
        <div>
            <Link to={`/detailuser/${postDetail.userId}`}>
            <img src={postDetail?.user?.profilePictureUrl} alt="" />
            </Link>
          <img src={postDetail.imageUrl} alt="" />
          <p>{postDetail.caption}</p> {/* Menampilkan data lain sesuai kebutuhan */}
        </div>
      ) : (
        <p>Data tidak tersedia</p>
      )}
    </div>
  );
};

export default DetailExplore;
