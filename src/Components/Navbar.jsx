import React from "react";

const Navbar = () => {
  return (
    <div className=" flex justify-between p-5 bg-blue-950 text-white">
      <div>Dev Tinder</div>
      <div className=" w-10 h-10 border-2 border-red-500 rounded-full p-2">
        Profile
      </div>
    </div>
  );
};

export default Navbar;
