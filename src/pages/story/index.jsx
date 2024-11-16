import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useTime from "../../hooks/useTime";
import ButtonBack from "../../components/buttonback";
import Layout from "../../components/layout";

const Story = () => {
  const token = localStorage.getItem("token");
  const timeAgo = useTime();
  const apiKey = import.meta.env.VITE_API_KEY;
  const location = useLocation();
  const navigate = useNavigate();
  const storyId = location.state?.storyId;

  const [dataStory, setDataStory] = useState(null);
  const [dataViewStory, setDataViewStory] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showAllViewers, setShowAllViewers] = useState(false); // State baru

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

  const getViewStory = () => {
    axios
      .get(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/story-views/${storyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setDataViewStory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getViewStory();
  }, []);

  useEffect(() => {
    if (!storyId) return;

    getStoryById();

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

  const toggleViewers = () => setShowAllViewers(!showAllViewers);

  if (!dataStory) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Layout>
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
            <img
              src={dataStory?.data?.imageUrl}
              className="md:w-[500px] md:h-[300px]"
              alt="Story Content"
            />
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-green-400 h-[100px] text-white font-semibold z-50">
            {/* View Story di Pojok Kiri Bawah */}
            <div
              className="absolute bottom-0 left-0 px-4 py-2 flex flex-col items-center cursor-pointer"
              onClick={toggleViewers} // Tambahkan event click
            >
              <div className="flex items-center">
                {(showAllViewers ? dataViewStory : dataViewStory.slice(0, 3)).map(
                  (item, index) => (
                    <div
                      key={index}
                      className={`relative ${index !== 0 ? "-ml-2" : ""} flex`}
                    >
                      <img
                        src={item?.user?.profilePictureUrl}
                        className="w-6 h-6 rounded-full border-2 border-white"
                        alt={item?.user?.username || "User"}
                      />
                    </div>
                  )
                )}
              </div>
              <div>
                <p>dilihat {dataViewStory.length}</p>
              </div>
            </div>

            {/* List lengkap jika di klik */}
            {showAllViewers && (
              <div className="absolute bottom-[120px] left-0 right-0 bg-white p-4 rounded-lg shadow-lg max-h-[300px] overflow-y-auto z-50">
                <ul>
                  {dataViewStory.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 mb-2">
                      <img
                        src={item?.user?.profilePictureUrl}
                        className="w-8 h-8 rounded-full"
                        alt={item?.user?.username || "User"}
                      />
                      <div className="flex flex-col">
                      <p className="text-black">{item?.user?.username}</p>
                      <p className="text-slate-500">{item?.user?.name}</p>

                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Caption di Tengah Bawah */}
            <div className="flex justify-center mt-7 text-[18px]">
              <p>{dataStory?.data?.caption || "No caption available"}</p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Story;
