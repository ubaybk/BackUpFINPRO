import { useRoutes, useLocation } from "react-router-dom";
import { routes } from "./routes";
import Footer from "./components/footer";
import useDarkMode from "./hooks/useDarkMode";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  const element = useRoutes(routes);
  const location = useLocation();
  const [darkMode, toggleDarkMode] = useDarkMode();

  // Tentukan path mana saja yang ingin menampilkan footer
  const showFooterPaths = [
    "/dashboard",
    "/followingpost",
    "/detailuser/:userId",
    "/explorepost",
    "/myfollowing",
    "/myfollowers",
    "/postcreate",
    "/followinguserid",
    "/followersuserid"
  ];
  const showFooter = showFooterPaths.some(path =>
    location.pathname.match(new RegExp(path.replace(':userId', '[^/]+')))
  );

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> */}
      <div className="flex-grow">{element}</div>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
