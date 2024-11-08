import { Link, useNavigate } from "react-router-dom";
import ButtonBack from "../../components/buttonback";
import { useEffect, useState } from "react";
import axios from "axios";
import usePhotoDefault from "../../hooks/usePhotoDefault";

const Register = () => {
  const photo = usePhotoDefault()
  // const [file, setFile] = useState(null);
  // const [preview, setPreview] = useState(null);
  const [sendImage, setSendImage] = useState("");
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  const apiKey = import.meta.env.VITE_API_KEY;

  const [formRegister, setFormRegister] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
    profilePictureUrl: photo,
    phoneNumber: "",
    bio: "",
    website: "",
  });

  const handleChangeFormRegister = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     setFile(selectedFile);
  //     setPreview(URL.createObjectURL(selectedFile));
  //   }
  // };

  const handleClick = async () => {
    try {
      // Upload image
      // const data = new FormData();
      // data.append("image", file);
      // const uploadImage = await axios.post(
      //   "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
      //   data,
      //   {
      //     headers: {
      //       apiKey: apiKey,
      //     },
      //   }
      // );

      // const imageUrl = uploadImage.data.url;
      // setSendImage(imageUrl);

      // Create form register
      await axios.post(
        "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/register",
        { ...formRegister },
        {
          headers: {
            apiKey: apiKey,
          },
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  useEffect(() => {
    if (sendImage) {
      setFormRegister((prevState) => ({
        ...prevState,
        profilePictureUrl: sendImage,
      }));
    }
  }, [sendImage]);

  return (
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
          <div className="border border-green-500 rounded-md p-3">
            <label htmlFor="name" className="block font-semibold text-green-500">
              Name
            </label>
            <input
              onChange={handleChangeFormRegister}
              type="text"
              name="name"
              placeholder="Enter your name"
              className="mt-1 block w-full rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
            />
          </div>
          <div className="border border-green-500 rounded-md p-3">
            <label htmlFor="username" className="block font-semibold text-green-500">
              Username
            </label>
            <input
              onChange={handleChangeFormRegister}
              type="text"
              name="username"
              placeholder="Enter your username"
              className="mt-1 block w-full rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
            />
          </div>
        </div>
        <div className="border border-green-500 rounded-md p-3">
          <label htmlFor="email" className="block font-semibold text-green-500">
            Email
          </label>
          <input
            onChange={handleChangeFormRegister}
            type="email"
            name="email"
            placeholder="Enter your email"
            className="mt-1 block w-full rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
          />
        </div>
        <div className="border border-green-500 rounded-md p-3">
          <label htmlFor="password" className="block font-semibold text-green-500">
            Password
          </label>
          <input
            onChange={handleChangeFormRegister}
            type="password"
            name="password"
            placeholder="Enter your password"
            className="mt-1 block w-full rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
          />
        </div>
        <div className="border border-green-500 rounded-md p-3">
          <label htmlFor="passwordRepeat" className="block font-semibold text-green-500">
            Repeat Password
          </label>
          <input
            onChange={handleChangeFormRegister}
            type="password"
            name="passwordRepeat"
            placeholder="Enter your password"
            className="mt-1 block w-full rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
          />
        </div>
        {/* <div className="border border-green-500 rounded-md p-3">
          <label htmlFor="image" className="block font-semibold text-green-500 mb-2">
            Upload Image
          </label>
          <div className="flex">
            <label className="bg-green-300 p-2 border border-green-500 cursor-pointer">
              <input
                id="fileInput"
                onChange={handleFileChange}
                type="file"
                name="image"
                className="hidden"
              />
              Choose file
            </label>
            {preview && <img src={preview} alt="Preview" className="ml-3 w-20 h-20 object-cover" />}
          </div>
        </div> */}
        <div className="border border-green-500 rounded-md p-3">
          <label htmlFor="phoneNumber" className="block font-semibold text-green-500">
            Phone Number
          </label>
          <input
            onChange={handleChangeFormRegister}
            type="text"
            name="phoneNumber"
            placeholder="Enter your Phone Number"
            className="mt-1 block w-full rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
          />
        </div>
        <div className="border border-green-500 rounded-md p-3">
          <label htmlFor="bio" className="block font-semibold text-green-500">
            Bio
          </label>
          <input
            onChange={handleChangeFormRegister}
            type="text"
            name="bio"
            placeholder="Enter your bio"
            className="mt-1 block w-full rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
          />
        </div>
        <div className="border border-green-500 rounded-md p-3">
          <label htmlFor="website" className="block font-semibold text-green-500">
            Website
          </label>
          <input
            onChange={handleChangeFormRegister}
            type="text"
            name="website"
            placeholder="Enter your website"
            className="mt-1 block w-full rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
          />
        </div>
        <button onClick={handleClick} className="bg-green-500 w-full py-5 font-medium text-[14px] text-white rounded-md mb-10">
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
  );
};

export default Register;
