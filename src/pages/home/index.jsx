import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import Layout from "../../components/layout";

const Home = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  useEffect(()=> {
    if (token){
      navigate('/dashboard')
    }
  },[])
  return (
    <>
   
      <div className="md:flex  items-center justify-center min-h-screen">
        <div>
        <img className="" src="./img/dashApp.png" alt="" />

        </div>
        <div className="text-center px-4 flex flex-row justify-around mt-8 md:mt-0 items-center  md:flex-col md:gap-5 gap-1">
          <h1 className="font-medium text-[24px] md:text-[43px]  ">
            Let's connect <br /> with each other
          </h1>
          {/* <p className="text-[14px] text-[#919191]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
            fugiat vitae cum ab nesciunt.
          </p> */}
          <Link to={"/login"}>
            <button className="bg-green-500 w-full py-5 px-10 font-medium text-[14px] md:block hidden text-white rounded-md mb-10">
              Get Started
            </button>
          </Link>
          <Link to={"/login"}>
          <div className="bg-green-500 flex p-1 items-center rounded-md">
            <button className=" w-full font-medium px-3 py-3 text-[14px] md:hidden text-white  ">
              Get Started
            </button>
            <TbPlayerTrackNextFilled className="md:hidden text-white text-[30px]" />

          </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
