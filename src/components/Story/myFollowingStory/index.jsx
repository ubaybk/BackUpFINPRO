import { useContext } from "react";
import { getMyFollowingStoriesContext } from "../../../context/GetMyFollowingStoriesContextProvider";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getLoginUserContext } from "../../../context/GetLoginUserContextProvider";

const MyFollowingStory = () => {
  const userId = localStorage.getItem("userId")
  const { dataMyFollowingStory } = useContext(getMyFollowingStoriesContext);

  const {dataUserLogin} = useContext(getLoginUserContext)

  console.log('data context user LOGIN',dataUserLogin)

  console.log("data post story following", dataMyFollowingStory);
  return (
    <>
      <div className="flex items-center gap-3 border-slate-400-500 border-b-2 md:border-none p-2">
        <div className="relative">
          <div>
            <Link to={``}>
              <img
                src={dataUserLogin.profilePictureUrl}
                className=" rounded-full w-[60px] h-[60px]"
                alt=""
              />
              <p>{dataUserLogin.username}</p>
            </Link>
          </div>
          <div>
            <Link to={"/addstory"}>
              <FaPlusCircle className="absolute bottom-7 right-0 text-green-400" />
            </Link>
          </div>
        </div>
        {dataMyFollowingStory?.data?.stories.map((item, index) => (
          <div key={index}>
            <div>
              <Link
                to={`/story/${item.id}`}
                state={{ storyId: item.id }} // Mengirim item.id melalui state secara langsung
                className="flex flex-col items-center"
              >
                <img
                  src={item?.user?.profilePictureUrl}
                  className="w-[60px] h-[60px]  rounded-full"
                  alt=""
                />
               <p className="text-[14px]">{item?.user?.username?.length > 10 ? `${item.user.username.slice(0, 10)}...` : item.user.username}</p>


              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyFollowingStory;
