import { useContext } from "react";
import { getMyFollowingStoriesContext } from "../../../context/GetMyFollowingStoriesContextProvider";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyFollowingStory = () => {
  const imgProfile = localStorage.getItem("photo");
  const { dataMyFollowingStory } = useContext(getMyFollowingStoriesContext);

  console.log("data post story following", dataMyFollowingStory);
  return (
    <>
      <div className="flex items-center gap-3 border-slate-400-500 border-b-2 p-2">
        <div className="relative">
          <div>
            <Link to={``}>
          <img src={imgProfile} className=" rounded-full w-10 h-10  " alt="" />
            </Link>

          </div>
          <div>
          <Link to={'/addstory'}>
          <FaPlusCircle className="absolute bottom-0 right-0 text-green-400" />
          </Link>

          </div>
        </div>
        {dataMyFollowingStory?.data?.stories.map((item, index) => (
          <div key={index}>
            <div>
              <Link
                to={`/story/${item.id}`}
                state={{ storyId: item.id }} // Mengirim item.id melalui state secara langsung
              >
                <img
                  src={item?.user?.profilePictureUrl}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyFollowingStory;
