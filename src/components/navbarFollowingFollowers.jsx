import { useState } from "react";
import ButtonBack from "./buttonback";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const NavbarFollowingFollowers = () => {
  const [follow, setFollow] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigasi ke halaman sebelumnya
  };
  return (
    <>
      <div>
        <div className="flex flex-col mb-1 gap-1 ">
          <div className="flex items-center gap-2">
            <button onClick={handleBack}>
              <ButtonBack />
                
            </button>
            
            <h1 className="text-[20px]">UbayPix</h1>
            <FaAngleDown
              onClick={() => setFollow(!follow)}
              className="text-green-500"
            />
          </div>
          <div >
            {follow && (
              <div className="bg-slate-500 w-min px-4 py-2 rounded-md">
                <Link to={'/followingpost'}>
                <div className="flex items-center gap-3 text-white">
                  <p>Following</p>
                  <FaPersonCircleCheck />
                </div>
                </Link>

                <Link to={'/testsearch'}>
                <div className="flex items-center gap-3 text-white">
                  <p>Followers</p>
                  <FaPersonCirclePlus />
                </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarFollowingFollowers;
