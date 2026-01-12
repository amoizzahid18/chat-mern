import { useChatUI } from "../../ChatUIContext";
import { useState } from "react";
import { useAuth } from "../../AuthContext";
import api from "../../../../api.js";
import { useNavigate } from "react-router-dom";

function WelcomeHome() {
  const { openAddFriend, viewProfile } = useChatUI();
  const { user, setUser, logout } = useAuth();
  const [loadingDel, setLoadingDel] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const logoutUser = async () => {
    if (user) {
      setLoading(true);
      await logout(); // Uses the logout from AuthContext
      setLoading(false);
      navigate("/login"); // Redirect to login page
    }
  };
  const deleteAccount = async () => {
    try {
      setLoadingDel(true);
      const response = await api.delete("/home/delete-account", {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Account deleted");
        setUser(null);
        setLoadingDel(false);
      }
    } catch (error) {
      setLoadingDel(false);
      console.log(error.message);
    }
  };
  return (
    <div className="h-full flex flex-col justify-center items-center px-3 sm:px-6">
      <div className="dropdown w-full flex justify-end p-2 sm:p-5">
        <button
          tabIndex={0}
          role="button"
          className="btn bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl shadow-lg border-none transition-all duration-300 text-sm sm:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <span>Settings</span>
        </button>

        <ul
          tabIndex={0}
          className="dropdown-content  w-44 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl mt-12 flex flex-col gap-1 text-white"
        >
          <li
            className={`px-4 py-2 ${
              loading ? "pointer-events-none" : ""
            } hover:bg-white/20 rounded-lg cursor-pointer`}
            onClick={viewProfile}
          >
            View Profile
          </li>
          <li
            className={`px-4 py-2 hover:bg-white/20 rounded-lg cursor-pointer ${
              loading ? "pointer-events-none" : ""
            }`}
            onClick={openAddFriend}
          >
            Add Friend
          </li>
          <li
            className={`px-4 py-2 ${
              loading || loadingDel ? "pointer-events-none" : ""
            } ${
              loadingDel ? "bg-red-500/30 " : ""
            } hover:bg-red-500/30 rounded-lg cursor-pointer`}
            onClick={deleteAccount}
          >
            {loadingDel ? (
              <button className="  bg-transparent w-full pointer-events-none  flex justify-center ">
                <span className="loading loading-dots loading-sm text-white"></span>
              </button>
            ) : (
              "Delete Account"
            )}
          </li>
          <li
            className={`px-4 py-2 ${
              loading
                ? "bg-white/20 text-white border border-white/30 pointer-events-none"
                : "bg-purple-700 hover:bg-purple-600"
            }  cursor-pointer rounded-lg`}
            onClick={logoutUser}
          >
            {loading ? (
              <button className="  bg-transparent w-full pointer-events-none  flex justify-center ">
                <span className="loading loading-dots loading-sm text-white"></span>
              </button>
            ) : (
              "Logout"
            )}
          </li>
        </ul>
      </div>

      <div className="flex flex-col justify-center items-center h-full text-center px-3 sm:px-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-lg animate-fadeIn">
          Welcome!
        </h1>
        <p className="text-lg sm:text-2xl font-semibold text-white/90 mt-4 animate-fadeIn delay-200">
          Chat with your loved ones now
        </p>
      </div>
    </div>
  );
}

export default WelcomeHome;
