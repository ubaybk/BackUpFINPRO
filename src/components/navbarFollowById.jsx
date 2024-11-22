import { Link } from "react-router-dom";
import ButtonBack from "./buttonback";
import { followingByUserIdContext } from "../context/FollowingByUserIdContextProvider";
import { useContext, useEffect } from "react";
import { followersByUserIdContext } from "../context/FollowersByUserIdContextProvider";
import Layout from "./layout";

const NavbarFollowById = () => {
  const {dataFollowingByUserId, getFollowingByUserIdContextProvider} = useContext(followingByUserIdContext);
  const {dataFollowersByUserId, getFollowersByUserIdContextProvider} = useContext(followersByUserIdContext);
  const userIdFollow = localStorage.getItem("userIdFollow");
  const usernameById = localStorage.getItem("usernameById");

  useEffect(()=> {
    getFollowingByUserIdContextProvider()
    getFollowersByUserIdContextProvider()
  },[userIdFollow])

  console.log("following User By Id", dataFollowingByUserId);
  console.log("followers User By Id", dataFollowersByUserId);

  
  return (
    <>
    <Layout>
      <div className="md:w-[600px]">
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
              {dataFollowersByUserId?.data?.totalItems}{" "}
              Pengikut
            </h1>
          </Link>
          </div>
          <div className="border-2  bg-green-500 w-full">
          <Link to={`/followinguserid/${userIdFollow}`} >
            <h1 className="text-[20px]">
              {dataFollowingByUserId?.data?.totalItems}{" "}
              Mengikuti
            </h1>
          </Link>
          </div>
        </div>
      </div>

    </Layout>
    </>
  );
};
export default NavbarFollowById;
