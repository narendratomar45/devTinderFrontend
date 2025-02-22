import React from "react";

const FeedCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, skills, age, gender } = user;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-72 text-center hover:shadow-2xl transition duration-300">
      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-gray-200">
        <img
          src={
            photoUrl ||
            "https://statinfer.com/wp-content/uploads/dummy-user.png"
          }
          alt="Profile Photo"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {firstName && lastName && (
            <p>
              {firstName} {lastName}
            </p>
          )}
        </h2>
        {age && gender && (
          <p className="text-sm text-gray-500">
            {age} {gender}
          </p>
        )}
        <p className="text-sm text-gray-600 mt-2 px-2">{about}</p>

        {skills?.length > 0 && (
          <div className="mt-3">
            <h3 className="text-xs text-gray-500 font-semibold">Skills:</h3>
            <div className="flex flex-wrap justify-center mt-1 gap-1">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded-lg hover:bg-gray-400 transition duration-200">
          Ignore
        </button>
        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition duration-200">
          Interested
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
