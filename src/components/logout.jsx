import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import DarkModeToggle from "../components/DarkModeToggle";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

const Logout = () => {
  const photoProfile = localStorage.getItem("photo");
  const username = localStorage.getItem("username");
  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [darkMode, toggleDarkMode] = useDarkMode();

  const handleLogout = () => {
    axios
      .get("https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/logout", {
        headers: {
          "Content-Type": "application/json",
          apiKey: apiKey,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        localStorage.removeItem("bio");
        localStorage.removeItem("name");
        localStorage.removeItem("photo");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("website");
        localStorage.removeItem("userIdFollow");
        localStorage.removeItem("usernameById");
        navigate("/");
      });
  };

  return (
    <>
      <div className="bg-green-200 p-5 fixed bottom-0 z-50 left-0 right-0 animate-slide-up">
        <div>
          <div className="bg-green-500 p-2 rounded-md flex items-center text-white justify-between ">
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full"
                src={photoProfile}
                alt={username}
              />
              <h1>{username}</h1>
            </div>
            <FaCheckCircle className="text-[25px]" />
          </div>
          <Link to={'/updateuser'}>
            <div className="flex items-center justify-center gap-3 text-[30px]">
              <MdOutlineTipsAndUpdates />
              <p>Update Profile</p>
            </div>
          </Link>
          <div className="text-center font-bold text-[30px]">
            <div className="flex items-center justify-center gap-2">
              <p className="text-green-500">Dark Mode</p>
              <DarkModeToggle
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </div>
            <h1 onClick={handleLogout} className="text-red-600">
              LOG OUT
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
export default Logout;
