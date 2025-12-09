import FriendToBe from "./FriendToBe.jsx";

function ShowFriendsToBe({ users, loading }) {  
  return loading ? (
  <div className="w-full h-[500px] flex justify-center items-center">
    <span className="loading loading-dots loading-xl text-purple-300"></span>
  </div>
) : users.length === 0 ? (
  <div className="w-full h-[500px] flex justify-center items-center text-2xl font-semibold text-white/80">
    No users found
  </div>
) : (
  <div className="mx-4 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg max-h-[500px] overflow-y-auto">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {users.map((user) => (
        <FriendToBe
          key={user._id}
          id={user._id}
          fullname={user.fullname}
          username={user.username}
          profilePic={user.profilePic}
          gender={user.gender}
          className="transition transform hover:scale-105 duration-200"
        />
      ))}
    </div>
  </div>
);

}

export default ShowFriendsToBe;
