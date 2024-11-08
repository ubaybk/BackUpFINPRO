import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { FollowingContextProvider } from "./context/FollowingContextProvider.jsx";
import { FollowersContextProvider } from "./context/FollowersContextProvider.jsx";
import { FollowingByUserIdContextProvider } from "./context/FollowingByUserIdContextProvider.jsx";
import { FollowersByUserIdContextProvider } from "./context/FollowersByUserIdContextProvider.jsx";
import { GetFollowingPostContextProvider } from "./context/GetFollowingPostContextProvider.jsx";
import { GetMyFollowingStoriesContextProvider } from "./context/GetMyFollowingStoriesContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FollowingContextProvider>
        <FollowersContextProvider>
          <FollowingByUserIdContextProvider>
            <FollowersByUserIdContextProvider>
              <GetFollowingPostContextProvider>
                <GetMyFollowingStoriesContextProvider>

                <App />
                </GetMyFollowingStoriesContextProvider>
                
              </GetFollowingPostContextProvider>
            </FollowersByUserIdContextProvider>
          </FollowingByUserIdContextProvider>
        </FollowersContextProvider>
      </FollowingContextProvider>
    </BrowserRouter>
  </StrictMode>
);
