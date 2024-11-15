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
import { GetLoginUserContextProvider } from "./context/GetLoginUserContextProvider.jsx";
import { UploadImageContextProvider } from "./context/UploadImageContextProvider.jsx";
import { GetAllExportPostContextProvider } from "./context/GetAllExplorePostContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FollowingContextProvider>
        <FollowersContextProvider>
          <FollowingByUserIdContextProvider>
            <FollowersByUserIdContextProvider>
              <GetFollowingPostContextProvider>
                <GetMyFollowingStoriesContextProvider>
                  <GetLoginUserContextProvider>
                    <UploadImageContextProvider>
                      <GetAllExportPostContextProvider>
                        <App />
                      </GetAllExportPostContextProvider>
                    </UploadImageContextProvider>
                  </GetLoginUserContextProvider>
                </GetMyFollowingStoriesContextProvider>
              </GetFollowingPostContextProvider>
            </FollowersByUserIdContextProvider>
          </FollowingByUserIdContextProvider>
        </FollowersContextProvider>
      </FollowingContextProvider>
    </BrowserRouter>
  </StrictMode>
);
