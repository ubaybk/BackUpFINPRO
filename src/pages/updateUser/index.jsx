import { useState, useContext, useEffect } from "react";
import { uploadImageContext } from "../../context/UploadImageContextProvider"; // Mengimpor context untuk upload image
import { getLoginUserContext } from "../../context/GetLoginUserContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonBack from "../../components/buttonback";
import Layout from "../../components/layout";

const UpdateUser = () => {
  const { dataUserLogin } = useContext(getLoginUserContext);
  const { handleUploadImage, linkImage } = useContext(uploadImageContext);

  

  const [dataUpdateProfile, dataSetUpdateProfile] = useState({
    name: dataUserLogin.name || "",
    username: dataUserLogin.username || "",
    email: dataUserLogin.email || "",
    profilePictureUrl: dataUserLogin.profilePictureUrl || "",
    phoneNumber: dataUserLogin.phoneNumber || "",
    bio: dataUserLogin.bio || "",
    website: dataUserLogin.website || "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dataSetUpdateProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUploadImage(file); // Memanggil fungsi untuk mengunggah gambar
    }
  };

  useEffect(() => {
    if (linkImage && linkImage.url) {
      dataSetUpdateProfile((prevState) => ({
        ...prevState,
        profilePictureUrl: linkImage.url,
      }));
    }
  }, [linkImage]);

  const updateDataUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", dataUpdateProfile.name);
    formData.append("username", dataUpdateProfile.username);
    formData.append("email", dataUpdateProfile.email);
    if (dataUpdateProfile.profilePictureUrl) {
      formData.append("profilePictureUrl", dataUpdateProfile.profilePictureUrl);
    }
    formData.append("phoneNumber", dataUpdateProfile.phoneNumber);
    formData.append("bio", dataUpdateProfile.bio);
    formData.append("website", dataUpdateProfile.website);

    axios
      .post(
        "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        alert("Profile updated successfully!");
        navigate("/dashboard");
      })
      .catch((error) => {
        alert("Failed to update profile. Please try again.");
        console.error(error);
      });
  };

  return (
    <>
      <Layout>
        <div className="p-6 w-screen  md:w-[700px] mb-20 md:mb-0 md:px-36">
          <div className="flex items-center gap-2 font-semibold text-2xl">
            <button onClick={handleBack}>
              <ButtonBack />
            </button>
            <p>Edit Profile</p>
          </div>
          <div>
            <div className="flex flex-col justify-center gap-5 items-center">
              <img
                src={
                  dataUpdateProfile.profilePictureUrl || "/default-image.png"
                }
                className="w-24 h-24 rounded-full object-cover"
                alt="Profile"
              />
              <div
                onClick={() => document.getElementById("file-input").click()} // Memicu input file saat div ini diklik
                className="cursor-pointer text-blue-800 dark:text-white text-[12px] border border-blue-800 px-4 py-2 rounded hover:bg-blue-100"
              >
                Ganti Foto Profile
              </div>
              <input
                id="file-input"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden" // Menyembunyikan input file
              />
            </div>
          </div>
          <form className="mt-6 flex flex-col gap-4  dark:text-black">
            <input
              type="text"
              name="name"
              value={dataUpdateProfile.name}
              onChange={handleChange}
              placeholder="Name"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="username"
              value={dataUpdateProfile.username}
              onChange={handleChange}
              placeholder="Username"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="email"
              name="email"
              value={dataUpdateProfile.email}
              onChange={handleChange}
              placeholder="Email"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="phoneNumber"
              value={dataUpdateProfile.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <textarea
              name="bio"
              value={dataUpdateProfile.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="website"
              value={dataUpdateProfile.website}
              onChange={handleChange}
              placeholder="Website"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={updateDataUpdateProfile}
              className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition"
            >
              Update Profile
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default UpdateUser;
