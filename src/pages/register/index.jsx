import { Link } from "react-router-dom";
import ButtonBack from "../../components/buttonback";
import { useRef, useState } from "react";

const Register = () => {
  const [formRegister, setFormRegister] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
    profilePicture: "",
    phoneNumber: "",
    bio: "",
    website: "",
  });

  const ref = useRef(null);

  const handleChange = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = (inputType) => {
    if (inputType === "email") {
      emailRef.current.focus();
    } else if (inputType === "password") {
      passwordRef.current.focus();
    }
  };

  return (
    <>
      <div className="p-3">
        <Link to={"/login"}>
          <ButtonBack />
        </Link>
        <div className="text-center mb-8">
          <h1 className="font-semibold text-[40px]">
            Hello! Register to get started
          </h1>
          <p className="text-[14px] text-[#4A4A4A]">Sign in to your account</p>
        </div>
        <div className="flex flex-col gap-5 ">
          <div className="flex gap-2">
            <div
              onClick={() => handleClick("email")}
              className="border border-green-500 rounded-md p-3"
            >
              <label
                htmlFor="name"
                className="block font-semibold text-green-500"
              >
                Name
              </label>
              <input
                ref={ref}
                onChange={handleChange}
                type="email"
                name="name"
                placeholder="Enter your name"
                className="mt-1 block w-full   rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
              />
            </div>
            <div
              onClick={() => handleClick("password")}
              className="border border-green-500 rounded-md p-3"
            >
              <label
                htmlFor="username"
                className="block font-semibold text-green-500"
              >
                Username
              </label>
              <input
                ref={ref}
                onChange={handleChange}
                type="text"
                name="username"
                placeholder="Enter your username"
                className="mt-1 block w-full   rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
              />
            </div>
          </div>
          <div
            onClick={() => handleClick("password")}
            className="border border-green-500 rounded-md p-3"
          >
            <label
              htmlFor="username"
              className="block font-semibold text-green-500"
            >
              Email
            </label>
            <input
              ref={ref}
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
              ref={ref}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 block w-full   rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
            />
          </div>
          <div
            onClick={() => handleClick("password")}
            className="border border-green-500 rounded-md p-3"
          >
            <label
              htmlFor="repeatPassword"
              className="block font-semibold text-green-500"
            >
              Repeat Password
            </label>
            <input
              ref={ref}
              onChange={handleChange}
              type="password"
              name="repeatPassword"
              placeholder="Enter your password"
              className="mt-1 block w-full   rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
            />
          </div>

          <div
            onClick={() => handleClick("password")}
            className="border border-green-500 rounded-md p-3"
          >
            <label
              htmlFor="image"
              className="block font-semibold text-green-500 mb-2"
            >
              Upload Image
            </label>
            <div className="flex">
              <button className="bg-green-300 p-2 border border-green-500 cursor-pointer">
                Choose file
              </button>
              <div className="border border-green-500 flex-1">
                <input
                  ref={ref}
                  onChange={handleChange}
                  type="file"
                  name="image"
                  className="hidden text-center block w-full rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px] p-2"
                />
              </div>
            </div>
          </div>
          <div
              onClick={() => handleClick("email")}
              className="border border-green-500 rounded-md p-3"
            >
              <label
                htmlFor="name"
                className="block font-semibold text-green-500"
              >
                Bio
              </label>
              <input
                ref={ref}
                onChange={handleChange}
                type="text"
                name="bio"
                placeholder="Enter your bio"
                className="mt-1 block w-full   rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
              />
            </div>
            <div
              onClick={() => handleClick("email")}
              className="border border-green-500 rounded-md p-3"
            >
              <label
                htmlFor="name"
                className="block font-semibold text-green-500"
              >
                Website
              </label>
              <input
                ref={ref}
                onChange={handleChange}
                type="text"
                name="website"
                placeholder="Enter your website"
                className="mt-1 block w-full   rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
              />
            </div>

          <button className="bg-green-500 w-full py-5 font-medium text-[14px] text-white rounded-md mb-10">
            Register
          </button>
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link to={"/login"}>
                <span className="text-green-500">Login Now</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
