import { useContext, useEffect, useState } from "react";

import { followingByUserIdContext } from "../../context/FollowingByUserIdContextProvider";
import NavbarFollowById from "../../components/navbarFollowById";
import { Link } from "react-router-dom";

const FollowingUserId = () => {
  const datafollowingByUserIdContext = useContext(followingByUserIdContext);

  console.log("following by user id", datafollowingByUserIdContext);

  return (
    <>
      <div className="px-2">
        <NavbarFollowById />

        <div className="mb-32 mt-5 flex flex-col gap-4">
          {datafollowingByUserIdContext?.dataFollowingByUserId?.data?.users?.map(
            (item, index) => (
              <div key={index}>
                <Link to={`/detailuser/${item.id}`}>
                <div className="flex items-center gap-3">
                  <img
                    src={item.profilePictureUrl}
                    alt={item.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p>{item.username}</p>
                    <p className="text-[12px] text-slate-500">{item.email}</p>
                  </div>
                </div>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default FollowingUserId;
