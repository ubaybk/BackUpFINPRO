import { Link } from "react-router-dom";
import ButtonBack from "./buttonback";
import { followingContext } from "../context/FollowingContextProvider";
import { followersContext } from "../context/FollowersContextProvider";
import { useContext, useEffect } from "react";
import axios from "axios";

const NavbarFollow = () => {
  const username = localStorage.getItem("username");
  const {dataMyfollowing, getMyfollowing} = useContext(followingContext);
  const {dataMyfollowers , getMyfollowers} = useContext(followersContext)

  useEffect(()=> {
    getMyfollowers()
    getMyfollowing() 
  },[getMyfollowers, getMyfollowing])

  

  return (
    <>
      <div>
        <div className="flex items-center gap-3 py-3 ">
          <Link to={"/dashboard"}>
            <ButtonBack />
          </Link>
          <h1 className="text-[18px] font-semibold">{username}</h1>
        </div>
        <div className="flex text-center justify-around text-white items-center gap-1">
          <div className="border-2 bg-green-500 w-full">
            <Link to={"/myfollowers"}>
              <h1 className="text-[20px]">
                {dataMyfollowers?.data?.totalItems} Pengikut
              </h1>
            </Link>
          </div>
          <div className="border-2  bg-green-500 w-full">
            <Link to={"/myfollowing"}>
              <h1 className="text-[20px]">
                
                {
                  dataMyfollowing?.data?.totalItems
                } Mengikuti
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarFollow;
