import axios from "axios";
import { useContext, useEffect, useState } from "react";
import NavbarFollow from "../../components/navbarFolow";
import { followingContext } from "../../context/FollowingContextProvider";
import { Link } from "react-router-dom";

const MyFollowing = () => {
  const { dataMyfollowing } = useContext(followingContext);

  console.log("ini following context", dataMyfollowing);

  return (
    <>
      <div className="px-2">
        <NavbarFollow />
        <div className="mb-32 mt-5 flex flex-col gap-4">
          {dataMyfollowing?.data?.users?.map((item, index) => (
            <div key={index}>
              <div className="flex items-center gap-3">
                <img
                  src={item.profilePictureUrl}
                  alt={item.username}
                  className="w-10 h-10 rounded-full"
                />
                <Link to={`/detailuser/${item.id}`}>
                <div>
                  <h1>{item.username}</h1>
                  <p className="text-[12px] text-slate-500">{item.email}</p>
                </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyFollowing;
