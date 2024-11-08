import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      <div className="">
        <img className="w-full" src="./img/herosection.png" alt="" />
        <div className="text-center px-4 flex flex-col gap-5">
          <h1 className="font-medium text-[43px] ">
            Let's connect with each other
          </h1>
          <p className="text-[14px] text-[#919191]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
            fugiat vitae cum ab nesciunt.
          </p>
          <Link to={"/login"}>
            <button className="bg-green-500 w-full py-5 font-medium text-[14px] text-white rounded-md mb-10">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
