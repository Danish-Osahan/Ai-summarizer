import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { s } from "../assets";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
AOS.init();
const Signup = ({ user }) => {
  // const baseurl = "http://localhost:8080/api/users";
  const baseurl = "https://aisumz-server.onrender.com/api/users";
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (formdata.password !== formdata.confirmpassword) {
      toast.error("Passwords don't Match");
    } else {
      try {
        const response = await axios.post(
          `${baseurl}/signup`,
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
        // alert(error.response.data.message)
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
        className="mt-20 flex flex-col justify-center items-center p-4 rounded-lg shadow-xl h-full"
        data-aos="flip-left"
        data-aos-duration="1000"
      >
        <img
          src={s}
          alt="signup"
          className="w-[200px] h-[150px] object-cover"
        />
        <form onSubmit={handlesubmit}>
          <div className="flex justify-between items-center font-satoshi w-full  space-x-4 px-2 py-2">
            <label
              data-aos="fade-right"
              data-aos-duration="1500"
              htmlFor="firstname"
              className="text-xl  text-center font-bold bg-gra-100 p-3 rounded-lg shadow-md text-gray-700"
            >
              Firstname
            </label>
            <input
              data-aos="fade-left"
              data-aos-duration="1500"
              type="text"
              name="firstname"
              placeholder="Firstname"
              required={true}
              onChange={(e) => {
                setFormData({ ...formdata, firstname: e.target.value });
              }}
              className="shadow-lg border rounded-md px-2 py-1 outline-none block w-full bg-gray-50 focus:outline-offset-[5px] outline-[#FEBF00] outline-[2px] focus:bg-[#fff] "
            />
          </div>
          <div className="flex justify-between items-center font-satoshi w-full  space-x-4 px-2 py-2">
            <label
              data-aos="fade-right"
              data-aos-duration="1500"
              htmlFor="lastname"
              className="text-xl  text-center font-bold bg-gra-100 p-3 rounded-lg shadow-md text-gray-700"
            >
              Lastname
            </label>
            <input
              data-aos="fade-left"
              data-aos-duration="1500"
              type="text"
              name="lastname"
              placeholder="Lastname"
              required={true}
              onChange={(e) => {
                setFormData({ ...formdata, lastname: e.target.value });
              }}
              className="shadow-lg border rounded-md px-2 py-1 outline-none block w-full bg-gray-50 focus:outline-offset-[5px] outline-[#FEBF00] outline-[2px] focus:bg-[#fff] "
            />
          </div>
          <div className="flex justify-between items-center font-satoshi w-full  space-x-4 px-2 py-2">
            <label
              data-aos="fade-right"
              data-aos-duration="1500"
              htmlFor="email"
              className="text-xl  text-center font-bold bg-gra-100 p-3 rounded-lg shadow-md text-gray-700"
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
              className="text-xl  text-center font-bold bg-gra-100 p-3 rounded-lg shadow-md text-gray-700"
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
          <div className="flex flex-wrap space-y-4 justify-between items-center font-satoshi w-full   px-2 py-2">
            <label
              data-aos="fade-right"
              data-aos-duration="1500"
              htmlFor="confirmpassword"
              className="text-xl w-full text-center font-bold bg-gra-100 p-3 rounded-lg shadow-md text-gray-700"
            >
              ConfirmPassword
            </label>
            <input
              data-aos="fade-left"
              data-aos-duration="1500"
              type="password"
              name="confirmpassword"
              placeholder="ConfirmPassword"
              required={true}
              onChange={(e) => {
                setFormData({ ...formdata, confirmpassword: e.target.value });
              }}
              className="shadow-lg border  rounded-md px-2 py-1 outline-none  w-full bg-gray-50 focus:outline-offset-[5px] outline-[#FEBF00] outline-[2px] focus:bg-[#fff] "
            />
          </div>
          <div className="w-full px-2 mt-2 ">
            <button
              type="submit"
              className="button mt-2 mb-4 shadow-md w-full font-satoshi font-bold text-[22px]"
            >
              Signup
            </button>

            <button
              onClick={() => {
                navigate("/signin");
              }}
              className="font-satoshi text-md font-semibold text-gray-800"
            >
              Already have an account? Signin
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
