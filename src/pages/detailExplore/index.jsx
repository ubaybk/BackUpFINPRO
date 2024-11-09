import { Link, useLocation } from "react-router-dom";
import usePhotoDefault from '../../hooks/usePhotoDefault'
import ButtonBack from "../../components/buttonback";

const DetailExplore = () => {
  const location = useLocation();  // Mendapatkan data yang dikirim
  const { postDetail } = location.state || {};  // Mengambil data post
  const defaultPhoto = usePhotoDefault();
console.log('ini postdetail new', postDetail)
  return (
    <div className="p-3">
      <Link to={'/explorepost'}>
      <div className=" flex items-center gap-5 mb-3">
      <ButtonBack/>
      <h1>Explore</h1>
      </div>
      </Link>
      {postDetail ? (
        <div className=" flex flex-col gap-5">
          <div>
            <Link className="flex items-center gap-2" to={`/detailuser/${postDetail.userId}`}>
            <img src={postDetail?.user?.profilePictureUrl || defaultPhoto} onError={(e) => {e.target.src=defaultPhoto}} className="w-10 h10 rounded-full" alt="" />
            <p>{postDetail?.user?.username}</p>
            </Link>

          </div>
          <img src={postDetail.imageUrl} className="" alt="" />
          <p>{postDetail.caption}</p> {/* Menampilkan data lain sesuai kebutuhan */}
        </div>
      ) : (
        <p>Data tidak tersedia</p>
      )}
    </div>
  );
};

export default DetailExplore;
