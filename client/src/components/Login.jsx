import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signin } from "../assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = ({ user }) => {
  // const baseurl = "http://localhost:8080/api/users";
  const baseurl = "https://aisumz-server.onrender.com/api/users";

  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (formdata.email === "" || formdata.password === "") {
      toast.error("All fields are required");
    } else {
      try {
        const response = await axios.post(
          `${baseurl}/signin`,
          { ...formdata },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/main");
        console.log("User token :-" + response.data.token);
        
      } catch (error) {
        console.log(error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/main");
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div
        className=" mt-24 flex flex-col justify-center items-center p-4 rounded-lg shadow-xl h-full"
        data-aos="flip-left"
        data-aos-duration="1000"
      >
        <img
          src={signin}
          alt="signup"
          className="w-[200px] h-[150px] object-cover"
          data-aos="fade-up"
          data-aos-duration="1000"
        />
        <form onSubmit={handlesubmit}>
          <div className="flex justify-between items-center font-satoshi w-full  space-x-4 px-2 py-2">
            <label
              htmlFor="email"
              className="text-xl  text-center font-bold bg-gra-100 p-3 rounded-lg shadow-md text-gray-700"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Email
            </label>
            <input
              data-aos="fade-left"
              data-aos-duration="1500"
              type="email"
              name="email"
              placeholder="Email"
              required={true}
              onChange={(e) => {
                setFormData({ ...formdata, email: e.target.value });
              }}
              className="shadow-lg border rounded-md px-2 py-1 outline-none block w-full bg-gray-50 focus:outline-offset-[5px] outline-[#FEBF00] outline-[2px] focus:bg-[#fff] "
            />
          </div>
          <div className="flex justify-between items-center font-satoshi w-full  space-x-4 px-2 py-2">
            <label
              data-aos="fade-right"
              data-aos-duration="1500"
              htmlFor="password"
              className="text-xl  text-center font-semibold bg-gra-100 p-3 rounded-lg shadow-md text-gray-700"
            >
              Password
            </label>
            <input
              data-aos="fade-left"
              data-aos-duration="1500"
              type="password"
              name="password"
              placeholder="Password"
              required={true}
              onChange={(e) => {
                setFormData({ ...formdata, password: e.target.value });
              }}
              className="shadow-lg border rounded-md px-2 py-1 outline-none block w-full bg-gray-50 focus:outline-offset-[5px] outline-[#FEBF00] outline-[2px] focus:bg-[#fff] "
            />
          </div>
          <div className="w-full px-2 mt-2 ">
            <button
              type="submit"
              className="button mt-2 mb-4 shadow-md w-full font-satoshi font-bold text-[22px]"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              Signin
            </button>

            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="font-satoshi text-md font-semibold text-gray-800"
            >
              Don't have an account? Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
