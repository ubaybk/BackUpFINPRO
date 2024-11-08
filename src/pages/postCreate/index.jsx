import axios from "axios";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { GrGallery } from "react-icons/gr";

const PostCreate = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState(null);
  const [sendImage, setSendImage] = useState([]);
  const [preview, setPreview] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const data = e.target.files[0];
    if (data) {
      setFile(data);
      setPreview(URL.createObjectURL(data));
    }
  };

  const [formPostCreate, setFormPostCreate] = useState({
    imageUrl: sendImage,
    caption: "",
  });

  const handleChangePostCreate = (e) => {
    setFormPostCreate({
      ...formPostCreate,
      [e.target.name]: e.target.value,
    });
  };

  const handleCombinedUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      const data = new FormData();
      data.append("image", file);

      // Step 1: Upload the image
      const uploadResponse = await axios.post(
        "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        data,
        {
          headers: {
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const imageUrl = uploadResponse.data.url;
      setSendImage(imageUrl);

      // Step 2: Create the post using the image URL
      const postResponse = await axios.post(
        "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/create-post",
        { ...formPostCreate, imageUrl: imageUrl },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            apiKey: apiKey,
          },
        }
      )
      navigate("/dashboard");

      console.log("Post created successfully:", postResponse.data);
    } catch (error) {
      console.error("Error during upload or post creation:", error);
    }
  };

  useEffect(() => {
    setFormPostCreate((prevState) => ({
      ...prevState,
      imageUrl: sendImage,
    }));
  }, [sendImage]);

  return (
    <>
      <div className="flex flex-col gap-3 p-3 h-screen mb-56">
        <div className="flex items-center gap-5 mb-5">
          <Link to={"/"}>
            <IoMdClose />
          </Link>
          <h1>Postingan Baru</h1>
        </div>
        {preview && (
          <div className="flex flex-col items-center">
            <img src={preview} alt="Preview" className="w-[300px] h-[300px]" />
          </div>
        )}
        <div>
          <input
            id="fileInput"
            onChange={handleChange}
            type="file"
            className="hidden"
          />
          <label htmlFor="fileInput">
            <div className="flex items-center cursor-pointer justify-center gap-5 text-[25px] bg-green-400 px-5 text-white py-3 rounded-3xl">
              <GrGallery className="" />
              <p>Pilih Image</p>
            </div>
          </label>
        </div>
        <input
          onChange={handleChangePostCreate}
          type="text"
          name="caption"
          placeholder="caption"
          className="border-green-500 border-2 text-green-600 text-center py-2"
        />

        <button onClick={handleCombinedUpload}>
          Upload & Send
        </button>
      </div>
    </>
  );
};

export default PostCreate;
