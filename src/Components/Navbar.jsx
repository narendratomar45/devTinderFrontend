import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userProfile = useSelector((store) => store.user);
  console.log("userProfile", userProfile?.user?.photoUrl);
  console.log("userFristName", userProfile?.user?.firstName);

  return (
    <div className=" flex justify-between p-5 bg-blue-950 text-yellow-900">
      <div>Dev Tinder</div>
      <div className=" flex  justify-center items-center gap-x-5">
        <p>Welcome,{userProfile?.user?.firstName}</p>
        <div className="w-10 h-10 border-2 border-red-500 rounded-full p-2">
          <img
            src={userProfile?.user?.photoUrl}
            alt="User Profile"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
