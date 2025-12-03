import { useAuth } from "../../AuthContext";

function ViewProfile() {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-6 overflow-y-auto">
      {/* Profile Header Card */}
      <div className="flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-6 mt-6 w-full max-w-sm">
        <img
          src={user.profilePic}
          className="rounded-full w-28 h-28 object-cover ring-2 ring-purple-300 shadow-md"
        />
        <div className="text-xl font-semibold mt-3 text-white">
          {user.fullname}
        </div>
        <div className="text-md text-purple-200">{`@${user.username}`}</div>
      </div>

      {/* Profile Info Section */}
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 mt-6 p-6 rounded-2xl shadow-lg">
        <div className="mb-5">
          <div className="font-semibold text-lg text-white mb-1">Bio</div>
          <div className="text-white-200">
            {user.bio ? user.bio : "Hello there! I am using the chat app."}
          </div>
        </div>
        <div className="">
          <div className="font-semibold text-lg text-white mb-1">Email</div>
          <div className="text-white-900 break-all">{user.email}</div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
