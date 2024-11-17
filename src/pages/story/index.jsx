import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useTime from "../../hooks/useTime";
import ButtonBack from "../../components/buttonback";
import Layout from "../../components/layout";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const Story = () => {
  const token = localStorage.getItem("token");
  const timeAgo = useTime();
  const apiKey = import.meta.env.VITE_API_KEY;
  const location = useLocation();
  const navigate = useNavigate();
  const storyId = location.state?.storyId;
  const stories = location.state?.stories || []; // Default empty array

  const [dataStory, setDataStory] = useState(null);
  const [dataViewStory, setDataViewStory] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showAllViewers, setShowAllViewers] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const progressRef = useRef(null);
  const startTimeRef = useRef(null);

  const STORY_DURATION = 5000; // 5 seconds per story

  // Fetch single story by ID
  const getStoryById = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/story/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataStory(res.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Fetch story viewers by ID
  const getViewStory = async (id) => {
    try {
      const res = await axios.get(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/story-views/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataViewStory(res.data.data);
    } catch (err) {
      console.error("Error fetching story views:", err);
    }
  };

  // Set story data for the current index
  const setStoryDataByIndex = (index) => {
    const story = stories[index];
    if (story) {
      getStoryById(story.id);
      getViewStory(story.id);
    }
  };

  // Initialize story on first render
  useEffect(() => {
    if (storyId) {
      // Find index of the starting story
      const initialIndex = stories.findIndex((story) => story.id === storyId);
      if (initialIndex !== -1) {
        setCurrentStoryIndex(initialIndex);
        setStoryDataByIndex(initialIndex);
      }
    } else if (stories.length > 0) {
      setStoryDataByIndex(0); // Default to the first story
    }
  }, [storyId, stories]);

  // Progress bar animation
  const startProgress = () => {
    if (progressRef.current) cancelAnimationFrame(progressRef.current);

    startTimeRef.current = Date.now();
    const animate = () => {
      if (isPaused) return;

      const elapsed = Date.now() - startTimeRef.current;
      const percentage = Math.min((elapsed / STORY_DURATION) * 100, 100);
      setProgress(percentage);

      if (percentage < 100) {
        progressRef.current = requestAnimationFrame(animate);
      } else {
        handleNext();
      }
    };
    progressRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    startProgress();
    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };
  }, [currentStoryIndex, isPaused]);

  // Handlers for navigation
  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      const nextIndex = currentStoryIndex + 1;
      setCurrentStoryIndex(nextIndex);
      setProgress(0);
      setStoryDataByIndex(nextIndex);
    } else {
      navigate("/followingpost");
    }
  };

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      const prevIndex = currentStoryIndex - 1;
      setCurrentStoryIndex(prevIndex);
      setProgress(0);
      setStoryDataByIndex(prevIndex);
    }
  };

  // Handle touch for navigation
  const handleTouchStory = (e) => {
    const touchX = e.touches[0].clientX;
    const { width } = e.currentTarget.getBoundingClientRect();
    if (touchX < width / 2) {
      handlePrevious();
    } else {
      handleNext();
    }
  };

  const handleHoldStart = () => setIsPaused(true);
  const handleHoldEnd = () => setIsPaused(false);

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-red-500">Error: {error}</p>
          <button
            onClick={() => navigate("/followingpost")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Back to Feed
          </button>
        </div>
      </Layout>
    );
  }

  if (isLoading || !dataStory) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="fixed inset-0 bg-black">
        <div className="relative h-full flex flex-col">
          {/* Progress Bars */}
          <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 p-2">
            {stories.map((_, index) => (
              <div
                key={index}
                className="h-1 flex-1 bg-gray-500 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full bg-white transition-all duration-200 ${
                    index < currentStoryIndex ? "w-full" :
                    index === currentStoryIndex ? "" : "w-0"
                  }`}
                  style={{
                    width: index === currentStoryIndex ? `${progress}%` : undefined
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center gap-3 p-4 pt-8">
            <button
              onClick={() => navigate("/followingpost")}
              className="text-white"
            >
              <X size={24} />
            </button>
            <img
              src={dataStory?.data?.user?.profilePictureUrl}
              className="w-8 h-8 rounded-full"
              alt="User Profile"
            />
            <div className="flex-1">
              <p className="text-white text-sm font-semibold">
                {dataStory?.data?.user?.username}
              </p>
              <p className="text-white/70 text-xs">
                {timeAgo(dataStory?.data?.createdAt)}
              </p>
            </div>
          </div>

          {/* Story Content */}
          <div
            className="flex-1 flex items-center justify-center"
            onTouchStart={handleTouchStory}
            onMouseDown={handleHoldStart}
            onMouseUp={handleHoldEnd}
            onMouseLeave={handleHoldEnd}
            onTouchEnd={handleHoldEnd}
          >
            <img
              src={dataStory?.data?.imageUrl}
              className="max-h-full max-w-full object-contain"
              alt="Story Content"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
            {currentStoryIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="p-2 text-white pointer-events-auto"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {currentStoryIndex < stories.length - 1 && (
              <button
                onClick={handleNext}
                className="p-2 text-white pointer-events-auto"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
            {/* Story Views */}
            <div 
              className="flex items-center gap-2 mb-2 cursor-pointer"
              onClick={() => setShowAllViewers(prev => !prev)}
            >
              <div className="flex -space-x-2">
                {dataViewStory.slice(0, 3).map((viewer, index) => (
                  <img
                    key={index}
                    src={viewer?.user?.profilePictureUrl}
                    className="w-6 h-6 rounded-full border-2 border-black"
                    alt={viewer?.user?.username}
                  />
                ))}
              </div>
              <p className="text-white text-sm">
                {dataViewStory.length} views
              </p>
            </div>

            {/* Caption */}
            <p className="text-white text-sm">
              {dataStory?.data?.caption}
            </p>
          </div>

          {/* Viewers Modal */}
          {showAllViewers && (
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 z-50 max-h-[70vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Story Views</h3>
                <button
                  onClick={() => setShowAllViewers(false)}
                  className="p-1"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3">
                {dataViewStory.map((viewer, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={viewer?.user?.profilePictureUrl}
                      className="w-10 h-10 rounded-full"
                      alt={viewer?.user?.username}
                    />
                    <div>
                      <p className="font-semibold">{viewer?.user?.username}</p>
                      <p className="text-gray-500 text-sm">{viewer?.user?.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Story;