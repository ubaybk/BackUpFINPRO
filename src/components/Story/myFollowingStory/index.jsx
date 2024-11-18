import React, { useContext, useMemo, useRef } from "react";
import { getMyFollowingStoriesContext } from "../../../context/GetMyFollowingStoriesContextProvider";
import { getLoginUserContext } from "../../../context/GetLoginUserContextProvider";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const MyFollowingStory = () => {
  const { dataMyFollowingStory } = useContext(getMyFollowingStoriesContext);
  const { dataUserLogin } = useContext(getLoginUserContext);
  const carouselRef = useRef(null);

  // Fungsi navigasi carousel
  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  // Mengelompokkan stories berdasarkan userId
  const groupedStories = useMemo(() => {
    if (!dataMyFollowingStory?.data?.stories) return [];

    return Object.values(
      dataMyFollowingStory.data.stories.reduce((acc, story) => {
        if (!acc[story.user.id]) {
          acc[story.user.id] = {
            userId: story.user.id,
            username: story.user.username,
            profilePictureUrl: story.user.profilePictureUrl,
            stories: [],
          };
        }
        acc[story.user.id].stories.push(story);
        return acc;
      }, {})
    );
  }, [dataMyFollowingStory?.data?.stories]);

  const StoryCircle = ({
    imageUrl,
    username,
    isUser = false,
    hasMultipleStories = false,
    stories = [],
  }) => (
    <div className="flex flex-col items-center space-y-1 min-w-[80px]">
      <div className="relative">
        <div
          className={`p-[2px] rounded-full ${
            !isUser && "bg-gradient-to-tr from-yellow-400 to-fuchsia-600"
          }`}
        >
          <div className="bg-white p-[2px] rounded-full">
            <img
              src={imageUrl}
              alt={username}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
        </div>
        {hasMultipleStories && (
          <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
            <span className="text-white text-xs">{stories.length}</span>
          </div>
        )}
        {isUser && (
          <Link
            to="/addstory"
            className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-white"
          >
            <Plus size={16} className="text-white" />
          </Link>
        )}
      </div>
      <span className="text-xs text-center truncate w-full">
        {username?.length > 10 ? `${username.slice(0, 10)}...` : username}
      </span>
    </div>
  );

  return (
    <div className="bg-white rounded-lg">
      <div className="p-1 relative">
        {/* Tombol Navigasi */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
        >
          {"<"}
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
        >
          {">"}
        </button>

        {/* Kontainer Carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-hidden whitespace-nowrap scroll-smooth"
        >
          <StoryCircle
            imageUrl={dataUserLogin.profilePictureUrl}
            username="Your Story"
            isUser={true}
          />
          {groupedStories.map((userStories, index) => (
            <Link
              key={index}
              to={`/story/${userStories.stories[0].id}`}
              state={{
                userId: userStories.userId,
                stories: userStories.stories,
              }}
              className="p-1"
            >
              <StoryCircle
                imageUrl={userStories.profilePictureUrl}
                username={userStories.username}
                hasMultipleStories={userStories.stories.length > 1}
                stories={userStories.stories}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyFollowingStory;
