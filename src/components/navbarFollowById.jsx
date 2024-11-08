import { Link } from "react-router-dom";
import ButtonBack from "./buttonback";
import { followingByUserIdContext } from "../context/FollowingByUserIdContextProvider";
import { useContext, useEffect } from "react";
import { followersByUserIdContext } from "../context/FollowersByUserIdContextProvider";

const NavbarFollowById = () => {
  const followingByUserId = useContext(followingByUserIdContext);
  const followersByUserId = useContext(followersByUserIdContext);
  const userIdFollow = localStorage.getItem("userIdFollow");
  const usernameById = localStorage.getItem("usernameById");

  console.log("following User By Id", followingByUserId);
  console.log("followers User By Id", followersByUserId);

  useEffect(() => {}, []);
  return (
    <>
      <div>
        <div className="flex items-center gap-3 py-3 ">
          <Link to={`/detailuser/${userIdFollow}`}>
            <ButtonBack />
          </Link>
          <h1 className="text-[18px] font-semibold">{usernameById}</h1>
        </div>
        <div className="flex text-center justify-around text-white items-center gap-1">
          <div className="border-2 bg-green-500 w-full">
          <Link to={`/followersuserid/${userIdFollow}`}>
            <h1 className="text-[20px]">
              {followersByUserId?.dataFollowersByUserId?.data?.totalItems}{" "}
              Pengikut
            </h1>
          </Link>
          </div>
          <div className="border-2  bg-green-500 w-full">
          <Link to={`/followinguserid/${userIdFollow}`} >
            <h1 className="text-[20px]">
              {followingByUserId?.dataFollowingByUserId?.data?.totalItems}{" "}
              Mengikuti
            </h1>
          </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavbarFollowById;
