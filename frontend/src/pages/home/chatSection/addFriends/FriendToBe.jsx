import axios from "axios";
import { useState } from "react";
function FriendToBe({ id, fullname, username, profilePic, gender }) {
  const [loading, setLoading] = useState(false);
  const addFriend = async () => {
    try {
      setLoading(true);
      console.log(id);
      const response = await axios.post(
        `http://localhost:5000/home/add-friend/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-60 w-full  bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl hover:shadow-lg  transition-shadow duration-200 flex flex-col justify-between items-center p-3">
      {/* Profile Info */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex justify-center w-full mt-2">
          <img
            className="rounded-full w-20 h-20 object-cover ring-2 ring-purple-400 shadow-md"
            src={profilePic}
            alt={fullname}
          />
        </div>
        <div className="text-md font-semibold mt-2 text-gray-600">
          {fullname}
        </div>
        <div className="text-sm font-light text-gray-600">{`@${username}`}</div>
        <div className="text-sm font-light text-gray-600">{gender}</div>
      </div>

      {/* Add Friend Button */}
      {loading ? (
        <button className="btn bg-white/20 text-white shadow-sm shadow-white w-full rounded-xl  pointer-events-none border-2 flex justify-center">
          <span className="loading loading-dots loading-sm text-white"></span>
        </button>
      ) : (
        <button
          onClick={addFriend}
          className="btn btn-purple btn-sm border-none flex justify-center items-center w-full  bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
          Add
        </button>
      )}
    </div>
  );
}

export default FriendToBe;
