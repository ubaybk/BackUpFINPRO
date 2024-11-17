import { Link, useNavigate } from "react-router-dom";
import ButtonBack from "../../components/buttonback";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import usePhotoDefault from "../../hooks/usePhotoDefault";
import Layout from "../../components/layout";

const Register = () => {
  const photo = usePhotoDefault();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;

  // Schema Yup untuk validasi
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Repeat password is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be digits only")
      .required("Phone number is required"),
    bio: Yup.string().required("Bio is required"),
    website: Yup.string().url("Invalid URL").required("Website is required"),
  });

  // Formik untuk menangani state dan validasi
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      profilePictureUrl: photo,
      phoneNumber: "",
      bio: "",
      website: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Register
        await axios.post(
          "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/register",
          values,
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
    },
  });

  return (
    <>
    <Layout>
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
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        {[
          { name: "name", label: "Name", type: "text" },
          { name: "username", label: "Username", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" },
          {
            name: "passwordRepeat",
            label: "Repeat Password",
            type: "password",
          },
          { name: "phoneNumber", label: "Phone Number", type: "text" },
          { name: "bio", label: "Bio", type: "text" },
          { name: "website", label: "Website", type: "text" },
        ].map(({ name, label, type }) => (
          <div key={name} className="border border-green-500 rounded-md p-3">
            <label
              htmlFor={name}
              className="block font-semibold text-green-500"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[name]}
              placeholder={`Enter your ${label.toLowerCase()}`}
              className={`mt-1 block w-full rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px] ${
                formik.touched[name] && formik.errors[name]
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched[name] && formik.errors[name] && (
              <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-500 w-full py-5 font-medium text-[14px] text-white rounded-md mb-10"
        >
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
      </form>
    </div>

    </Layout>
    </>
  );
};

export default Register;
