import { useContext } from "react";
import { Link } from "react-router-dom";
import { getLoginUserContext } from "../../context/GetLoginUserContextProvider";
import { getAllExportPostContext } from "../../context/GetAllExplorePostContextProvider";
import usePhotoDefault from "../../hooks/usePhotoDefault";

const FollowingPostSide = () => {
  const { dataUserLogin } = useContext(getLoginUserContext);
  const { dataAllExportPost } = useContext(getAllExportPostContext);
  const defaultPhoto = usePhotoDefault()

  console.log("ini data ALL EXPORT", dataAllExportPost);
  return (
    <>
      <div className="fixed w-[30%] top-0 mt-5 pl-16 right-0 hidden md:flex flex-col gap-10">
        <Link to={"/dashboard"}>
          <div className=" rounded-md flex items-center text-black ">
            <div className="flex items-center gap-3 ">
              <img
                className="w-12 h-12 rounded-full"
                src={dataUserLogin.profilePictureUrl}
                alt={dataUserLogin.username}
              />
              <div className="leading-tight">
                <p className="text-[12px]">{dataUserLogin.username}</p>
                <p className="text-gray-400 text-[12px]">
                  {dataUserLogin.name}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <div>
          <div className="mb-6">
            <p className="text-slate-500 text-[14px]">Disarankan untuk Anda</p>
          </div>
          <div className="flex flex-col gap-3">
            {dataAllExportPost.map((item, index) => (
                <div key={index}>
                  <Link to={item.userId ? `/detailuser/${item.userId}` : "#"}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                  <img
                    src={item?.user?.profilePictureUrl || defaultPhoto}  onError={(e) => {
                        e.target.src = defaultPhoto;
                      }}
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                  <div>
                  <p className="text-[12px] font-semibold">{item?.user?.username || <p>Unknown</p>}</p>
                  <p className="text-[9px]">{item?.user?.email || <p>Unknown</p>}</p>
                    
                  </div>

                    </div>
                  <p className="pr-8 text-blue-500 text-[12px]">see</p>
                </div>
            </Link>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </>
  );
};
export default FollowingPostSide;
