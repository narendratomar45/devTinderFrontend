import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "monika123@gmail.com",
    password: "1234@Moni",
  });
  const [errors, setErrors] = useState("");
  console.log("ERRORS", errors?.response?.data?.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      // console.log("DATA", response?.data);
      dispatch(addUser(response?.data));
      navigate("/");
    } catch (error) {
      setErrors(error?.response?.data?.message);
      console.error("ERROR", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          Login
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {errors && <div className="text-red-500 text-sm mb-4">{errors}</div>}
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
