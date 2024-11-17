import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  // Variants untuk animasi kedip-kedip
  const blink = {
    visible: { opacity: 1 },
    hidden: { opacity: 0.5 },
  };

  return (
    <>
      <div className="md:flex-row flex flex-col items-center  md:justify-center min-h-screen">
        <img
          src="./img/ubaypix-logo.png"
          alt="UbayPix Logo"
          className="mb-4 w-[250px] md:w-[300px] p-2  md:hidden" // Sesuaikan ukuran gambar
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2 mt-[-20px] md:mb-0"
        >
          <img className="w-[320px]" src="./img/dashApp.png" alt="" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4 flex flex-row justify-around mt-8 md:mt-0 items-center md:flex-col md:gap-5 gap-1"
        >
          <img
            src="./img/ubaypix-logo.png"
            alt="UbayPix Logo"
            className="mb-4 w-[150px] md:w-[300px] hidden md:block" // Sesuaikan ukuran gambar
          />
          <h1 className="font-medium text-[24px] md:text-[43px]">
            Let's connect with each other
          </h1>

          <Link to={"/login"}>
            <motion.button
              className="bg-green-500 w-full py-5 px-10 font-medium text-[14px] md:block hidden text-white rounded-md mb-10"
              variants={blink}
              initial="visible"
              animate="hidden"
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.8,
              }}
            >
              Get Started
            </motion.button>
          </Link>

          <Link to={"/login"}>
            <motion.div
              className="bg-green-500 flex px-2 items-center rounded-md"
              variants={blink}
              initial="visible"
              animate="hidden"
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.8,
              }}
            >
              <button className="w-full font-medium px-3 py-3 text-[14px] md:hidden text-white">
                Get Started
              </button>
              <TbPlayerTrackNextFilled className="md:hidden text-white text-[30px]" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
