import { useContext, useEffect, useState } from "react";
import { getMyFollowingStoriesContext } from "../../context/GetMyFollowingStoriesContextProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useTime from "../../hooks/useTime";
import ButtonBack from "../../components/buttonback";

const Story = () => {
  const token = localStorage.getItem("token");
  const timeAgo = useTime();
  const apiKey = import.meta.env.VITE_API_KEY;
  const location = useLocation();
  const navigate = useNavigate();
  const storyId = location.state?.storyId;
  
  const [dataStory, setDataStory] = useState(null);
  const [progress, setProgress] = useState(0);

  const getStoryById = () => {
    axios
      .get(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/story/${storyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setDataStory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!storyId) return;

    getStoryById();

    // Progress bar effect with `requestAnimationFrame`
    let startTime;
    const updateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const percentage = Math.min((elapsed / 15000) * 100, 100);
      setProgress(percentage);

      if (percentage < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        navigate("/followingpost");
      }
    };
    const requestId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(requestId);
  }, [storyId, navigate]);

  if (!dataStory) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-2 flex flex-col gap-3 min-h-screen">
      <div className="h-1 w-full bg-gray-300 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-2">
        <Link to={"/followingpost"}>
          <ButtonBack />
        </Link>
        <img
          src={dataStory?.data?.user?.profilePictureUrl}
          className="w-10 h-10 rounded-full"
          alt="User Profile"
        />
        <p className="text-[13px]">{dataStory?.data?.user?.username}</p>
        <p className="text-slate-500 text-[11px]">
          {timeAgo(dataStory?.data?.createdAt)}
        </p>
      </div>

      <div className="flex flex-col justify-center items-center flex-grow">
        <img src={dataStory?.data?.imageUrl} alt="Story Content" />
      </div>

      <div className="fixed bottom-0 left-0 right-0">
        <div className="border font-semibold h-[100px] text-lg bg-slate-300 flex flex-col items-center justify-center">
          <p>{dataStory?.data?.caption}</p>
        </div>
      </div>
    </div>
  );
};

export default Story;
