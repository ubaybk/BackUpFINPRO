import { useContext, useEffect, useState } from "react";

import { followingByUserIdContext } from "../../context/FollowingByUserIdContextProvider";
import NavbarFollowById from "../../components/navbarFollowById";
import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import usePhotoDefault from "../../hooks/usePhotoDefault";

const FollowingUserId = () => {
  useEffect(()=> {
    getFollowingByUserIdContextProvider();
  },[])
  const {dataFollowingByUserId, getFollowingByUserIdContextProvider} = useContext(followingByUserIdContext);
  const defaultPhoto = usePhotoDefault();
  console.log("following by user id", dataFollowingByUserId);


  return (
    <>
    <Layout>
      <div className="px-2">
        <NavbarFollowById />

        <div className="mb-32 mt-5 flex flex-col gap-4">
          {dataFollowingByUserId?.data?.users?.map(
            (item, index) => (
              <div key={index}>
                <Link to={`/detailuser/${item.id}`}>
                <div className="flex items-center gap-3">
                  <img
                    src={item.profilePictureUrl || defaultPhoto } onError={(e) => {e.target.src=defaultPhoto}}
                    alt={item.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p>{item.username || "no username"} </p>
                    <p className="text-[12px] text-slate-500">{item.email || "no email"}</p>
                  </div>
                </div>
                </Link>
              </div>
            )
          )}
        </div>
      </div>

    </Layout>
    </>
  );
};

export default FollowingUserId;
