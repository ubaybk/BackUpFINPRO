import axios from "axios";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrGallery } from "react-icons/gr";
import Layout from "../../components/layout";

const EditPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // Mendapatkan postId dari URL
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formPostCreate, setFormPostCreate] = useState({
    imageUrl: "",
    caption: "",
  });
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");

  // Fungsi untuk meng-handle perubahan file input
  const handleChange = (e) => {
    const data = e.target.files[0];
    if (data) {
      setFile(data);
      setPreview(URL.createObjectURL(data));
    }
  };

  // Fungsi untuk meng-handle perubahan input caption
  const handleChangePostCreate = (e) => {
    setFormPostCreate({
      ...formPostCreate,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi untuk meng-handle upload dan update post
  const handleCombinedUpload = async () => {
    if (!file && !formPostCreate.imageUrl) {
      alert("Please select an image or ensure the caption is filled.");
      return;
    }

    setLoading(true); // Set loading state saat proses upload dimulai

    try {
      const data = new FormData();
      let imageUrl = formPostCreate.imageUrl;

      if (file) {
        data.append("image", file);

        // Step 1: Upload the image jika ada file baru
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

        imageUrl = uploadResponse.data.url; // Ambil URL gambar yang diupload
      }

      // Menampilkan data yang akan dikirim
      console.log("Data yang akan dikirim:", {
        caption: formPostCreate.caption,
        imageUrl: imageUrl,
      });

      // Step 2: Update the post dengan data yang sudah diubah
      const postResponse = await axios.post(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/update-post/${postId}`,
        { ...formPostCreate, imageUrl: imageUrl },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            apiKey: apiKey,
          },
        }
      );

      navigate("/dashboard"); // Redirect setelah berhasil update
      console.log("Post updated successfully:", postResponse.data);
    } catch (error) {
      console.error("Error during upload or post update:", error);
      alert("There was an error updating the post. Please try again.");
    } finally {
      setLoading(false); // Matikan loading setelah proses selesai
    }
  };

  // Ambil data post yang akan diedit ketika komponen di-mount
  useEffect(() => {
    const fetchPostData = async () => {
      if (!postId || !token) {
        console.error("No postId or token found");
        return;
      }

      try {
        const response = await axios.get(
          `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/post/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey: apiKey,
            },
          }
        );

        if (response.status === 200) {
          const postData = response.data.data; // Perhatikan struktur responsnya
          setFormPostCreate({
            caption: postData.caption,
            imageUrl: postData.imageUrl,
          });
          setPreview(postData.imageUrl); // Menampilkan gambar yang ada
        } else {
          console.error("Failed to fetch post data, status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [postId, token, apiKey]);

  return (
    <Layout>
      <div className="flex flex-col gap-3 p-3 h-screen mb-56">
        <div className="flex items-center gap-5 mb-5">
          <Link to={"/"}>
            <IoMdClose />
          </Link>
          <h1>Edit Postingan</h1>
        </div>
        {preview && (
          <div className="flex flex-col items-center">
            <img src={preview} alt="Preview" className="w-[300px] h-[300px] object-cover" />
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
              <GrGallery />
              <p>Pilih Image</p>
            </div>
          </label>
        </div>
        <input
          onChange={handleChangePostCreate}
          type="text"
          name="caption"
          value={formPostCreate.caption}
          placeholder="caption"
          className="border-green-500 border-2 text-green-600 text-center py-2"
        />

        <button
          onClick={handleCombinedUpload}
          disabled={loading}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
        >
          {loading ? "Updating..." : "Update & Send"}
        </button>
      </div>
    </Layout>
  );
};

export default EditPost;
