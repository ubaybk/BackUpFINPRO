import { useContext, useEffect, useState } from "react";

import { followersByUserIdContext } from "../../context/FollowersByUserIdContextProvider";
import NavbarFollowById from "../../components/navbarFollowById";
import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import usePhotoDefault from "../../hooks/usePhotoDefault";


const FollowersUserId = () => {
  useEffect(()=> {
    getFollowersByUserIdContextProvider();
  },[])
  const {dataFollowersByUserId , getFollowersByUserIdContextProvider} = useContext(followersByUserIdContext);
  const defaultPhoto = usePhotoDefault();
  console.log("followers by user id", dataFollowersByUserId.data.users);

  return (
    <>
    <Layout>
      <div className="px-2">
        <NavbarFollowById />
        <div className="mb-32 mt-5 flex flex-col gap-4">
        {dataFollowersByUserId?.data?.users?.length > 0 ? (
  dataFollowersByUserId.data.users.map((item, index) => (
    <div key={index}>
      <Link to={`/detailuser/${item.id}`}>
        <div className="flex items-center gap-3">
          <img src={item.profilePictureUrl || defaultPhoto} onError={(e) => {e.target.src=defaultPhoto}} alt={item.username} className="w-10 h-10 rounded-full" />
          <div>
            <p>{item.username}</p>
            <p className="text-[12px] text-slate-500">{item.email}</p>
          </div>
        </div>
      </Link>
    </div>
  ))
) : (
  <p>No followers found</p>
)}

        </div>
      </div>

    </Layout>
    </>
  );
};

export default FollowersUserId;
