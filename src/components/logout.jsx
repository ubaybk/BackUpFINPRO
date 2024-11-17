import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import DarkModeToggle from "../components/DarkModeToggle";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { MdTipsAndUpdates } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { useContext } from "react";
import { getLoginUserContext } from "../context/GetLoginUserContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Logout = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [darkMode, toggleDarkMode] = useDarkMode();
  const { dataUserLogin } = useContext(getLoginUserContext);

  console.log("ini dari logout USER", dataUserLogin);

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
        // Hapus data di localStorage
        localStorage.removeItem("bio");
        localStorage.removeItem("name");
        localStorage.removeItem("photo");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("website");
        localStorage.removeItem("userIdFollow");
        localStorage.removeItem("usernameById");
  
        // Tampilkan toast sukses
        toast.success("Logout berhasil!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        // Navigasi ke halaman utama setelah beberapa detik
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        // Tampilkan toast error jika ada masalah
        toast.error("Logout gagal, coba lagi.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  
  return (
    <>
    <ToastContainer/>
      <div className="bg-green-200 p-5 fixed bottom-0 z-50 left-0 right-0 animate-slide-up md:hidden">
        <div>
          <div className="bg-green-500 p-2 rounded-md flex items-center text-white justify-between ">
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={dataUserLogin.profilePictureUrl}
                alt={dataUserLogin.username}
              />
              <h1>{dataUserLogin.username}</h1>
            </div>
            <FaCheckCircle className="text-[25px]" />
          </div>
          <Link to={"/updateuser"}>
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

      {/* footer web */}
      <div className="fixed left-0 top-0 border-r-2 border-slate-200  w-[20%] min-h-screen  p-2 hidden md:flex flex-col ite justify-between ">
        <div className="flex flex-col gap-3">
          <div>
           <img
            src="./img/ubaypix-logo.png"
            alt="UbayPix Logo"
            className="mb-4 w-[250px] md:w-[150px]" // Sesuaikan ukuran gambar
          />
          </div>
          <Link to={"/followingpost"}>
            <div className="text-black text-[40px] flex items-center gap-3">
              <FaHome />
              <h1 className="text-[16px]">Beranda</h1>
            </div>
          </Link>

          <Link to={"/explorepost"}>
            <div className="text-black flex items-center text-[50px]  gap-3">
              <MdExplore className="ml-[-5px]" />
              <h1 className="text-[16px]">Explore</h1>
            </div>
          </Link>

          <Link to={"/updateuser"}>
            <div className="flex items-center text-black gap-3 ">
              <MdTipsAndUpdates className="text-[50px]" />
              <p>Update Profile</p>
            </div>
          </Link>
          <Link to={"/postcreate"}>
            <div className="flex items-center ml-[-5px] text-black gap-3 ">
              <IoAddCircleOutline className="text-[50px]" />
              <p>Add Post</p>
            </div>
          </Link>
          <Link to={"/dashboard"}>
            <div className=" rounded-md flex items-center text-black ">
              <div className="flex items-center gap-2 ">
                <img
                  className="w-10 h-10 rounded-full"
                  src={dataUserLogin.profilePictureUrl}
                  alt={dataUserLogin.username}
                />
                <h1>Profile</h1>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-col font-bold text-[15px]">
          <div className="flex items-center  gap-2">
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

      {/* <div className="fixed w-[30%] top-0 mt-5 right-0 hidden md:flex flex-col gap-10">
        <Link to={"/dashboard"}>
          <div className=" rounded-md flex items-center text-black ">
            <div className="flex items-center gap-3 ">
              <img
                className="w-8 h-8 rounded-full"
                src={dataUserLogin.profilePictureUrl}
                alt={dataUserLogin.username}
              />
              <div className="leading-tight">
                <p className="text-[12px]">{dataUserLogin.username}</p>
                <p className="text-gray-400 text-[12px]">
                  {dataUserLogin.name}
                </p>
              </div>
            </div>
          </div>
        </Link>

        <div>
          <div>
            <p className="text-slate-500 text-[14px]">Disarankan untuk Anda</p>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default Logout;
