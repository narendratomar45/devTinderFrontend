import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiMenuKebab } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const userProfile = useSelector((store) => store.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate('/login')
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  return (
    <div className="flex justify-between items-center p-5 bg-blue-950 text-yellow-300 shadow-md">
      <Link to={"/"}>
        <div className="text-xl font-bold">Dev Tinder</div>
      </Link>

      <div className="flex items-center gap-x-5 relative">
        <p className="text-lg font-medium">
          Welcome, {userProfile?.user?.firstName}
        </p>

        <div className="w-12 h-12 border-2 border-yellow-500 rounded-full overflow-hidden">
          <img
            src={
              userProfile?.user?.photoUrl ||
              "https://statinfer.com/wp-content/uploads/dummy-user.png"
            }
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <CiMenuKebab size={24} className="text-yellow-300" />

          {menuOpen && (
            <div className="absolute right-0 top-8 w-40 bg-white shadow-lg rounded-lg text-black py-2">
              <Link to={"/profile"}>
                <div className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <CgProfile className="mr-2" />

                  <p>Profile</p>
                </div>
              </Link>
              <div className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <IoLogOutOutline className="mr-2" />
                <p onClick={handleLogout}>Logout</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
