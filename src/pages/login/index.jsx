import { Link, useNavigate } from "react-router-dom";
import ButtonBack from "../../components/buttonback";
import { useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleClick = (inputType) => {
    if (inputType === "email") {
      emailRef.current.focus();
    } else if (inputType === "password") {
      passwordRef.current.focus();
    }
  };
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    console.log("API Key:", apiKey);

    // API call to login
    axios
      .post(
        "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/login",
        formLogin,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const userId = res.data.user.id;
        const name = res.data.user.name;
        const photo = res.data.user.profilePictureUrl;
        const id = res.data.token;
        const username = res.data.user.username;
        const bio = res.data.user.bio;
        const website = res.data.user.website;
        localStorage.setItem("userId", userId);
        localStorage.setItem("name", name);
        localStorage.setItem("photo", photo);
        localStorage.setItem("token", id);
        localStorage.setItem("username", username);
        localStorage.setItem("bio", bio);
        localStorage.setItem("website", website);
        toast.success("berhasil login", {
          position: "top-right",
          autoClose: 5000,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 5000);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="p-3">
        <Link to={"/"}>
          <ButtonBack />
        </Link>
        <div className="text-center mb-8">
          <h1 className="font-semibold text-[40px]">Hello Again!</h1>
          <p className="text-[14px] text-[#4A4A4A]">Sign in to your account</p>
        </div>
        <div className="flex flex-col gap-5 ">
          <div
            onClick={() => handleClick("email")}
            className="border border-green-500 rounded-md p-3"
          >
            <label
              htmlFor="email"
              className="block font-semibold text-green-500"
            >
              Email
            </label>
            <input
              ref={emailRef}
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 block w-full   rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
            />
          </div>
          <div
            onClick={() => handleClick("password")}
            className="border border-green-500 rounded-md p-3"
          >
            <label
              htmlFor="password"
              className="block font-semibold text-green-500"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 block w-full   rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
            />
          </div>
          <button
            onClick={handleLogin}
            className="bg-green-500 w-full py-5 font-medium text-[14px] text-white rounded-md mb-10"
          >
            Sign In
          </button>
          <div className="text-center">
            <p>
              Don’t have account? Let’s{" "}
              <Link to={"/register"}>
                <span className="text-green-500">Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
