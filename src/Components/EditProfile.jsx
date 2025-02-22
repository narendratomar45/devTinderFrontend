import React, { useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const {
    firstName = "",
    lastName = "",
    age = "",
    gender = "",
    about = "",
    skills = "",
    photoUrl = "",
  } = user?.user || {};

  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    age: age,
    gender: gender,
    about: about,
    skills: skills,
    photoUrl: photoUrl,
  });
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  //   console.log("FIRSTNAME", formData.firstName);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const saveProfile = async () => {
    try {
      setErrors("");
      const response = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });
      console.log("RESPONSEEDIT", response?.data);
      dispatch(addUser(response?.data));
      setFormData(response.data.loggedInUser);
    } catch (error) {
      console.log("ERROR", error.response?.data);
      setErrors(error.response?.data?.message);
    }
  };

  return (
    <div className="w-[90%] flex justify-center my-10">
      <div className="w-96 mx-auto  bg-gray-100 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Edit Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              onChange={handleChange}
              value={formData.firstName}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              onChange={handleChange}
              value={formData.lastName}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter age"
              onChange={handleChange}
              value={formData.age}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">About</label>
            <textarea
              name="about"
              placeholder="Tell something about yourself..."
              onChange={handleChange}
              value={formData.about}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Skills</label>
            <input
              type="text"
              name="skills"
              placeholder="e.g., JavaScript, React, Node.js"
              onChange={handleChange}
              value={formData.skills}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Profile Photo URL
            </label>
            <input
              type="text"
              name="photoUrl"
              placeholder="Enter photo URL"
              onChange={handleChange}
              value={formData.photoUrl}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            onClick={saveProfile}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Save Profile
          </button>
        </div>
      </div>
      <div className="w-96 bg-gray-100">
        <FeedCard user={formData} />
      </div>
    </div>
  );
};

export default EditProfile;
