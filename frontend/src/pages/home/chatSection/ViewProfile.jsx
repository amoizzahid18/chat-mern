import { useState } from "react";
import { useAuth } from "../../AuthContext";
import { useChatUI } from "../../ChatUIContext";
import { useEffect } from "react";

function ViewProfile() {
  const { goHome, openDm, friendsDM, setFriendsDM } = useChatUI();
  const { user } = useAuth();
  const [showProfile, setShowProfile] = useState({
    user: user,
    isFriend: false,
  });

  useEffect(() => {
    if (friendsDM) {
    setShowProfile({ user: friendsDM, isFriend: true });
  }}, [user, friendsDM]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-6 overflow-y-auto">
      <div className="w-full flex flex-row">
        <button
          onClick={() => {
            if (showProfile.isFriend) {
              openDm();
            } else {
              setShowProfile({ user: user, isFriend: false });
              goHome();
              setFriendsDM(null);
            }
          }}
          className="ml-4 hover:bg-white/10 p-2 hover:shadow-md cursor-pointer  rounded-full"
        >
          <svg
            className="h-[1.5em] "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="size-6"
            color="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      </div>
      {/* Profile Header Card */}
      <div className="flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-6 mt-6 w-full max-w-sm">
        <img
          src={showProfile.user.profilePic}
          className="rounded-full w-28 h-28 object-cover ring-2 ring-purple-300 shadow-md"
        />
        <div className="text-xl font-semibold mt-3 text-white">
          {showProfile.user.fullname}
        </div>
        <div className="text-md text-purple-200">{`@${showProfile.user.username}`}</div>
      </div>

      {/* Profile Info Section */}
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 mt-6 p-6 rounded-2xl shadow-lg">
        <div className="mb-5">
          <div className="font-semibold text-lg text-white mb-1">Bio</div>
          <div className="text-white-200">
            {showProfile.user.bio
              ? showProfile.user.bio
              : "Hello there! I am using the chat app."}
          </div>
        </div>
        <div className="">
          <div className="font-semibold text-lg text-white mb-1">Email</div>
          <div className="text-white-900 break-all">
            {showProfile.user.email}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
